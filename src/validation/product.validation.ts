import * as Joi from 'joi'

const product_add_joi = Joi.object({
    product_name: Joi.string().required(),
    type: Joi.string().required(),
    entir_price: Joi.number().required(),
    exit_price: Joi.number().required(), 
    begin_time: Joi.date().required(),
    end_time: Joi.date().required()
}).unknown(true);

const id_joi = Joi.object({
    id: Joi.number().required()
}).unknown(true);


export{
    product_add_joi,
    id_joi
}