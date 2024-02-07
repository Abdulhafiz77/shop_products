export * from './product.routes'
export * from './boxoffice.routes'
export * from './warehouse.routes'
import express from 'express'
import { ProductRoutes } from './product.routes';
import { WarehouseRoutes } from './warehouse.routes';
import { BoxofficeRoutes } from './boxoffice.routes';


function nestedRoutes(this: any, path, configure) {
    const router = express.Router({ mergeParams: true });
    this.use(path, router);
    configure(router);
    return router;
}

express.application['prefix'] = nestedRoutes;
express.Router['prefix'] = nestedRoutes;

const expressRouter = express.Router({ mergeParams: true });

export const routes = (app: express.Application) => {

    expressRouter['prefix']('/api', app => {

        app['prefix']('/products', data => {
            ProductRoutes(data)
        });
        app['prefix']('/warehouse', data => {
            WarehouseRoutes(data)
        });
        app['prefix']('/boxoffice', data => {
            BoxofficeRoutes(data)
        });

    })

    app.use(expressRouter);
};