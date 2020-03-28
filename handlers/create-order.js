// handler for POST /orders route

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const { uuid } = require('uuidv4')
const rp = require('minimal-request-promise')

function createOrder(request) {
    // validate order object passed in
    if (!request || !request.pizza || !request.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }

    return rp.post('https://some-like-it-hot.effortless-serverless.com/delivery', {
        headers: {
            "Authorization": "aunt-marias-pizzeria-1234567890",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.34pm',
            pickupAddress: 'Aunt Maria Pizzeria',
            deliveryAddress: request.address,
            webhookUrl: 'https://6ihplbvik4.execute-api.us-east-1.amazonaws.com/latest/delivery'
        })
    })
        .then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return docClient.put({
                TableName: 'pizza-orders',
                Item: {
                    // orderId: uuid(),
                    orderId: response.deliveryId,
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
        })
    
}

// export handler
module.exports = createOrder