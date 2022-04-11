const options = {
  definition: {
    openapi: '3.0.0',

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],

    info: {
      title: 'Notes API',
      version: '0.1.0',
      description: 'create, update, delete, get notes with JWT',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Luis Barra',
        url: 'https://luisbarra.cl',
        email: 'luisbarra454@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
        variables: {
          port: {
            default: 5000
          }
        }
      }
    ]
  },
  apis: ['./src/routes/*.route.ts']
};


export { options };