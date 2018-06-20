'use strict';

var Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region : 'us-west-2'});
var playerLength=6;

var doctor;
var mafia;
var A;
var B;
var C;
var D;
var E;
var F;

//see the detective shit
var detective;
var ending=function(someone){
    var end="continue";
    
    return end;
}

var eliminate=function(){
    var eliminated="Noone";
    if(doctor==mafia)
    {
        eliminated="Noone";
    }
    else
    {
        eliminated=mafia;
    }
    return eliminated;
}


var vote=function(){
    var votedout="Noone";
    var arr =[0,0,0,0,0,0];
    if(characters[0].char!="Nothing")
    {
        var picked = characters.find(o => o.Name === A);
        arr[picked.Index]++;
    }
    if(characters[1].char!="Nothing")
    {


        var picked = characters.find(o => o.Name === B);
        arr[picked.Index]++;
    }    
    if(characters[2].char!="Nothing")
    {


        var picked = characters.find(o => o.Name === C);
        arr[picked.Index]++;
    }    
    if(characters[3].char!="Nothing")
    {


        var picked = characters.find(o => o.Name === D);
        arr[picked.Index]++;
    }    
    if(characters[4].char!="Nothing")
    {

        var picked = characters.find(o => o.Name === E);
        arr[picked.Index]++;
    }    
    if(characters[5].char!="Nothing")
    {

        var picked = characters.find(o => o.Name === F);
        arr[picked.Index]++;
    }
    var votetop="Noone";
    var votetopcount=0;
    var second="Noone";
    var secondcount=0;
    for(var i=0;i<playerLength;i++)
    {
        if(arr[i]>=votetopcount)
        {
            second=votetop;
            secondcount=votetopcount;
            votetop=characters[i].Name;
            votetopcount=arr[i];
        }
    }
    if(votetopcount==secondcount)
    {
        votedout="Noone";
    }
    else
    {
        votedout=votetop;
    }
    
    return votedout;
}



var RandomAllocation = function(characters){
    for(var i=0;i<2;i++){
        var s = (Math.floor((Math.random()*6)+0));
        characters[s].Char= "Mafia";
    }
    for(var i =0; i<1;i++){
    var s = (Math.floor((Math.random()*6)+0));
    if(characters[s].Char!= "Citizen"){
        i--;
        continue;
    }
    else{
        characters[s].Char= "Doctor";
    }
    }
    for(var i =0; i<1;i++){
    var s = (Math.floor((Math.random()*6)+0));
    if(characters[s].Char!= "Citizen"){
        i--;
        continue;
    }
    else{
        characters[s].Char= "Detective";
    }
    }
}

var characters = [
    {
        Name : 'A',
        Index : 0,
        Char : 'Citizen'
    },
    {
        Name : 'B',
        Index : 1,
        Char : 'Citizen'
    },
    {
        Name : 'C',
        Index : 2,
        Char : 'Citizen'
    },
    {
        Name : 'D',
        Index :3,
        Char : 'Citizen'
    },
    {
        Name : 'E',
        Index : 4,
        Char : 'Citizen'
    },
    {
        Name : 'F',
        Index: 5,
        Char : 'Citizen'
    }
    ];

//RandomAllocation(characters);

var handlers ={
    //need something default
    
    'LaunchRequest' : function(){

          
      this.response.speak("Hi guys, I'm the god. Bow in front of me").listen('Ask me to allocate the characters ');
      this.emit(':responseReady');
    },
    
    //create characters
    'RandomAllocateIntent' : function(){
        RandomAllocation(characters);
        this.attributes.flashcards = {
              'A' : characters[0].Char,
              'B' : characters[1].Char,
              'C' : characters[2].Char,
              'D' : characters[3].Char,
              'E' : characters[4].Char,
              'F' : characters[5].Char,
              'Kill' : '',
              'Save' : '',
              'Doubt' : '',
              'Elimimnate' : ''
          };
     
          
          
      
      
      //this.response.speak( this.attributes.flashcards.A + this.attributes.flashcards.B + this.attributes.flashcards.C + this.attributes.flashcards.D +'are the characters allocated');
      this.response.speak('it sucks');
      //this.emit(':saveState', true);
      this.emit(':responseReady');
    },
    
    //when the night falls
    'Night': function(){
        this.response.speak('Mafia select the person you want to kill. I will countdown for you,ten,nine,eight,seven,six,five,four,three,two,one.\
        Doctor whom do you want to protect. I will countdown for you,ten,nine,eight,seven,six,five,four,three,two,one.\
        Detective any intutions who the mafia might be?Here goes the timer,ten,nine,eight,seven,six,five,four,three,two,one.').listen("I'm listening");
        this.emit(':responseReady');
    },
    
    //when the day starts
    
    'Day':function(){
        var eliminated=eliminate();
        var end=ending(eliminated);
        var speak="";
        if(eliminated=="Noone")
        {
            speak+="Noone has been eliminted from the game. ";
        }
        else
        {
            speak+="Sorry but "+eliminated+" have been eliminated from the game. ";
        }
        if(end=="Mafia")
        {
            speak+="Mafia wins. And by this the game ends. ";
        }
        else if(end=="Citizen")
        {
            speak+="Citizen has purged off the Mafias. The city is back to normal.Thus we will meet in the next game. ";
            
        }
        else{
            speak+="The game continues. ";
        }
        this.response.speak(speak).listen();
        this.emit(":responseReady");
        
    },
    
    //voting at the end of the day
    'Voting':function(){
        var votedout=vote();
        var end=ending(votedout);
        var speak="Sorry to say but "+votedout+" have been voted out by the rest of the players. "
        if(end=="Mafia")
        {
            speak+="Mafia wins.";
        }
        else if(end=="Citizen")
        {
            speak+="Citizen wins.";
        }
        this.response.speak(speak).listen();
        
        this.emit(":responseReady");
    },
    
    
      // Stop
      'AMAZON.StopIntent': function() {
        this.response.speak('Ok, let\'s play again soon.');
        this.emit(':responseReady');
      },
    
      // Cancel
      'AMAZON.CancelIntent': function() {
        this.response.speak('Ok, let\'s play again soon.');
        this.emit(':responseReady');
      },
    
      // Save state
      'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(':saveState', true);
      }
        
};  



exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  //alexa.dynamoDBTableName = 'CodecademyFlashcards';
  alexa.registerHandlers(handlers);
  alexa.execute();
};
