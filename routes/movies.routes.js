// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here
router.get('/movies/create', (req, res) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('movies/new-movie', {celebrities})
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch((error) => res.render('movies/new-movie'))

})

router.get("/movies", (req, res) => {
    Movie.find()
        .then((movies) => {
            res.render("movies/movies", {movies});
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    Movie.findById(id)
        .populate('cast')
        .then((movieDetails) => {
            console.log(movieDetails)
            res.render('movies/movie-details', movieDetails)
        })
        .catch((error) =>
            console.log("Error: ", error)
    );
})

router.post('/movies/:id/delete', (req, res) => {
     const {id} = req.params
  
     Movie.findByIdAndDelete(id)
       .then(() => res.redirect("/movies"))
       .catch((error) => console.log(`Error while deleting a movie: ${error}`));
});

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
  
    Movie.findById(id)
        .then((movieToEdit) => {
            return Celebrity.find()
                .then((cast) => {
                    res.render('movies/edit-movie', { movieToEdit, cast })
                })
        })
        .catch((error) =>
            console.log("Error while updating the movie: ", error)
        );
});

router.post('/movies/:id', (req, res) => {
    const {id} = req.params
    const {title, genre, plot, cast} = req.body

    Movie.findByIdAndUpdate(
        id,
        {title, genre, plot},
        {new: true}
    )
        .then(() => res.redirect(`/movies/${id}`))
        .catch((error) =>
            console.log(`Error while updating a movie: ${error}`)
        );
});

module.exports = router;