"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.GuidesSet = exports.ArcanasSet = exports.SkillSet = exports.AttributesSet = exports.PreferedEquipment = exports.Skill = exports.Arcana = exports.Numeral = exports.Skin = void 0;
class Skin {
}
exports.Skin = Skin;
class Numeral {
}
exports.Numeral = Numeral;
class Arcana {
}
exports.Arcana = Arcana;
class Skill {
}
exports.Skill = Skill;
class PreferedEquipment {
}
exports.PreferedEquipment = PreferedEquipment;
// ---------------------------------------
class AttributesSet {
    constructor() {
        this.physicalDamage = new Numeral();
        this.magicalDamage = new Numeral();
        this.maximumHP = new Numeral();
        this.armor = new Numeral();
        this.magicalArmor = new Numeral();
        this.attackingSpeed = new Numeral();
        this.decreasingSkill = new Numeral();
        this.criticalChance = new Numeral();
        this.speed = new Numeral();
        this.hpRecovery = new Numeral();
        this.manaRecovery = new Numeral();
    }
}
exports.AttributesSet = AttributesSet;
class SkillSet {
    constructor() {
        this.ability = new Skill();
        this.first = new Skill();
        this.second = new Skill();
        this.ultimate = new Skill();
    }
}
exports.SkillSet = SkillSet;
class ArcanasSet {
    constructor() {
        this.red = new Arcana();
        this.purple = new Arcana();
        this.green = new Arcana();
    }
}
exports.ArcanasSet = ArcanasSet;
class GuidesSet {
    constructor() {
        this.notes = '';
        this.preferedArcarnas = new ArcanasSet();
        this.preferedEquipments = [];
    }
}
exports.GuidesSet = GuidesSet;
class Data {
    constructor() {
        this.skins = [];
        this.attributes = new AttributesSet();
        this.skills = new SkillSet();
        this.guides = new GuidesSet();
    }
}
exports.Data = Data;
