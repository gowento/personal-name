import _ from 'lodash';

_.templateSettings.interpolate = /\[([\s\S]+?)\]/g;

function formatName(name) {
  return _(name)
    .replace(/[a-zA-Z]+/g, _.capitalize)
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
