const http = require('http');
// const app = require('./app');
//
// const normalizePort = val => {
//     const port = parseInt(val, 10);
//
//     if (isNaN(port)) {
//         return val;
//     }
//     if (port >= 0) {
//         return port;
//     }
//     return false;
// };
//
// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
//
// const errorHandler = error => {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
//     switch (error.code) {
//         case 'EACCES' :
//             console.error(bind + ' requires elevated privileges.');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE' :
//             console.error(bind + ' is already in use.');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// };
//
// const server = http.createServer(app);
//
// server.on('error',errorHandler);
// server.on('listening', () => {
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
//     console.log('listening on' + bind);
// });
//
// server.listen(port);
//
//



//
//

//
// app.get('/page2', (req, res) => {
//     res.sendFile(__dirname + '/html/page2.html');
// })
//
// app.get('/page/:id', (req, res) => {
//     console.log(req.params.id);
//     res.sendFile(__dirname + '/html/page2.html')
// })
//
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
//
const level = require('level');
const express = require('express');
const app = express();
const dbMovie = level('my-db', {valueEncoding: 'json'});
const dbMoviesList = level('my-dbList', {valueEncoding: 'json'});
const port = 3000;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({name : "toto"});
})

// Middleware
app.use(express.json());


// Routes pour la partie Movie
app.get('/api/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    try {
        let movie = await dbMovie.get(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        console.log(err);
        res.status(404).json(err.message);
    }
});

app.post('/api/movies', async (req, res) => {
    await dbMovie.put(req.body.id, req.body);

    res.status(200).json("l'objet suivant a bien été ajouté" + req.body);
});

app.put('/api/movies/:id', async (req, res) => {

    await dbMovie.put(req.body.id, req.body);
    res.status(200).json(req.body);
});

app.delete('/api/movies/:id', (req, res) => {
    dbMovie.del(req.params.id);
    res.status(200).json(req.params.id);
});

// Routes pour la partie Movie List
app.get('/api/moviesLists', (req, res) => {
    res.status(200).json(moviesLists);
});

app.get('/api/moviesLists/:id', async (req, res) => {
    try {
        let movieList = await dbMoviesList.get(req.params.id);
        res.status(200).json(movieList);
    } catch (error) {
        console.log(error);
        res.status(404).end();
    }
});

app.post('/api/moviesLists', async (req, res) => {
    await dbMoviesList.put(req.body.id, req.body);

    res.status(200).json(req.body);
});

app.post('/api/moviesList/:id/addMovie', async (req, res) => {
    await dbMoviesList.put(req.params.id, req.body);
})

app.put('/api/moviesLists', async (req, res) => {

    await dbMoviesList.put(req.body.id, req.body);
    res.status(200).json(req.body);
});

app.delete('/api/moviesLists/:id', (req, res) => {
    dbMoviesList.del(req.params.id);
    res.status(200).json(req.params.id);
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

