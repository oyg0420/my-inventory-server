import {
  IProduct,
  IProductCreateDTO,
  IProductDeleteDTO,
  IProductFetchDTO,
  IProductUpdateDTO,
} from '../interfaces/IProduct';
import Product from '../models/Product';

const createProduct = (data: IProductCreateDTO) => {
  const createdProduct = new Product(data);
  return createdProduct.save();
};

const updateProduct = async (data: IProductUpdateDTO) => {
  const updatedProduct: IProduct = await Product.findOneAndUpdate(
    { _id: data.id },
    {
      image: data.image,
      name: data.name,
      barcode: data.barcode,
      expirationDate: data.expirationDate,
      quantity: data.quantity,
    },
    { new: true },
  );
  return updatedProduct;
};

const fetchProduct = async (data: IProductFetchDTO) => {
  const product = await Product.findById(data.id);
  return product;
};

const fetchProducts = async () => {
  const products = await Product.find({});
  return products;
};

const deleteProduct = async (data: IProductDeleteDTO) => {
  await Product.findOneAndDelete({ _id: data.id });
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
};
