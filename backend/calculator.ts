import { AttackType, PassiveEffect, Attribute } from './utils';
import { Weapon } from './weapon';


export interface weaponAttackResult {
    attackRating : Record<AttackType,number>;
    passiveEffectRating : Record<PassiveEffect, number>;
}

export interface Options{
    twoHanding : boolean;
    weapon: Weapon;
    characterAttributes: Record<Attribute, number>;
}



