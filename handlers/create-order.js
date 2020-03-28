// handler for POST /orders route

function createOrder(order) {
    // validate order object passed in
    if (!order || !order.pizzaId || !order.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }

    // for now return empty object
    return {
        message: `Order was successfully created`
    }
}

// export handler
module.exports = createOrder