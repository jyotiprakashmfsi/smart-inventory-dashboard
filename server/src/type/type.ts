export interface Stock{
    name: string,
    stock: number,
    min: number,
    price?: number,
    created_at?: string,
    updated_at?: string
}

export interface Log{
    description: string,
    created_at?: string
}