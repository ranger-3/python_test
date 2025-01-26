/**
 * Function to get a random activity from the local JSON file.
 * @returns {Promise<string>} A promise that returns a string with the activity.
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('./activities.json');
        if (!response.ok) {
            throw new Error('Failed to load data');
        }

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex]; 
    } catch (error) {
        return 'Sorry, there was an error';
    }
}