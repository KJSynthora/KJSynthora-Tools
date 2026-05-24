// =========================================
// GLOBAL TIMEZONE OPERATING SYSTEM DATABASE
// =========================================

// =========================================
// MASTER COUNTRIES DATABASE
// =========================================

const countries = [

{
country:"Afghanistan",
region:"South Asia",
timezone:"Asia/Kabul",
majorCities:["Kabul","Kandahar","Herat"]
},

{
country:"Australia",
region:"South East Asia & Australasia",
timezone:"Australia/Sydney",
majorCities:[
"Sydney",
"Melbourne",
"Brisbane",
"Perth",
"Adelaide"
]
},

{
country:"New Zealand",
region:"South East Asia & Australasia",
timezone:"Pacific/Auckland",
majorCities:[
"Auckland",
"Wellington",
"Christchurch"
]
},

{
country:"India",
region:"South Asia",
timezone:"Asia/Kolkata",
majorCities:[
"New Delhi",
"Mumbai",
"Hyderabad",
"Bengaluru",
"Chennai",
"Kolkata"
]
},

{
country:"United States",
region:"North America",
timezone:"America/New_York",
majorCities:[
"New York",
"Chicago",
"Dallas",
"Miami",
"Washington"
]
},

{
country:"United Kingdom",
region:"Europe",
timezone:"Europe/London",
majorCities:[
"London",
"Manchester",
"Birmingham"
]
},

{
country:"Japan",
region:"East Asia",
timezone:"Asia/Tokyo",
majorCities:[
"Tokyo",
"Osaka",
"Yokohama"
]
},

{
country:"Canada",
region:"North America",
timezone:"America/Toronto",
majorCities:[
"Toronto",
"Vancouver",
"Montreal"
]
},

{
country:"South Africa",
region:"Africa & Middle East",
timezone:"Africa/Johannesburg",
majorCities:[
"Cape Town",
"Johannesburg",
"Durban"
]
},

{
country:"Brazil",
region:"Latin America",
timezone:"America/Sao_Paulo",
majorCities:[
"Sao Paulo",
"Rio de Janeiro",
"Brasilia"
]
}

];

// =========================================
// AUTO-GENERATE GLOBAL CITY DATABASE
// =========================================

const cities = [];

// =========================================
// OFFICIAL IANA TIMEZONE SUPPORT
// =========================================

Intl.supportedValuesOf('timeZone')
.forEach(zone => {

const parts = zone.split('/');

const city =
parts[parts.length - 1]
.replaceAll('_',' ');

const region =
parts[0];

cities.push({

city: city,
country: region,
timezone: zone,
region: region

});

});

// =========================================
// ADD MASTER COUNTRIES
// =========================================

countries.forEach(country => {

country.majorCities.forEach(cityName => {

cities.push({

city: cityName,
country: country.country,
timezone: country.timezone,
region: country.region

});

});

});

// =========================================
// REMOVE DUPLICATES
// =========================================

const uniqueCities = [];

const seen = new Set();

cities.forEach(city => {

const key =
`${city.city}-${city.timezone}`;

if(!seen.has(key)){

seen.add(key);

uniqueCities.push(city);

}

});

// =========================================
// FINAL DATABASE
// =========================================

window.cities = uniqueCities;

// =========================================
// STATUS
// =========================================

console.log(
`🌍 Global Countries Loaded`
);

console.log(
`✅ Countries Supported: ${countries.length}`
);

console.log(
`✅ Global Regions: ${window.cities.length}`
);

console.log(
`✅ Worldwide Coverage Active`
);
