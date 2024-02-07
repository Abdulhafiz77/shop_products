import { ProductModel, pgPoolQuery } from "..";

export class ProductRepository {

    static async getAll(params: any): Promise<ProductModel[]> {

        const parameters: any = [];
        let pagination = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }


        const sql = `SELECT p.id,
                            p.product_name,
                            p.type,
                            p.create_at,
                            p.update_at,
                            w.id as warehouse,
                            b.id as boxoffice,
                            count(*) over() as count
                  FROM products as p
                  join warehouse w on w.id = p.product_id 
                  join box_office b on b.id = p.product_id ${pagination}`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }


    static async GetProductCount(params: any): Promise<ProductModel[]> {

        const parameters: any = [];
        let filter = '';

        if (params.computer_usage_id) {
            parameters.push(params.computer_usage_id);
            filter += ` and w.product_id = $${parameters.length}`;
        }

        const sql = `SELECT p.name,
                            p.id,
                            SUM(w.product_count) as product_counts
                  FROM warehouse w
                  join products p on p.id = w.product_id
                  WHERE 1=1 ${filter}
                  GROUP BY p.id, p.name`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }

    static async getById(id: number): Promise<ProductModel> {
        const sql = `SELECT p.id,
                            p.product_name, 
                            p.type,
                            p.create_at,
                            p.update_at
                        FROM products p
                            WHERE p.id = $1;`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: ProductModel): Promise<ProductModel> {

        const sql = `
        INSERT INTO products (product_name, type) VALUES ($1, $2) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.product_name, params.type ]);

        return result.rows[0];
    }

    static async update(params: ProductModel): Promise<ProductModel> {

        const sql = `UPDATE products SET 
        product_name = $1,
        type = $2,
        update_at = NOW() WHERE id = $3;`

        const result = await pgPoolQuery(sql,
            [params.product_name,
            params.type,
            params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `DELETE FROM products WHERE id = $1;`;
        await pgPoolQuery(sql, [id]);

    }
}