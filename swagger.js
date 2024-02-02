module.exports = {
    openapi: '3.0.3',
    info: {
      version: '1.0.0',
      title: 'Swagger UI for Shoping center',
      description: 'This documentation for products. Made by nodejs, expressjs, typescript. For authorization you have ti use token which can get from login api.',
      // termsOfService: 'https://example.com/',
      license: {
        name: 'MIT',
        url: 'https://openseource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:7070/api',
        description: 'Local server'
      },
      {
        url: 'http://188.166.66.95:90907070/api',
        description: 'Dev server'
      }
    ],
    tags: [],
    "paths": require('./swagger/path.js'),
    components: {
      schemas: require('./swagger/components'),
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          in: 'header',
          name: 'authorization',
          description: 'Enter your bearer token in the format **Bearer &lt;token>**'
        }
      }
    }
  };