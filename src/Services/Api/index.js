import { create } from './reservations'
import { getAvailable, getDistinctAvailable, getDayTypes } from './sittings'

const sittings = { getAvailable, getDistinctAvailable, getDayTypes};
const reservations = { create };

const fetchApi = {reservations, sittings};
export { fetchApi };