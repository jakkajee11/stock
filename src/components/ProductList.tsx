import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

export type ProductListModel = {
  //key: string;
  id: string;
  name: string;
  available: number;
  unitPrice: number;
  categoryName: string;
  //createdAt: Date;
};

interface ProductListProps {
  data: ProductListModel[];
  onAdd: (id: string) => void;
}

export default function ProductList({ data, onAdd }: ProductListProps) {
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

    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: ProductListModel) => (
        <p>
          <Button
            onClick={() => handleAddToCart(id)}
            disabled={record.available <= 0}
          >
            {record.available > 0 ? 'Add to cart' : 'Out of stock!!!'}
          </Button>
        </p>
      ),
    },
  ];

  const handleAddToCart = (id: string) => {
    onAdd && onAdd(id);
  };

  return (
    <>
      <h2>Product</h2>
      <Table columns={columns} dataSource={data} size='large' />
    </>
  );
}
