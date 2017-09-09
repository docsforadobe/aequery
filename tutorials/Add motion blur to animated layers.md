# Add motion blur to animated layers

The goal of this script is to turn on the motion blur switch on all layers that are animated in the currently open After Effects composition. This tutorial goes through the script line by line, explaining what each line does.

Create a wrapping functions, so no variables or functions gets added to the global after effects scope. And include the aequery library
```javascript
( function () {
	//@include path/to/aeq.js
```

Get the currently open After Effects composition using {@link aeq.getActiveComposition}.
```javascript
	var comp = aeq.getActiveComp();
```
{@link aeq.getActiveComposition} returns null if there is no composition open. So stop the script if that is the case.

```javascript
	if ( comp === null ) {
		return;
	}
```

To be able to undo the action of the script, by using `edit > Undo` from the menu or the `ctrl/cmd + z` keyboard shortcut we use the {@link aeq.createUndoGroup} function. The function takes three arguments:

- The name of the undo group. Visible in the `Edit` menu.
- A function to execute. In this case, we are passing in the `addMotionBlurToCompLayers` function.
- An array of arguments to pass to the function. In this case the function needs a comp as the first argument, so we create an array with the variable that contains the currently open comp.

```javascript
	aeq.createUndoGroup( "Add motionblur", addMotionBlurToCompLayers, [ comp ] );
```

Now we need to create a function that looks for layers to apply motion blur to.
```javascript
	function addMotionBlurToCompLayers( comp ) {
```

The first thing the function does is to loop through the layers of the comp for layers without any motion blur using [aeq]{@link aeq(1)}. To search through only the comp passed to the function, we set `comp` as the `context` parameter in the [aeq]{@link aeq(1)} function.

Since the [aeq]{@link aeq(1)} function returns an {@link aeq.arrayEx} object, we can use {@link aeq.arrayEx.forEach} to loop through all the layers
```javascript
		aeq( "layer:not(motionBlur)", comp ).forEach( function ( layer ) {
```

We are now looking at a layer and need to find out if the motion blur switch should be on or not. For that we loop through all the properties, and look for one that is animated, using {@link aeq.forEachProperty}.
```javascript
			aeq.forEachProperty( layer, function ( property ) {
				if ( property.isTimeVarying ) {
```
Since the property and therefore the layer is animated, we want to enable motion blur on the layer and any layer that has this layer as it parent. To that we use a specialized `addMotionBlur` function.
```javascript
					addMotionBlur( layer );
```
Since we have added motion blur to the layer, we can stop looking through all the properties. To do this we `return false` which stops the `forEach` loop.

```javascript
					return false;
				}
			} );
		} );
	}
```

Now comes the function that actually applies the motion blur.
```javascript
	function addMotionBlur( layer ) {
```
We want to apply motion blur to more than only the layer passed to the function. We want to apply it to all layers using the layer as a parent, because if the parent layer moves, the child layer also moves.

So we need to get all the child layers, and to do this we use {@link aeq.layer.children}. Then we loop through them and do the `addMotionBlur` function recursively for all the children.

```javascript
		var children = aeq.layer.children( layer );
		aeq.forEach( children, addMotionBlur );
```

Now we actually set the motion blur attribute of the layer, but we only want to apply motion blur to layers that can have motion blur enabled. For example cameras and lights do not have motion blur attribute. And there is no use in having motion blur on null layers, so we check that first, before setting the attribute.
```javascript
		if ( layer.motionBlur !== undefined && !layer.nullLayer ) {
			layer.motionBlur = true;
		}
	}
```
Then, finally, we close the wrapping function
```javascript
}() );
```

Here is the whole script we just created:

```javascript
( function () {
	//@include ../dist/aeq.js

	var comp = aeq.getActiveComp();

	if ( comp === null ) {
		return;
	}

	aeq.createUndoGroup( "Add motionblur", addMotionBlurToCompLayers, [ comp ] );

	function addMotionBlurToCompLayers( comp ) {
		aeq( "layer:not(motionBlur)", comp ).forEach( function( layer ) {
			aeq.forEachProperty( layer, function( property ) {
				if ( property.isTimeVarying ) {
					addMotionBlur( layer );
					return false;
				}
			} );
		} );
	}

	function addMotionBlur( layer ) {
		var children = aeq.layer.children( layer );

		aeq.forEach( children, addMotionBlur );
		if ( layer.motionBlur !== undefined && !layer.nullLayer ) {
			layer.motionBlur = true;
		}
	}
}() );
```
