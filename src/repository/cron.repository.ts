import { pgPoolQuery } from '..';
// products.ts


export class ProductManager {
 static async deleteExpiredProducts(): Promise<void> {
        const sql = `
          DELETE FROM products
          WHERE exit_time <= NOW()
        `;
        await pgPoolQuery(sql);
    }
  }
  