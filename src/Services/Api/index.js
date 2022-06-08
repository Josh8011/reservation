import { create } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'
import { getUser } from './persons'

const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create };
const persons = { getUser }

const fetchApi = {reservations, sittings, persons};
export { fetchApi };