import { WarehouseModel, pgPoolQuery } from "..";

export class WarehouseRepository {

    static async getAll(params: any): Promise<WarehouseModel[]> {

        const parameters: any = [];
        let pagination = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }


        const sql = `SELECT w.id,
                            w.product_id,
                            w.entir_price,
                            w.exit_price,
                            w.begin_time,
                            w.end_time,
                            w.status,
                            w.create_at,
                            w.update_at,
                            count(*) over() as count
                  FROM warehouse as w ${pagination}`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }

    static async getById(id: number): Promise<WarehouseModel> {
        const sql = `SELECT w.id,
                            w.product_id,
                            w.entir_price,
                            w.exit_price,
                            w.begin_time,
                            w.end_time,
                            w.status,
                            w.create_at,
                            w.update_at,
                        FROM warehouse w
                            WHERE w.id = $1;`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: WarehouseModel): Promise<WarehouseModel> {

        const sql = `
        INSERT INTO products (product_id, entir_price, exit_price, begin_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
        const result = await pgPoolQuery(sql, [params.product_id, params.entir_price, params.exit_price, params.begin_time, params.end_time ]);

        return result.rows[0];
    }

    static async update(params: WarehouseModel): Promise<WarehouseModel> {

        const sql = `UPDATE products SET 
        product_id = $1,
        entir_price = $2,
        exit_price = $3,
        begin_time = $4,
        end_time = $5,
        update_at = NOW() WHERE id = $6;`

        const result = await pgPoolQuery(sql,
            [params.product_id,
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