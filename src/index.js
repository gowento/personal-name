import _ from 'lodash';

_.templateSettings.interpolate = /\[([\s\S]+?)\]/g;

function formatName(name = '') {
  const lowered = name.toLowerCase();
  return _(lowered)
    .words()
    .reduce((acc, word) => _.replace(acc, word, _.capitalize), lowered);
}

function formatTitle(gender = '') {
  if (/^(male|homme|mr|m|monsieur)$/i.test(gender)) {
    return 'Mr.';
  } else if (/^(female|femme|mme|mlle|madame|mademoiselle)$/i.test(gender)) {
    return 'Ms.';
  }

  return null;
}

function clean(string) {
  return string
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/^[\W\d_]+|[\W\d_]+$/g, ''); // Remove any leading/trailing not word characters
}

export function format(
  person = {},
  tokens = '[firstName] [lastName]'
) {
  const data = {
    firstName: formatName(person.firstName),
    lastName: formatName(person.lastName),
    title: formatTitle(person.gender),
  };

  const result = _.template(tokens)(data);
  return clean(result);
}
