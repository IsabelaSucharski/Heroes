const express = require('express');
const router = express.Router();

const {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
} = require('../controllers/heroesController');

router.get('/', getHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero);
router.put('/:id', updateHero);
router.delete('/:id', deleteHero);

module.exports = router;