import axios from 'axios';
import { CategoryModel } from './components/Category';
import { ProductModel } from './components/ShoppingCart';
import {
  AddToShoppingCartPayload,
  CategoryPayload,
  ProductPayload,
  UserPayload,
} from './types';

const instance = axios.create({
  baseURL: 'https://localhost:7142/api',
});

const getProducts = async () => await instance.get('products');
const createProduct = async (payload: ProductPayload) =>
  await instance.post('products', payload);

const addItemToCart = async (payload: AddToShoppingCartPayload) =>
  await instance.post('shoppingcarts', payload);

const getShoppingCart = async (userId: string) =>
  await instance.get(`shoppingcarts/${userId}`);
const checkOut = async (userId: string) =>
  await instance.post(`shoppingcarts/checkout/${userId}`, { userId: userId });

const getCategories = async () => instance.get('categories');
const createCategory = async (payload: CategoryPayload) =>
  await instance.post('categories', payload);
const getUsers = async () => await instance.get('users');
const createUser = async (payload: UserPayload) =>
  await instance.post('users', payload);

export {
  getProducts,
  createProduct,
  addItemToCart,
  checkOut,
  getShoppingCart,
  getCategories,
  createCategory,
  getUsers,
  createUser,
};
