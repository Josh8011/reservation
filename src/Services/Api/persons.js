let baseUrl = "https://tas122.azurewebsites.net/api/persons";

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