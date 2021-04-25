import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb'
import fs from 'fs'

(async () => {

  const client = new DynamoDBClient({
    region: "local",
    endpoint: "http://localhost:8000",
  })

  try {
    const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf-8'));
    console.log(allMovies.length)
    allMovies.forEach(async (movie: { year: any; title: any; info: any; }) => {
      const params = {
        TableName: "Movies",
        Item: marshall({
          year: movie.year,
          title: movie.title,
          info: movie.info
        })
      };

      const command = new PutItemCommand(params);

      try {
        const response = await client.send(command)
        console.log("Put Item. JSON response:" + JSON.stringify(response, null, 2))

      } catch (error) {
        console.log("Not put item. JSON response:" + JSON.stringify(error, null, 2))
      }
    });

  } catch (error) {
    console.log("JSON response:" + JSON.stringify(error.message, null, 2))
  }

})();
