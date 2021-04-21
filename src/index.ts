import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';


(async () => {
    const client = new DynamoDBClient({
        region: "local",
        endpoint: "http://localhost:8000",
    })

    const params = {
        TableName: "Movies",
        KeySchema: [
            { AttributeName: "year", KeyType: "HASH" },  //Partition key
            { AttributeName: "title", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }

    const command = new CreateTableCommand(params);

    try {
        const response = await client.send(command);
        console.log("Created Table. JSON response:" + JSON.stringify(response, null, 2))
    } catch (error) {
        console.log("Not Created Table. JSON response:" + JSON.stringify(error, null, 2))
    }
})();
