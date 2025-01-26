const fs = require('fs');

const transactionsData = JSON.parse(fs.readFileSync('transactions.json', 'utf-8'));

class TransactionAnalyzer {
    /**
     * @param {Array<Object>}
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Adds a new transaction to the list.
     * @param {Object} transaction
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Returns all transactions.
     * @returns {Array<Object>}
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Returns unique transaction types.
     * @returns {Array<string>}
     */
    getUniqueTransactionTypes() {
        const transactionTypes = new Set();
        this.transactions.forEach(transaction => transactionTypes.add(transaction.transaction_type));
        return Array.from(transactionTypes);
    }

    /**
     * Calculates the total amount of all transactions.
     * @returns {number}
     */
    calculateTotalAmount() {
        return this.transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    }

    /**
     * Calculates the total amount of transactions for a specified year, month, and day.
     * The year, month, and day parameters are optional.
     * @param {number} [year]
     * @param {number} [month]
     * @param {number} [day]
     * @returns {number}
     */
    
    calculateTotalAmountByDate(year, month, day) {
        const filteredTransactions = this.transactions.filter(transaction => {
            const date = new Date(transaction.transaction_date);
            
            let isYearMatch = true;
            if (year) {
                isYearMatch = date.getFullYear() === year;
            }
            
            let isMonthMatch = true;
            if (month) {
                isMonthMatch = date.getMonth() + 1 === month;
            }
            
            let isDayMatch = true;
            if (day) {
                isDayMatch = date.getDate() === day;
            }
            
            return isYearMatch && isMonthMatch && isDayMatch;
        });
    
        return filteredTransactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    }

    
    /**
     * Returns transactions of a specific type.
     * @param {string}
     * @returns {Array<Object>}
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Returns transactions that occurred within the specified date range.
     * @param {string}
     * @param {string}
     * @returns {Array<Object>}
     */
    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= start && transactionDate <= end;
        });
    }

    /**
     * Returns transactions made with the specified merchant.
     * @param {string} merchantName
     * @returns {Array<Object>}
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Calculates the average amount of all transactions.
     * @returns {number}
     */
    calculateAverageTransactionAmount() {
        if (this.transactions.length === 0) return 0;
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    /**
     * Returns transactions with an amount within a specified range.
     * @param {number} minAmount
     * @param {number} maxAmount
     * @returns {Array<Object>}
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
    }

    /**
     * Calculates the total amount of debit transactions.
     * @returns {number}
     */
    calculateTotalDebitAmount() {
        const debitTransactions = this.getTransactionByType('debit');
        return debitTransactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
    }

    /**
     * Finds the month with the highest number of transactions.
     * @returns {number}
     */
    findMostTransactionsMonth() {
        const monthCounts = {};
        this.transactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            monthCounts[month] = (monthCounts[month] || 0) + 1;
        });
        const maxMonth = Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
        return maxMonth;
    }

    /**
     * Finds the month with the highest number of debit transactions.
     * @returns {number}
     */
    findMostDebitTransactionMonth() {
        const debitTransactions = this.getTransactionByType('debit');
        const monthCounts = {};
        debitTransactions.forEach(transaction => {
            const month = new Date(transaction.transaction_date).getMonth();
            monthCounts[month] = (monthCounts[month] || 0) + 1;
        });
        const maxMonth = Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
        return maxMonth;
    }

    /**
     * Determines which transaction type occurs most frequently.
     * @returns {string} 'debit' if debit transactions are more frequent, 
     * 'credit' if credit transactions are more frequent, 
     * 'equal' if both types have the same number of transactions.
     */
    mostTransactionTypes() {
        const debitCount = this.getTransactionByType('debit').length;
        const creditCount = this.getTransactionByType('credit').length;

        if (debitCount > creditCount) return 'debit';
        if (creditCount > debitCount) return 'credit';
        return 'equal';
    }

    /**
     * Returns transactions made before the specified date.
     * @param {string} date The date in 'YYYY-MM-DD' format.
     * @returns {Array<Object>}
     */
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.transactions.filter(transaction => new Date(transaction.transaction_date) < targetDate);
    }

    /**
     * Finds a transaction by its unique ID.
     * @param {string} id The unique transaction ID.
     * @returns {Object|null}
     */
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    /**
     * Returns an array of all transaction descriptions.
     * @returns {Array<string>}
     */
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }

    /**
     * Returns a string representation of all transactions in JSON format.
     * @returns {string}
     */
    string() {
        return JSON.stringify(this.transactions, null, 2);
    }
}

// Example usage of the class
const analyzer = new TransactionAnalyzer(transactionsData);

console.log('Unique transaction types:', analyzer.getUniqueTransactionTypes());
console.log('Total amount of transactions:', analyzer.calculateTotalAmount());
console.log('Average transaction amount:', analyzer.calculateAverageTransactionAmount());
console.log('Debit transactions:', analyzer.getTransactionByType('debit'));
console.log('Transactions in January 2019:', analyzer.calculateTotalAmountByDate(2019, 1));
