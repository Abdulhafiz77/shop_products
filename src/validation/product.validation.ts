import * as Joi from 'joi'

const product_add_joi = Joi.object({
    product_name: Joi.string().required(),
    type: Joi.string().required(),
    product_count: Joi.number().required()
   
}).unknown(true);

const id_joi = Joi.object({
    id: Joi.number().required()
}).unknown(true);


export{
    product_add_joi,
    id_joi
}