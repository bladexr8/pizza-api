// handler for PUT /orders route
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function updateOrder(id, updates) {
    // validate orderId and updates object passed in
    if (!id || !updates.pizza || !updates.address) {
        throw new Error('To update a pizza order please orderId and details to be updated')
    }

    // update DynamoDb
    return docClient.get({
        TableName: 'pizza-orders',
        Key: {
            orderId: id
        }
    }).promise()
        .then(result => result.Item)
        .then(item => {
            if (item.orderStatus !== 'pending') {
                throw new Error('Order status is not pending')
            }
        })
        .then(() => {
            return docClient.update({
                TableName: 'pizza-orders',
                Key: {
                    orderId: id
                },
                UpdateExpression: 'set pizza = :p, address=:a',
                ExpressionAttributeValues: {
                    ':p': updates.pizza,
                    ':a': updates.address
                },
                ReturnValues: 'ALL_NEW'
            }).promise()
            .then(result => {
                console.log(`Order ${id} updated successfully`)
                return result.Attributes
            })
        })
        .catch((updateError) => {
            console.log(`Error Updating Order ${id}: ${updateError}`)
            throw updateError
        })
}

// export handler
module.exports = updateOrder