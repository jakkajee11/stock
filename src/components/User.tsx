import { Button, Checkbox, Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { createCategory, createUser, getCategories, getUsers } from '../API';
import { CategoryPayload, UserPayload } from '../types';

export type UserModel = {
  id: string;
  username: string;
};
export default function User() {
  const [data, setData] = useState<UserModel[]>([]);
  const columns: ColumnsType<UserModel> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
  ];

  const prepareData = async () => {
    const res = await getUsers();

    if (res && res.data) setData(res.data);
  };

  const onFinish = async (values: UserPayload) => {
    console.log('Success:', values);
    const res = await createUser(values);
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
      <h2>User</h2>
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
          name='username'
          rules={[{ required: true, message: 'Please input username!' }]}
        >
          <Input />
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
