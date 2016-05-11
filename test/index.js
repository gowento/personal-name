import test from 'ava';
import { format } from '../src';

test('format returns a personal name using defaults', t => {
  t.is(format({ firstName: 'John', lastName: 'Doe' }), 'John Doe');
});

test('format accepts custom tokens', t => {
  const person = {
    firstName: 'John',
    lastName: 'Doe',
  };
  t.is(format(person, { tokens: '[lastName], [firstName]' }), 'Doe, John');
  t.is(format(person, { tokens: '[lastName]' }), 'Doe');
});

test('format returns proper case', t => {
  t.is(format({ firstName: 'joHN', lastName: 'DOe' }), 'John Doe');
  t.is(format({ firstName: 'tim', lastName: 'berners-lee' }), 'Tim Berners-Lee');
});

test('format handles accents', t => {
  t.is(format({ firstName: 'François', lastName: 'Hollande' }), 'François Hollande');
  t.is(format({ firstName: 'andrée', lastName: 'chedid' }), 'Andrée Chedid');
  t.is(format({ firstName: 'Éric', lastName: 'Redon' }), 'Éric Redon');
});

test('format trims result', t => {
  t.is(format({ firstName: '  JOHN  ', lastName: '  DOE  ' }), 'John Doe');
  t.is(format({ firstName: '  JOHN  ' }, { tokens: '[lastName], [firstName]' }), 'John');
});

test('format trims Unicode separators', t => {
  t.is(format({ firstName: '\xA0\xA0Arnold\xA0\xA0', lastName: '\xA0Unbreakable\xA0' }), 'Arnold\x20Unbreakable');
});

test('format handles title token', t => {
  t.is(format(
    { gender: 'male', lastName: 'doe' },
    { tokens: '[title] [firstName] [lastName]' }
  ), 'Mr. Doe');
  t.is(format(
    { gender: 'female', firstName: 'jane', lastName: 'doe' },
    { tokens: '[title] [firstName] [lastName]' }
  ), 'Ms. Jane Doe');
  t.is(format(
    { lastName: 'doe' },
    { tokens: '[title] [firstName] [lastName]' }
  ), 'Doe');
});

test('format handles France country specific rules', t => {
  t.is(format(
    { gender: 'male', firstName: 'julien', lastName: 'ravel' },
    { country: 'FR', tokens: '[title] [firstName] [lastName]' }
  ), 'M. Julien Ravel');
  t.is(format(
    { gender: 'female', firstName: 'marie', lastName: 'duval' },
    { country: 'FR', tokens: '[title] [firstName] [lastName]' }
  ), 'Mme Marie Duval');

  t.is(format(
    { firstName: 'Honoré', lastName: 'De balzac' },
    { country: 'FR' }
  ), 'Honoré de Balzac');
  t.is(format(
    { lastName: 'De balzac' },
    { country: 'FR' }
  ), 'Balzac');

  t.is(format(
    { firstName: ' jean ', lastName: 'DE LA FONTAINE' },
    { country: 'FR' }
  ), 'Jean de La Fontaine');
  t.is(format(
    { lastName: 'de la Fontaine' },
    { country: 'FR' }
  ), 'La Fontaine');

  t.is(format(
    { firstName: 'joachim ', lastName: ' du bellay ' },
    { country: 'FR' }
  ), 'Joachim Du Bellay');
  t.is(format(
    { lastName: 'du bellay' },
    { country: 'FR' }
  ), 'Du Bellay');

  t.is(format(
    { firstName: 'GÉRARD', lastName: 'd\'aboville' },
    { country: 'FR' }
  ), 'Gérard d\'Aboville');
  t.is(format(
    { lastName: 'd\'aboville' },
    { country: 'FR' }
  ), 'd\'Aboville');

  t.is(format(
    { firstName: 'guy ', lastName: 'des cars' },
    { country: 'FR' }
  ), 'Guy des Cars');
  t.is(format(
    { lastName: 'DES CARS' },
    { country: 'FR' }
  ), 'des Cars'); // TODO should be "Des Cars"
});
