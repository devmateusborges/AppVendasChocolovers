//=====================================
// ROUTES
//=====================================
export type RootStackParamList = {
  clients: {} | undefined;
  products: {} | undefined;
  settings: {} | undefined;
  storages: {} | undefined;
  home: {} | undefined;
  createclient: {} | undefined;
  createproduct: {} | undefined;
  createstorage: {} | undefined;
  clientview: { id: string } | undefined;
  productview: { id: string } | undefined;
  storageview: { id: string } | undefined;
  clientupdate: {} | undefined;
  productupdate: {} | undefined;
  paymentsowing: {} | undefined;
  paymentspait: {} | undefined;

  exportdata: {} | undefined;
  importdata: {} | undefined;
  exemple: {} | undefined;
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
  updeted_at?: Date;
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
  updeted_at: Date;
};

export type TypeStorages = {
  id: string;
  clientID: string;
  productID: string;
  amount: number;
  description: string;
  priceOne: number;
  totalPrice: number;
  deliveryDate: Date;
  paymentDate: Date;
  active: false;
  created_at: Date;
  updeted_at: Date;
};

export type TypeStorageTemp = {
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
  created_at: Date;
  updeted_at: Date;
};
