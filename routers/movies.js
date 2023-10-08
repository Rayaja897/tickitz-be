
const database = require("../database")
const router = require("express").Router();

//ENDPOINT MOVIES
//Show all movies
router.get('/movies', async (req, res) => {
    try {
      const request = await database`SELECT id, name, genres, duration, poster FROM movies`;
  
      res.json({
        status: true,
        message: "Get Data Success",
        data: request,
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      })
    }
  })
  
  //Show selected movie
  router.get('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const request = await database`SELECT * FROM movies WHERE id = ${id}`;
  
      res.json({
        status: true,
        message: "Get Data Success",
        data: request,
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      })
    }
  })
  
  //Add data movie
  router.post("/movies", async (req, res) => {
    try {
      const {
        name,
        release_date,
        duration,
        genres,
        directed_by,
        casts,
        synopsis,
        poster
      } = req.body;
  
      const isInputValid =
        name &&
        release_date &&
        duration &&
        genres &&
        directed_by &&
        casts &&
        synopsis &&
        poster;
  
      //check if input is valid
      if (!isInputValid) {
        res.status(400).json({
          status: false,
          message: "Bad input, please make sure your input is completed",
        })
        return
      }
  
      const request = await database`INSERT INTO movies (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
      values
      (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster}) RETURNING id`
  
      if (request.length > 0) {
        res.status(201).json({
          status: true,
          message: "Insert Data Success",
        })
      }
  
  
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      })
    }
  })
  
  //Edit data movie
  router.put("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const coloumns = [
        "name",
        "release_date",
        "duration",
        "genres",
        "directed_by",
        "casts",
        "synopsis",
        "poster",
      ];
  
      const request = await database`
      UPDATE movies SET ${database(
        req.body,
        coloumns
      )} WHERE id = ${id} RETURNING id`
      if (request.length > 0) {
        res.status(201).json({
          status: true,
          message: "Edit Data Success",
        })
      }
  
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something Wrong on our server",
        data: [],
      })
    }
  })
  
  //Delete Movie
  router.delete("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const request = await database`DELETE FROM movies WHERE id = ${id}`;
      res.status(201).json({
        status: true,
        message: "Delete Data Success",
        data: request,
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      })
    }
  })

  module.exports = router;