import { ProductModel } from './../models/product.modul';
import { pgPoolQuery } from "..";

export class ProductRepository {

    static async getAll(params: string): Promise<ProductModel[]> {

        const parameters: any = [];
        const sql = `SELECT id, product_name, type, entir_price, exit_price, begin_time, end_time, create_at, update_at, exit_price - entir_price
        AS "benifits" FROM products;`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }
    static async getById(id: number): Promise<ProductModel> {
        const sql = `SELECT 
        products.product_name, 
        products.type,
        products.entir_price,
        products.exit_price,
        products.begin_time,
        products.end_time,
        products.create_at,
        products.update_at,
        products.exit_price - products.entir_price AS "benifts"
        FROM products 
        WHERE products.id = $1;`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: ProductModel): Promise<ProductModel> {

        const sql = `
        INSERT INTO products (product_name, type, entir_price, exit_price, begin_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.product_name, params.type, params.entir_price, params.exit_price, params.begin_time, params.end_time ]);

        return result.rows[0];
    }

    static async update(params: ProductModel): Promise<ProductModel> {

        const sql = `UPDATE products SET 
        product_name = $1,
        type = $2,
        entir_price = $3,
        exit_price = $4,
        begin_time = $5,
        end_time = $6,
        update_at = NOW() WHERE id = $7;`

        const result = await pgPoolQuery(sql,
            [params.product_name,
            params.type,
            params.entir_price, 
            params.exit_price,
            params.begin_time,
            params.end_time,
           
            params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `DELETE FROM products WHERE id = $1;`;
        await pgPoolQuery(sql, [id]);

    }
}