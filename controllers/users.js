const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
const usersModel = require("../models/users");

const usersController = {
    _checkJwt:async (req, res, next) => {
        try {
          const token = req.headers.authorization.slice(7);
          const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      
          if (decoded) {
            next();
          }else{
            res.status(401).json({
              status: false,
              message: "Token error",
              data: [],
            })
          }
      
        } catch (error) {
          res.status(401).json({
            status: false,
            message: "Token error",
            data: [],
          })
        }
      },
    _getAllUsers: async (req, res) => {
        try {
            const request = await usersModel.getAllUsers();

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
            first_name: "required|maxLength:30",
            last_name: "required|maxLength:30",
            phone_number: "required|maxLength:20",
            email: "required|email",
            password: "required",
            photo_profile: "required|url"
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
    _inputValidationProf: async (req, res, next) => {
        //schema error
        const schema = new Validator(req.body, {
            first_name: "required|maxLength:30",
            last_name: "required|maxLength:30",
            phone_number: "required|maxLength:20",
            email: "required|email",
            photo_profile: "required|url"
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
    _inputValidationPass: async (req, res, next) => {
        //schema error
        const schema = new Validator(req.body, {
            password: "required"
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
    _registUser: async (req, res) => {
        try {
            const {
                first_name,
                last_name,
                phone_number,
                email,
                password,
                photo_profile
            } = req.body;

            //check unique email
            const checkEmail = await usersModel.checkEmail(email);

            if (checkEmail.length > 0) {
                res.status(400).json({
                    status: false,
                    message: "Email is already registered",
                })
                return
            }

            const saltRounds = 15;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const request = await usersModel.registUser({
                first_name,
                last_name,
                phone_number,
                email,
                hash,
                photo_profile,
            })

            if (request.length > 0) {
                res.status(201).json({
                    status: true,
                    message: "Insert Data Success",
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
    _loginUser: async (req, res) => {
        try {
            const { email, password } = req.body

            //check if email registered
            const checkEmail = await usersModel.checkEmail(email);

            if (checkEmail.length == 0) {
                res.status(400).json({
                    status: false,
                    message: "Email is not registered",
                })
                return
            }

            //check if password correct
            const isMatch = bcrypt.compareSync(password, checkEmail[0].password);

            if (isMatch) {
                const token = jwt.sign(checkEmail[0], process.env.SECRET_TOKEN)

                res.json({
                    status: true,
                    message: "Login Success",
                    accessToken: token,
                    data: checkEmail,
                })
            } else {
                res.status(400).json({
                    status: false,
                    message: "Password inccorect",
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
    _profileUser: async (req, res) => {
        try {
            const token = req.headers.authorization.slice(7);
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

            const request = await usersModel.profileUser(decoded.id)

            res.json({
                status: true,
                message: "Get data Success",
                data: request,
            })
        } catch (error) {
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: []
            })
        }
    },
    _editUser: async (req, res) => {
        try {
            const token = req.headers.authorization.slice(7);
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            const { id } = decoded;

            const coloumns = [
                "first_name",
                "last_name",
                "phone_number",
                "email",
                "photo_profile",
            ];

            const request = await usersModel.editProfile(req.body, coloumns, id);

            if (request.length > 0) {
                res.json({
                    status: true,
                    message: "Update data success",
                })
            }

        } catch (error) {
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: []
            })
        }
    },
    _editPass: async (req, res) => {
        try {
            const token = req.headers.authorization.slice(7);
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            const { id } = decoded;

            const coloumns = [
                "password",
            ];

            const saltRounds = 15;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const request = await usersModel.editPass({ password: hash }, coloumns, id)

            if (request.length > 0) {
                res.json({
                    status: true,
                    message: "Update data success",
                })
            }

        } catch (error) {
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: []
            })
        }
    }
}

module.exports = usersController