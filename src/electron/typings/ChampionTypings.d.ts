// Endpoint: /lol-champions/v1/inventories/150734416/champions-minimal

export interface Champions {
  active:             boolean;
  alias:              string;
  banVoPath:          string;
  baseLoadScreenPath: string;
  baseSplashPath:     string;
  botEnabled:         boolean;
  chooseVoPath:       string;
  disabledQueues:     any[];
  freeToPlay:         boolean;
  id:                 number;
  name:               string;
  ownership:          Ownership;
  purchased:          number;
  rankedPlayEnabled:  boolean;
  roles:              Role[];
  squarePortraitPath: string;
  stingerSfxPath:     string;
  title:              string;
}

export interface Ownership {
  loyaltyReward: boolean;
  owned:         boolean;
  rental:        Rental;
  xboxGPReward:  boolean;
}

export interface Rental {
  endDate:           number;
  purchaseDate:      number;
  rented:            boolean;
  winCountRemaining: number;
}

export enum Role {
  Assassin = "assassin",
  Fighter = "fighter",
  Mage = "mage",
  Marksman = "marksman",
  Support = "support",
  Tank = "tank",
}
