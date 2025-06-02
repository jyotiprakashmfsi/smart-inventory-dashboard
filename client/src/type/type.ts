export interface Stock{
    id: number,
    name: string,
    stock: number,
    min: number,
    price?: number,
    created_at?: string,
    updated_at?: string
}

export interface Log{ 
    id: number,
    description: string,
    created_at?: string
}