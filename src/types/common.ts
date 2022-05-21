export enum Reports {
  emb = 'EMB',
  AzOrdersShipment = 'Orders and shipments',
}

export interface IEmbDeal {
  total: number;
  order: string;
  created: string;
  is_verified: string;
  receipt: string;
  tracking: string;
  note: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface IAzOrdersShipment {
  orderDate: string; // Order Date
  orderId: string; //Order ID
  paymentInstrumentType: string; //Payment Instrument Type
  website: string; //Website
  purchaseOrderNumber?: string; //Purchase Order Number
  orderingCustomerEmail: string; //Ordering Customer Email
  shipmentDate?: string; //Shipment Date
  shippingAddressName?: string; //Shipping Address Name
  shippingAddressStreet1?: string; //Shipping Address Street 1
  shippingAddressStreet2?: string; //Shipping Address Street 2
  shippingAddressCity?: string; //Shipping Address City
  shippingAddressState?: string; //Shipping Address State
  shippingAddressZip?: string; //Shipping Address Zip
  orderStatus?: string; //Order Status
  carrierNameTrackingNumber?: string; //Carrier Name & Tracking Number
  subtotal: number; //Subtotal
  shippingCharge?: number; //Shipping Charge
  taxBeforePromotions?: number; //Tax Before Promotions
  totalPromotions?: number; //Total Promotions
  taxTotal?: number; //Tax Charged
  totalCharger?: number; //Total Charged
  buyerName: string; //Buyer Name
  groupName?: string; //Group Name
  trackingNumber?: string;
}
