import axios from 'axios';
import type { activatePayload } from '../hooks/useHeroes';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getHeroes = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const createHero = async (hero: {
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url: string;
}) => {
  const response = await api.post('/heroes', hero);
  return response.data;
};

export const deleteHero = async (heroId: string) => {
  const response = await api.delete(`/heroes/${heroId}`);
  return response.data;
};

export const updateHero = async (heroId: string, hero: {
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url: string;
} | activatePayload) => {
  const response = await api.put(`/heroes/${heroId}`, hero);
  return response.data;
};