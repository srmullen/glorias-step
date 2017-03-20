import "./boethius/styles/index.css";
import {map} from "lodash";
import WebFont from "webfontloader";
import compile from "./boethius-lang/src/main";
import Scored from "./boethius/src/Scored";
import layout from "../src/glorias-step-layout.json";
import bth from "../src/glorias-step.bth";

const music = compile(bth);

function start (cb) {
    var fontLoader = WebFont.load({
        custom: {
            families: ["gonville", "gonvillealpha"]
        },
        active: cb
    });
}

function createCanvas (el) {
    el.innerHTML = '<canvas class="scored-canvas parnassus"><canvas>';

    return document.getElementsByClassName("scored-canvas");
}

start(function () {
    var canvas = createCanvas(document.getElementById("root"));
    const scored = new Scored();
    scored.setup(canvas[0]);
    scored.render(layout, {
        voices: musicToScoredObjects(music.voices).map(Scored.parse)
    }).translate(100, 150);
    scored.project.view.update();
});

function createElement (type, props, children) {
    return {type, props, children};
}

function musicToScoredObjects (music) {
    return map(music, (v, k) => {
        return createElement("voice", {name: k}, v);
    });
}
