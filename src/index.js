import _ from 'lodash';

_.templateSettings.interpolate = /\[([\s\S]+?)\]/g;

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
  const toTrimLeft = countrySettings.toTrimLeft;

  function capitalize(word) {
    return _.includes(toLowerCase, word)
      ? word
      : _.capitalize(word);
  }

  function formatName(name = '') {
    const lowered = name.toLowerCase();
    return _(lowered)
      .words()
      .reduce((acc, word) => _.replace(acc, word, capitalize), lowered);
  }

  function formatTitle(gender = '') {
    return titles[gender];
  }

  function clean(string) {
    const toTrimLeftRegexp = toTrimLeft
      ? new RegExp(`^(${toTrimLeft.join('|')}) `)
      : null;

    return string
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/^[\W\d_]+|[\W\d_]+$/g, '') // Remove any leading/trailing not word characters
      .replace(toTrimLeftRegexp, ''); // Remove unwanted leading words
      // .replace(/^./, _.upperFirst); // Capitalize first letter again
  }

  const data = {
    firstName: formatName(person.firstName, country),
    lastName: formatName(person.lastName, country),
    title: formatTitle(person.gender, country),
  };

  const result = _.template(tokens)(data);
  return clean(result);
}
