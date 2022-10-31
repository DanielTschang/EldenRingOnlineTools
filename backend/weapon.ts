import { AttackType, Attribute, PassiveEffect } from "./utils";

export interface Weapon{
    /*
    Full name of the weapon
    */
    weaponName : string;

    /*
    Regular/Special weapon? (+10 or +25)
    */
    isSpecial : boolean;

    /*
    Character attribute requirements to use the weapon without penalty
    */
    attributeRequirement : Record<Attribute, number>;

    /*
    Scaling amount for attribute
    */
    attributeScaling : Record<Attribute, number>;

    /*
    indicating the base attack rating for each attack type
    */
    baseAttack : Record<AttackType, number>;

    /*
        indicating the base passive effect of the weapon, ­t­±ª¬ºA 
    */
    passiveEffect : Record<PassiveEffect, number>;
}

export interface weaponInfo {
    weaponWeight : number;
    weaponLevel : number;
}