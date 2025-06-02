import prismaClient from "../config/dbConn"

export const createLogs= async(payload: {description: string}) => {
    return await prismaClient.warehouseLog.create({
        data: payload
    })
}

export const listLogs = async()=> {
    return await prismaClient.warehouseLog.findMany({
        select: {
            id: true,
            description: true,
            created_at: true
        },
        orderBy: { created_at: 'desc' },
    })
}