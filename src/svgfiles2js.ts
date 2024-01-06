#!/usr/bin/env node
// svgfiles2js.ts

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';

function svgfiles2js_cli(iArgs: string[]) {
	const argv = yargs(hideBin(iArgs))
		.scriptName('svgfiles2js')
		.version(version)
		.usage('Usage: $0 <global-options> command <command-argument>')
		.example([
			['$0 -s icons/*.svg', 'convert all svg files of the directory icons'],
			['$0 -s icons/**/*.svg -o dist/svg-bundle.js', 'output a javascript file'],
			['$0 --svg one.svg two.svg --output dist/svg-bundle.ts', 'output a typescript file']
		])
		.option('svg', {
			alias: 's',
			type: 'string',
			array: true,
			description: 'list of input svg-files',
			default: []
		})
		.option('output', {
			alias: 'o',
			type: 'string',
			array: false,
			description: 'path to the output file',
			default: 'dist/svg-bundle.ts'
		})
		.help()
		.strict()
		.parseSync();
	console.log(argv.svg);
	console.log(argv.output);
}

console.log('svgfiles2js says hello!');
svgfiles2js_cli(process.argv);
console.log('svgfiles2js says bye!');
