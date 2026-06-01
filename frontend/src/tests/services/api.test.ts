import { api, getHeroes, createHero, deleteHero, updateHero } from '../../services/api';
import { vi } from 'vitest';

describe('api service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getHeroes', () => {
    it('deve buscar heróis', async () => {
      const mockResponse = {
        data: [{ id: '1', name: 'Batman' }],
      };

      const getSpy = vi
        .spyOn(api, 'get')
        .mockResolvedValue(mockResponse);

      const result = await getHeroes('/heroes');

      expect(getSpy).toHaveBeenCalledWith('/heroes');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createHero', () => {
    it('deve criar um herói', async () => {
      const hero = {
        name: 'Batman',
        nickname: 'Morcego',
        date_of_birth: '1939-05-01',
        universe: 'DC',
        main_power: 'Dinheiro',
        avatar_url: 'avatar.jpg',
      };

      const mockResponse = {
        data: { id: '1', ...hero },
      };

      const postSpy = vi
        .spyOn(api, 'post')
        .mockResolvedValue(mockResponse);

      const result = await createHero(hero);

      expect(postSpy).toHaveBeenCalledWith('/heroes', hero);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('deleteHero', () => {
    it('deve remover um herói', async () => {
      const mockResponse = {
        data: { success: true },
      };

      const deleteSpy = vi
        .spyOn(api, 'delete')
        .mockResolvedValue(mockResponse);

      const result = await deleteHero('123');

      expect(deleteSpy).toHaveBeenCalledWith('/heroes/123');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('updateHero', () => {
    it('deve atualizar um herói', async () => {
      const payload = {
        name: 'Batman',
        nickname: 'Dark Knight',
        date_of_birth: '1939-05-01',
        universe: 'DC',
        main_power: 'Dinheiro',
        avatar_url: 'avatar.jpg',
      };

      const mockResponse = {
        data: { success: true },
      };

      const putSpy = vi
        .spyOn(api, 'put')
        .mockResolvedValue(mockResponse);

      const result = await updateHero('123', payload);

      expect(putSpy).toHaveBeenCalledWith(
        '/heroes/123',
        payload
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('deve atualizar apenas o status ativo', async () => {
      const payload = {
        is_active: false,
      };

      const mockResponse = {
        data: { success: true },
      };

      const putSpy = vi
        .spyOn(api, 'put')
        .mockResolvedValue(mockResponse);

      const result = await updateHero('123', payload);

      expect(putSpy).toHaveBeenCalledWith(
        '/heroes/123',
        payload
      );

      expect(result).toEqual(mockResponse.data);
    });
  });
});