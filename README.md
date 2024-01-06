svgfiles2js
===========


Presentation
------------

*svgfiles2js* is a *command line interface* application for converting [SVG](https://www.w3.org/Graphics/SVG/) files in one *javascript* or *typescript* file. Some people call this kind of CLI a *svg-inliner*.

Installation
------------

```bash
npm i -D svgfiles2js
```

or in a repository with workspaces

```bash
npm -w mySubPackage i -D svgfiles2js
```

Usage
-----

```bash
npx svgfiles2js -s test/svg/trapeze_rod.svg test/svg/trapeze_side.svg
npx svgfiles2js -s test/svg/*.svg -o dist/svg-bundle.ts
npx svgfiles2js -s 'test/**/*.svg' -o dist/svg-bundle.js
```

If you use the double-star character '\*\*', you must quote (with single-quote or double-quote) the path to prevent the shell expanding the path before being interpreted by *svgfiles2js*.

Alternatives
------------

There are many tools to inline *SVG* files or convert *SVG* files into *Javascript*. But they all look to me outdated. So I have decided to create an other *svg-inliner* with my own flavors.

Below a list of *svg-inliner* tools:

- https://github.com/kreuzerk/svg-to-ts
- https://github.com/xperiments/svg2ts
- https://github.com/yartasdev/svg2ts
- https://github.com/nrkno/svg-to-js
- https://github.com/pavjacko/svg2js
- https://github.com/sknightq/svg2js
- https://github.com/academeet/vite-svg-vue
- https://github.com/shrpne/vue-inline-svg

Most of those *svg-inliner* include the *svg-optimizer* [svgo](https://svgo.dev/). *svgfiles2js* doesn't include *svgo*. If you want to optimized your svg-files, you must install and run *svgo* and then call *svgfiles2js*. The advantage is that you can check easily the optimized svg-files before the conversion in *javascript*.


Getting started with development
--------------------------------

```bash
git clone https://github.com/charlyoleg2/svgfiles2js
cd svgfiles2js
npm install
npm run ci
npm run run
npm run serve_html
./dist/svgfiles2js --help
./dist/svgfiles2js -s ./test/svg/*.svg -o ./test/js/svg-bundle.js
./dist/svgfiles2js -s ./test/svg/*.svg -o ./test/ts/svg-bundle.ts
```




