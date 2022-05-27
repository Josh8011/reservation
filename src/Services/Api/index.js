import { create } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'
import {findPeople} from './persons'

const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create };
const persons = {findPeople};

const fetchApi = {reservations, sittings, persons};
export { fetchApi };