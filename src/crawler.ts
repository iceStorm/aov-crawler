import * as cheerio from 'cheerio';
import axios from "axios";
import { Data, Skin, AttributesSet } from './types';
 './types';

export default (heroId: number): Promise<Data> => {
    return new Promise((resolve: any, reject) => {

        axios.get(`https://lienquan.garena.vn/tuong-chi-tiet/${heroId}`)
            .then(async response => {
                return resolve(await getData(response.data));
            })
            .catch(err => {
                console.log(err.message);
                return reject('error during process');
            });
    });
}


function getData(body: any) {
    return new Promise((resolve, reject) => {
        const $ = cheerio.load(body, { decodeEntities: false });
        let data = {} as Data;

        data.story = $('.bxskill .cont-skill #tab-2').text().trim();
        data.title = $('.skin-hero .title').first().text();
        data.attributes = getAttributes($);
        data.skins = getSkins($);
        
        return resolve(data);
    });
}

function getSkins($: cheerio.Root): Skin[] {
    let skins:Skin[] = [];

    $('.cont-skin .tabs-content-skin').each(function(index, elem) {
        const skinId = $(elem).attr('id');

        skins.push({
            id: skinId as string,
            url: `https://lienquan.garena.vn${$(elem).find('> img').first().attr('src')}`,
            icon: `https://lienquan.garena.vn${$(`.skin li a[href="#${skinId}"] > img`).attr('src')}`,
        });
    });

    return skins;
}

function getAttributes($: cheerio.Root): AttributesSet {
    let data = new AttributesSet();

    let firstCol = $('.bxnumeral .cont .col').first();
    let lastCol = $('.bxnumeral .cont .col').last();

    // physical
    data.physicalDamage.original = parseInt(firstCol.find('> p:nth-child(1) > .champion_stat').attr('data-original') as string);
    data.physicalDamage.increasing = parseInt(firstCol.find('> p:nth-child(1) > .champion_stat').attr('data-increase') as string);
    
    // magical
    data.magicalDamage.original = parseInt(firstCol.find('> p:nth-child(2) > .champion_stat').attr('data-original') as string);
    data.magicalDamage.increasing = parseInt(firstCol.find('> p:nth-child(2) > .champion_stat').attr('data-increase') as string);

    // hp
    data.maximumHP.original = parseInt(firstCol.find('> p:nth-child(3) > .champion_stat').attr('data-original') as string);
    data.maximumHP.increasing = parseInt(firstCol.find('> p:nth-child(3) > .champion_stat').attr('data-increase') as string);

    // physical armor
    data.armor.original = parseInt(firstCol.find('> p:nth-child(4) > .champion_stat').attr('data-original') as string);
    data.armor.increasing = parseInt(firstCol.find('> p:nth-child(4) > .champion_stat').attr('data-increase') as string);

    // magical armor
    data.magicalArmor.original = parseInt(firstCol.find('> p:nth-child(5) > .champion_stat').attr('data-original') as string);
    data.magicalArmor.increasing = parseInt(firstCol.find('> p:nth-child(5) > .champion_stat').attr('data-increase') as string);

    // attacking speed
    data.attackingSpeed.original = parseInt(firstCol.find('> p:nth-child(6) > .champion_stat').attr('data-original') as string);
    data.attackingSpeed.increasing = parseInt(firstCol.find('> p:nth-child(6) > .champion_stat').attr('data-increase') as string);



    // decreasing Skill recovery percents
    data.decreasingSkill.original = parseInt(lastCol.find('> p:nth-child(1) > .champion_stat').attr('data-original') as string);
    data.decreasingSkill.increasing = parseInt(lastCol.find('> p:nth-child(1) > .champion_stat').attr('data-increase') as string);
    
    // critical chance
    data.criticalChance.original = parseInt(lastCol.find('> p:nth-child(2) > .champion_stat').attr('data-original') as string);
    data.criticalChance.increasing = parseInt(lastCol.find('> p:nth-child(2) > .champion_stat').attr('data-increase') as string);

    // running speed
    data.speed.original = parseInt(lastCol.find('> p:nth-child(3) > .champion_stat').attr('data-original') as string);
    data.speed.increasing = parseInt(lastCol.find('> p:nth-child(3) > .champion_stat').attr('data-increase') as string);

    // hp recovery
    data.hpRecovery.original = parseInt(lastCol.find('> p:nth-child(4) > .champion_stat').attr('data-original') as string);
    data.hpRecovery.increasing = parseInt(lastCol.find('> p:nth-child(4) > .champion_stat').attr('data-increase') as string);

    // mana recovery
    data.manaRecovery.original = parseInt(lastCol.find('> p:nth-child(5) > .champion_stat').attr('data-original') as string);
    data.manaRecovery.increasing = parseInt(lastCol.find('> p:nth-child(5) > .champion_stat').attr('data-increase') as string);

    // attacking area
    data.attackingArea = lastCol.find('> p:nth-child(6) > .champion_stat').text().trim();

    return data;
}
