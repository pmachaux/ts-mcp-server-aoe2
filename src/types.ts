export enum Aoe2AttackType {
  MELEE_ATTACK = "melee_attack",
  PIERCE_ATTACK = "pierce_attack",
}
export enum Aoe2ArmorType {
  MELEE_ARMOR = "melee_armor",
  PIERCE_ARMOR = "pierce_armor",
}

export type Aoe2BaseStats = {
  [key in Aoe2AttackType]: number;
} & {
  [key in Aoe2ArmorType]: number;
} & {
  movementSpeed: number;
  range: number;
};

export type Aoe2BonusAttack = {
  [key in Aoe2AttackType]: number;
};

export enum Aoe2ArmorUnitType {
  INFANTRY = "infantry",
  ARCHER = "archer",
  CAVALRY = "cavalry",
  CAVALRY_ARCHER = "cavalry_archer",
  WAR_ELEPHANT = "war_elephant",
  CAMEL = "camel",
  SHIP = "ship",
  FISH = "fish",
  BUILDING = "building",
  STONE_DEFENSE = "stone_defense",
  CASTLE = "castle",
  EAGLE_WARRIOR = "eagle_warrior",
  GUNPOWDER = "gunpowder",
  MONK = "monk",
  SIEGE_WEAPON = "siege_weapon",
  STANDARD_BUILDING = "standard_building",
  WALL_AND_GATE = "wall_and_gate",
  RAM = "ram",
  TREE = "tree",
  UNIQUE_UNIT = "unique_unit",
  CAVALRY_RAIDER = "cavalry_raider",
  TURTLE_SHIP = "turtle_ship",
  CONDOTTIERO = "condottiero",
  SPEARMAN = "spearman",
  MAMELUKE = "mameluke",
  HERO = "hero",
  SKIRMISHER = "skirmisher",
  TREBUCHET = "trebuchet",
  CAVALRY_RESISTANT = "cavalry_resistant",
  GUNPOWDER_RESISTANT = "gunpowder_resistant",
  FLAMING_CAMEL = "flaming_camel",
}

export interface Aoe2UnitAndStats {
  unitName: string;
  unitType: string;
  unitDescription: string;
  unitStats: Aoe2BaseStats;
  bonusStats: {
    [key in Aoe2ArmorUnitType]?: Aoe2BonusAttack;
  };
  upgradedUnitName: string | null;
  previousUnitName: string | null;
}
