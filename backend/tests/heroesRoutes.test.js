const request = require('supertest');
const app = require('../app');
const connection = require('../database/connection');

jest.mock('../database/connection', () => ({
  execute: jest.fn(),
}));

describe('Heroes API', () => {
  const hero = {
    id: '1',
    name: 'Batman',
    nickname: 'Morcego',
    universe: 'DC',
    main_power: 'Dinheiro',
    avatar_url: 'avatar.jpg',
    date_of_birth: '1990-01-01',
    is_active: true,
    created_at: '1990-01-01T00:00:00.000Z',
    updated_at: '1990-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list heroes', async () => {
    connection.execute
      .mockResolvedValueOnce([[hero], []])
      .mockResolvedValueOnce([[{ total: 1 }], []]);

    const response = await request(app).get('/heroes');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([hero]);
    expect(response.body.page).toBe(1);
    expect(response.body.totalPages).toBe(1);
  });

  it('should return hero by id', async () => {
    connection.execute.mockResolvedValueOnce([[hero], []]);

    const response = await request(app).get(`/heroes/${hero.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(hero);
  });

  it('should return 404 when hero is not found', async () => {
    connection.execute.mockResolvedValueOnce([[], []]);

    const response = await request(app).get('/heroes/unknown');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Hero not found');
  });

  it('should create a hero', async () => {
    connection.execute.mockResolvedValueOnce([{}, []]);

    const response = await request(app).post('/heroes').send({
      name: 'Batman',
      nickname: 'Morcego',
      date_of_birth: '1990-01-01',
      universe: 'DC',
      main_power: 'Dinheiro',
      avatar_url: 'avatar.jpg',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Hero created');
    expect(typeof response.body.id).toBe('string');
  });

  it('should update a hero', async () => {
    connection.execute.mockResolvedValueOnce([{ affectedRows: 1 }, []]);

    const response = await request(app)
      .put(`/heroes/${hero.id}`)
      .send({ name: 'Batman Atualizado' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hero updated');
  });

  it('should return 404 when updating a non-existing hero', async () => {
    connection.execute.mockResolvedValueOnce([{ affectedRows: 0 }, []]);

    const response = await request(app)
      .put('/heroes/not-found')
      .send({ name: 'Batman' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Hero not found');
  });

  it('should delete a hero', async () => {
    connection.execute.mockResolvedValueOnce([{ affectedRows: 1 }, []]);

    const response = await request(app).delete(`/heroes/${hero.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hero deleted');
  });

  it('should return 404 when deleting a non-existing hero', async () => {
    connection.execute.mockResolvedValueOnce([{ affectedRows: 0 }, []]);

    const response = await request(app).delete('/heroes/not-found');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Hero not found');
  });
});
