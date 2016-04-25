(function() {
#include "../../dist/aeq.js"; // jshint ignore: line

function log(item) {
	if (item.name) {
		writeLn(item.name);
	} else {
		writeLn(item);
	}
}

var comp = app.project.item(1),
	comps = [app.project.item(1), app.project.item(2)],
	layer = comp.layer(1),
	layers = [comp.layer(1), comp.layer(2)];

aeq.forEachLayer(comp, log);
aeq.forEachLayer(comps, log);
aeq.forEachLayer(log);

aeq.forEachProp(comp, log);
aeq.forEachProp(comps, log);
aeq.forEachProp(layer, log);
aeq.forEachProp(layers, log);
aeq.forEachProp(log);

aeq.forEachComp(log);
aeq.forEachItem(log);

aeq.forEachRQItem(log);
aeq.forEachOM(log);
}());
