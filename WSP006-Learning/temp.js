const axios = require('axios');
const moment = require('moment');
const xpath = require('xpath');
const DOMParser = require('xmldom').DOMParser;
const fs = require('fs');

/**
 * Extract current forecasts information directly from HKO
 *
 * @param {string} start Start date to be scaped in "YYYY-MM-DD HH:mm" format. E.g ['2019-01-01 08:00']
 * @return {{date: string, forecast: string}} The scaped data
 */
async function forecastsExtractCurrent() {
  const url = `https://movielens.org/explore/genres/adventure`
  const res = await axios.get(url)
    
  const doc = new DOMParser().parseFromString(res.data);
  const forecast = xpath.select('*//item/description', doc);

  return {
    date: moment().format('YYYY-MM-DD'),
    forecast: forecast[0].firstChild.data
  }
}

