"use strict";

const draw = require("./modules/draw");
const ipcRenderer = require("electron").ipcRenderer;
const NewHub = require("./modules/hub").NewHub;
const path = require("path");

// --------------------------------------------------------------

draw.Init();

let hub = NewHub();

// --------------------------------------------------------------

ipcRenderer.on("call", (event, msg) => {

	let fn;

	if (typeof msg === "string") {																		// msg is function name
		fn = hub[msg].bind(hub);
	} else if (typeof msg === "object" && typeof msg.fn === "string" && Array.isArray(msg.args)) {		// msg is object with fn and args
		fn = hub[msg.fn].bind(hub, ...msg.args);
	}

	fn();
});

