import "../boethius/styles/index.css";
import {map} from "lodash";
import WebFont from "webfontloader";
import compile from "../boethius-lang/src/main";
import Scored from "../boethius/src/Scored";

const layout = {
    "_id": "p/Star_Spangled_Banner/layout/1482699809626",
    "_rev": "14-533492aca39b02f7f95ea2dbb87d3d4b",
    "name": "",
    "title": "Lead",
    "composer": "",
    "type": "score",
    "timeSignatures": [
      {
        "value": [
          3,
          4
        ],
        "measure": 0,
        "beat": 0
      },
      {
        "value": [
          4,
          4
        ],
        "measure": 4,
        "beat": 0
      }
    ],
    "selected": {
      "system": 2,
      "line": 0,
      "measure": 3,
      "beat": 1.5
    },
    "currentPage": 0,
    "project": "p/Star_Spangled_Banner",
    "pages": [
      {
        "systems": 4,
        "staffSpacing": []
      },
      {
        "systems": 4,
        "staffSpacing": []
      }
    ],
    "lines": [
      {
        "name": "",
        "clefs": [
          {
            "value": "treble",
            "measure": 0,
            "beat": 0
          }
        ],
        "keys": [
          {
            "root": "C",
            "mode": "major",
            "measure": 0,
            "beat": 0
          }
        ],
        "voices": [
          "mel"
        ]
      }
    ],
    "systems": [
      {
        "measures": 3,
        "lineSpacing": [
          0
        ],
        "length": 800
      },
      {
        "measures": 4,
        "lineSpacing": []
      },
      {
        "measures": 4,
        "lineSpacing": [],
        "length": 800
      },
      {
        "measures": 4,
        "lineSpacing": []
      },
      {
        "measures": 4,
        "lineSpacing": []
      },
      {
        "measures": 4,
        "lineSpacing": []
      },
      {
        "measures": 3,
        "lineSpacing": []
      }
    ]
}
const bth = require("../src/glorias-step.bth");

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
    }).translate(25, 50);
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
