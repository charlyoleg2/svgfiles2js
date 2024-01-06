#!/usr/bin/env node
// svgfiles2js.ts

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';
import { globSync } from 'glob';

function convert_svg(isvg: string[], ofile: string) {
	console.log('List of svg-files bundled:');
	for (const [idx, svgFileName] of isvg.entries()) {
		console.log(`${idx + 1}: ${svgFileName}`);
	}
	console.log(`Write output-file: ${ofile}`);
}

function svgfiles2js_cli(iArgs: string[]) {
	const argv = yargs(hideBin(iArgs))
		.scriptName('svgfiles2js')
		.version(version)
		.usage('Usage: $0 <global-options> command <command-argument>')
		.example([
			['$0 -s icons/*.svg', 'convert all svg files of the directory icons'],
			["$0 -s 'icons/**/*.svg' -o dist/svg-bundle.js", 'output a javascript file'],
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
			array: true,
			description: 'path to the output file',
			default: 'dist/svg-bundle.ts'
		})
		.help()
		.strict()
		.parseSync();
	console.log(argv.svg);
	//console.log(argv.output);
	if (argv.svg.length < 1) {
		console.log('err036: No svg-files to be converted!');
		process.exit(1);
	}
	if (argv.output.length > 1) {
		console.log(`err049: ${argv.output.length} output file-path are provided!`);
		process.exit(1);
	}
	const svgfiles = globSync(argv.svg);
	if (svgfiles.length < 1) {
		console.log('err055: No svg-files found!');
		process.exit(1);
	}
	convert_svg(svgfiles, argv.output[0]);
}

console.log('svgfiles2js says hello!');
svgfiles2js_cli(process.argv);
console.log('svgfiles2js says bye!');
