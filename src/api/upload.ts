import { SqliteError } from 'better-sqlite3';
import { IAzOrdersShipment, IEmbDeal } from 'types/common';

const sql3 = require('better-sqlite3');
const db = new sql3('memory.db');
const csv = require('csv-parser');
const fs = require('fs');

export const uploadEmbDeal = async (
  filePath: string,
): Promise<IEmbDeal[] | SqliteError> => {
  return new Promise<IEmbDeal[] | SqliteError>((resolve) => {
    const results: IEmbDeal[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (row: IEmbDeal) => {
        try {
          db.prepare(
            `INSERT OR REPLACE INTO embDeal ( total, [order], created, is_verified, receipt, tracking, note, description, sku, price, quantity ) 
             VALUES (
                 ${row.total},
                 '${row.order}',
                 '${row.created}', 
                 '${row.is_verified}', 
                 '${row.receipt}',
                 '${row.tracking}', 
                 '${row.note}', 
                 '${row.description}',
                 '${row.sku}',
                 ${row.price}, 
                 ${row.quantity});`,
          ).run();
          results.push(row);
        } catch (err: any) {
          return resolve(err);
        }
      })
      .on('end', () => resolve(results));
  });
};

function mapAzOrdersShipment(row: any): IAzOrdersShipment {
  const trackingField = row['Carrier Name & Tracking Number'];
  return {
    orderDate: row['Order Date'],
    orderId: row['Order ID'],
    paymentInstrumentType: row['Payment Instrument Type'],
    website: row['Website'],
    purchaseOrderNumber: row['Purchase Order Number'],
    orderingCustomerEmail: row['Ordering Customer Email'],
    shipmentDate: row['Shipment Date'],
    shippingAddressName: row['Shipping Address Name'],
    shippingAddressStreet1: row['Shipping Address Street 1'],
    shippingAddressStreet2: row['Shipping Address Street 2'],
    shippingAddressCity: row['Shipping Address City'],
    shippingAddressState: row['Shipping Address State'],
    shippingAddressZip: row['Shipping Address Zip'],
    orderStatus: row['Order Status'],
    carrierNameTrackingNumber: trackingField,
    subtotal: row['Subtotal'].replace('$', '') | 0,
    shippingCharge: row['Shipping Charge'].replace('$', '') | 0,
    taxBeforePromotions: row['Tax Before Promotions'].replace('$', '') | 0,
    totalPromotions: row['Total Promotions'].replace('$', '') | 0,
    taxTotal: row['Tax Charged'].replace('$', '') | 0,
    totalCharger: row['Total Charged'].replace('$', '') | 0,
    buyerName: row['Buyer Name'],
    groupName: row['Group Name'],
    trackingNumber: trackingField
      ? trackingField.substring(
          trackingField.indexOf('(') + 1,
          trackingField.lastIndexOf(')'),
        )
      : null,
  };
}

export const uploadAzOrdersShipment = async (
  filePath: string,
): Promise<IAzOrdersShipment[] | SqliteError> => {
  return new Promise<IAzOrdersShipment[] | SqliteError>((resolve) => {
    const results: IAzOrdersShipment[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (row: any) => {
        const rowData: IAzOrdersShipment = mapAzOrdersShipment(row);
        try {
          db.prepare(
            `INSERT INTO azOrdersShipment
            (orderDate, orderId, paymentInstrumentType, website, purchaseOrderNumber, orderingCustomerEmail, shipmentDate, shippingAddressName, shippingAddressStreet1, shippingAddressStreet2, shippingAddressCity, shippingAddressState, shippingAddressZip, orderStatus, carrierNameTrackingNumber, subtotal, shippingCharge, taxBeforePromotions, totalPromotions, taxTotal, totalCharger, buyerName, groupName, trackingNumber)
            VALUES(
              '${rowData.orderDate}',
              '${rowData.orderId}',
              '${rowData.paymentInstrumentType}',
              '${rowData.website}',
              '${rowData.purchaseOrderNumber}',
              '${rowData.orderingCustomerEmail}',
              '${rowData.shipmentDate}',
              '${rowData.shippingAddressName}',
              '${rowData.shippingAddressStreet1}',
              '${rowData.shippingAddressStreet2}',
              '${rowData.shippingAddressCity}',
              '${rowData.shippingAddressState}',
              '${rowData.shippingAddressZip}',
              '${rowData.orderStatus}',
              '${rowData.carrierNameTrackingNumber}',
              ${rowData.subtotal},
              ${rowData.shippingCharge},
              ${rowData.taxBeforePromotions},
              ${rowData.totalPromotions},
              ${rowData.taxTotal},
              ${rowData.totalCharger},
              '${rowData.buyerName}',
              '${rowData.groupName}',
              '${rowData.trackingNumber}');`,
          ).run();
          results.push(rowData);
        } catch (err: any) {
          console.log('rowData:::', rowData);
          return resolve(err);
        }
      })
      .on('end', () => resolve(results));
  });
};
