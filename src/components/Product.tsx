import { Button, Form, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { createProduct, getCategories, getProducts } from '../API';
import { ProductPayload } from '../types';
import { CategoryModel } from './Category';
import { ProductListModel } from './ProductList';

export default function Product() {
  const [data, setData] = useState<ProductListModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const columns: ColumnsType<ProductListModel> = [
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'In Stock',
      dataIndex: 'available',
      key: 'available',
    },
  ];

  const prepareData = async () => {
    const [p, c] = await Promise.all([getProducts(), getCategories()]);

    if (p && p.data) setData(p.data);
    if (c && c.data) setCategories(c.data);
  };

  const categoryOptions = () =>
    categories?.map((c) => ({ value: c.id, label: c.name }));

  const handleChange = (value: string) => {
    console.log('value', value);
  };

  const onFinish = async (values: ProductPayload) => {
    console.log('Success:', values);
    const res = await createProduct(values);
    if (res && res.data) prepareData();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    prepareData();
  }, []);

  return (
    <>
      <h2>Product</h2>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Category'
          name='categoryId'
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={categoryOptions()}
          />
        </Form.Item>
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Amount'
          name='available'
          rules={[{ required: true, message: 'Please input amount!' }]}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label='Unit Price'
          name='unitPrice'
          rules={[{ required: true, message: 'Please input unit price!' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form>
      <hr />
      <Table columns={columns} dataSource={data} size='large' />
    </>
  );
}
