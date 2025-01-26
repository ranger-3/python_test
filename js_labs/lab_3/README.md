## Project Description

This project is a personal finance tracker that allows users to record and manage transactions. Users can add transaction details such as category, amount, and description. The app calculates the total balance, displays a list of transactions, and allows users to remove transactions.
## Key Files of the Project

1. __index.html__ – The main HTML structure of the page.
2. __style.css__ – The styling for the webpage.
3. __script.js__ – The JavaScript logic that handles the addition, removal, and display of transactions, along with calculating the total balance.

## Project Documentation

1. __Transaction Class (__`Transaction`__):__
    + This class represents a financial transaction with properties such as `id`, `date`, `amount`, `category`, and `description`.
    + The `getShortDescription` method returns a shortened version of the description (first 4 words).

2. __Main JavaScript Logic:__

    + __Form Submission:__ When the user submits the form, the `addTransaction` function is triggered, creating a new `Transaction` and adding it to the table.
    + __Table Rendering:__ Each transaction is added to the table with its ID, date, category, description (shortened), and a "Delete" button.
    + __Transaction Deletion:__ Clicking the "Delete" button removes the transaction from both the table and the `transactions` array.
    + __Total Calculation:__ The `calculateTotal` function computes the total sum of all transactions and updates the balance displayed on the page.
    + __Transaction Details:__ Clicking on a transaction row shows full details (category, description, and amount) in a detailed section.

3. __HTML Structure:__

    + The page consists of a form to input transaction data, a table to list transactions, a section displaying the total amount, and another section for transaction details.

## Usage Example

1. __After opening the project in your browser__, you'll see a form to add a new transaction.

    + You can input a category (e.g., "Groceries"), a transaction amount (e.g., 100), and a description (e.g., "Bought food and drinks").
    + After submitting, the transaction will appear in the table.

2. __Transaction Table:__:
   + Each transaction is listed with its ID, date, category, a short description (first 4 words), and a "Delete" button.
   + Transactions with positive amounts will be highlighted with a green background, and those with negative amounts will have a red background.

3. __Transaction Deletion:__
    + Clicking the "Delete" button for a transaction removes it from both the table and the `transactions` array.

4. __Transaction Details:__
    + Clicking on any transaction row will display its full details (category, description, amount) below the table.