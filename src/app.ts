const express = require('express')
const cors = require('cors')
import * as http from 'http'
import { routes } from '.';
import * as swaggerUi from 'swagger-ui-express'
const swagger = require('../swagger')

class ServerModule {

    private readonly host;
    private readonly port;
    private http;
    private app;

    constructor() {
        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.start();
    }

    private start() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Expose-Headers', 'original_name, Content-Disposition')
            next();
        })
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger, { "showExplorer": true }))
        routes(this.app)
        this.http.listen(
            this.port,
            console.log(`Server listening on: http://localhost:${this.port}`)
        )
    }

}

new ServerModule();
