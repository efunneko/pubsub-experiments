import env from '../environment/env';
import mqtt from 'mqtt';
import './style.css';

function component() {
  var element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'].join(' ');
  element.classList.add('hello');
  
  return element;
}

document.body.appendChild(component());

if (1){
  console.log("Connecting to ", env, env.broker);
  var client  = mqtt.connect(env.broker.url, {
    username: env.broker.username,
    password: env.broker.password
  });

  client.on('connect', function () {
    console.log("Connected");
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  console.log("Not ending");
//  client.end()
});
}
