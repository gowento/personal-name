import XRegExp from 'xregexp';
import templateSettings from 'lodash/templateSettings';
import template from 'lodash/template';
import defaults from 'lodash/defaults';
import includes from 'lodash/includes';
import capitalize from 'lodash/capitalize';
import replace from 'lodash/replace';
import words from 'lodash/words';
import reduce from 'lodash/reduce';

templateSettings.interpolate = /\[([\s\S]+?)]/g;
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
  const { country, tokens } = defaults(opts, {
    country: 'US',
    tokens: '[firstName] [lastName]',
  });

  const countrySettings = countries[country] || {};
  const titles = countrySettings.titles || {};
  const toLowerCase = countrySettings.toLowerCase || [];
  const toTrimLeft = countrySettings.toTrimLeft;

  function capitalizeReducer(word) {
    return includes(toLowerCase, word)
      ? word
      : capitalize(word);
  }

  function formatName(name) {
    const lowered = (name || '').toLowerCase();
    return reduce(
      words(lowered),
      (acc, word) => replace(acc, word, capitalizeReducer),
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

  const result = template(tokens)(data);
  return clean(result);
}
