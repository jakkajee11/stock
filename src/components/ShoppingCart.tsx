import { Space, Table, Button, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';

export type ProductModel = {
  id: string;
  name: string;
  unitPrice: number;
  totalPrice: number;
  amount: number;
  available: number;
};

export type ShoppingCartModel = {
  userId: string;
  username: string;
  totalItems: number;
  totalPrice: number;
  products: ProductModel[];
};

interface ShoppingCartProps {
  data: ShoppingCartModel | undefined;
  onCheckout: () => void;
}
export default function ShoppingCart({ data, onCheckout }: ShoppingCartProps) {
  const columns: ColumnsType<ProductModel> = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (p: number) => <p>{p.toFixed(2)}</p>,
    },
  ];

  const handleCheckout = () => {
    onCheckout && onCheckout();
  };

  return (
    <div>
      <Space direction='vertical'>
        <h3>Shopping Cart</h3>

        <Table
          columns={columns}
          dataSource={data?.products}
          size='middle'
          pagination={false}
        />
        <p>{data?.totalItems} item(s) </p>
        <p>Total price: {data?.totalPrice.toFixed(2)} </p>
        {data && data.products.length > 0 && (
          <Popconfirm
            title='Checkout'
            description='Proceed checkout?'
            onConfirm={handleCheckout}
            okText='Yes'
          >
            <Button type='primary'>Checkout</Button>
          </Popconfirm>
        )}
      </Space>
    </div>
  );
}
