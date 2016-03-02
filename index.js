
var expressDI = require('expressDI');
var di = expressDI.di({});

di.run()
    .then(function() {
        console.log('App running');
    });
