"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.GuidesSet = exports.ArcanasSet = exports.SkillSet = exports.AttributesSet = exports.PreferedEquipment = exports.Skill = exports.Arcana = exports.Numeral = exports.Skin = void 0;
var Skin = /** @class */ (function () {
    function Skin() {
    }
    return Skin;
}());
exports.Skin = Skin;
var Numeral = /** @class */ (function () {
    function Numeral() {
    }
    return Numeral;
}());
exports.Numeral = Numeral;
var Arcana = /** @class */ (function () {
    function Arcana() {
    }
    return Arcana;
}());
exports.Arcana = Arcana;
var Skill = /** @class */ (function () {
    function Skill() {
    }
    return Skill;
}());
exports.Skill = Skill;
var PreferedEquipment = /** @class */ (function () {
    function PreferedEquipment() {
    }
    return PreferedEquipment;
}());
exports.PreferedEquipment = PreferedEquipment;
// ---------------------------------------
var AttributesSet = /** @class */ (function () {
    function AttributesSet() {
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
    return AttributesSet;
}());
exports.AttributesSet = AttributesSet;
var SkillSet = /** @class */ (function () {
    function SkillSet() {
        this.ability = new Skill();
        this.first = new Skill();
        this.second = new Skill();
        this.ultimate = new Skill();
    }
    return SkillSet;
}());
exports.SkillSet = SkillSet;
var ArcanasSet = /** @class */ (function () {
    function ArcanasSet() {
        this.red = new Arcana();
        this.purple = new Arcana();
        this.green = new Arcana();
    }
    return ArcanasSet;
}());
exports.ArcanasSet = ArcanasSet;
var GuidesSet = /** @class */ (function () {
    function GuidesSet() {
        this.notes = '';
        this.preferedArcarnas = new ArcanasSet();
        this.preferedEquipments = [];
    }
    return GuidesSet;
}());
exports.GuidesSet = GuidesSet;
var Data = /** @class */ (function () {
    function Data() {
        this.skins = [];
        this.attributes = new AttributesSet();
        this.skills = new SkillSet();
        this.guides = new GuidesSet();
    }
    return Data;
}());
exports.Data = Data;
