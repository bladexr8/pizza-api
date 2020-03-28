// handler for PUT /orders route

function updateOrder(id, updates) {
    // validate orderId and updates object passed in
    if (!id || !updates) {
        throw new Error('To update a pizza order please orderId and details to be updated')
    }

    // for now return empty object
    return {
        message: `Order ${id} was successfully updated`
    }
}

// export handler
module.exports = updateOrder