let baseUrl = "https://localhost:7271/api/sittings";

const getAvailable = async (startDate, endDate) =>
{
    let startDateIso = new Date(startDate).toISOString();

    if(endDate === undefined){
        return await fetch(`${baseUrl}/available/${startDateIso}`)
                        .then( response => response.json());
    }
    else{
        let endDateIso = new Date(endDate).toISOString();
        return await fetch(`${baseUrl}/available/${startDateIso}/${endDateIso}`)
                        .then( response => response.json());
    }
};

const getDayTypes = async (date) =>
{
    let dateIso = new Date(date).toISOString();

    return await fetch(`${baseUrl}/day-types/${dateIso}`)
                    .then( response => response.json());
};

const getDistinctAvailable = async (month) =>
{
    return await fetch(`${baseUrl}/distinct-available/${month}`)
                    .then( response => response.json());
};

export { getAvailable, getDistinctAvailable, getDayTypes };