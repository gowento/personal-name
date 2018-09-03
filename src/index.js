import _ from 'lodash';
import XRegExp from 'xregexp';

_.templateSettings.interpolate = /\[([\s\S]+?)]/g;
const nonUnicodeWord = new XRegExp('^[\\PL]+|[\\PL]+$', 'g');
const unicodeSeparators = new XRegExp('\\p{Zs}+', 'g');

const countries = {
  FR: {
    titles: {
      male: 'M.',
      female: 'Mme',
    },
    toLowerCase: ['de', 'd', 'des'],
    toTrimLeft: ['de'],
  },
  US: {
    titles: {
      male: 'Mr.',
      female: 'Ms.',
    },
    toLowerCase: ['of'],
  },
  UK: {
    titles: {
      male: 'Mr',
      female: 'Ms',
    },
  },
};

export function format(person = {}, opts = {}) {
  const { country, tokens } = _.defaults(opts, {
    country: 'US',
    tokens: '[firstName] [lastName]',
  });

  const countrySettings = countries[country] || {};
  const titles = countrySettings.titles || {};
  const toLowerCase = countrySettings.toLowerCase || [];
  const { toTrimLeft } = countrySettings;

  function capitalizeReducer(word) {
    return _.includes(toLowerCase, word) ? word : _.capitalize(word);
  }

  function formatName(name) {
    const lowered = (name || '').toLowerCase();
    return _.reduce(
      _.words(lowered),
      (acc, word) => _.replace(acc, word, capitalizeReducer),
      lowered
    );
  }

  function formatTitle(gender = '') {
    return titles[gender];
  }

  function clean(string) {
    const toTrimLeftRegexp = toTrimLeft
      ? new RegExp(`^(${toTrimLeft.join('|')}) `)
      : null;

    return string
      .replace(unicodeSeparators, ' ') // Replace multiple separators with a single ASCII space
      .replace(nonUnicodeWord, '') // Remove any leading/trailing not word characters
      .replace(toTrimLeftRegexp, ''); // Remove unwanted leading words
    // .replace(/^./, upperFirst); // Capitalize first letter again
  }

  const data = {
    firstName: formatName(person.firstName, country),
    lastName: formatName(person.lastName, country),
    title: formatTitle(person.gender, country),
  };

  const result = _.template(tokens)(data);
  return clean(result);
}

export default format;
