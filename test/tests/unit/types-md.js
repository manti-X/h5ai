const types = require('../../../src/_h5ai/public/js/lib/core/types');
const {test} = require('scar');

test('types recognizes md as txt-md', () => {
    return types.getType('/README.md') === 'txt-md';
});
