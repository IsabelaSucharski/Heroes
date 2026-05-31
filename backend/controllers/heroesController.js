const connection = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

// FILTER FUNCTIONS


const filterByNameOrNickname = async (search, limit, offset) => {
  const [heroes] = await connection.execute(
    `SELECT * FROM heroes WHERE name LIKE ? OR nickname LIKE ? LIMIT ${limit} OFFSET ${offset}`,
    [`%${search}%`, `%${search}%`]
  );
  const [countResult] = await connection.execute(
    'SELECT COUNT(*) as total FROM heroes WHERE name LIKE ? OR nickname LIKE ?',
    [`%${search}%`, `%${search}%`]
  );
  return { heroes, total: countResult[0].total };
};



const getAllHeroes = async (limit, offset) => {
  const [heroes] = await connection.execute(
    `SELECT * FROM heroes LIMIT ${limit} OFFSET ${offset}`
  );
  const [countResult] = await connection.execute(
    'SELECT COUNT(*) as total FROM heroes'
  );
  return { heroes, total: countResult[0].total };
};

// GET ALL WITH FILTERS
const getHeroes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { search } = req.query;

  try {
    let result;

    if (search) {
      result = await filterByNameOrNickname(search, limit, offset);
    } else {
      result = await getAllHeroes(limit, offset);
    }

    const totalPages = Math.ceil(result.total / limit);

    res.json({
      data: result.heroes,
      page,
      limit,
      total: result.total,
      totalPages,
      filters: {
        search: search || null
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar heróis', error: error.message });
  }
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
  
  // Converter data ISO para YYYY-MM-DD
  const dateForDB = date_of_birth && typeof date_of_birth === 'string' 
    ? date_of_birth.split('T')[0] 
    : date_of_birth;

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
      dateForDB,
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

  const allowedFields = [
    'name',
    'nickname',
    'date_of_birth',
    'universe',
    'main_power',
    'avatar_url',
    'is_active'
  ];

  const fields = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      fields.push(`${field} = ?`);
      let value = req.body[field];
      
      // Converter data ISO para YYYY-MM-DD
      if (field === 'date_of_birth' && value && typeof value === 'string') {
        value = value.split('T')[0];
      }
      
      values.push(typeof value === 'undefined' ? null : value);
    }
  });

  if (fields.length === 0) {
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });
  }

  const [result] = await connection.execute(
    `UPDATE heroes
     SET ${fields.join(', ')}
     WHERE id = ?`,
    [...values, id]
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