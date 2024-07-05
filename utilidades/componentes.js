import { SERVER_URL } from './constants.js';

// Function to fetch data from the API
export const fetchData = async (filename, action, form = null, dataprovisional = null) => {
    if (dataprovisional !== null) {
        return dataprovisional;
    } else {
        // Set the request options
        const OPTIONS = {};
        if (form) {
            OPTIONS.method = 'post';
            OPTIONS.body = form;
        } else {
            OPTIONS.method = 'get';
        }
        try {
            // Construct the server URL
            const PATH = `${SERVER_URL}/${filename}`;
            // Add the action parameter to the URL
            const URL_WITH_ACTION = `${PATH}?action=${action}`;
            // Send the request and get the response
            const RESPONSE = await fetch(URL_WITH_ACTION, OPTIONS);
            // Return the response in JSON format
            return await RESPONSE.json();
        } catch (error) {
            // Log the error to the console
            console.log(error);
        }
    }
}
