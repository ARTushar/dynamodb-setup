import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import fs from 'fs'

(async () => {

  const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
  })

  const year = 2015;
  const title = "The Big New Movie"

  interface PUTTYPE {
    TableName: string,
    Item: {
      year: any,
      title: any,
      info: any
    },
  }

  const params: PUTTYPE = {
    TableName: "Movies",
    Item: {
      year: {
        N: year
      },
      title: {
        S: title
      },
      info: {
        M: {
          plot: {
            S: "nothing happens at all"
          },
          rating: {
            N: 0
          }
        }
      }
    },
  };

  const command = new PutItemCommand(params);
  try {
    const response = await client.send(command)
    console.log("Put Item. JSON response:" + JSON.stringify(response, null, 2))

  } catch (error) {
    console.log("Not put item. JSON response:" + JSON.stringify(error.message, null, 2))
  }


})();
