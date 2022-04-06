const { Router } = require('express');
const CharacterController = require('../controllers/CharactersController');
const router = Router();

router.get('/characters', CharacterController.paginaPersonagens);
router.get('/character/:id', CharacterController.paginaPersonagensId);
router.post('/character/add', CharacterController.paginaPersonagensAdd);
router.put('/character/editar/:id', CharacterController.paginaPersonagensEditar);
router.delete('character/delete/:id', CharacterController.paginaPersonagensDeletar);

module.exports = router;