const moviesModel = require("../models/movies");
const { Validator } = require('node-input-validator');

const moviesController = {
    _getAllMovies: async (req, res) => {
        try {
            const request = await moviesModel.getAllMovies();

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
    },
    _getSelectedMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const request = await moviesModel.getSelectedMovie(id);

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
    },
    _inputValidation: async (req, res, next) => {
        //schema error
        const schema = new Validator(req.body, {
            name: "required|minLength:1|maxLength:100",
            release_date: "required|date",
            duration: "required|maxLength:50",
            genres: "required|array|arrayUnique",
            directed_by: "required|maxLength:60",
            casts: "required|array|arrayUnique",
            synopsis: "required|maxLength:500",
            poster: "required|url"
        });

        schema.check().then((matched) => {
            if (!matched) {
                res.status(422).send({
                    status: false,
                    message: schema.errors,
                    data: null
                });
            } else {
                next();
            }
        });
    },
    _addMovie: async (req, res) => {
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

            const request = await moviesModel.addMovie({
                name,
                release_date,
                duration,
                genres,
                directed_by,
                casts,
                synopsis,
                poster,
            })

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
    },
    _editMovie: async (req, res) => {
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

            const request = await moviesModel.editMovie(req.body, coloumns, id)
            if (request.length > 0) {
                res.status(201).json({
                    status: true,
                    message: "Edit Data Success",
                })
            }

        } catch (error) {
            console.log(error);
            res.status(502).json({
                status: false,
                message: "Something Wrong on our server",
                data: [],
            })
        }
    },
    _deleteMovie: async (req, res) => {
        try {
            const { id } = req.params;
            const request = await moviesModel.deleteMovie(id);
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
    }

};

module.exports = moviesController;