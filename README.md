AEQuery
==========

General purpose after effects scripting library.

Requirements
------------

Adobe After Effects
ExtendScript Toolkit or other text editor

Download/install
----------------

```bash
npm install aequery
```

If you are not using npm, you can download the latest version [here](https://bitbucket.org/motiondesign/aequery/downloads)

Then you can include it in your script

Import into your script
```javascript
#include 'path/to/aequery.js'

// Disable all Camera lens blur effects in active comp
aeq( 'activecomp effect[MatchName="ADBE Camera Lens Blur"]' ).attr( 'enabled', false )
```

or, if you are using browserify/typescript or similar:

```javascript
var aeq = require( 'aequery' )

var comp = aeq.getActiveComp()

if (comp) {
	aeq.forEachLayer( function ( layer ) {
		// Do something with layer
	})
}
```

Documentation
-------------
[For documentation, visit aequery.aenhancers.com](http://aequery.aenhancers.com)


Development
-----------

Make sure you have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed

Install gulp
```bash
sudo npm install -g gulp

# Clone the repository and enter the directory
git clone https://bitbucket.org/motiondesign/aequery.git
cd aequery

# Install npm dependencies
npm install
```

Gulp usage:
```bash
gulp # Builds it to the relevant places in the ScriptUI Folder
gulp watch # Will monitor it and  rebuild it real quick if anything changes
```

# Contributing
Pull requests, [bug reports and feature requests](https://bitbucket.org/motiondesign/aequery/issues) are welcome!
