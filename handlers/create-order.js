// handler for POST /orders route

const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const docClient = new AWS.DynamoDB.DocumentClient()
const { uuid } = require('uuidv4')
const rp = require('minimal-request-promise')

function createOrder(request) {
    console.log('[INFO] Save an Order', request)

    // get User Data
    const userData = request.context.authorizer.claims
    console.log('User data', userData)

    // use an address from request body
    let userAddress = request.body && request.body.address
    if (!userAddress) {
        userAddress = JSON.parse(userData.address).formatted
    }

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
            deliveryAddress: userAddress,
            webhookUrl: 'https://6ihplbvik4.execute-api.us-east-1.amazonaws.com/latest/delivery'
        })
    })
        .then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return docClient.put({
                TableName: 'pizza-orders',
                Item: {
                    // orderId: uuid(),
                    cognitoUsername: userAddress['cognito:username'],
                    orderId: response.deliveryId,
                    pizza: request.body.pizza,
                    address: userAddress,
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