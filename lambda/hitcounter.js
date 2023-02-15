const aws = require('aws-sdk')

exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  
  // create AWS CDK clients
  const dynamo = new aws.DynamoDB();
  const lambda = new aws.Lambda();
  
  // update dynamo entry for "path" with hits++
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: event.path } },
    UpdateExpression: 'Add hits :incr',
    ExpressionAttributeValues: {':incr': { N: '1' } }
  }).promise();
  
  // call dawnstream function and capture response
  const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event)
  }).promise();
  
  console.log('downstream respose:', JSON.stringify(resp, undefined, 2));
  
  // return response back to upstream caller
  return JSON.parse(resp.Payload);
};