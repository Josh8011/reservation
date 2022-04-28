import { postReservation } from './reservations'
import { getAll, getAvailable, getDistinctAvailable } from './sittings'

const sittings = { getAll, getAvailable, getDistinctAvailable };
const reservations = { postReservation };

const fetchApi = {reservations, sittings};
export { fetchApi };