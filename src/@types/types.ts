//=====================================
// ROUTES
//=====================================
export type RootStackParamList = {
  clients: {} | undefined;
  products: {} | undefined;
  settings: {} | undefined;
  sales: {} | undefined;
  home: {} | undefined;
  //-----------------
  createclient: {} | undefined;
  createproduct: {} | undefined;
  createsales: {} | undefined;
  //-----------------
  clientview: { id: string } | undefined;
  productview: { id: string } | undefined;
  salesview: { id: string } | undefined;
  //-----------------
  clientupdate: {} | undefined;
  productupdate: {} | undefined;
  //-----------------
  paymentsowing: {} | undefined;
  paymentspait: {} | undefined;
};
//=====================================
// ROUTES TYPES ALL TABLES
//=====================================
export type TypeClient = {
  id: string;
  firstName: string;
  surName: string;
  email: string;
  phone: string;
  address: string;
  created_at: Date;
  updated_at: Date;
};

export type TypeProducts = {
  id: string;
  name: string;
  describe: string;
  price: number;
  kg: Number;
  stock: number;
  image?: string;
  created_at: Date;
  updated_at: Date;
};

export type TypeSales = {
  id: string;
  clientID: string;
  productID: string;
  firstNameClient: string;
  surNameClient: string;
  phoneClient: string;
  nameProduct: string;
  priceProduct: number;
  totalPrice: number;
  deliveryDate: Date;
  paymentDate: Date;
  describe: string;
  status: "owing" | "pait";
  active: "yes" | "no";
  amount: number;
  additionalPrice: number;
  created_at: Date;
  updated_at: Date;
};

export type TypeSync = {
  id: string;
  itemID: string;
  method: "INSERT" | "UPDATE" | "DELETE";
  table: "client" | "product" | "sales";
  active: "yes" | "no";
  created_at: Date;
  updated_at: Date;
};
