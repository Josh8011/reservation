let baseUrl = "https://localhost:7271/api/persons";

const findPeople = async (data) =>
{
    if(data){
        return await fetch(`${baseUrl}/find-people/${data.replace(/\s+/g, '')}`)
                        .then( response => response.json());
    }
    else{
        return null
    }
};

export { findPeople };