let baseUrl = "https://localhost:7271/api/persons";

const findPeople = async (data) =>
{
    debugger;
    if(data){
        return await fetch(`${baseUrl}/findPeople/${data}`)
                        .then( response => response.json());
    }
    else{
        return null
    }
};

export { findPeople };