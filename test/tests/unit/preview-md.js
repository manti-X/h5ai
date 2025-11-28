const marked = require('marked');
const {test} = require('scar');

test('marked renders markdown', () => {
    const md = '# Heading\n\n**Bold** text';
    const html = marked(md);
    return html.indexOf('<h1') >= 0 && html.indexOf('<strong') >= 0;
});
