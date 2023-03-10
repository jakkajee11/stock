export type AddToShoppingCartPayload = {
  userId: string;
  productId: string;
  amount: number;
};

export type ProductPayload = {
  id: string;
  name: string;
  unitPrice: number;
  available: number;
  categoryId: string;
};

export type CategoryPayload = {
  id: string;
  name: string;
};

export type UserPayload = {
  id: string;
  username: string;
};
