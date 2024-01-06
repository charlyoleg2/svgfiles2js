import { describe, it, expect } from 'vitest';
import { createVarName } from './svgfiles2js';

describe('svgfiles2js suit', () => {
	it('createVarName 1', () => {
		expect(createVarName('trapeze_side.svg')).toBe('trapeze_side_svg');
	});
	it('createVarName 2', () => {
		expect(createVarName('trapeze-side.svg')).toBe('trapeze_side_svg');
	});
});
