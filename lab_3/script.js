/**
 * Class to represent a financial transaction.
 */
class Transaction {
    /**
     * Creates a new transaction object.
     * 
     * @param {number} id - Unique identifier for the transaction.
     * @param {Date} date - The date and time when the transaction was added.
     * @param {number} amount - The amount of the transaction.
     * @param {string} category - The category of the transaction.
     * @param {string} description - The description of the transaction.
     */
    constructor(id, date, amount, category, description) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }

    /**
     * Returns the first 4 words of the description as a short description.
     * 
     * @returns {string} - A short description (first 4 words).
     */
    getShortDescription() {
        return this.description.split(' ').slice(0, 4).join(' ');
    }
}

let transactions = [];
let transactionId = 1;

document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addTransaction();
});

function addTransaction() {
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;

    const transaction = new Transaction(transactionId++, new Date(), amount, category, description);

    transactions.push(transaction);

    addTransactionToTable(transaction);

    document.getElementById("transactionForm").reset();

    calculateTotal();
}

/**
 * Adds a transaction to the table.
 * 
 * @param {Transaction} transaction - The transaction object to be added to the table.
 */
function addTransactionToTable(transaction) {
    const tableBody = document.getElementById("transactionsTable").getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.dataset.id = transaction.id;
    row.classList.add(transaction.amount >= 0 ? "positive" : "negative");

    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date.toLocaleString()}</td>
        <td>${transaction.category}</td>
        <td>${transaction.getShortDescription()}</td>
        <td><button class="delete">Удалить</button></td>
    `;

    row.querySelector(".delete").addEventListener("click", function() {
        removeTransaction(transaction.id);
    });

    row.addEventListener("click", function() {
        showTransactionDetail(transaction);
    });
}

/**
 * Removes a transaction by its ID.
 * 
 * @param {number} id - The ID of the transaction to be removed.
 */
function removeTransaction(id) {
    // Remove the transaction from the transactions array
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Remove the corresponding row from the table
    const row = document.querySelector(`tr[data-id='${id}']`);
    row.remove();

    calculateTotal();
}

function calculateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

/**
 * Displays the full details of a transaction in the details section.
 * 
 * @param {Transaction} transaction - The transaction whose details are to be displayed.
 */
function showTransactionDetail(transaction) {
    const detailBlock = document.getElementById("transactionDetail");
    const fullDescription = document.getElementById("fullDescription");

    fullDescription.textContent = `Category: ${transaction.category}\nDescription: ${transaction.description}\nAmount: ${transaction.amount} $`;
}
