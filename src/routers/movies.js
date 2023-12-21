
const router = require("express").Router();
const moviesController = require("../controllers/movies")

//ENDPOINT MOVIES
//Show all movies
router.get('/movies', moviesController._getAllMovies);

//Show selected movie
router.get('/movies/:id', moviesController._getSelectedMovie);

//Add data movie
router.post("/movies", moviesController._inputValidation, moviesController._addMovie)

//Edit data movie
router.put("/movies/:id", moviesController._inputValidation, moviesController._editMovie)

//Delete Movie
router.delete("/movies/:id", moviesController._deleteMovie)

module.exports = router;