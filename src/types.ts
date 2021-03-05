export class Skin {
    id!: string;
    url!: string;
    icon!: string;
}

export class Numeral {
    original!: number;
    increasing!: number;
}

export class Arcana {
    imageUrl!: string;
    content!: string;
}

export class Skill {
    name!: string;
    iconURl!: string;
    countDown!: string;
    manaConsumption!: string;
    content!: string;
    videoUrl!: string;
}

export class PreferedEquipment {
    iconUrl!: string;
    content!: string;
}

// ---------------------------------------

export class AttributesSet {
    physicalDamage = new Numeral();
    magicalDamage = new Numeral();
    maximumHP = new Numeral();
    armor = new Numeral();
    magicalArmor = new Numeral();
    attackingSpeed = new Numeral();
    decreasingSkill = new Numeral();
    criticalChance = new Numeral();
    speed = new Numeral();
    hpRecovery = new Numeral();
    manaRecovery = new Numeral();
    attackingRange!: string;
}

export class SkillSet {
    ability = new Skill();
    first = new Skill();
    second = new Skill();
    ultimate = new Skill();
}

export class ArcanasSet {
    red = new Arcana();
    purple = new Arcana();
    green = new Arcana();
}

export class GuidesSet {
    introducingUrl!: string;
    preferedLane!: string;
    notes = '';
    increaseOrderingImageUrl!: string;
    preferedArcarnas = new ArcanasSet();
    preferedEquipments: PreferedEquipment[] = [];
}


export class Data {
    type!: string;
    title!: string;
    story!: string;
    skins: Skin[] = [];
    attributes = new AttributesSet();
    skills = new SkillSet();
    guides = new GuidesSet();
}
