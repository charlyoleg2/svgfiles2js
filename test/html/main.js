// main.js

import { trapeze_rod_svg, trapeze_side_svg, trapeze_top_svg } from './tmp/svg-bundle.js';

console.log('main.js says hello!');
const elem1 = document.getElementById('art1');
//elem1.append('boo');
//elem1.replaceChildren('bee');
//elem1.replaceChildren(trapeze_rod_svg);
//elem1.innerHTML = '<p>Using innerHTML</p>';
elem1.innerHTML = trapeze_rod_svg;
//elem1.setHTML(trapeze_rod_svg); // not supported yet
document.getElementById('art2').innerHTML = trapeze_side_svg;
document.getElementById('art3').innerHTML = trapeze_top_svg;
console.log('main.js says bye!');
