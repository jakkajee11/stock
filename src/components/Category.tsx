import { Button, Checkbox, Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { createCategory, getCategories } from '../API';
import { CategoryPayload } from '../types';

export type CategoryModel = {
  id: string;
  name: string;
};
export default function Category() {
  const [data, setData] = useState<CategoryModel[]>([]);
  const columns: ColumnsType<CategoryModel> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const prepareData = async () => {
    const res = await getCategories();

    if (res && res.data) setData(res.data);
  };

  const onFinish = async (values: CategoryPayload) => {
    console.log('Success:', values);
    const res = await createCategory(values);
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
      <h2>Category</h2>
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
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <hr />
      <Table columns={columns} dataSource={data} size='large' />
    </>
  );
}
