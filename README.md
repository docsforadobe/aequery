AEQuery
==========

General purpose after effects scripting library.

Requirements
------------

Adobe After Effects
ExtendScript Toolkit or other text editor

Download
--------
[The latest version of AEQuery can be found in the downloads section of this repository](https://bitbucket.org/motiondesign/aequery/downloads)

Documentation
-------------
[For documentation, see the wiki section of this repository](https://bitbucket.org/motiondesign/aequery/wiki/Home)


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

# Contributing
Want to add something in AEQuery?

Look in the file tree to see if there is a place where it may fit.

If necessary, create a new file. The basic file structure is:
```javascript
var aeq = (function (aeq) {
aeq.extend({
	yourCodeHere: function() {

	}
});
return aeq;
}(aeq || {}));
```
If you want to create a submodule, the structure is:
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
