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
    countDown!: number;
    manaConsumption!: number;
    videoUrl!: string;
}



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
    attackingArea!: string;
}

export class SkillSet {
    ability = new Skill();
    first = new Skill();
    second = new Skill();
    third = new Skill();
}

export class ArcanasSet {
    red = new Arcana();
    purple = new Arcana();
    green = new Arcana();
}

export class GuidesSet {
    encouragedUse!: string;
    skillsSet = new Skill();
    increaseOrderingImageUrl!: string;
    preferedArcarnas = new ArcanasSet();
    preferedEquipments: string[] = [];
}


export class Data {
    title!: string;
    story!: string;
    skins: Skin[] = [];
    attributes = new AttributesSet();
    skills = new SkillSet();
    guides = new GuidesSet();
}
