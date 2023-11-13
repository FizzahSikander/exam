![poster](https://user-images.githubusercontent.com/54267140/155941400-1009371a-0aaa-439d-8ea6-bffcae25b52a.png)

# Solaris

En webbplats byggd med HTML, CSS & vanilla JS om vårt solsystem. Det ska gå att klicka på en planet och där få mer information om planeten
i någon form av "overlay". Se skiss nedan.

## UI

Skiss hittar du [här](https://www.figma.com/file/Snw8n1gba7Mbk6TCLEAB1A/JS-%2F-Solaris?node-id=0%3A1).

## API

**Base URL**

```
https://fathomless-shelf-54969.herokuapp.com/
```

**Methods**
|enpoint|method|desc|
|---|---|---|
|/keys|POST|returnerar en API nyckel.|
|/bodies|GET|returnerar alla stora himlakroppar i vårt solsystem.|

**Authentication**

API:et är låst med en API-nyckel. Alla GET-request utan en sådan kommer genera en `401`.

För att få läsrättigheter måste du i din request bifoga headern `x-zocom` med en giltig API-nyckel.

Ex.

```js
let resp = await fetch("https://fathomless-shelf-54969.herokuapp.com/bodies", {
  method: "GET",
  headers: { "x-zocom": "<solaris-key-here>" },
});
```

## Modell

| egenskap      | datatyp | enhet                                               |
| ------------- | ------- | --------------------------------------------------- |
| id            | number  | -                                                   |
| type          | string  | star & planet                                       |
| name          | string  | namnet på himlakroppen                              |
| latinName     | string  | Latinska namnet på himlakroppen                     |
| rotation      | number  | Längd på dygn i antal _jorddygn_ runt sin egen axel |
| circumference | number  | Omkrets i km                                        |
| temp          | Object  | Temperatur _day_ och _night_ i celcius.             |
| distance      | number  | km från solen                                       |
| orbitalPeriod | Number  | Antal _jorddygn_ runt solen                         |
| desc          | string  | Beskrivning av himlakroppen                         |
| moons         | Array   | Lista med månarnas namn                             |

### Exempel

```js
{
    id: 2,
    type: 'planet',
    name: 'Venus',
    latinName: 'Venus',
    rotation: 116,
    circumference: 38025,
    temp: {
        day: 430,
        night: -173
    },
    distance: 10820000,
    orbitalPeriod: 225,
    desc: 'Venus har ...',
    moons: []
}
```

## Betygskriterier

**Godkänt**

- Att det ser ut enligt skiss.
- Att API:et används.
- Sidan fungerar med inga fel i konsolen i developer tools.
- Vettiga namn på variabler etc på engelska.

**Väl godkänt**

- Allt i godkänt.
- Att din kod är uppdelad i tydliga funktioner med vettiga namn.
- Inga hårdkodade API-nycklar utan det ska alltid göras ett anrop för att få en API-nyckel först, innan varje anrop.

## Inlämning

Inlämning sker senast _Fredag 18 nov 12.00_ via en länk till ditt githubrepo på Learnpoint.
