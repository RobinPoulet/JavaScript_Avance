const level = require('level');


const db = level('my-db');

db.put('name', 'Level', function (err) {
    if (err) return console.log('Oooops!', err)

    db.get('name', function (err, value) {
        if (err) return console.log('Oooops!', err)

        console.log('name=' + value)
    })
});


module.exports = db;