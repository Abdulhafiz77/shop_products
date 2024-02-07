import * as express from "express";
import { WarehouseController } from "..";
import { createValidator } from "express-joi-validation";
import { warehouse_add_joi, id_joi } from "../validation";
//import { checkToken } from "../utils";
const validator = createValidator({ passError: true });

export const WarehouseRoutes = (app: express.Application) => {
    app.get('/', WarehouseController.getAll);
    app.post('/add', validator.body(warehouse_add_joi), WarehouseController.create);
    app.get('/:id', validator.params(id_joi), WarehouseController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(warehouse_add_joi), WarehouseController.update);
    app.delete('/:id', validator.params(id_joi), WarehouseController.delete);
};