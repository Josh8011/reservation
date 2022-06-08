let baseUrl = "https://localhost:7271/api/persons";

const getUser = async () => {
    return await fetch(`${baseUrl}/get-user`)
        .then( response => response.json());
};

export { getUser };

