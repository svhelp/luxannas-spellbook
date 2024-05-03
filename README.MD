# About

> [!CAUTION]
> The library is currently **WIP**.

An *ALPHA* version of the library calculating League of Legends spells and items properties.

The library is designed to resolve variables that may be found across League of Legends localization entries from both Data Dragon and Community Dragon (e.g. *wdamage* in `<physicalDamage>{{ wdamage }} physical damage</physicalDamage>`)

# Basic usage

```js
const context = await playerContext({championName: "Zyra"})
context.setLevel(3)

const passive = context.getPassiveSpell()

console.log(passive)
```

returns

```
[
  { name: 'SeedCooldown', value: 13, formula: '14 - 9 @level@' },
  {
    name: 'PlantDamage',
    value: 24,
    formula: '16 - 84 @level@ + 18% @total@ @abilityPower@'
  },
  {
    name: 'monstermod',
    value: 64.70588235294117,
    formula: '60 - 100 @level@'
  },
  { name: '{c951f1e1}', value: 48, formula: '50 - 33 @level@' }
]
```

## Configuration

`playerContext` needs to be configured with an object: 

| Name         | Required | Type       | Description | Default
| ------------ | -------- | ---------- | ----------- |  ------- 
| championName | yes      | string     | Any valid League champion name
| source       |          | DataSource | Champion data source. Available values: `DataSource.Web`, `DataSource.Local` | `DataSource.Web`
| customUri    |          | string     | An URI used to locate a champion data. A path to the actual data is being resolved as `${customUri}/${championName}/${championName}.bin.json` | `""`

#### Default URI

`DataSource.Local`: `src/test-data/champions/${championName}/${championName}.bin.json`
`DataSource.Web`: a [Community Dragon](https://www.communitydragon.org/) server

# Known issues

- the lib does not calculate buff-dependent properties yet since there is no officially supported interface to obtain the buff status from the game;
- it is yet needed to test the lib against Akali Q, Zyra passive, TF Q;
- it is yet needed to test the percent missing health spells calculation behavior.

# Roadmap

1) Fix current issues and implement minor features (e.g. percentage view and precision settings);
2) Implement item properties calculation;
3) Implement rune properties calculation;
4) TBD.


# See also

- an official [Riot Games Developer Portal](https://developer.riotgames.com/)
- a default data source [Community Dragon](https://www.communitydragon.org/)
- a basic guide [Resolving spells and variables in spell texts](https://hextechdocs.dev/resolving-variables-in-spell-textsa/)
- a [similar lib](https://github.com/OsOmE1/leaguebuilder) written in C# by [OsOmE1](https://github.com/OsOmE1)