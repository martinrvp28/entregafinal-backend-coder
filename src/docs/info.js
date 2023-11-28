export const info = {

    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce App',
            version: '1.0.0',
            description: 'Ecommerce backend App'
        },
        servers: [
            {
                url: 'https://entregafinal-backend-coder-production.up.railway.app'
            }
    ]
    },
    apis: ['./src/docs/*.yml']
};