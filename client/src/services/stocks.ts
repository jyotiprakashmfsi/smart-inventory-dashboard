import type { Stock } from "../type/type";

const base = "http://localhost:3000"
export const createStock = async (data: Omit<Stock, "id" | "created_at" | "updated_at">) => {
  console.log(data)
  const response = await fetch(`${base}/stocks`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create stock");
  }
  return response.json();
};

export const listStock = async () => {
  const response = await fetch(`${base}/stocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(base);
  if (!response.ok) {
    throw new Error("Failed to fetch stocks");
  }
  return data;
};

export const updateStock = async (id: number, data: Omit<Stock, "id" | "created_at" | "updated_at">) => {
  const response = await fetch(`${base}/stocks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update stock");
  }
  return response.json();
};
export const deleteStock = async (id: number) => {
  const response = await fetch(`${base}/stocks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete stock");
  }
  return response.json();
};
