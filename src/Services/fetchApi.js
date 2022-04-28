let baseUrl = "https://localhost:7271/api/reservation"; // For Reservation Api Controller

//RETURNS sittings and SETS state
const getSittings = async () =>
{
    //https://devtrium.com/posts/async-functions-useeffect
    return await fetch(baseUrl)
    .then( response => response.json());
};

//REQUIRES (obj with following properties): customerNotes, noOfGuests, sittingId, reservationOriginId, firstName, lastName, email, phoneNumber, restaurantId
//API RETURNS: new reservation object that is created (Not currently utilised in this fetch).
const postReservation = async (reservationDto) => {

    await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationDto)
    });
    // OPTIONAL, pass in an argument with setState function
    // .then(response => response.json())
    // .then(data => {
    //  --set state in here--
    // });
};

const FetchApi = { getSittings, postReservation };
export { FetchApi };


//
//DUMMY DATA 
//

// FOR postReservation :

// let reservationDto = {
//     noOfGuests: "4",
//     sittingId: 2,
//     reservationOriginId: 1,
//     customerNotes: "",
//     firstName: "Duke",
//     lastName: "Rowly",
//     phoneNumber: "0425259556",
//     email: "dukerowly@gmail.com",
//     restaurantId: 1
//   };