import { partyBoyFactory } from "./raider/party-boy";
import { partyBoyBossMajorFactory } from "./raider/party-boy-boss-major";
import { partyBoyPsychoFactory } from "./raider/party-boy-psycho";
import { partyBoyPsychoNotableFactory } from "./raider/party-boy-psycho-notable";
import { partyBoyScavverFactory } from "./raider/party-boy-scavver";
import { partyBoyScavverNotableFactory } from "./raider/party-boy-scavver-notable";
import { partyBoyVeteranFactory } from "./raider/party-boy-veteran";
import { partyBoyVeteranNotableFactory } from "./raider/party-boy-veteran-notable";
import { triggermanFactory } from "./wastelander/triggerman";
import { vaultDwellerFactory } from "./wastelander/vault-dweller";

export const statBlocks = Object.freeze({
  partyBoy: partyBoyFactory(),
  partyBoyBossMajor: partyBoyBossMajorFactory(),
  partyBoyPsycho: partyBoyPsychoFactory(),
  partyBoyPsychoNotable: partyBoyPsychoNotableFactory(),
  partyBoyScavver: partyBoyScavverFactory(),
  partyBoyScavverNotable: partyBoyScavverNotableFactory(),
  partyBoyVeteran: partyBoyVeteranFactory(),
  partyBoyVeteranNotable: partyBoyVeteranNotableFactory(),
  triggerman: triggermanFactory(),
  vaultDweller: vaultDwellerFactory(),
});
