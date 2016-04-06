import _ from 'lodash';

_.templateSettings.interpolate = /\[([\s\S]+?)\]/g;

function formatName(name = '') {
  const lowered = name.toLowerCase();
  return _(lowered)
    .words()
    .reduce((acc, word) => _.replace(acc, word, _.capitalize), lowered)
    .replace(/\s+/g, ' ')
    .trim();
}

export function format(
  person = {},
  tokens = '[firstName] [lastName]'
) {
  const data = {
    firstName: formatName(person.firstName),
    lastName: formatName(person.lastName),
  };

  const rendered = _.template(tokens)(data);

  return _.trim(rendered, ' _-,');
}
