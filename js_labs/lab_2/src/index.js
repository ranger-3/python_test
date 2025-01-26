import { getRandomActivity } from "./activity.js";

const activity = document.getElementById('activity');

document.getElementById('get-activity-btn').addEventListener('click', async function() {
    const result = await getRandomActivity();
    activity.innerHTML = result;
});
