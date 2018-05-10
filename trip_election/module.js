var EventEmitter = require('events');
const MAX_VOTES  = 20;
const CONFIG = require('../config').events;

global.log='';

class Election extends EventEmitter{

    constructor(subject,topics){
        super();
        this.votes_sum = 0;
        this.subject = subject;
        this.topic = topics;
        this.reset();
    }
    reset(){
        this.emit('reset');
        var length = this.topic.length;
        this.votes_sum = 0;
        for (var i = length - 1; i >= 0; i--) {
            this.topic[i].vote = 0;
        }
    }

    
    vote(topic){
        var length = this.topic.length;
        for (var i = length - 1; i >= 0 && this.votes_sum<=MAX_VOTES; i--) {
            if(this.topic[i].topic == topic){
                this.topic[i].vote++;
                // console.log(`TOPIC: ${this.topic[i].topic}  with ${this.topic[i].vote} votes`);
                break;
            }
        }
        this.votes_sum++;
        this.emit('vote');

        // this.emit('balanceChanged');
    }

    getAll(){
        // console.log(this.topic);
        this.emit('getall');

    }

    getSubject(){
        return this.subject;
    }

}


function appendLog(string){
    log+=`${string} <br>`;
}

// the Callbacks functions
function displayVoting(){
    console.log(`votings collabrates: ${this.votes_sum}`);
    appendLog(`votings collabrates: ${this.votes_sum}`);
}

function resetVotes(){
        console.log(`all The Votes has been reset to 0!!!`);
        appendLog('all The Votes has been reset to 0!!!');
}

function checkMax(){
    if(this.votes_sum <= MAX_VOTES){
        console.log(`more ${MAX_VOTES-this.votes_sum} votes still allowed`);
        appendLog(`more ${MAX_VOTES-this.votes_sum} votes still allowed`);
    }
}
function printAll(){
    var length = this.topic.length;
    for(var i=0;i<length;i++){
        console.log(`TOPIC: ${this.topic[i].topic}  with ${this.topic[i].vote} votes`);
        appendLog(`TOPIC: ${this.topic[i].topic}  with ${this.topic[i].vote} votes`);
    }
}


module.exports = (subject,topics) => {
    var trip = new Election(subject,topics);
    trip.on(CONFIG.VOTE,displayVoting);
    trip.on(CONFIG.RESET,resetVotes);
    trip.on(CONFIG.VOTE,checkMax);
    trip.on(CONFIG.GETALL,printAll);
    return trip;
}

