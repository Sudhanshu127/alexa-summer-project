"use strict";

var Alexa = require("alexa-sdk");

var globalname="Someone";
var handlers = {
  "HelloIntent": function () {
    this.response.speak("Hello, "+globalname); 
    this.emit(':responseReady');
  },
  "LaunchRequest": function () {
    this.response.speak("So ,Welcome to Codecademy"); 
    this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback){
    try{
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
  catch(error){
    console.log('checked alexa');
  }
    try
    {
      globalname=event.firstName;
      context.succeed("My name is "+ event.firstName+event.lastName);
    }
    catch(error){
      console.log('Checked POJO');
    }




};