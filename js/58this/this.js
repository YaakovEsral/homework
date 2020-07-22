window.bank = window.bank || {};

window.bank.account = (function (account) {
    'use strict';

    account = {
        balance: 0,
        performTransaction: function (amount) {
            if (typeof amount === 'number') {
                this.balance += amount;
            } else {
                console.log('Please provide a number.');
            }

        }
    };

    function makeTransaction (amount){
        if (typeof amount === 'number') {
            this.balance += amount;
        } else {
            console.log('Please provide a number.');
        }
    }

    makeTransaction.call(account, 14);

    return account;
}(window.bank.account || {}));

console.log(window.bank);
console.log('balance after using this function(14)', window.bank.account.balance);

window.bank.account.performTransaction(57);

console.log('balance after using object function(57)', window.bank.account.balance);