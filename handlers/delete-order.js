// handler for DELETE /orders route

function deleteOrder(id) {
    // validate order object passed in
    if (!id) {
        throw new Error('To delete an order please provide the order Id')
    }

    // for now return empty object
    return {
        message: `Order ${id} was successfully deleted`
    }
}

// export handler
module.exports = deleteOrder