// Endpoint /lol-chat/v1/me

export interface Me {
  availability:            string;
  gameName:                string;
  gameTag:                 string;
  icon:                    number;
  id:                      string;
  lastSeenOnlineTimestamp: null;
  lol:                     Lol;
  name:                    string;
  obfuscatedSummonerId:    number;
  patchline:               string;
  pid:                     string;
  platformId:              string;
  product:                 string;
  productName:             string;
  puuid:                   string;
  statusMessage:           string;
  summary:                 string;
  summonerId:              number;
  time:                    number;
}


interface Lol {
  level: string,
  // "bannerIdSelected": "",
  // "challengeCrystalLevel": "GOLD",
  // "challengePoints": "5835",
  // "challengeTokensSelected": "",
  // "championId": "",
  // "companionId": "44002",
  // "damageSkinId": "64003",
  // "gameQueueType": "",
  // "gameStatus": "outOfGame",
  // "iconOverride": "summonerIcon",
  // "mapId": "",
  // "mapSkinId": "29",
  // "masteryScore": "371",
  // "playerTitleSelected": "",
  // "puuid": "15e300b1-3ead-5967-80bb-bb6d6efbed42",
  // "rankedLeagueDivision": "II",
  // "rankedLeagueQueue": "RANKED_FLEX_SR",
  // "rankedLeagueTier": "PLATINUM",
  // "rankedLosses": "0",
  // "rankedSplitRewardLevel": "0",
  // "rankedWins": "3",
  // "regalia": "{\"bannerType\":2,\"crestType\":1,\"selectedPrestigeCrest\":3}",
  // "skinVariant": "",
  // "skinname": ""
}