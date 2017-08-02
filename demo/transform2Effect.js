( function() {
//@include ../dist/aeq.js

aeq.snippet.forEachSelectedLayerOrAll( 'Transform2Effect', transform2Effect )

/**
 * Adds a 'Transform' effect to a layer and moves the values and keyframes
 * from the layers transform group to the matching properties on the
 * 'Transform' effect.
 * @param {Layer} layer The layer to move transform values to the transform effect.
 */
function transform2Effect( layer ) {
	var effects = layer.property( 'ADBE Effect Parade' )
	if ( effects === null || !effects.canAddProperty( 'ADBE Geometry2' ) ) {
		return
	}

	var effect = effects.addProperty( 'ADBE Geometry2' )
	moveToEffect( layer, effect )
}

/**
 * Moves the values and keyframes from the layers transform group to the matching
 * properties a 'Transform' effect.
 * @param  {Layer}         layer  The layer to get transform property values from.
 * @param  {PropertyGroup} effect The transform effect to copy properties to.
 */
function moveToEffect( layer, effect ) {
	var transformGroup = layer.property( 'ADBE Transform Group' )

	// Get the middle of the comp, used by as the default value of the
	// Position and Anchor Point properties.
	var comp = layer.containingComp
	var middleOfComp = [ comp.width / 2, comp.height / 2, 0 ]

	// The properties matchname in the transform group and their matching
	// matchname in the transform effect.
	// Second value in the array is the default value of the property
	var effects = {
		'ADBE Anchor Point': [ 'ADBE Geometry2-0001', middleOfComp ],
		'ADBE Position': [ 'ADBE Geometry2-0002', middleOfComp ],
		'ADBE Rotate Z': [ 'ADBE Geometry2-0007', 0 ],
		'ADBE Opacity': [ 'ADBE Geometry2-0008', 100 ]
	}

	// Copy the values of the transform group properties to the transform
	// effect properties
	aeq.forEach( effects, function( tranformName, info ) {
		var effectsName = info[ 0 ]
		var defaultValue = info[ 1 ]
		var prop = transformGroup.property( tranformName )

		if ( prop.numKeys ) {
			moveKeys( prop, effect.property( effectsName ) )
		} else {
			setValue( prop, effect.property( effectsName ) )
		}

		prop.setValue( defaultValue )
	} )

	// Scale is divided into two properties on the transform effect,
	// So can't set in the same ways as the other properties
	var scaleProp = transformGroup.property( 'ADBE Scale' )

	// Check if the scale is not proportional and switch the 'Use uniform scale' switch.
	if ( scaleProp.value[ 0 ] !== scaleProp.value[ 1 ] ) {
		effect.property( 'ADBE Geometry2-0011' ).setValue( 0 )
	}
	if ( scaleProp.numKeys ) {
		moveScaleKeys( effect, scaleProp )
	} else {
		setScaleValue( effect, scaleProp )
	}
	// Set scale to default value
	scaleProp.setValue( [ 100, 100, 100 ] )
}

// Normal property functio

/**
 * Moves keys from a source property to a target property.
 * Copies the keys to the target property then removes them from the source.
 * @param  {Property} source      The property to get keys from
 * @param  {Property} target      The property to move keys to.
 */
function moveKeys( source, target ) {
	var aeqProp = new aeq.Property( source )
	aeqProp.forEachKey( function( key ) {
		key.copyTo( target )
		key.remove()
	} )
}

/**
 * Copies the value of a source property in the transorm group to a target
 * property on the 'transform' effect.
 * @method setValue
 * @param  {[type]} source [description]
 * @param  {[type]} target [description]
 */
function setValue( source, target ) {
	var value = source.value

	// The 'Transform' effect is only 2D, so any arry with 3 values needs to
	// be converted to an array with 2 values.
	if ( aeq.isArray( value ) && value.length === 3 ) {
		value = [ value[ 0 ], value[ 1 ] ]
	}
	target.setValue( value )
}


// Scale property functions

/**
 * Moves the keyframes on a Scale property in the transform group to the two
 * scale properties on the 'Transform' effect.
 * Copies the keyframes and removes the originals.
 * @param  {PropertyGroup}      effect    The 'Transform' effect
 * @param  {Property}        scaleProp    THe Scale property.
 */
function moveScaleKeys( effect, scaleProp ) {
	var theProp = new aeq.Property( scaleProp )
	theProp.forEachKey( function( key ) {
		var keyInfo = key.getKeyinfo()
		var value = keyInfo.value
		var inEase = keyInfo.temporalEase.inEase
		var outEase = keyInfo.temporalEase.outEase

		// Paste key for the first scale direction
		keyInfo.property = effect.property( 'ADBE Geometry2-0004' )
		keyInfo.value = value[ 0 ]

		// Only use first value in temporal ease
		keyInfo.temporalEase.inEase = [ inEase[ 0 ] ]
		keyInfo.temporalEase.outEase = [ outEase[ 0 ] ]
		aeq.pasteKey( keyInfo )

		// Paste key for the second scale direction
		keyInfo.property = effect.property( 'ADBE Geometry2-0003' )
		keyInfo.value = value[ 1 ]

		// Only use second value in temporal ease
		keyInfo.temporalEase.inEase = [ inEase[ 1 ] ]
		keyInfo.temporalEase.outEase = [ outEase[ 1 ] ]
		aeq.pasteKey( keyInfo )

		// Remove the key.
		key.remove()
	} )
}

/**
 * Copies the value of a scale property in the transform group to the two
 * properties on the 'Transform' effect.
 * @param  {PropertyGroup}      effect    The 'Transform' effect
 * @param  {Property}        scaleProp    THe Scale property.
 */
function setScaleValue( effect, scaleProp ) {
	var scaleValue = scaleProp.value
	effect.property( 'ADBE Geometry2-0004' ).setValue( scaleValue[ 0 ] )
	effect.property( 'ADBE Geometry2-0003' ).setValue( scaleValue[ 1 ] )
}
} )()
