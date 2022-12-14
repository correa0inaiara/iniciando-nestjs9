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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BankAccountsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var bank_account_schema_1 = require("../@core/infra/db/bank-account.schema");
var BankAccountsService = /** @class */ (function () {
    function BankAccountsService(repo, dataSource) {
        this.repo = repo;
        this.dataSource = dataSource;
    }
    BankAccountsService.prototype.create = function (createBankAccountDto) {
        return __awaiter(this, void 0, void 0, function () {
            var bankAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bankAccount = this.repo.create({
                            account_number: createBankAccountDto.account_number,
                            balance: 0
                        });
                        return [4 /*yield*/, this.repo.insert(bankAccount)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, bankAccount];
                }
            });
        });
    };
    BankAccountsService.prototype.findAll = function () {
        return this.repo.find();
    };
    BankAccountsService.prototype.findOne = function (id) {
        return this.repo.findOneBy({ id: id });
    };
    BankAccountsService.prototype.update = function (id, updateBankAccountDto) {
        return "This action updates a #".concat(id, " bankAccount");
    };
    BankAccountsService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " bankAccount");
    };
    BankAccountsService.prototype.transfer = function (from, to, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, fromAccount, toAccount, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = this.dataSource.createQueryRunner();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 8]);
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.repo.findOneBy({ id: from })];
                    case 3:
                        fromAccount = _a.sent();
                        return [4 /*yield*/, this.repo.findOneBy({ id: to })];
                    case 4:
                        toAccount = _a.sent();
                        fromAccount.balance -= amount;
                        toAccount.balance += amount;
                        this.repo.save(fromAccount);
                        this.repo.save(toAccount);
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _a.sent();
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BankAccountsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(bank_account_schema_1.BankAccountSchema)),
        __param(1, (0, common_1.Inject)((0, typeorm_1.getDataSourceToken)()))
    ], BankAccountsService);
    return BankAccountsService;
}());
exports.BankAccountsService = BankAccountsService;
