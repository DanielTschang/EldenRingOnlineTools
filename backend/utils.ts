import { Weapon } from './weapon';
export const allAttackTypes = ["physical", "magic", "fire", "lightning", "holy"] as const;

export const allPassiveEffects = [
  "Poison",
  "Scarlet Rot",
  "Bleed",
  "Frost",
  "Sleep",
  "Madness",
] as const;

export const allAttributes = ["str", "dex", "int", "fai", "arc"] as const;

export const allAffinities = [
  "Standard",
  "Heavy",
  "Keen",
  "Quality",
  "Magic",
  "Fire",
  "Flame Art",
  "Lightning",
  "Sacred",
  "Cold",
  "Poison",
  "Blood",
  "Occult",
  "Special",
] as const;

export const allWeaponTypes = [
  "Axe",
  "Ballista",
  "Bow",
  "Claw",
  "Colossal Sword",
  "Colossal Weapon",
  "Crossbow",
  "Curved Greatsword",
  "Curved Sword",
  "Dagger",
  "Fist",
  "Flail",
  "Glintstone Staff",
  "Greataxe",
  "Greatbow",
  "Great Hammer",
  "Greatshield",
  "Great Spear",
  "Greatsword",
  "Halberd",
  "Hammer",
  "Heavy Thrusting Sword",
  "Katana",
  "Light Bow",
  "Medium Shield",
  "Reaper",
  "Sacred Seal",
  "Small Shield",
  "Spear",
  "Straight Sword",
  "Thrusting Sword",
  "Torch",
  "Twinblade",
  "Whip",
] as const;

/*
Define the min & max level of regular/special weapons
*/
export const minWeaponUpgradedLevel = 0 as const;
export const maxRegularWeaponUpgradedLevel = 25 as const;
export const maxSpecialWeaponUpgradedLevel = 10 as const;

/*
Define the min & max level of a each status
*/
export const minStatusLevel = 1 as const;
export const maxStatusLevel = 99 as const;

/*
Define the min & max level of a character
*/
export const minCharacterLevel = 1 as const;
export const maxCharacterLevel = 713 as const;


export type Attribute = typeof allAttributes[number];
export type Attributes = Record<Attribute, number>;
export type Affinitie = typeof allAffinities[number];
export type AttackType = typeof allAttackTypes[number];

export type weaponType = typeof allWeaponTypes[number];
export type PassiveEffectsType = typeof allPassiveEffects[number];


export const twoHandingAdjust = ({
    twoHanding = false,
    weapon,
    characterAttributes
}:{
    twoHanding ?: boolean;
    weapon : Weapon;
    characterAttributes : Attributes;
}) : Attributes => {
    let twoHandingBonus = twoHanding;

    /*
    paried weapons don't get two-handing bonus
    */
    if(weapon.paired) { 
        twoHandingBonus = false;
    }

    /*
    weapons that can only be two-handed
    */
    if (
        weapon.info.weaponType === "Light Bow" ||
        weapon.info.weaponType === "Bow" ||
        weapon.info.weaponType === "Greatbow" ||
        weapon.info.weaponType === "Ballista"
    ) {
        twoHandingBonus = true;
    }  
    
    if (twoHandingBonus) {
        return {
            ...characterAttributes,
            str: Math.floor(characterAttributes.str * 1.5),
        };
    }

    return characterAttributes;
}