const connection = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

// GET ALL
const getHeroes = async (req, res) => {
  const [heroes] = await connection.execute(
    'SELECT * FROM heroes'
  );

  res.json(heroes);
};

// GET BY ID
const getHeroById = async (req, res) => {
  const { id } = req.params;

  const [hero] = await connection.execute(
    'SELECT * FROM heroes WHERE id = ?',
    [id]
  );

  if (hero.length === 0) {
    return res.status(404).json({
      message: 'Hero not found'
    });
  }

  res.json(hero[0]);
};

// CREATE
const createHero = async (req, res) => {
  const {
    name,
    nickname,
    date_of_birth,
    universe,
    main_power,
    avatar_url
  } = req.body;

  const id = uuidv4();

  await connection.execute(
    `INSERT INTO heroes
    (
      id,
      name,
      nickname,
      date_of_birth,
      universe,
      main_power,
      avatar_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      name,
      nickname,
      date_of_birth,
      universe,
      main_power,
      avatar_url
    ]
  );

  res.status(201).json({
    message: 'Hero created',
    id
  });
};

// UPDATE
const updateHero = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    nickname,
    date_of_birth,
    universe,
    main_power,
    avatar_url,
    is_active
  } = req.body;

  const [result] = await connection.execute(
    `UPDATE heroes
     SET
      name = ?,
      nickname = ?,
      date_of_birth = ?,
      universe = ?,
      main_power = ?,
      avatar_url = ?,
      is_active = ?
     WHERE id = ?`,
    [
      name,
      nickname,
      date_of_birth,
      universe,
      main_power,
      avatar_url,
      is_active,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: 'Hero not found'
    });
  }

  res.json({
    message: 'Hero updated'
  });
};

// DELETE
const deleteHero = async (req, res) => {
  const { id } = req.params;

  const [result] = await connection.execute(
    'DELETE FROM heroes WHERE id = ?',
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: 'Hero not found'
    });
  }

  res.json({
    message: 'Hero deleted'
  });
};

module.exports = {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero
};