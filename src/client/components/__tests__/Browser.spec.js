import expect from 'expect';
import TestUtils from 'adrenaline/lib/test';

import schema from '../../../server/schema';
import Browser from '../Browser';

expect.extend(TestUtils.expect);

describe('Queries regression', () => {
  it('for Browser', () => {
    expect(Browser).toBeValidAgainst(schema);
  });
});
