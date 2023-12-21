const database = require("../database")

const modelMovies = {
    getAllMovies: async () => {
        const request = await database`SELECT id, name, genres, duration, poster FROM movies`;

        return request;
    },
    getSelectedMovie: async (id) => {
        const request = await database`SELECT * FROM movies WHERE id = ${id}`;

        return request;
    },
    addMovie: async (payload) => {
        const {
            name,
            release_date,
            duration,
            genres,
            directed_by,
            casts,
            synopsis,
            poster,
        } = payload
        const request = await database`INSERT INTO movies (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
      values
      (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster}) RETURNING id`

        return request;
    },
    editMovie: async (reqBody, coloumns, id) => {
        const request = await database`
      UPDATE movies SET ${database(
            reqBody,
            coloumns
        )} WHERE id = ${id} RETURNING id`

        return request;
    },
    deleteMovie: async (id) => {
        const request = await database`DELETE FROM movies WHERE id = ${id}`;

        return request;
    }
};

module.exports = modelMovies;