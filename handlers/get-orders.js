const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function getOrders(options) {
    // no status supplied
    let orderStatus = null;
    if (typeof options.status === 'undefined') {
        orderStatus = "pending"
    } else {
        orderStatus = options.status
    }
    // no orderId supplied
    if (typeof options.orderId === 'undefined') {
        return docClient.scan({
            TableName: 'pizza-orders',
            FilterExpression: "#st = :s",
            ExpressionAttributeNames: {
                "#st": "orderStatus"
            },
            ExpressionAttributeValues: {
                ":s" : orderStatus
            }
        }).promise()
        .then(result => result.Items)
    }

    // get a specific order
    return docClient.get({
        TableName: 'pizza-orders',
        Key: {
            orderId: orderId
        }
    }).promise()
    .then(result => result.Item)
}

module.exports = getOrders