import * as Joi from 'joi'

const boxoffice_add_joi = Joi.object({
    product_id: Joi.number().required(),
    salse_count: Joi.number().required()
   
}).unknown(true);


export{
    boxoffice_add_joi
}