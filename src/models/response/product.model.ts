import { BaseModel } from "./base.modul";

export interface ProductModel extends BaseModel {
    product_name: string,
    type: string,
    product_count: number;
    
    product_counts?: number
}