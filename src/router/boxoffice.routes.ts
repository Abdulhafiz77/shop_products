import * as express from "express";
import { BoxofficeController } from "..";
import { createValidator } from "express-joi-validation";
import { boxoffice_add_joi, id_joi } from "../validation";
//import { checkToken } from "../utils";
const validator = createValidator({ passError: true });

export const BoxofficeRoutes = (app: express.Application) => {
    app.get('/', BoxofficeController.getAll);
    app.post('/add', validator.body(boxoffice_add_joi), BoxofficeController.create);
    app.get('/:id', validator.params(id_joi), BoxofficeController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(boxoffice_add_joi), BoxofficeController.update);
    app.delete('/:id', validator.params(id_joi), BoxofficeController.delete);
};