# Introduction 

This documentation aims to provide all the information you need to work with our API.

#### Base URL

https://apimovietest.herokuapp.com/

### Authenticating requests 

This API is not authenticated. 

## Movie 

APIs for managing movies

### Display a list of Movies 

**Request**  
GET `api/movies` 

*Example request:*  

**Shell**  
curl -X GET \  
-G `"https://apimovietest.herokuapp.com/api/movies"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axios.get('https://apimovietest.herokuapp.com/api/movies')`


## Store a new Movie

**Request** 
POST api/movies  

`Body Parameters`  
`id` *integer*  
The id of the movie  (must be an ID of Themoviedb)

`grade` *integer*  
Numbers of stars for grade the movie  

`comment` *string*  
Comment about the movie  

*Example request:*

**Shell**  
curl -X POST \  
-G `"https://apimovietest.herokuapp.com/api/movies"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"` \
-d `'{"id":1,"grade":3,"comment":"blabla"}'`

**JavaScript (axios)**  
`axios.post('https://apimovietest.herokuapp.com/api/movies', { 
   id: 1, 
   grade: 3',
   comment: 'blabla'
   })`


## Display a Movie  

**Request**  
GET api/movies/{id}  

`URL Parameters`

`id` *integer*   
The ID of the movie   

*Example request:*

**Shell**  
curl -X GET \  
-G `"https://apimovietest.herokuapp.com/api/movies/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axioq.get('https://apimovietest.herokuapp.com/api/movies', {
  id: 'id'
})`


## Update a specific Movie   

**Request**  
PUT api/movies/{id}  

`URL Parameters`  
`id` *integer*   
The ID of the movie   

`Body Parameters`  
`grade` *integer*  optional  
Numbers of stars for grade the movie

`comment` *string*  optional  
Comment about the movie  

*Example request:*

**Shell**  
curl -X PUT \  
-G `"https://apimovietest.herokuapp.com/api/movies/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"` \
-d `'{"grade":3,"comment":"blabla"}'`

**JavaScript (axios)**  
`axios.put('https://apimovietest.herokuapp.com/api/movies', {
    id: 9,
    grade: 3,
    comment: 'blabla'
})`


## Remove a specific Movie  

DELETE api/movies/{id}

`URL Parameters`  
`id` *integer*   
The ID of the movie to be removed.   

*Example request:*

**Shell**  
curl -X DELETE \  
-G `"https://apimovietest.herokuapp.comt/api/movies/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axios.delete('https://apimovietest.herokuapp.com/api/movies', {
    id: 9
})`


## MoviesList  

APIs for managing list of movies 

## Display a list of MoviesLists  

**Request**  
GET `api/moviesLists`

*Example request:*

**Shell**  
curl -X GET \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axios.get('https://apimovietest.herokuapp.com/api/moviesLists')
`

## Store a new MoviesList

**Request**  
POST `api/moviesLists`

`Body Parameters`  
`id` *integer*  
The id of the movies list   

`name` *string*   
The name of the movies list  

*Example request:*

**Shell**  
curl -X POST \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"` \
-d `'{"id":1,"name":"toto"}'`

**JavaScript (axios)**  
`axios.post('https://apimovietest.herokuapp.com/api/moviesLists'), {
    id: 2,
    name: "toto",
})`


## Store a movie in a Movie List

**Request** 
POST `api/moviesLists/addMovie/{idList}`

`URL Parameters`

`idList` *integer*
The ID of the movies list

`Body Parameters`
`id` *string*
The ID (must be an ID of the Themoviedb) of the film to add to the list

*Example request:*

**Shell**  
curl -X POST \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists/addMovie/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"` \
-d `'{"idList":1,"id":"09"}'`

**JavaScript (axios)**  
`axioq.post('https://apimovietest.herokuapp.com/api/moviesLists/addMovie', {
id: 'id', list: 'movieId'
})`

## Display a moviesList

**Request**  
GET api/moviesLists/{id}

`URL Parameters`

`id` *integer*   
The ID of the movies list

*Example request:*

**Shell**  
curl -X GET \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axioq.get('https://apimovietest.herokuapp.com/api/moviesLists', {
    id: 'id'
})`


## Update a specific MoviesList   

**Request**  
PUT api/moviesLists/{id}

`URL Parameters`  
`id` *integer*   
The ID of the movies list

`Body Parameters`  
`name` *string*  optional  
The name of the movies list

`list` *string*  optional  
The list of movies ID, in a string of characters separate by comas

*Example request:*

**Shell**  
curl -X PUT \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"` \
-d `'{"name":"toto","list":"2,3,4"}'`

**JavaScript (axios)**  
`axios.put('https://apimovietest.herokuapp.com/api/moviesLists', {
    id: 9,
    name: 'toto',
    list: '2,3,4'
})`


## Remove a specific MoviesList

DELETE api/moviesLists/{id}

`URL Parameters`  
`id` *integer*   
The ID of the moviesList to be removed.

*Example request:*

**Shell**  
curl -X DELETE \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists/9"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axios.delete('https://apimovietest.herokuapp.com/api/moviesLists', {
    id: 9
})`

## Remove a specific movie of a MoviesList

DELETE api/moviesLists/{idList}/deleteMovie/{idFilm}

`URL Parameters`  
`idList` *integer*   
The ID of the moviesList to be removed.

`idFilm` *string*  
The ID of the film to be removed of the movie list

*Example request:*

**Shell**  
curl -X DELETE \  
-G `"https://apimovietest.herokuapp.com/api/moviesLists/9/deleteMovie/2"` \
-H `"Content-Type: application/json"` \
-H `"Accept: application/json"`

**JavaScript (axios)**  
`axios.delete('https://apimovietest.herokuapp.com/api/moviesLists', {
idList: 9, idFilm: "2"
})`



