import { ChampionData } from "domain/ChampionData";

export const championDataMock: ChampionData = {
    rootChampionData: {
        mCharacterName: "Name",
        baseHP: 100,
        hpPerLevel: 10,
        baseDamage: 30,
        baseArmor: 30,
        baseSpellBlock: 20,
        spellBlockPerLevel: 2,
        baseMoveSpeed: 40,
        attackRange: 200,
        attackSpeed: 2,
        attackSpeedRatio: 1,
        attackSpeedPerLevel: 5,
        mAdaptiveForceToAbilityPowerWeight: 0,
        acquisitionRange: 400,
        mCharacterPassiveSpell: "passive",
        spellNames: [],
        primaryAbilityResource: {
            arBaseStaticRegen: 5,
            arIncrements: 10,
            arMaxSegments: 1,
            __type: "AbilityResourceSlotInfo"
        },
        unitTagsString: "Champion",
        __type: "CharacterRecord"
    },
    passiveSpellData: {
        mClientData: {
            mTooltipData: {
                mObjectName: "string"
            }
        },
        __type: "SpellDataResource"
    },
    spellsData: [
        {
            mClientData: {
                mTooltipData: {
                    mObjectName: "string"
                }
            },
            __type: "SpellDataResource"
        },
        {
            mClientData: {
                mTooltipData: {
                    mObjectName: "string"
                }
            },
            __type: "SpellDataResource"
        },
        {
            mClientData: {
                mTooltipData: {
                    mObjectName: "string"
                }
            },
            __type: "SpellDataResource"
        },
        {
            mClientData: {
                mTooltipData: {
                    mObjectName: "string"
                }
            },
            __type: "SpellDataResource"
        }
    ]
}
