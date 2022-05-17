let baseUrl = "https://localhost:7271/api/reservations";

//REQUIRES (obj with following properties): customerNotes, noOfGuests, sittingId, reservationOriginId, firstName, lastName, email, phoneNumber, restaurantId
//API RETURNS: new reservation object that is created (Not currently utilised in this fetch).
const create = async (reservationDto) => {
    return await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationDto)
    })
    .then(response => {       
        if(response.ok){
            return response.json();
        }       
        return {...response,error:true} ;              
    });
};

export { create };


//DUMMY DATA BELOW

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