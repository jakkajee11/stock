import { Col, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  addItemToCart,
  checkOut,
  getProducts,
  getShoppingCart,
  getUsers,
} from '../API';
import ProductList, { ProductListModel } from './ProductList';
import ShoppingCart, { ShoppingCartModel } from './ShoppingCart';
import { UserModel } from './User';

export default function Home() {
  const [user, setUser] = useState<UserModel>();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [products, setProducts] = useState<ProductListModel[]>([]);
  const [shoppingCart, setShoppingCart] = useState<
    ShoppingCartModel | undefined
  >();

  const prepareData = async () => {
    const [products, usr] = await Promise.all([getProducts(), getUsers()]);

    if (products && products.data) setProducts(products.data);

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
    <>
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

      <ShoppingCart data={shoppingCart} onCheckout={performCheckout} />
      <ProductList data={products} onAdd={addProductToCart} />
    </>
  );
}
