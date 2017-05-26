( function() {
//@include ../dist/aeq.js


var comp = aeq.getActiveComp()
if ( comp === null ) {
	return alert( 'No Comp' )
}

var layers = comp.selectedLayers
if ( !layers.length ) {
	var applyToAll = confirm( 'No layers selected, apply to all?', true )
	if ( applyToAll ) {
		layers = aeq.getLayers( comp )
	} else {
		return
	}
}

aeq.undoGroup( 'Transform2Effect', main, [ layers ] )

function main( layers ) {
	aeq.forEach( layers, transform2Effect )
}

function transform2Effect( layer ) {
	var effects = layer.property( 'ADBE Effect Parade' )
	if ( effects === null || !effects.canAddProperty( 'ADBE Geometry2' ) ) {
		return
	}

	var effect = effects.addProperty( 'ADBE Geometry2' )
	var transformGroup = layer.property( 'ADBE Transform Group' )

	moveToEffect( layer, effect, transformGroup )
}

function moveToEffect( layer, effect, transformGroup ) {
	var comp = layer.containingComp
	var middleOfComp = [ comp.width / 2, comp.height / 2, 0 ]
	var effects = {
		'ADBE Anchor Point': [ 'ADBE Geometry2-0001', middleOfComp ],
		'ADBE Position': [ 'ADBE Geometry2-0002', middleOfComp ],
		'ADBE Rotate Z': [ 'ADBE Geometry2-0007', 0 ],
		'ADBE Opacity': [ 'ADBE Geometry2-0008', 100 ]
	}

	aeq.forEach( effects, setValue )

	function setValue( tranformName, info ) {
		var effectsName = info[ 0 ]
		var defaultValue = info[ 1 ]
		var value = transformGroup.property( tranformName ).value
		if ( aeq.isArray( value ) && value.length === 3 ) {
			value = [ value[0], value[1] ]
		}
		effect.property( effectsName ).setValue( value )
		transformGroup.property( tranformName ).setValue( defaultValue )
	}

	// Scale
	var scaleValue = transformGroup.property( 'ADBE Scale' ).value
	if ( scaleValue[0] !== scaleValue[1] ) {
		effect.property( 'ADBE Geometry2-0011' ).setValue( 0 )
	}
	effect.property( 'ADBE Geometry2-0004' ).setValue( scaleValue[0] )
	effect.property( 'ADBE Geometry2-0003' ).setValue( scaleValue[1] )
	transformGroup.property( 'ADBE Scale' ).setValue( [ 100, 100, 100 ] )
}
})()
