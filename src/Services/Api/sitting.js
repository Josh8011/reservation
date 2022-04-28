let baseUrl = "https://localhost:7271/api/sitting";

//RETURNS sittings and SETS state
const getSittings = async () =>
{
    //https://devtrium.com/posts/async-functions-useeffect
    return await fetch(baseUrl)
    .then( response => response.json());
};

export { getSittings };