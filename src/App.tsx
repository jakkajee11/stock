import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, Row, Select } from 'antd';
import ShoppingCart, { ShoppingCartModel } from './components/ShoppingCart';
import ProductList, { ProductListModel } from './components/ProductList';
import {
  addItemToCart,
  checkOut,
  getProducts,
  getShoppingCart,
  getUsers,
} from './API';
import Category from './components/Category';
import Product from './components/Product';
import User, { UserModel } from './components/User';

function App() {
  // todo: implemnt user login
  const [user, setUser] = useState<UserModel>();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [products, setProducts] = useState<ProductListModel[]>([]);
  const [shoppingCart, setShoppingCart] = useState<
    ShoppingCartModel | undefined
  >();

  const prepareData = async () => {
    const [products, usr] = await Promise.all([
      getProducts(),
      //getShoppingCart(user?.id),
      getUsers(),
    ]);

    if (products && products.data) setProducts(products.data);
    //if (carts && carts.data) setShoppingCart(carts.data);
    if (usr && usr.data) {
      setUsers(usr.data);
      const user = usr.data[0];
      setUser(user);
      const carts = await getShoppingCart(user?.id);
      if (carts && carts.data) setShoppingCart(carts.data);
    }
  };

  const loadShoppingCart = async (userId: string) => {
    const res = await getShoppingCart(userId);
    if (res && res.data) {
      setShoppingCart(res.data);
    }
  };

  const addProductToCart = async (productId: string) => {
    const res = await addItemToCart({
      userId: user?.id as string,
      productId,
      amount: 1,
    });

    if (res && res.data) loadShoppingCart(user?.id as string);
  };

  const performCheckout = async () => {
    console.log('checkout', user?.id);
    const res = await checkOut(user?.id as string);

    if (res && res.data) prepareData();
  };

  const createUserOption = () => ({ value: user?.id, label: user?.username });

  const userOptions = () =>
    users?.map((c) => ({ value: c.id, label: c.username }));

  const setCurrentUser = (id: string) => {
    console.log('user', id);
    const user = users.find((u) => u.id === id);
    if (user) {
      setUser(user);
      loadShoppingCart(user.id);
    }
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <div className='App'>
      <Row>
        <Col>
          <label>User: </label>
          <Select
            value={user?.id}
            style={{ width: 120 }}
            onChange={setCurrentUser}
            options={userOptions()}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ShoppingCart data={shoppingCart} onCheckout={performCheckout} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductList data={products} onAdd={addProductToCart} />
        </Col>
      </Row>

      <p>Category</p>
      <Category />
      <hr />
      <p>Product</p>
      <Product />
      <p>User</p>
      <User />
    </div>
  );
}

export default App;
