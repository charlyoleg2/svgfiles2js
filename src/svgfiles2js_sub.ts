// svgfiles2js_sub.ts

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { version } from '../package.json';
import { globSync } from 'glob';
import path from 'path';
import fs from 'fs';

function dateString(): string {
	const re1 = /[-:]/g;
	const re2 = /\..*$/;
	const rDateStr = new Date().toISOString().replace(re1, '').replace(re2, '').replace('T', '_');
	return rDateStr;
}

function createDir(iDir: string) {
	if (!fs.existsSync(iDir)) {
		fs.mkdirSync(iDir, { recursive: true });
		console.log(`info203: mkdir ${iDir}`);
	}
}

function createVarName(iPath: string): string {
	const varName1 = path.basename(iPath);
	const rePoint = /\./;
	const varName2 = varName1.replace(rePoint, '_');
	const reHyphen = /-/;
	const varName3 = varName2.replace(reHyphen, '_');
	return varName3;
}

function convert_svg(isvg: string[], ofile: string) {
	const varNames: string[] = [];
	let oStr = `// ${path.basename(ofile)}\n`;
	//oStr += `// created by svgfiles2js on ${dateString()}\n\n`;
	oStr += `// created by svgfiles2js\n\n`;
	console.log('List of svg-files bundled:');
	for (const [idx, svgFilePath] of isvg.entries()) {
		console.log(`${idx + 1}: ${svgFilePath}`);
		const varName = createVarName(svgFilePath);
		if (varNames.includes(varName)) {
			console.log(`err543: varName ${varName} is already used!`);
			process.exit(1);
		} else {
			varNames.push(varName);
			const fsvg = fs.readFileSync(svgFilePath, 'utf8');
			//oStr += `export const ${varName} = '${fsvg}';\n\n`;
			oStr += `export const ${varName} = \n\t'`;
			for (let i = 0; i < fsvg.length; i++) {
				const letter = fsvg.charAt(i);
				if (i % 80 === 0 && i > 0) {
					oStr += "' +\n\t'";
				}
				if (letter === "'") {
					console.log(`err553: single-quote in ${svgFilePath}`);
					process.exit(1);
				} else {
					oStr += letter;
				}
			}
			oStr += "';\n\n";
		}
	}
	//console.log(varNames);
	//console.log(oStr);
	try {
		createDir(path.dirname(ofile));
		fs.writeFileSync(ofile, oStr);
		console.log(`Write output-file: ${ofile}`);
	} catch (err) {
		console.log(`err389: Error by writing the file ${ofile}`);
		console.error(err);
	}
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
	//console.log(argv.svg);
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

export { createVarName, dateString, svgfiles2js_cli };
