const {Router} = require('express');
const characterRoutes = require('./characterRoutes')

const router = Router();

router.get('/', (req,res) =>{
    res.render("home");
})

router.use(characterRoutes);

router.use((req, res, next) =>{
    res.render("404");
})

module.exports = router;