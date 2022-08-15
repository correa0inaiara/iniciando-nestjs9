"use strict";
exports.__esModule = true;
exports.BankAccount = void 0;
var BankAccount = /** @class */ (function () {
    function BankAccount(id, balance, account_number) {
        this.id = id;
        this.balance = balance;
        this.account_number = account_number;
    }
    BankAccount.prototype.debit = function (amount) {
        this.balance -= amount;
    };
    BankAccount.prototype.credit = function (amount) {
        this.balance += amount;
    };
    return BankAccount;
}());
exports.BankAccount = BankAccount;
// criar
// depositar
// creditar
