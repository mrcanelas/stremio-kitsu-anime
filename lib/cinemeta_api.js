const axios = require('axios');

const CINEMETA_URL = 'https://v3-cinemeta.strem.io';
const DEFAULT_TIMEOUT = 60000; // 60s

function getCinemetaMetadata(imdbId, type) {
  return _getCinemetaMetadata(imdbId, type)
      .catch(() => _getCinemetaMetadata(imdbId, type === 'movie' ? 'series' : 'movie'))
      .catch(error => {
        console.warn(`failed cinemeta query ${imdbId} due: ${error.message}`);
        return { id: imdbId, imdb_id: imdbId };
      });
}

function _getCinemetaMetadata(imdbId, type) {
  return axios.get(`${CINEMETA_URL}/meta/${type}/${imdbId}.json`, { timeout: DEFAULT_TIMEOUT })
      .then(response => {
        if (response.data && response.data.meta) {
          return response.data.meta;
        } else {
          throw new Error('No search results');
        }
      })
}

module.exports = { getCinemetaMetadata };