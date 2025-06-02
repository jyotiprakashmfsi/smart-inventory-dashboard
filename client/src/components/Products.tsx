import React, { useEffect, useState, useCallback } from "react";
import { createStock, listStock, updateStock, deleteStock } from "../services/stocks";
import { createLog, listLog } from "../services/logs";
import type { Stock, Log } from "../type/type";

const Products = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showLowStockOnly, setShowLowStockOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<Omit<Stock, "id" | "created_at" | "updated_at">>({
    name: "",
    stock: 0,
    min: 0,
    price: 0,
  });

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [stockRes, logRes] = await Promise.all([listStock(), listLog()]);
      setStocks(stockRes.data || []);
      setLogs(logRes.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      setStocks([]);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleStockAdjust = async (product: Stock, amount: number) => {
    const newStockLevel = product.stock + amount;
    if (newStockLevel < 0) {
      alert("Stock cannot be negative.");
      return;
    }
    try {
      await updateStock(product.id, { stock: newStockLevel });
      await createLog({ description: `Adjusted ${product.name} stock by ${amount > 0 ? '+' : ''}${amount}. New stock: ${newStockLevel}.` });
      fetchDashboardData();
    } catch (err: any) {
      setError(`Failed to update stock for ${product.name}: ${err.message}`);
    }
  };

  const handleNewProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.stock < 0 || newProduct.min < 0 || (newProduct.price !== undefined && newProduct.price < 0)) {
      alert("Please fill in all fields correctly (name, stock, min, and price).");
      return;
    }
    try {
      await createStock(newProduct);
      await createLog({ description: `New product "${newProduct.name}" added.` });
      fetchDashboardData();
      setNewProduct({ name: "", stock: 0, min: 0, price: 0 });
    } catch (err: any) {
      setError(`Failed to create product: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
      try {
        await deleteStock(productId);
        await createLog({ description: `Product "${productName}" deleted.` });
        fetchDashboardData();
      } catch (err: any) {
        setError(`Failed to delete ${productName}: ${err.message}`);
      }
    }
  };

  const getStockIndicatorSymbol = (stockLevel: number, minLevel: number): string => {
    if (stockLevel <= minLevel) return "🔴";
    if (stockLevel <= minLevel * 1.25) return "🟡";
    return "🟢";
  };

  const filteredStocks = stocks
    .filter((stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((stock) =>
      showLowStockOnly ? stock.stock <= stock.min : true
    );

  const lowStockCount = stocks.filter(s => s.stock <= s.min).length;

  if (isLoading) return <p style={{ padding: '20px' }}>Loading dashboard...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Inventory Dashboard</h1>
        <p style={{ margin: 0 }}>Low Stock Items: {lowStockCount}</p>
      </div>

      <hr style={{ marginBottom: '20px' }}/>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flexGrow: 1, minWidth: '200px' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            style={{ marginRight: '5px' }}
            checked={showLowStockOnly}
            onChange={(e) => setShowLowStockOnly(e.target.checked)}
          />
          Show Low Stocks
        </label>
      </div>

      {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '20px' }}>Error: {error}</p>}

      <hr style={{ marginBottom: '20px' }}/>

      <h3>Products</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
        {filteredStocks.length > 0 ? filteredStocks.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                <h4 style={{ margin: 0, fontSize: '1.1em' }}>{product.name}</h4>
                <button onClick={() => handleDeleteProduct(product.id, product.name)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}>Delete</button>
              </div>
              <p style={{ margin: '4px 0', fontSize: '0.9em' }}>
                Stock: {getStockIndicatorSymbol(product.stock, product.min)} {product.stock}
              </p>
              <p style={{ margin: '4px 0', fontSize: '0.9em' }}>Min Stock: {product.min}</p>
              {product.price !== null && product.price !== undefined && <p style={{ margin: '4px 0', fontSize: '0.9em' }}>Price: Rs {product.price.toFixed(2)}</p>}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
              <button onClick={() => handleStockAdjust(product, -1)} style={{flex: 1, padding: '5px'}}>-</button>
              <button onClick={() => handleStockAdjust(product, 1)} style={{flex: 1, padding: '5px'}}>+</button>
            </div>
          </div>
        )) : (
          !isLoading && <p>No products match your criteria.</p>
        )}
      </div>

      <hr style={{ marginBottom: '20px' }}/>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <h3>Add New Product</h3>
        <form onSubmit={handleCreateProduct}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
            <label htmlFor="newProductName">Name:</label>
            <input id="newProductName" name="name" value={newProduct.name} onChange={handleNewProductInputChange} required style={{ border: '1px solid #ccc', padding: '6px', width: '100%' }} />

            <label htmlFor="newProductPrice">Price:</label>
            <input id="newProductPrice" name="price" type="number" step="0.01" value={newProduct.price || ''} onChange={handleNewProductInputChange} style={{ border: '1px solid #ccc', padding: '6px', width: '100%' }} />

            <label htmlFor="newProductStock">Current Stock:</label>
            <input id="newProductStock" name="stock" type="number" value={newProduct.stock} onChange={handleNewProductInputChange} required style={{ border: '1px solid #ccc', padding: '6px', width: '100%' }} />

            <label htmlFor="newProductMinStock">Minimum Stock:</label>
            <input id="newProductMinStock" name="min" type="number" value={newProduct.min} onChange={handleNewProductInputChange} required style={{ border: '1px solid #ccc', padding: '6px', width: '100%' }} />
          </div>
          <button type="submit" style={{ marginTop: '15px', padding: '8px 15px' }}>Add Product</button>
        </form>
      </div>


      <hr style={{ marginBottom: '20px' }}/>

      <h3>Recent Activity</h3>
      {logs.length > 0 ? (
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', maxHeight: '250px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
          {logs.map((log) => (
            <li key={log.id} style={{ marginBottom: '8px' }}>
              {log.description}
              <div style={{ fontSize: '0.8em', color: '#555' }}>
                ({new Date(log.created_at!).toLocaleString()})
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activity.</p>
      )}
    </div>
  );
};

export default Products;