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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
'./types';
exports.default = (heroId) => {
    return new Promise((resolve, reject) => {
        axios_1.default.get(`https://lienquan.garena.vn/tuong-chi-tiet/${heroId}`)
            .then(async (response) => {
            return resolve(await getData(response.data));
        })
            .catch(err => {
            console.log(err.message);
            return reject('error during process');
        });
    });
};
function getData(body) {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(body, { decodeEntities: false });
        let data = {};
        data.story = $('.bxskill .cont-skill #tab-2').text().trim();
        data.title = $('.skin-hero .title').first().text();
        data.attributes = getAttributes($);
        data.skins = getSkins($);
        return resolve(data);
    });
}
function getSkins($) {
    let skins = [];
    $('.cont-skin .tabs-content-skin').each(function (index, elem) {
        const skinId = $(elem).attr('id');
        skins.push({
            id: skinId,
            url: `https://lienquan.garena.vn${$(elem).find('> img').first().attr('src')}`,
            icon: `https://lienquan.garena.vn${$(`.skin li a[href="#${skinId}"] > img`).attr('src')}`,
        });
    });
    return skins;
}
function getAttributes($) {
    let data = new types_1.AttributesSet();
    let firstCol = $('.bxnumeral .cont .col').first();
    let lastCol = $('.bxnumeral .cont .col').last();
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
    // attacking area
    data.attackingArea = lastCol.find('> p:nth-child(6) > .champion_stat').text().trim();
    return data;
}
