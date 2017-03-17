import compile from "../boethius-lang/src/main";
import Scored from "../boethius/src/Scored";

// function compile() {
//     return "Hello";
// }
const bth = require("../src/glorias-step.bth");

const score = compile(bth);

console.log(score);
