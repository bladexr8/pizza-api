// handler for GET /pizzas route
const pizzas = require('../data/pizzas.json')

function getPizzas(pizzaId) {
    // if no pizzaId sent, return all Pizzas
    if (!pizzaId) {
        return pizzas
    }

    // if pizzaId sent, find it in array and send it back
    const pizza = pizzas.find((pizza) => {
        return pizza.id == pizzaId
    })

    // if pizza found, return it
    if (pizza) {
        return pizza
    }

    // if pizza not found throw an error
    throw new Error('The pizza you requested was not found')
}

// export handler
module.exports = getPizzas