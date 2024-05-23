import { Request, Response} from 'express'
import { compras } from '../models/compras'


export const getCompras = async (req: Request , res: Response) => {
  const listCompra = await compras.findAll();
  res.json({
    listCompra
  })
}