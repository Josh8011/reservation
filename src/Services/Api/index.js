import { create } from './reservations'
import { getAvailable, getDistinctAvailable } from './sittings'

const sittings = { getAvailable, getDistinctAvailable };
const reservations = { create };

const fetchApi = {reservations, sittings};
export { fetchApi };