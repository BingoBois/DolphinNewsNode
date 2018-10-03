const amqp = require("amqplib/callback_api");

function rabbitReceive(callback){
  amqp.connect('amqp://104.248.29.64', function(err, conn){
    conn.createChannel(function(err, ch){
      ch.assertQueue('DolphinNews', {durable: false});
      ch.consume('DolphinNews', function(msg){
        callback(msg.content);
      }, {noAck: true});
    })
  });
}

module.exports = {
  rabbitReceive
}
