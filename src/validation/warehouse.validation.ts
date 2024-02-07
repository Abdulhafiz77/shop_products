import * as Joi from 'joi'

const warehouse_add_joi = Joi.object({
    product_id: Joi.number().required(),
    entir_price: Joi.number().required(),
    exit_price: Joi.number().required(),
    begin_time: Joi.date().required(),
    end_time: Joi.date().required()
   
}).unknown(true);

export{
    warehouse_add_joi
}