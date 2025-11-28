const rawMarked = require('marked');
const marked = (typeof rawMarked === 'function') ? rawMarked : rawMarked.parse;
const {each, dom} = require('../util');
const server = require('../server');
const event = require('../core/event');
const allsettings = require('../core/settings');


const settings = Object.assign({
    enabled: false
}, allsettings.custom);

const update = (data, key) => {
    const $el = dom(`#content-${key}`);

    if (data && data[key] && data[key].content) {
        let content = data[key].content;
        // The server returns 'md' for markdown files but in some setups
        // it might return 'txt-md' or similar. Accept both to be tolerant.
        const type = (data[key].type || '').toLowerCase();
        if (type === 'md' || type === 'txt-md' || type === 'markdown') {
            content = marked(content);
        }
        $el.html(content).show();
    } else {
        $el.hide();
    }
};

const onLocationChanged = item => {
    server.request({action: 'get', custom: item.absHref}).then(response => {
        const data = response && response.custom;
        each(['header', 'footer'], key => update(data, key));
    });
};

const init = () => {
    if (!settings.enabled) {
        return;
    }

    dom('<div id="content-header"></div>').hide().preTo('#content');
    dom('<div id="content-footer"></div>').hide().appTo('#content');

    event.sub('location.changed', onLocationChanged);
};


init();
