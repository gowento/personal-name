import test from 'ava';
import personalName from '../src';

test('personalName', t => {
  t.is(true, personalName(), 'return true');
});
