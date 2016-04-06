import test from 'ava';
import { format } from '../src';

test('format returns a personal name using defaults', t => {
  t.is(format({ firstName: 'John', lastName: 'Doe' }), 'John Doe');
});

test('format accepts custom tokens', t => {
  const person = {
    gender: 'male',
    firstName: 'John',
    lastName: 'Doe',
  };
  t.is(format(person, '[lastName], [firstName]'), 'Doe, John');
  // t.is(format(person, '[title] [firstName] [lastName]'), 'Mr. John Doe');
});

test('format returns proper case', t => {
  t.is(format({ firstName: 'joHN', lastName: 'DOe' }), 'John Doe');
  t.is(format({ firstName: 'tim', lastName: 'berners-lee' }), 'Tim Berners-Lee');
});

test('format handles accents', t => {
  t.is(format({ firstName: 'François', lastName: 'Hollande' }), 'François Hollande');
  t.is(format({ firstName: 'andrée', lastName: 'chedid' }), 'Andrée Chedid');
});

test('format trims result', t => {
  t.is(format({ firstName: '  JOHN  ', lastName: '  DOE  ' }), 'John Doe');
  t.is(format({ firstName: '  JOHN  ' }, '[lastName], [firstName]'), 'John');
});
