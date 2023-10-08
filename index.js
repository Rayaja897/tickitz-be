require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const helmet = require('helmet')

//import router
const moviesRouter = require('./routers/movies')
const usersRouter = require('./routers/users')

//grand access for express can accept input from outside
app.use(express.urlencoded({ extended: false }))
//parse application/json
app.use(express.json())
//grant access for all client using this resource
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//use helmet
app.use(helmet())
app.use(moviesRouter)
app.use(usersRouter)

// //ENDPOINT CINEMAS
// //Show all cinemas
// app.get('/cinemas', async (req, res) => {
//   try {
//     const request = await database`SELECT * FROM cinemas`;

//     res.json({
//       status: true,
//       message: "Get Data Success",
//       data: request,
//     })
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something Wrong on our server",
//       data: [],
//     })
//   }
// })

// //Show selected cinemas
// app.get('/cinemas/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const request = await database`SELECT * FROM cinemas WHERE id = ${id}`;

//     res.json({
//       status: true,
//       message: "Get Data Success",
//       data: request,
//     })
//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something Wrong on our server",
//       data: [],
//     })
//   }
// })

// //Add data cinemas
// app.post("/cinemas", async (req, res) => {
//   try {
//     const {
//       movie_id,
//       name,
//       city,
//       addres,
//       show_times,
//       price,
//       logo

//     } = req.body;

//     const isInputValid = 
//       movie_id &&
//       name &&
//       city &&
//       addres &&
//       show_times &&
//       price &&
//       logo;

//     //check if input is valid
//     if (!isInputValid) {
//       res.status(400).json({
//         status: false,
//         message: "Bad input, please make sure your input is completed",
//       })
//     }

//     const request = await database`INSERT INTO cinemas (movie_id, name, city, addres, show_times, price, logo)
//     values
//     (${movie_id}, ${name}, ${city}, ${addres}, ${show_times}, ${price}, ${logo}) RETURNING id`
//     if (request.length > 0) {
//       res.status(201).json({
//         status: true,
//         message: "Insert Data Success",
//       })
//     }


//   } catch (error) {
//     res.status(502).json({
//       status: false,
//       message: "Something Wrong on our server",
//       data: [],
//     })
//   }
// })

// app.get('/movies', async (req, res)=>{
//   const request = await database`SELECT * FROM movies`;
//   res.send(request)
// })

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})