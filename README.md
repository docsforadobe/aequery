AEQuery
==========

General purpose after effects scripting library.

Requirements
------------

Adobe After Effects
ExtendScript Toolkit or other text editor

How to build it yourself
------------------------

Make sure you have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed

Install gulp
```bash
sudo npm install -g gulp
```

Clone repository and enter the directory
```bash    
git clone https://bitbucket.org/motiondesign/aequery.git
cd aequery
```

Install npm dependencies
```bash
npm install
```

Gulp usage:
```bash
gulp # Builds it to the relevant places in the ScriptUI Folder  
gulp watch # Will monitor it and  rebuild it real quick if anything changes  
```

Import into your script
```javascript
#include "path/to/aeq.js"
```

# Documentation
[For documentation, see the wiki section of this repository](https://bitbucket.org/motiondesign/aequery/wiki/Home)

# Contributing
What to include add something in AEQuery?

Look in the file tree to see if there is a place where it may fit.

If necessary, create a new file. The basic structure is:
```javascript
var aeq = (function (aeq) {
aeq.extend({
	yourCodeHere: function() {
	
	}
});
return aeq;
}(aeq || {}));
```
If you want to add a submodule, the structure is:
```javascript
var aeq = (function (aeq) {
aeq.yourModule = {
	toString: function() {
		return "[object aeq.yourModule]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	code: function() {
	
	}
}
return aeq;
}(aeq || {}));
```

The `aeq.extend` function is for easier extension of objects and better looking code. If you pass in one object (`aeq.extend( { something: function() {} } )`) it will add the properties and functions you add to the object to the `aeq` object (e.g you can then call `aeq.something()`). If you pass in two objects (`aeq.extend( someObject, { example: "example" } )`) it will add the properties of the second object to the first object (e.g you then have `someObject.example` ). The extend function in aequery is basicly a copy of jQuerys extend function, so for more information see the [jQuery documentation](https://api.jquery.com/jquery.extend/)