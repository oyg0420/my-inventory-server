import mongoose from 'mongoose';

export interface IProduct {
  image: { data: Buffer; contentType: string };
  name: string;
  barcode: string;
  expirationDate: Date;
  quantity: number;
  user: string;
}

export interface IProductCreateDTO {
  image?: { data: Buffer; contentType: string };
  name: string;
  barcode?: string;
  expirationDate: Date;
  quantity: number;
  user: string;
}

export interface IProductUpdateDTO {
  id: string;
  image?: { data: Buffer; contentType: string };
  name: string;
  barcode?: string;
  expirationDate: Date;
  quantity: number;
  user?: string;
}

export interface IProductDeleteDTO {
  id: string;
}

export interface IProductFetchDTO {
  id: string;
}

export interface IProductsFetchDTO {}
