import env       from '../environment/env';
import mqtt      from 'mqtt';
import jst       from './jayesstee';
import templates from './templates';
import $         from 'jquery';
import load      from 'audio-loader';

import './style.css';

let drums = ["snare",
             "high-hat",
             "bass",
             "left-cymbal",
             "right-cymbal",
             "left-tom",
             "right-tom",
             "far-right"];

// Fill in all the HTML from the templates
jst("body").appendChild(templates.page());


// Create the audio context so that we can play the sounds
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();


// Load all the sounds into AudioBuffers
let promises = [];
let sounds   = {};
for (let drum of drums) {
  promises.push(load("../assets/sounds/" + drum + ".wav", {context: audioCtx}));
}
Promise.all(promises).then(buffers => {
  for (let i = 0; i < drums.length; i++) {
    sounds[drums[i]] = buffers[i];
  }
});


// Create the connection to Solace Cloud
var client  = mqtt.connect(env.broker.url, {
  username: env.broker.username,
  password: env.broker.password
});

client.on('connect', function () {
  console.log("Connected");
  client.subscribe('sound');
});

// Play the sound on message reception
client.on('message', function (topic, message) {
  let soundType = message.toString();
  let sound     = sounds[soundType];
  let source    = audioCtx.createBufferSource();
  source.buffer = sound;
  source.connect(audioCtx.destination);
  source.start();
});

// Setup all the touch/click events for the drums
for (let type of drums) {
  let eventName = "mousedown";
  if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    eventName = "touchstart";
  }
  $(".drum-" + type).on(eventName, (e) => {
    client.publish('sound', type);
  });
}

