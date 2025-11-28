if (!global.window) {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
        url: 'http://localhost/'
    });

    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
}

const {test} = require('scar');
void test; // ensure linter doesn't mark 'test' as unused since it's used indirectly by required test files
const {pin_html} = require('./util/pin');

require('./tests/premisses');
require('./tests/unit/core/event');
require('./tests/unit/core/format');
require('./tests/unit/util/naturalCmp');
require('./tests/unit/util/parsePatten');
require('./tests/unit/preview-md');
require('./tests/unit/types-md');

pin_html();