AEQuery
==========

General purpose after effects scripting library.

Requirements
------------

Adobe After Effects
Extenscript Toolkit?

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

21:03 <              vaporstack > and now I'm outta my league