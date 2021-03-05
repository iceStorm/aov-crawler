"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = __importStar(require("cheerio"));
var axios_1 = __importDefault(require("axios"));
var types_1 = require("./types");
exports.default = (function (heroId) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get("https://lienquan.garena.vn/tuong-chi-tiet/" + heroId)
            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            var tasks, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tasks = [];
                        tasks.push(getData(response.data));
                        tasks.push(getType(heroId));
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 1:
                        results = _a.sent();
                        results[0].type = results[1];
                        console.log('type:', results[1]);
                        return [2 /*return*/, resolve(results[0])];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, resolve(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            console.log(err.message);
            return reject('error during process');
        });
    });
});
function getData(body) {
    return new Promise(function (resolve, reject) {
        var _a;
        var $ = cheerio.load(body, { decodeEntities: false });
        var data = {};
        data.title = $('.skin-hero .title').first().text();
        data.guides = getGuides($);
        data.skills = getSkills($);
        data.skins = getSkins($);
        data.attributes = getAttributes($);
        data.story = (_a = $('.bxskill .cont-skill #tab-2').html()) === null || _a === void 0 ? void 0 : _a.trim();
        return resolve(data);
    });
}
function getType(id) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get('https://lienquan.garena.vn/tuong')
            .then(function (response) {
            var $ = cheerio.load(response.data);
            var type = $('.list-champion').find(".heroes .name[data-id=\"" + id + "\"]").attr('data-type');
            return resolve(type);
        })
            .catch(function (err) {
            console.log(err);
            return (resolve(null));
        });
    });
}
function getSkins($) {
    var skins = [];
    $('.cont-skin .tabs-content-skin').each(function (index, elem) {
        var skinId = $(elem).attr('id');
        skins.push({
            id: skinId,
            url: "https://lienquan.garena.vn" + $(elem).find('> img').first().attr('src'),
            icon: "https://lienquan.garena.vn" + $(".skin li a[href=\"#" + skinId + "\"] > img").attr('src'),
        });
    });
    return skins;
}
function getAttributes($) {
    var data = new types_1.AttributesSet();
    var firstCol = $('.bxnumeral .cont .col').first();
    var lastCol = $('.bxnumeral .cont .col').last();
    // physical
    data.physicalDamage.original = parseInt(firstCol.find('> p:nth-child(1) > .champion_stat').attr('data-original'));
    data.physicalDamage.increasing = parseInt(firstCol.find('> p:nth-child(1) > .champion_stat').attr('data-increase'));
    // magical
    data.magicalDamage.original = parseInt(firstCol.find('> p:nth-child(2) > .champion_stat').attr('data-original'));
    data.magicalDamage.increasing = parseInt(firstCol.find('> p:nth-child(2) > .champion_stat').attr('data-increase'));
    // hp
    data.maximumHP.original = parseInt(firstCol.find('> p:nth-child(3) > .champion_stat').attr('data-original'));
    data.maximumHP.increasing = parseInt(firstCol.find('> p:nth-child(3) > .champion_stat').attr('data-increase'));
    // physical armor
    data.armor.original = parseInt(firstCol.find('> p:nth-child(4) > .champion_stat').attr('data-original'));
    data.armor.increasing = parseInt(firstCol.find('> p:nth-child(4) > .champion_stat').attr('data-increase'));
    // magical armor
    data.magicalArmor.original = parseInt(firstCol.find('> p:nth-child(5) > .champion_stat').attr('data-original'));
    data.magicalArmor.increasing = parseInt(firstCol.find('> p:nth-child(5) > .champion_stat').attr('data-increase'));
    // attacking speed
    data.attackingSpeed.original = parseInt(firstCol.find('> p:nth-child(6) > .champion_stat').attr('data-original'));
    data.attackingSpeed.increasing = parseInt(firstCol.find('> p:nth-child(6) > .champion_stat').attr('data-increase'));
    // decreasing Skill recovery percents
    data.decreasingSkill.original = parseInt(lastCol.find('> p:nth-child(1) > .champion_stat').attr('data-original'));
    data.decreasingSkill.increasing = parseInt(lastCol.find('> p:nth-child(1) > .champion_stat').attr('data-increase'));
    // critical chance
    data.criticalChance.original = parseInt(lastCol.find('> p:nth-child(2) > .champion_stat').attr('data-original'));
    data.criticalChance.increasing = parseInt(lastCol.find('> p:nth-child(2) > .champion_stat').attr('data-increase'));
    // running speed
    data.speed.original = parseInt(lastCol.find('> p:nth-child(3) > .champion_stat').attr('data-original'));
    data.speed.increasing = parseInt(lastCol.find('> p:nth-child(3) > .champion_stat').attr('data-increase'));
    // hp recovery
    data.hpRecovery.original = parseInt(lastCol.find('> p:nth-child(4) > .champion_stat').attr('data-original'));
    data.hpRecovery.increasing = parseInt(lastCol.find('> p:nth-child(4) > .champion_stat').attr('data-increase'));
    // mana recovery
    data.manaRecovery.original = parseInt(lastCol.find('> p:nth-child(5) > .champion_stat').attr('data-original'));
    data.manaRecovery.increasing = parseInt(lastCol.find('> p:nth-child(5) > .champion_stat').attr('data-increase'));
    // attacking range
    data.attackingRange = lastCol.find('> p:nth-child(6) > .champion_stat').text().trim();
    return data;
}
function getSkills($) {
    var ability = $('.bxskill .cont-skill #tab-1 .col-skill:first-child .item-skill:first-child');
    var first = $('.bxskill .cont-skill #tab-1 .col-skill:first-child .item-skill:last-child');
    var second = $('.bxskill .cont-skill #tab-1 .col-skill:last-child .item-skill:first-child');
    var ultimate = $('.bxskill .cont-skill #tab-1 .col-skill:last-child .item-skill:last-child');
    var data = new types_1.SkillSet();
    data.ability = getSkillDetail(ability);
    data.first = getSkillDetail(first);
    data.second = getSkillDetail(second);
    data.ultimate = getSkillDetail(ultimate);
    return data;
}
function getSkillDetail($) {
    var _a;
    var data = new types_1.Skill();
    data.iconURl = 'https://lienquan.garena.vn' + $.find('.img-skill > img').attr('src');
    data.name = $.find('.in-skill .name').text().trim();
    data.countDown = $.find('.in-skill .txt:nth-of-type(1)').text().trim().split('Hồi chiêu: ')[1].split(' giây')[0];
    data.manaConsumption = $.find('.in-skill .txt:nth-of-type(2)').text().trim().split('Tiêu hao: ')[1].split('năng lượng')[0].trim();
    data.content = (_a = $.find('.in-skill .txt:nth-of-type(3)').html()) === null || _a === void 0 ? void 0 : _a.trim();
    data.videoUrl = $.find('.in-skill div:last-child a').attr('href');
    return data;
}
function getGuides($) {
    var root = $('.bxskill .cont-skill #tab-4');
    var data = new types_1.GuidesSet();
    data.introducingUrl = root.find('p:first-child iframe').attr('src');
    data.preferedLane = root.find('p:nth-child(2) span').text().split(':')[1];
    // Prefered equipments
    root.find('table:last-of-type tbody tr').each(function (index, elem) {
        var iconURl = $(elem).find('td:first-child img').attr('src');
        iconURl = iconURl.replace('https://lienquan.garena.vn', '');
        data.preferedEquipments.push({
            iconUrl: 'https://lienquan.garena.vn' + iconURl,
            content: $(elem).find('td:last-child').text().trim(),
        });
    });
    // Arcana
    data.preferedArcarnas.red.content = root.find('table:nth-last-of-type(2) tbody tr:last-child td').first().text().trim();
    data.preferedArcarnas.red.imageUrl = 'https://lienquan.garena.vn/files/upload/images/Ng%E1%BB%8Dc/AD%20III.png';
    data.preferedArcarnas.purple.content = root.find('table:nth-last-of-type(2) tbody tr:last-child td:nth-child(2)').text().trim();
    data.preferedArcarnas.purple.imageUrl = 'https://lienquan.garena.vn/files/upload/images/Ng%E1%BB%8Dc/AS%20MS%20III.png';
    data.preferedArcarnas.green.content = root.find('table:nth-last-of-type(2) tbody tr:last-child td:nth-child(3)').text().trim();
    data.preferedArcarnas.green.imageUrl = 'https://lienquan.garena.vn/files/upload/images/Ng%E1%BB%8Dc/CDR%20III.png';
    // notes
    root.find('table:last-of-type').nextAll().each(function (index, elem) {
        var _a;
        data.notes += (_a = $(elem).html()) === null || _a === void 0 ? void 0 : _a.trim();
    });
    // skill increase ordering
    // root.find('> *').each((index, elem) => {
    //     if ($(elem).text().trim().includes('Thứ tự tăng chiêu')) {
    //         console.log(index);
    //     }
    // });
    return data;
}
