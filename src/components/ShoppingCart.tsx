import { Space, Table, Button } from 'antd';
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
          //   summary={(data: any) => {
          //     const items =
          //       data && data.length > 0
          //         ? data?.reduce(
          //             (c: ProductModel, p: ProductModel) => c.amount + p.amount
          //           )
          //         : 0;
          //     const totalPrice =
          //       data && data.length > 0
          //         ? data?.reduce(
          //             (c: ProductModel, p: ProductModel) =>
          //               c.amount * c.unitPrice + p.amount * p.amount
          //           )
          //         : 0;
          //     return (
          //       <Table.Summary fixed>
          //         <Table.Summary.Row>
          //           <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
          //           <Table.Summary.Cell index={1}>{items}</Table.Summary.Cell>
          //           <Table.Summary.Cell index={2}>
          //             {totalPrice ? totalPrice : 0}
          //           </Table.Summary.Cell>
          //         </Table.Summary.Row>
          //       </Table.Summary>
          //     );
          //   }}
        />
        <p>{data?.totalItems} item(s) </p>
        <p>Total price: {data?.totalPrice.toFixed(2)} </p>
        {data && data.products.length > 0 && (
          <Button type='primary' onClick={handleCheckout}>
            Checkout
          </Button>
        )}
      </Space>
    </div>
  );
}
