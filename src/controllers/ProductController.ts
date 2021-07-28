import express, { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { ProductService } from '../services';
import mongoose from 'mongoose';
import errorGenerator from '../errors/errorGenerator';

const create = async (req: Request, res: Response, next: NextFunction) => {
  await check('name').not().isEmpty().run(req);
  await check('expirationDate').not().isEmpty().run(req);
  await check('quantity').not().isEmpty().run(req);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 400, errors: errors.array() });
    }
    const createdProduct = await ProductService.createProduct(req.body);
    return res.status(200).json({ product: createdProduct });
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  await check('id').not().isEmpty().run(req);
  await check('name').not().isEmpty().run(req);
  await check('expirationDate').not().isEmpty().run(req);
  await check('quantity').not().isEmpty().run(req);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 400, errors: errors.array() });
    }
    const updatedProduct = await ProductService.updateProduct(req.body);
    return res.status(200).json({ product: updatedProduct });
  } catch (err) {
    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  await check('id').not().isEmpty().run(req);
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, errors: errors.array() });
      }
      await ProductService.deleteProduct({ id });
      return res.status(200).json({ product: undefined });
    } else {
      return errorGenerator({ statusCode: 400 });
    }
  } catch (err) {
    next(err);
  }
};

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  await check('id').not().isEmpty().run(req);
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, errors: errors.array() });
      }
      const product = await ProductService.fetchProduct({ id });
      return res.status(200).json({ product });
    } else {
      return errorGenerator({ statusCode: 400 });
    }
  } catch (err) {
    next(err);
  }
};

const fetchList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.fetchProducts();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  update,
  remove,
  fetch,
  fetchList,
};
