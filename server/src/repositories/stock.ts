import prismaClient from "../config/dbConn"
import { Stock } from "../type/type"

export const createStocks=async (payload: Stock) => {
    return await prismaClient.stock.create({
        data: payload
    })
}

export const updateStocks =async(payload: Stock, id: number)=>{
    return await prismaClient.stock.update({
        where: {id},
        data: payload
    })
}

export const listStocks =async (name?: string)=> {
    return await prismaClient.stock.findMany({
        where: {
            name: {
                contains: name,
            }
        },
        select: {
            id: true,
            name: true,
            stock: true,
            min: true,
            price: true,
            created_at: true,
            updated_at: true
        },
        orderBy: { name: 'asc' }
    })
}

export const deleteStocks =async (id: number)=>{
    return await prismaClient.stock.delete({
        where: {id}
    })
}