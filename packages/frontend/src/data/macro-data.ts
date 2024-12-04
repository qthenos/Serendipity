
export const fetchMacroData = (date: string) => {
    const url = `http://localhost:3000/api/charts/macro-data?date=${date}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then((data) => {
            console.log('Data fetched:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return []; 
        });
}
