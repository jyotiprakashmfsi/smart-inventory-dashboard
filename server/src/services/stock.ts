import { Request, Response } from "express";
import {
  createStocks,
  deleteStocks,
  listStocks,
  updateStocks,
} from "../repositories/stock";

export const createStock = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const stock = req.body.stock;
    const min = req.body.min;
    const price = req.body.price;
    const payload = {
      name,
      min,
      stock,
      price,
    };
    const p = await createStocks(payload);
    res.status(200).send({ msg: "created succesfully" });
  } catch (error) {
    return res.status(500).send({ msg: "Failed" });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const id = Number(req.params.id);
    const stock = req.body.stock;
    const min = req.body.min;
    const payload = {
      name,
    min,
    stock,
  };
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid stock ID" });
  }
  const response = await updateStocks(payload, id);
  res.status(200).send({ msg: "updated succesfully" });
  } catch (error) {
    return res.status(500).send({ msg: "Failed" });
  }
};

export const removeStock = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ msg: "Invalid stock ID" });
    }
    const response =await deleteStocks(id);
    res.status(201).send({ msg: "deleted succesfully" });
  } catch (error) {
    return res.status(500).send({ msg: "Failed" });
  }
};

export const listStock = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const response = await listStocks(name!);
    res.status(200).send({ msg: "fetched succesfully", data: response });
  } catch (error) {
    return res.status(500).send({ msg: "Failed" });
  }
};
