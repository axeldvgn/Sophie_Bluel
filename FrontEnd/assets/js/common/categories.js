/* catégories : chargées une seule fois pour tout le site */
import { API } from '../config/config.js';
import { getJson } from './function.js';

export const categories = await getJson(API.categories) ?? [];
