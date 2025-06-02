import { Request, Response } from 'express';
import { createLog, listLog } from '../services/log';

export const create = async(req: Request, res: Response): Promise<any> => {
    try {
        return  await createLog(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}


export const list = async(req: Request, res: Response): Promise<any> => {
    try {
        return await listLog(req, res);
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}

