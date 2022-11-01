import { AttackType, Attribute, PassiveEffectsType, weaponType } from './utils';

export interface Weapon{
    /*
    Full name of the weapon
    */
    name : string;

    /*
    weapone metadata
    */
    info : weaponInfo ;

    /*
    Regular/Special weapon? (+10 or +25)
    */
    isSpecial : boolean;

    /*
    Character attribute requirements to use the weapon without penalty
    */
    attributeRequirement : Record<Attribute, number>;

    /** 
    *Scaling amount for attribute
    */
    attributeScaling : Record<Attribute, number>;

    /*
    Map indicating which damage types scale with which player attributes
    */
    attackScalingAttributes : Partial<Record<AttackType| number, Attribute[]>>;

    /*
    Map indicating which scaling curve is used for each damage type
    */
    attackScalingCurves: Partial<Record<AttackType| number, WeaponScalingCurve>>;

    /*
    indicating the base attack rating for each attack type
    */
    baseAttack : Partial<Record<AttackType | number, number>>;

    /*
        indicating the base passive effect of the weapon, ­t­±ª¬ºA 
    */
    passiveEffects : Record<PassiveEffectsType, number>;

    /*
    
    */
    paired : boolean;
}

export type WeaponScalingCurve = 0 | 1 | 2 | 4 | 7 | 8 | 12 | 14 | 15 | 16;

export interface weaponInfo {
    weaponWeight : number;
    weaponLevel : number;
    weaponType : weaponType;
}