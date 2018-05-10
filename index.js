var express  = require('express'),
    app      = express(),
    port     = process.env.PORT || 8080,
    election = require('./trip_election/module');


app.get('/',(req,res)=>{

    /*i put this inside the route to make the begining of the elections with the beginig of the route*/

    /* get the instance of my moudle and run some functions*/
    var topics = [
    {
        topic:'london',
        vote:0
    },{
        topic:'USA',
        vote:0
    },{
        topic:'Canada',
        vote:0
    }
    ];
    var trip = election('trip election',topics);
    trip.vote('london');
    trip.vote('london');
    trip.vote('london');
    trip.vote('london');
    trip.vote('USA');
    trip.reset();
    trip.getAll();


    trip.vote('Canada');
    trip.vote('Canada');
    trip.vote('Canada');
    trip.vote('Canada');
    trip.vote('Canada');
    trip.vote('USA');
    trip.vote('london');
    trip.getAll();


    /* handle response*/

    res.send(`<!doctype html><html>
        <head><title>Elections</title></head>
        <body>
        <h1>${trip.getSubject()}</h1>
        <h2>Election begins...</h2>
        <p>${log}</p>
        </body>
        </html>
        `);
});
app.listen(port,
    ()=>{
        console.log(`listening on port ${port}`);
    });
