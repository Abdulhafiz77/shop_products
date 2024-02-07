import { pgPoolQuery, BoxofficeModel } from "..";

export class BoxofficeRepository {

    static async getAll(params: any): Promise<BoxofficeModel[]> {

        const parameters: any = [];
        let pagination = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        const sql = `select b.id,
                            b.product_id,
                            b.sales_count,
                            b.created_at,
                            count(*) over() as count
                    from box_office as b ${pagination};`

        const result = await pgPoolQuery(sql, parameters);

        return result.rows
    }

    static async getById(id: number): Promise<BoxofficeModel> {
        const sql = `select b.id,
                            b.product_id,
                            b.sales_count,
                            b.created_at,
                            from public.branch b
                        where b.id = $1`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }

    static async create(params: BoxofficeModel): Promise<BoxofficeModel> {
        const sql = `
                INSERT INTO box_office (product_id, sales_count) VALUES ($1, $2) RETURNING *;`
        const result = await pgPoolQuery(sql,
            [params.product_id, params.sales_count]);

        return result.rows[0];
    }

    static async update(params: BoxofficeModel): Promise<BoxofficeModel> {

        const sql = `update box_office set  product_id = $1,
                                        sales_count = $2,
                                        where id = $3 RETURNING *;`
        const result = await pgPoolQuery(sql,
            [params.product_id, params.sales_count, params.id]);

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `DELETE FROM box_office WHERE id = $1;`;
        await pgPoolQuery(sql, [id]);

    }

}