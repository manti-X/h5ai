import gulp from 'gulp';
import { execSync } from 'child_process';
import path from 'path';
import { deleteAsync as del } from 'del';
import webpack from 'webpack-stream';
import include from 'gulp-include';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import pug from 'gulp-pug';
import zip from 'gulp-zip';
import insert from 'gulp-insert';
import footer from 'gulp-footer';
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import { fileURLToPath } from 'url';
import pkg from './package.json' with { type: 'json' };

const { src, dest, series, parallel } = gulp;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const TEST = path.join(ROOT, 'test');
const BUILD = path.join(ROOT, 'build');
const isProduction = process.argv.includes('release');

const WEBPACK_CFG = {
    mode: isProduction ? 'production' : 'development',
    output: {
        filename: 'scripts.js',
        library: { name: 'h5ai', type: 'window' }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
            },
            {
                test: /jsdom/,
                use: 'null-loader'
            }
        ]
    },
    devtool: isProduction ? false : 'source-map'
};

let version = pkg.version;
try {
    const hashes = execSync(`git rev-list v${pkg.version}..HEAD`, { encoding: 'utf8' }).split(/\r?\n/).filter(x => x);
    if (hashes.length) {
        const counter = ('000' + hashes.length).substr(-3);
        const hash = hashes[0].substr(0, 7);
        version += `+${counter}~${hash}`;
    }
} catch { /* ignore error */ }

const comment = `${pkg.name} v${version} - ${pkg.homepage}`;
const comment_js = `/* ${comment} */\n`;
const comment_html = `<!-- ${comment} -->`;
console.log(comment);
if (isProduction) console.log('Running in production mode');

const clean = () => del([BUILD]);

const buildScripts = () => src(path.join(SRC, '_h5ai/public/js/scripts.js'))
    .pipe(webpack(WEBPACK_CFG))
    .pipe(insert.prepend('//= require "pre.js"\n\n'))
    .pipe(include({ hardFail: true, includePaths: [path.join(SRC, '_h5ai/public/js')] }))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(insert.prepend(comment_js))
    .pipe(dest(path.join(BUILD, '_h5ai/public/js')));

const buildStyles = () => src(path.join(SRC, '_h5ai/public/css/styles.less'))
    .pipe(replace(/\/\/ @include/g, '//= require'))
    .pipe(include({ hardFail: true }))
    .pipe(less({ math: 'always' }))
    .pipe(autoprefixer())
    .pipe(gulpif(isProduction, cleanCss()))
    .pipe(insert.prepend(comment_js))
    .pipe(dest(path.join(BUILD, '_h5ai/public/css')));

const buildPhpFromPug = () => src(`${SRC}/**/*.php.pug`)
    .pipe(pug({ locals: { pkg } }))
    .pipe(rename(path => { path.extname = ''; }))
    .pipe(footer(comment_html))
    .pipe(dest(BUILD));

const copyPhpAndStatic = () => src([
    `${SRC}/**`, `!${SRC}/**/*.js`, `!${SRC}/**/*.less`, `!${SRC}/**/*.pug`,
    `!${SRC}/**/conf/*.json`, `!${SRC}/_h5ai/public/css/lib/**`, `!${SRC}/_h5ai/public/js/lib/**`
])
    .pipe(replace('{{VERSION}}', version))
    .pipe(dest(BUILD));

const copyJson = () => src(`${SRC}/**/conf/*.json`)
    .pipe(insert.prepend(comment_js))
    .pipe(dest(BUILD));

const copyRootFiles = () => src(`${ROOT}/*.md`)
    .pipe(dest(path.join(BUILD, '_h5ai')));

const copy = parallel(copyPhpAndStatic, copyJson, copyRootFiles);

const buildTests = () => src(path.join(TEST, 'index.js'))
    .pipe(webpack(WEBPACK_CFG))
    .pipe(insert.prepend('//= require "pre.js"\n\n'))
    .pipe(include({ hardFail: true, includePaths: [path.join(SRC, '_h5ai/public/js')] }))
    .pipe(dest(path.join(BUILD, 'test')));

const copyTestAssets = () => src(path.join(TEST, 'index.html'))
    .pipe(dest(path.join(BUILD, 'test')));

const copyTestStyles = () => src(path.join(BUILD, '_h5ai/public/css/styles.css'))
    .pipe(dest(path.join(BUILD, 'test')));

const createZip = () => src(path.join(BUILD, '_h5ai/**'))
    .pipe(zip(`${pkg.name}-${version}.zip`))
    .pipe(dest(BUILD));

const build = series(parallel(buildScripts, buildStyles), parallel(buildPhpFromPug, copy));
const tests = series(buildStyles, copyTestStyles, buildTests, copyTestAssets);
const release = series(clean, build, tests, createZip);

export { clean, build, tests, release };
export default release;