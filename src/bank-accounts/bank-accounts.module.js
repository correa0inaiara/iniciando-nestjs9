"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BankAccountsModule = void 0;
var common_1 = require("@nestjs/common");
var bank_accounts_service_1 = require("./bank-accounts.service");
var bank_accounts_controller_1 = require("./bank-accounts.controller");
var typeorm_1 = require("@nestjs/typeorm");
var bank_account_schema_1 = require("../@core/infra/db/bank-account.schema");
var bank_account_service_1 = require("../@core/domain/bank-account.service");
var bank_account_typeorm_repository_1 = require("../@core/infra/db/bank-account-typeorm.repository");
var BankAccountsModule = /** @class */ (function () {
    function BankAccountsModule() {
    }
    BankAccountsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([bank_account_schema_1.BankAccountSchema])
            ],
            controllers: [bank_accounts_controller_1.BankAccountsController],
            providers: [
                bank_accounts_service_1.BankAccountsService,
                {
                    provide: bank_account_typeorm_repository_1.BankAccountTypeOrmRepository,
                    useFactory: function (datasource) {
                        return new bank_account_typeorm_repository_1.BankAccountTypeOrmRepository(datasource.getRepository(bank_account_schema_1.BankAccountSchema));
                    },
                    inject: [(0, typeorm_1.getDataSourceToken)()]
                },
                {
                    provide: bank_account_service_1.BankAccountService,
                    useFactory: function (repo) {
                        return new bank_account_service_1.BankAccountService(repo);
                    },
                    inject: [bank_account_typeorm_repository_1.BankAccountTypeOrmRepository]
                }
            ]
        })
    ], BankAccountsModule);
    return BankAccountsModule;
}());
exports.BankAccountsModule = BankAccountsModule;
