const EventBus = require('./EventBus')

function log(message){
  console.log(message.content.toString())
}

async function main(){
  const instance = await EventBus.getInstance()
  await instance.createExchange(process.env.EXCHANGE_NAME || 'asdf');
  await instance.createQueue(process.env.EXCHANGE_NAME || 'asdf', '', log);
}
main()