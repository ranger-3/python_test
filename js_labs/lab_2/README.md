## Description of the Project

This project is a simple webpage where a user can click a button to receive a random activity suggestion. The list of activities is loaded from a JSON file, and a random activity is displayed on the screen.

**Main Files:**

+ `index.html` – The main HTML file containing the page structure.
+ `activities.json` – The file that holds the list of available activities.
+ `src/activity.js` – The JavaScript function that handles fetching a random activity.
+ `src/index.js` – The JavaScript file that handles button click events and displays the activity.

## Brief Documentation of the Project

1. `getRandomActivity` **Function:**
    + This async function loads the `activities.json` file using `fetch`.
    + Once the data is loaded, it randomly selects an activity from the list.
    + If an error occurs, it returns the string `'Sorry, there was an error'`.

2. **Main Script (**`index.js`**):**
    + Listens for the click event on the button with id get-activity-btn.
    + When the button is clicked, it calls getRandomActivity.
    + The resulting activity is displayed in the element with id activity.

3. **HTML Page (**`index.html`**):**

    + Contains a button and a placeholder for displaying the random activity.
    + References the external stylesheet `index.css` for styling and the JavaScript file `src/index.js` for functionality.

4. **JSON File (**`activities.json`**):**

    + Holds the list of activities that can be randomly chosen. It is used by the `getRandomActivity` function.

## Examples of Using the Project with Screenshots or Code Snippets

1. **After Launching the Project, Open the Page in a Browser:** The page will look like this:
    + The title "Hey, Captain Smith, you can:" will be at the top.
    + Below that, a placeholder will be shown for the activity.
    + A "Get Activity" button will be available.

2. **Button Click:** When the button is clicked, a random activity will be displayed, for example:
    + "Go to the gym"
    + "Read a book"