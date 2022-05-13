import { SqliteError } from 'better-sqlite3';
import { IEmbDeal } from 'types/common';

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
