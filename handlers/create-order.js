// handler for POST /orders route

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const { uuid } = require('uuidv4')

function createOrder(request) {
    // validate order object passed in
    if (!request || !request.pizza || !request.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }

    // for now return empty object
    return docClient.put({
        TableName: 'pizza-orders',
        Item: {
            orderId: uuid(),
            pizza: request.pizza,
            address: request.address,
            orderStatus: 'pending'
        }
    }).promise()
    .then((res) => {
        console.log('Order is saved!', res)
        return res
    })
    .catch((saveError) => {
        console.log(`Error Saving Order: (${saveError})`)
        throw saveError
    })
}

// export handler
module.exports = createOrder