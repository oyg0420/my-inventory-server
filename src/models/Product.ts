import mongoose from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const ProductSchema = new mongoose.Schema<IProduct>({
  image: {
    data: Buffer,
    contentType: String,
  },
  name: { type: String, require: true },
  barcode: String,
  expirationDate: { type: Date, require: true },
  quantity: { type: Number, require: true },

  user: { type: mongoose.Types.ObjectId, require: true, ref: 'user' },
});

const Product = mongoose.model<IProduct>('product', ProductSchema);

export default Product;
