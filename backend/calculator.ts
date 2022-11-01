import { AttackType, Attribute, twoHandingAdjust, allAttackTypes, allPassiveEffects, PassiveEffectsType } from './utils';
import { Weapon } from './weapon';
import { attackScalingCurves, statusCurve } from './scalingCurves';


export interface weaponAttackResult {
    attackRating : Partial<Record<AttackType | number, finalAttackScoring>>;
    passiveEffectRating : Partial<Record<PassiveEffectsType, number>>;
}

export interface Options{
    twoHanding : boolean;
    weapon: Weapon;
    characterAttributes: Record<Attribute, number>;
}

export interface finalAttackScoring{
    baseAttackScoring: number;
    scalingAttackScoring : number;
}

const getWeaponResult = ({twoHanding, weapon, characterAttributes}:Options):weaponAttackResult => {
    const attackRating: Partial<Record<AttackType | number, finalAttackScoring>> = {};
    const passiveEffectRating : Partial<Record<PassiveEffectsType, number>> = {};
    

    /** 
     *get the new attributes when you use two hands
    */
    const newAttributes = twoHandingAdjust({twoHanding, weapon, characterAttributes});

    /**
     *filter the attributes which don't satisfy the requirments.
    */
    const insufficientAttributes = (Object.entries(weapon.attributeRequirement) as [Attribute, number][])
        .filter(([attribute, requirement]) => newAttributes[attribute] < requirement)
        .map(([attribute]) => attribute);
    
    for(const attackType in allAttackTypes){
        if(attackType in weapon.baseAttack){
            let scalingMultiplier = 0; //multiplier for scaling the attributes
            const baseAttackScoring:number = weapon.baseAttack[attackType] ?? 0;
            const scalingAttributes:Array<Attribute> = weapon.attackScalingAttributes[attackType] ?? [];
            const scalingCurve = attackScalingCurves[weapon.attackScalingCurves[attackType] ?? 0];

            if(insufficientAttributes.some((attribute)=>scalingAttributes.includes(attribute))){
                scalingMultiplier = -0.4;
            }else{
                for(const attribute of scalingAttributes){
                    const scaling:number = weapon.attributeScaling[attribute] ?? 0;
                    scalingMultiplier += scalingCurve(newAttributes[attribute]) * scaling;
                }
            }
            attackRating[attackType] = {
                baseAttackScoring,
                scalingAttackScoring: scalingMultiplier * baseAttackScoring,
            };
        }
    }

    const statusBuildup: Partial<Record<PassiveEffectsType, number>> = {};
    for (const statusType of allPassiveEffects) {
      if (statusType in weapon.passiveEffects) {
        const statusBase = weapon.passiveEffects[statusType] ?? 0;
  
        let scalingMultiplier = 0;
        if (newAttributes.arc < (weapon.attributeRequirement.arc ?? 0)) {
          // If the arcane requirement is not met, a 40% penalty is subtracted instead of a scaling
          // bonus being added
          scalingMultiplier = -0.4;
        } else if (statusType === "Poison" || statusType === "Bleed") {
          // Otherwise, the scaling multiplier for poison and bleed is equal to the product of the
          // arcane scaling and the current arcane stat on a special curve.
          scalingMultiplier =
            (weapon.attributeScaling.arc ?? 0) * statusCurve(newAttributes.arc);
        }
  
        statusBuildup[statusType] = statusBase * (1 + scalingMultiplier);
      }
    }


    return {
        attackRating,
        passiveEffectRating
    }
}


