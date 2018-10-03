const amqp = require("amqplib/callback_api");

function rabbitReceive(callback){
  amqp.connect('amqp://104.248.29.64', function(err, conn){
    conn.createChannel(function(err, ch){
      ch.assertQueue('DolphinNews', {durable: false});
      console.log('Waiting for messages');
      ch.consume('DolphinNews', function(msg){
        console.log(`Received: ${msg.content.toString('utf8')}`);
        callback(msg.content);
      }, {noAck: true});
    })
  });
}

module.exports = {
  rabbitReceive
}
