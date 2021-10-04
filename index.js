const http = require('http');

const level = require('level');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dbMovie = level('my-db', {valueEncoding: 'json'});
const dbMoviesList = level('my-dbList', {valueEncoding: 'json'});
const port = 3000;

// const cors = require('cors');

// Middleware
app.use(express.json());

// Body parser configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.use(cors({origin: true, optionsSuccessStatus: 200, credentials: true}));
// app.options('*', cors({origin: true, optionsSuccessStatus: 200, credentials: true}));

// app.options('*', (req,res) => {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.send("ok");
// });

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});


app.get('/', (req, res, next) => {
    res.json({name: "toto"});
    next();
})




// fonction pour faire un select * sur une table
function getAllItems(db) {
    let dataArray = [];
    return new Promise(function (resolve, reject) {
        db.createReadStream().on('data', function (data) {
            dataArray.push(data);

        })
            .on('error', function (err) {
                reject(err);
            })
            .on('close', function () {
                resolve(dataArray);
            })
    })
}

// Routes pour la partie Movie

app.get('/api/movies', async (req, res) => {
    try {
        let allMovies = await getAllItems(dbMovie);
        // console.log(test);
        res.status(200).json(allMovies);

    } catch (e) {
        console.log(e);
        res.status(404).json(e.message);
    }

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
    let movie = req.body;
    if (!movie.grade) {
        movie.grade = null;
    }
    if (!movie.comment) {
        movie.comment = "";
    }
    await dbMovie.put(req.body.id, movie);

    res.status(200).json("l'objet suivant a bien été ajouté  id du film : " + movie.id);
});

app.put('/api/movies/:id', async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params.id);
        let movie = await dbMovie.get(req.params.id);
        console.log(movie);
        if (req.body.grade) {
            movie.grade = req.body.grade;
        }
        if (req.body.comment) {
            movie.comment = req.body.comment;
        }
        if (!movie.grade) {
            movie.grade = 0;
        }
        if (!movie.comment) {
            movie.comment = "";
        }
        await dbMovie.put(req.params.id, movie);
        res.status(200).json(movie);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.delete('/api/movies/:id', (req, res) => {
    try {
        dbMovie.del(req.params.id);
        res.status(200).json(req.params.id);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

// Routes pour la partie Movie List

app.get('/api/moviesLists', async (req, res) => {
    try {
        let allMoviesList = await getAllItems(dbMoviesList);
        // console.log(test);
        res.status(200).json(allMoviesList);

    } catch (e) {
        console.log(e);
        res.status(404).json(e.message);
    }
});

app.get('/api/moviesLists/:id', async (req, res) => {
    try {
        let movieList = await dbMoviesList.get(req.params.id);
        res.status(200).json(movieList);
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }
});

app.post('/api/moviesLists', async (req, res) => {
    try {
        let movieList = req.body;
        if (!movieList.id) {
            res.status(201).json({erreur: "l'id n'a pas été rentré"});
        }
        if (!movieList.name) {
            movieList.name = "";
        }
        if (!movieList.film) {
            movieList.film = [];
        }
        await dbMoviesList.put(req.body.id, req.body);

        res.status(200).json(req.body);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.post('/api/moviesLists/:id/film', async (req, res) => {
    try {
        let movieList = await dbMoviesList.get(req.params.id);
        movieList.film.push(req.body);
        await dbMoviesList.put(req.params.id, movieList);

        res.status(200).json(movieList);
    } catch (error) {
        res.status(404).json(error.message);
    }
});

app.delete('/api/moviesLists/:idList/:idFilm', async (req, res) => {
    try {
        console.log(req.params);
        let movieList = await dbMoviesList.get(req.params.idList);
        movieList.film = movieList.film.splice(req.params.idFilm, 1);
        await dbMoviesList.put(req.params.idList, movieList);
        res.status(204).json("l'élement a bien été effacé");
    } catch (error) {
        res.status(404).json(error.message);
    }
});

app.put('/api/moviesLists/:id', async (req, res) => {
    try {
        let movieList = await dbMoviesList.get(req.params.id);
        if (req.body.name) {
            movieList.name = req.body.name;
        }
        await dbMoviesList.put(req.params.id, movieList);
        res.status(200).json(movieList);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.delete('/api/moviesLists/:id', (req, res) => {
    try {

        if (!req.params.id) {

            res.status(201).json({erreur: "Pas d'id!!"});
        }
        dbMoviesList.del(req.params.id);
        res.status(204).json(req.params.id);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

