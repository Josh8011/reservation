import { postReservation } from './reservations'
import { getAll, getAvailable } from './sittings'

const sittings = { getAll, getAvailable };
const reservations = { postReservation };

const fetchApi = {reservations, sittings};
export { fetchApi };