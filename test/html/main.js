// main.js

import { trapeze_rod_svg } from './tmp/svg-bundle.js';

console.log('main.js says hello!');
const elem1 = document.getElementById("art1");
//elem1.append('boo');
//elem1.replaceChildren('bee');
elem1.replaceChildren(trapeze_rod_svg);
console.log('main.js says bye!');
