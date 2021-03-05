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
exports.default = (heroId) => {
    return new Promise((resolve, reject) => {
        axios_1.default.get(`https://lienquan.garena.vn/tuong-chi-tiet/${heroId}`)
            .then(async (response) => {
            try {
                let tasks = [];
                tasks.push(getData(response.data));
                tasks.push(getType(heroId));
                let results = await Promise.all(tasks);
                results[0].type = results[1];
                console.log('type:', results[1]);
                return resolve(results[0]);
            }
            catch (error) {
                return resolve(error);
            }
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
        data.title = $('.skin-hero .title').first().text();
        data.guides = getGuides($);
        data.skills = getSkills($);
        data.skins = getSkins($);
        data.attributes = getAttributes($);
        data.story = $('.bxskill .cont-skill #tab-2').text().trim();
        return resolve(data);
    });
}
function getType(id) {
    return new Promise((resolve, reject) => {
        axios_1.default.get('https://lienquan.garena.vn/tuong')
            .then((response) => {
            let $ = cheerio.load(response.data);
            const type = $('.list-champion').find(`.heroes .name[data-id="${id}"]`).attr('data-type');
            return resolve(type);
        })
            .catch((err) => {
            console.log(err);
            return (resolve(null));
        });
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
    // attacking range
    data.attackingRange = lastCol.find('> p:nth-child(6) > .champion_stat').text().trim();
    return data;
}
function getSkills($) {
    let ability = $('.bxskill .cont-skill #tab-1 .col-skill:first-child .item-skill:first-child');
    let first = $('.bxskill .cont-skill #tab-1 .col-skill:first-child .item-skill:last-child');
    let second = $('.bxskill .cont-skill #tab-1 .col-skill:last-child .item-skill:first-child');
    let ultimate = $('.bxskill .cont-skill #tab-1 .col-skill:last-child .item-skill:last-child');
    let data = new types_1.SkillSet();
    data.ability = getSkillDetail(ability);
    data.first = getSkillDetail(first);
    data.second = getSkillDetail(second);
    data.ultimate = getSkillDetail(ultimate);
    return data;
}
function getSkillDetail($) {
    let data = new types_1.Skill();
    data.iconURl = 'https://lienquan.garena.vn' + $.find('.img-skill > img').attr('src');
    data.name = $.find('.in-skill .name').text().trim();
    data.countDown = $.find('.in-skill .txt:nth-of-type(1)').text().trim().split('Hồi chiêu: ')[1].split(' giây')[0];
    data.manaConsumption = $.find('.in-skill .txt:nth-of-type(2)').text().trim().split('Tiêu hao: ')[1].split('năng lượng')[0].trim();
    data.content = $.find('.in-skill .txt:nth-of-type(3)').html();
    data.videoUrl = $.find('.in-skill div:last-child a').attr('href');
    return data;
}
function getGuides($) {
    let root = $('.bxskill .cont-skill #tab-4');
    let data = new types_1.GuidesSet();
    data.introducingUrl = root.find('p:first-child iframe').attr('src');
    data.preferedLane = root.find('p:nth-child(2) span').text().split(':')[1];
    // Prefered equipments
    root.find('table:last-of-type tbody tr').each(function (index, elem) {
        let iconURl = $(elem).find('td:first-child img').attr('src');
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
        data.notes += $(elem).text() + '\n';
    });
    // skill increase ordering
    // root.find('> *').each((index, elem) => {
    //     if ($(elem).text().trim().includes('Thứ tự tăng chiêu')) {
    //         console.log(index);
    //     }
    // });
    return data;
}
