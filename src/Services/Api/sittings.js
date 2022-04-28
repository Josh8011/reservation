let baseUrl = "https://localhost:7271/api/sittings";
const getAll = async () =>
{
    return await fetch(`${baseUrl}/all`)
    .then( response => response.json());
};

// Gets next four weeks of sitting
const getAvailable = async (year, month, day) =>
{
    return await fetch(`${baseUrl}/available/${year}-${month}-${day}`)
    .then( response => response.json());
};

const getDistinctAvailable = async (month) =>
{
    return await fetch(`${baseUrl}/distinct-available/${month}`)
    .then( response => response.json());
};

export { getAll, getAvailable, getDistinctAvailable };