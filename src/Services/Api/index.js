import { postReservation } from './reservations'
import { getAvailable, getDistinctAvailable } from './sittings'

const sittings = { getAvailable, getDistinctAvailable };
const reservations = { postReservation };

const fetchApi = {reservations, sittings};
export { fetchApi };