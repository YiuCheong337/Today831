
const data = [
    {
        "name": "Hong Kong",
        "topLevelDomain": [
            ".hk"
        ],
        "alpha2Code": "HK",
        "alpha3Code": "HKG",
        "callingCodes": [
            "852"
        ],
        "capital": "City of Victoria",
        "altSpellings": [
            "HK",
            "香港"
        ],
        "region": "Asia",
        "subregion": "Eastern Asia",
        "population": 7324300,
        "latlng": [
            22.25,
            114.16666666
        ],
        "demonym": "Chinese",
        "area": 1104.0,
        "gini": 53.3,
        "timezones": [
            "UTC+08:00"
        ],
        "borders": [
            "CHN"
        ],
        "nativeName": "香港",
        "numericCode": "344",
        "currencies": [
            {
                "code": "HKD",
                "name": "Hong Kong dollar",
                "symbol": "$"
            }
        ],
        "languages": [
            {
                "iso639_1": "en",
                "iso639_2": "eng",
                "name": "English",
                "nativeName": "English"
            },
            {
                "iso639_1": "zh",
                "iso639_2": "zho",
                "name": "Chinese",
                "nativeName": "中文 (Zhōngwén)"
            }
        ],
        "translations": {
            "de": "Hong Kong",
            "es": "Hong Kong",
            "fr": "Hong Kong",
            "ja": "香港",
            "it": "Hong Kong",
            "br": "Hong Kong",
            "pt": "Hong Kong",
            "nl": "Hongkong",
            "hr": "Hong Kong",
            "fa": "هنگ‌کنگ"
        },
        "flag": "https://restcountries.eu/data/hkg.svg",
        "regionalBlocs": [],
        "cioc": "HKG"
    }
]

const hk = data[0];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

for (let hkKey in hk) {
    if (Array.isArray(hk[hkKey])) {
        for(const index in hk[hkKey]) {
            if(hk[hkKey][index] instanceof Object ) {
                 for (let objKey in hk[hkKey][index]) {
                    console.log(capitalizeFirstLetter(hkKey) + "_" + objKey + ": " + hk[hkKey][index][objKey]);
                 }
            } else {
                console.log(capitalizeFirstLetter(hkKey) + ": " + hk[hkKey][index])
            }
        }
    } else if(hk[hkKey] instanceof Object) {
        for(const objKey in hk[hkKey]) {
            console.log(capitalizeFirstLetter(hkKey) + "_" + objKey + ": " + hk[hkKey][objKey])
        }
    } else {
        console.log(capitalizeFirstLetter(hkKey) + ": " + hk[hkKey]);
    }
}