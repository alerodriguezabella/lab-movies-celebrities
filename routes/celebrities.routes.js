const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch((error) => res.render('celebrities/new-celebrity'))

})

router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("celebrities/celebrities", {celebrities});
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;