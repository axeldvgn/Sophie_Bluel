/* travaux : liste partagée, chargée depuis l'API */
import { API } from '../config/config.js';
import { getJson } from './http.js';

/* chargés une fois au démarrage */
export let works = await getJson(API.works);
