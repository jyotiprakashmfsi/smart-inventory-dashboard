import { Request, Response } from 'express';
import { createLogs, listLogs } from '../repositories/log';

export const createLog = async(req: Request, res: Response) => {
    try {
         const descripion= req.body.description;
         await createLogs({description: descripion})
         res.status(200).send({msg: "created successfully"})
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}


export const listLog = async(req: Request, res: Response) => {
    try {
        const data= await listLogs()
        res.status(200).send({msg: "fetched successfully", data: data})
    } catch (error) {
        return res.status(500).send({msg: "Failed"})
    }
}
