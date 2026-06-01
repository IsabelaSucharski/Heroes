const mockCreatePool = jest.fn(() => ({
  execute: jest.fn(),
}));

jest.mock('mysql2/promise', () => ({
  createPool: mockCreatePool,
}));

describe('database connection', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    mockCreatePool.mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should create a pool with default configuration', () => {
    const connection = require('../database/connection');

    expect(mockCreatePool).toHaveBeenCalledWith({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'heroes',
      waitForConnections: true,
    });
    expect(connection).toHaveProperty('execute');
  });

  it('should use environment variables when provided', () => {
    process.env.DB_HOST = 'test-host';
    process.env.DB_PORT = '3333';
    process.env.DB_USER = 'test-user';
    process.env.DB_PASSWORD = 'test-password';
    process.env.DB_NAME = 'test-db';

    const connection = require('../database/connection');

    expect(mockCreatePool).toHaveBeenCalledWith({
      host: 'test-host',
      port: 3333,
      user: 'test-user',
      password: 'test-password',
      database: 'test-db',
      waitForConnections: true,
    });
    expect(connection).toHaveProperty('execute');
  });
});
