const fs = require('fs');
const amqp = require('amqplib');

const rabbitUrl = 'amqp://localhost';

(async function() {
  const connection = await amqp.connect(rabbitUrl);
  const channel = await connection.createChannel();

  const queue = 'my-exchange';
  await channel.assertQueue(queue);

  const fileContents = fs.readFileSync('./ships.json', 'utf8');
  const data = JSON.parse(fileContents[1]);

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

  await channel.close();
  await connection.close();
})();