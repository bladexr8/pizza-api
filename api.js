'use strict'

// initialise Claudia API Builder
const Api = require('claudia-api-builder');
const api = new Api();

// API handlers
const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')

// default handler GET /
api.get('/', () => 'Welcome to the Pizza API')

// route GET /pizzas
api.get('/pizzas', () => {
    return getPizzas()
})

// route GET /pizzas/{id}
api.get('/pizzas/{id}', (request) => {
    // request pizza for Id given in route
    return getPizzas(request.pathParams.id)
}, {
    // customize error status code
    error: 404
})

// route POST /orders
api.post('/orders', (request) => {
    return createOrder(request.body)
}, {
    // customise error and success return codes
    success: 201,
    error: 400
})

// route PUT /orders
api.put('/orders/{id}', (request) => {
    return updateOrder(request.pathParams.id, request.body)
}, {
    // customise error and success return codes
    success: 200,
    error: 500
})

// route DELETE /orders
api.delete('/orders/{id}', (request) => {
    return deleteOrder(request.pathParams.id)
}, {
    // customise error and success return codes
    success: 200,
    error: 500
})

module.exports = api