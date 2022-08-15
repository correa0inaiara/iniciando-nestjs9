"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.BankAccountsController = void 0;
var common_1 = require("@nestjs/common");
var BankAccountsController = /** @class */ (function () {
    function BankAccountsController(bankAccountsService, bankAccountService) {
        this.bankAccountsService = bankAccountsService;
        this.bankAccountService = bankAccountService;
    }
    BankAccountsController.prototype.create = function (createBankAccountDto) {
        return this.bankAccountService.create(createBankAccountDto.account_number);
    };
    BankAccountsController.prototype.findAll = function () {
        return this.bankAccountsService.findAll();
    };
    BankAccountsController.prototype.findOne = function (id) {
        return this.bankAccountsService.findOne(id);
    };
    BankAccountsController.prototype.update = function (id, updateBankAccountDto) {
        return this.bankAccountsService.update(id, updateBankAccountDto);
    };
    BankAccountsController.prototype.remove = function (id) {
        return this.bankAccountsService.remove(id);
    };
    BankAccountsController.prototype.transfer = function (transferDto) {
        return this.bankAccountService.transfer(transferDto.from, transferDto.to, transferDto.amount);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], BankAccountsController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], BankAccountsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BankAccountsController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], BankAccountsController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], BankAccountsController.prototype, "remove");
    __decorate([
        (0, common_1.HttpCode)(204),
        (0, common_1.Post)('/transfer'),
        __param(0, (0, common_1.Body)())
    ], BankAccountsController.prototype, "transfer");
    BankAccountsController = __decorate([
        (0, common_1.Controller)('bank-accounts')
    ], BankAccountsController);
    return BankAccountsController;
}());
exports.BankAccountsController = BankAccountsController;
