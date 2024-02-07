import { BaseModel } from "./base.modul";

export interface WarehouseModel extends BaseModel {
    product_id: number,
    entir_price: number,
    exit_price: number,
    product_count: number,
    begin_time: Date,
    end_time: Date
}