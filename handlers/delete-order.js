// handler for DELETE /orders route

'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()


function deleteOrder(id) {
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
            return docClient.delete({
                TableName: 'pizza-orders',
                Key: {
                    orderId: id
                }
            }).promise()
            .then(result => {
                console.log(`Order ${id} successfully deleted`)
            })
        })
        .catch((deleteError) => {
            console.log(`Error Deleting Order ${id}: ${deleteError}`)
            throw deleteError
        })
}

// export handler
module.exports = deleteOrder