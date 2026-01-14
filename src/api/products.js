/*
 * Function for fetching data from Google Apps Script
 * Supports optional category and bestSeller filtering
 */
export async function getData(category = "", bestSeller = false) {
    // Google Apps Script URL
    // Google Apps Script URL
    const GOOGLE_API_URL = import.meta.env.VITE_GOOGLE_API_URL;

    console.log("Using API URL:", GOOGLE_API_URL);

    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // If a category is specified, add it to the parameters
    if (category && category !== "الكل") {
        params.append("category", category);
    }

    // If bestSeller is true, add it to the parameters
    if (bestSeller) {
        params.append("bestSeller", "true");
    }

    // Convert the parameters to a query string
    const queryString = params.toString();
    const url = queryString ? `${GOOGLE_API_URL}?${queryString}` : GOOGLE_API_URL;

    console.log("Fetching URL:", url);

    console.log(`[API] Fetching URL: ${url}`);

    try {
        const res = await fetch(url);
        console.log(`[API] Response Status: ${res.status}`);

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`[API] Error Body:`, errorText);
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log(`[API] Fetched Data (First 3 items):`, data.slice(0, 3));
        return data;
    } catch (err) {
        console.error(`[API] Fetch Error:`, err);
        throw err;
    }
}
