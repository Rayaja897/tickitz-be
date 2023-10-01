const express = require('express')
const app = express()
const port = 3000
const database = require("./database")

//grand access for express can accept input from outside
app.use(express.urlencoded({extended: false }))
//parse application/json
app.use(express.json())


//ENDPOINT MOVIES
//Show all movies
app.get('/movies', async (req, res) => {
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

//Show selected movies
app.get('/movies/:id', async (req, res) => {
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

//Add data movies
app.post("/movies", async (req, res) => {
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
    }

    const request = await database`INSERT INTO movies (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
    values
    (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster}) RETURNING id`

    if (request.length > 0) {
      res.json({
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

//ENDPOINT CINEMAS
//Show all cinemas
app.get('/cinemas', async (req, res) => {
  try {
    const request = await database`SELECT * FROM cinemas`;

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

//Show selected cinemas
app.get('/cinemas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

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

//Add data cinemas
app.post("/cinemas", async (req, res) => {
  try {
    const {
      movie_id,
      name,
      city,
      addres,
      show_times,
      price,
      logo
      
    } = req.body;

    const isInputValid = 
      movie_id &&
      name &&
      city &&
      addres &&
      show_times &&
      price &&
      logo;
    
    //check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      })
    }

    const request = await database`INSERT INTO cinemas (movie_id, name, city, addres, show_times, price, logo)
    values
    (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`
    if (request.length > 0) {
      res.json({
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

//ENDPOINT MOVIES
//Show all movies
app.get('/users', async (req, res) => {
  try {
    const request = await database`SELECT first_name, last_name, phone_number, email, photo_profile FROM users`;

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

//Show selected movies
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await database`SELECT first_name, last_name, phone_number, email, photo_profile FROM users WHERE id = ${id}`;

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

//Add data USERS
app.post("/users", async (req, res) => {
  try {
    const { 
      first_name,
      last_name,
      phone_number,
      email,
      password,
      photo_profile
    } = req.body;

    const isInputValid = 
      first_name &&
      last_name &&
      phone_number &&
      email &&
      password &&
      photo_profile;
    
    //check if input is valid
    if (!isInputValid) {
      res.status(400).json({
        status: false,
        message: "Bad input, please make sure your input is completed",
      })
    }

    const request = await database`INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile)
    values
    (${first_name}, ${last_name}, ${phone_number}, ${email}, ${password}, ${photo_profile}) RETURNING id`

    if (request.length > 0) {
      res.json({
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})