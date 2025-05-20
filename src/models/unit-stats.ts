import {
  Aoe2AttackType,
  Aoe2ArmorType,
  Aoe2BaseStats,
  Aoe2BonusAttack,
  Aoe2ArmorUnitType,
  Aoe2UnitAndStats,
} from "../types.js";

export const aoe2Units: Aoe2UnitAndStats[] = [
  // Archer
  {
    unitName: "Archer",
    unitType: "Ranged",
    unitDescription:
      "Basic ranged unit that can attack from a distance. Weak in melee combat but effective against infantry.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 0,
      [Aoe2AttackType.PIERCE_ATTACK]: 4,
      [Aoe2ArmorType.MELEE_ARMOR]: 0,
      [Aoe2ArmorType.PIERCE_ARMOR]: 0,
      movementSpeed: 0.96,
      range: 4,
    },
    bonusStats: {},
    upgradedUnitName: "Crossbowman",
    previousUnitName: null,
  },

  // Crossbowman
  {
    unitName: "Crossbowman",
    unitType: "Ranged",
    unitDescription:
      "Upgraded version of the Archer with improved attack and range. Effective against infantry.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 0,
      [Aoe2AttackType.PIERCE_ATTACK]: 5,
      [Aoe2ArmorType.MELEE_ARMOR]: 0,
      [Aoe2ArmorType.PIERCE_ARMOR]: 0,
      movementSpeed: 0.96,
      range: 5,
    },
    bonusStats: {},
    upgradedUnitName: "Arbalester",
    previousUnitName: "Archer",
  },

  // Militia
  {
    unitName: "Militia",
    unitType: "Infantry",
    unitDescription:
      "Basic melee infantry unit available from the Dark Age. Cheap and effective against buildings.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 4,
      [Aoe2AttackType.PIERCE_ATTACK]: 0,
      [Aoe2ArmorType.MELEE_ARMOR]: 0,
      [Aoe2ArmorType.PIERCE_ARMOR]: 1,
      movementSpeed: 0.96,
      range: 0,
    },
    bonusStats: {
      [Aoe2ArmorUnitType.ARCHER]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.INFANTRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.CAVALRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.BUILDING]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.SHIP]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
    },
    upgradedUnitName: "Man-at-Arms",
    previousUnitName: null,
  },

  // Man-at-Arms
  {
    unitName: "Man-at-Arms",
    unitType: "Infantry",
    unitDescription:
      "Upgraded version of the Militia with improved stats and armor. Effective against buildings and has a bonus against eagles.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 6,
      [Aoe2AttackType.PIERCE_ATTACK]: 0,
      [Aoe2ArmorType.MELEE_ARMOR]: 0,
      [Aoe2ArmorType.PIERCE_ARMOR]: 1,
      movementSpeed: 0.96,
      range: 0,
    },
    bonusStats: {
      [Aoe2ArmorUnitType.ARCHER]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.INFANTRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 2, // Bonus against Eagle Warriors
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.CAVALRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.BUILDING]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.SHIP]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
    },
    upgradedUnitName: "Long Swordsman",
    previousUnitName: "Militia",
  },

  // Knight
  {
    unitName: "Knight",
    unitType: "Cavalry",
    unitDescription:
      "Heavy cavalry unit available in the Castle Age. Fast and powerful with high HP, effective against archers and siege weapons.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 10,
      [Aoe2AttackType.PIERCE_ATTACK]: 0,
      [Aoe2ArmorType.MELEE_ARMOR]: 2,
      [Aoe2ArmorType.PIERCE_ARMOR]: 2,
      movementSpeed: 1.35,
      range: 0,
    },
    bonusStats: {
      [Aoe2ArmorUnitType.ARCHER]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.INFANTRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.CAVALRY]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.BUILDING]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
      [Aoe2ArmorUnitType.SHIP]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 0,
      },
    },
    upgradedUnitName: "Cavalier",
    previousUnitName: null,
  },

  // Mangonel
  {
    unitName: "Mangonel",
    unitType: "Siege",
    unitDescription:
      "Basic siege weapon that fires projectiles in an arc, dealing area damage. Effective against groups of units and buildings.",
    unitStats: {
      [Aoe2AttackType.MELEE_ATTACK]: 0,
      [Aoe2AttackType.PIERCE_ATTACK]: 40,
      [Aoe2ArmorType.MELEE_ARMOR]: 0,
      [Aoe2ArmorType.PIERCE_ARMOR]: 6,
      movementSpeed: 0.6,
      range: 7,
    },
    bonusStats: {
      [Aoe2ArmorUnitType.BUILDING]: {
        [Aoe2AttackType.MELEE_ATTACK]: 0,
        [Aoe2AttackType.PIERCE_ATTACK]: 12, // Bonus against buildings
      },
    },
    upgradedUnitName: "Onager",
    previousUnitName: null,
  },
];
