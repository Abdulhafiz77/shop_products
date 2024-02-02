import { BaseModel } from "./base.modul";

export interface ProductModel extends BaseModel {
 product_name: string,
 type: string,
 entir_price: number
 exit_price: number
 begin_time: Date, 
 end_time: Date,
}