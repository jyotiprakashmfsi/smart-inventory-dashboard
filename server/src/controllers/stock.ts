import { Request, Response } from 'express';
import { createStock, listStock, removeStock, updateStock } from '../services/stock';

export const create = async(req: Request, res: Response): Promise<any> => {
    try {
        return createStock(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}


export const update = async(req: Request, res: Response): Promise<any> => {
        try {
        return updateStock(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}


export const remove = async(req: Request, res: Response): Promise<any> => {
        try {
        return removeStock(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}


export const list = async(req: Request, res: Response): Promise<any> => {
        try {
        return listStock(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}






