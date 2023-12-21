const database = require("../database")

const modelUsers = {
  getAllUsers: async () => {
    const request = await database`SELECT first_name, last_name, phone_number, photo_profile FROM users`;

    return request
  },
  checkEmail: async (email) => {
    const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`;

    return checkEmail
  },
  registUser: async (payload) => {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      hash,
      photo_profile,
    } = payload
    const request = await database`INSERT INTO users
        (first_name, last_name, phone_number, email, password, photo_profile)
      values
        (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile}) RETURNING id`

    return request
  },
  profileUser: async (id) => {
    const request = await database`SELECT * FROM users WHERE id = ${id}`

    return request
  },
  editProfile: async (reqBody, coloumns, id) => {
    const request = await database`
      UPDATE users SET ${database(
      reqBody,
      coloumns
    )} WHERE id = ${id} RETURNING id`

    return request;
  },
  editPass: async (pass, coloumns, id) => {
    const request = await database`
      UPDATE users SET ${database(
      pass,
      coloumns
    )} WHERE id = ${id} RETURNING id`

    return request;
  }
}

module.exports = modelUsers;