# h5ai

[![license][license-img]][github]

A HTTP web server index for Apache httpd, lighttpd, and nginx.

**This is a fork of [lrsjng's h5ai](https://github.com/lrsjng/h5ai), which appears to be no longer maintained.**


## Important

* Do **not** install any files from the `src` folder, they need to be
  preprocessed to work correctly!
* Find a preprocessed package and detailed install instructions on the old
  [project page](https://web.archive.org/web/20240120005545/https://larsjung.de/h5ai/).
* For bug reports and feature requests please use [issues][github-issues].
* Requires at least **PHP 7.0.0+**
* Tested with **PHP 8.4.0** and **nginx**


## Build

There are installation ready packages for the latest [releases][release]. But to build **h5ai** yourself either `git clone` or
download the repository. From within the root folder run the following
commands to find a fresh zipball in folder `build` (tested and requires
[`node 10.0 - 11.5.2`][node] to work).

~~~sh
> npm install
> npm run build
~~~
Because of outdated packages, it might be necessary to use:
<h4>Windows</h4>

~~~sh
> $env:NODE_OPTIONS = "--openssl-legacy-provider"; npm run build
~~~
<h4>Linux</h4>

~~~sh
> NODE_OPTIONS=--openssl-legacy-provider npm run build
~~~


## Optional Dependencies

* FFmpeg/FFprobe or AVconv/AVprobe
* gm (GraphicsMagick) or convert (ImageMagick)
* PHP FileInfo module
* PHP Sqlite3 module
* PHP Zip module
* PHP [Rar](https://pecl.php.net/package/rar) module
* du
* tar
* zip

## License

The MIT License (MIT)

Copyright (c) 2020 Lars Jung (https://larsjung.de)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## References

**h5ai** profits from other projects, all of them licensed under the MIT license
too. Exceptions are some [Material Design icons][material-design-icons] (CC BY 4.0).


[original]: https://github.com/lrsjng/h5ai
[github]: https://github.com/manti-X/h5ai/
[github-issues]: https://github.com/manti-X/h5ai/issues
[release]: https://github.com/manti-X/h5ai/releases
[node]: https://nodejs.org
[material-design-icons]: https://github.com/google/material-design-icons

[license-img]: https://img.shields.io/badge/license-MIT-a0a060.svg?style=flat-square
[web-img]: https://img.shields.io/badge/web-larsjung.de/h5ai-a0a060.svg?style=flat-square
[github-img]: https://img.shields.io/badge/github-lrsjng/h5ai-a0a060.svg?style=flat-square
