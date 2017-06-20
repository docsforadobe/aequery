'use strict';

var gulp = require('gulp'),
	os = require('os'),
	fs = require('fs'),
	del = require('del'),
	concat = require('gulp-concat'),
	replace = require('gulp-replace'),
	zip = require('gulp-zip'),
	pdf = require('gulp-markdown-pdf'),
	uglify = require('gulp-uglify'),
	change = require('gulp-change'),
	rename = require('gulp-rename'),
	util = require('gulp-util'),
	rseq = require('run-sequence'),
	PEG = require('pegjs'),
	exec = require('child_process').exec,
	addsrc = require('gulp-add-src');

var pkg = require('./package.json'),
	name = pkg.name;

var configuration = {
	debug : 'debug',
	release : 'release',
};

var deployment = {
	local : 'local',
	dev : 'dev',
	stage : 'stage',
	prod : 'prod',
};

var build = {
	configuration : null,
	deployment : null,
	deploy : null
};

var config = {
	"build-locations": []
};
if (fs.existsSync('./config.json')) {
	config = require('./config.json');
	util.log( "config: " + config );
}

/*
 * Expects you have After Effects CC 2015 installed
 * in the default location
 */
var platform = os.platform();

if (platform == 'darwin')
{
//	console.log(getVersions('/Applications/', 'darwin'));
	build.deploy = getVersions('/Applications/', 'darwin');
	util.log('OS: Mac OS X (darwin)');
	logVersions(build.deploy);
}
else if (platform === 'linux') // bitbucket uses linux
{
	var appdir = "./build/dummy";
	try{
		fs.mkdirSync(appdir);
	}catch(e){}
	var aeVersions = {};
	aeVersions.dummy_install = {
		esdir: appdir + '/dummy_scriptui/ScriptUI Panels/',
		cepdir: appdir + "/dummy_cep"
	};

	build.deploy = aeVersions;
	util.log('OS: Linux');
	logVersions(build.deploy);
}
else
{
	build.deploy = getVersions('C:/Program Files/', 'win32');
	util.log('OS: Windows (win32)');
	logVersions(build.deploy);
}


gulp.task('default', ['debug', 'build:docs']);
gulp.task('build-aequery', ['debug'], function() {
	return gulp.start('build:concat-ui');
});


gulp.task('watch', function () {
	gulp.watch(['./lib/**/*.js', './**/*.jsx'], ['debug']);
});


gulp.task('clean:all', ['clean:extendscript', 'clean:cep'], function () {
	return del(['build', 'dist'], {
		force: true
	});
});

gulp.task('debug', function (cb) {
	build.configuration = configuration.debug;
	build.deployment = deployment.local;

	uglify = require('gulp-empty');

	return rseq('clean:all', 'build:aeq', 'build:aeq-ui', 'deploy:all', cb);
});


gulp.task('release', function (cb) {
	build.configuration = configuration.release;
	build.deployment = deployment.local;

	// TODO: configure uglify...

	return rseq('clean:all', 'build:all', 'deploy:all', 'package:all', cb);
});

gulp.task('build:all', ['build:aeq', 'build:aeq-ui', 'build:docs']);

gulp.task('build:aeq', ['build:aeq-core', 'build:aeq-parser'], function() {
	return gulp.src('./build/*.js')
		.pipe(concat('aeq.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('build:aeq-core', function () {
	return gulp.src([
			'lib/intro.js',
			'lib/main.js',
			'!lib/ui/**/*.js',
			'!lib/outro.js',
			'lib/**/*.js',
		])
		.pipe(replace(/(\/\*.*?\*\/\n+)?(var )?aeq = \(function ?\(aeq\) \{/g, ''))
		.pipe(replace(/'use strict';/g, ''))
		.pipe(replace(/return aeq;\n+\}\(aeq \|\| \{\}\)\)\;/g, ''))
		.pipe(addsrc.append('lib/outro.js'))
		.pipe(concat('core.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:aeq-parser', function () {
	gulp.src('grammar/aeq.peg')
		.pipe(compilePeg())
		.pipe(rename({ basename : 'parser', extname : '.js' }))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:aeq-ui', function () {
	return gulp.src([
			'lib/ui/**/*.js',
		])
		.pipe(concat('aeq-ui.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('build:concat-ui', function() {
	return gulp.src( [
		'dist/aeq.js',
		'dist/aeq-ui.js',
	] )
	.pipe(concat('aequery.js') )
	.pipe(gulp.dest('./dist'));
} );

gulp.task('deploy:all', ['deploy:extendscript', 'deploy:cep', 'deploy:custom']);

gulp.task('deploy:bitbucket', function (cb) {
	uglify = require('gulp-empty');
	return rseq('clean:all', 'build:aeq', 'build:aeq-ui', 'build:concat-ui', cb);
});

gulp.task('deploy:extendscript', [], function () {
	var stream = gulp.src([
		'./dist/aeq.js',
		'./dist/aeq-ui.js',
		'./testproject/extendscript/aeq_test.jsx',
		'./testproject/extendscript/aeq-ui_Demo.jsx'
	]);

	for (var aever in build.deploy)
	{
		var aeconfig = build.deploy[aever];

		stream = stream.pipe(gulp.dest(aeconfig.esdir));
	}

	return stream;
});

gulp.task('clean:extendscript', function () {
	var dirs = [];

	for (var aever in build.deploy)
	{
		var aeconfig = build.deploy[aever];

		dirs = dirs.concat(aeconfig.esdir + 'aeq*');
	}

	return del(dirs, {
		force: true
	});
});

gulp.task('deploy:cep', function() {
	// TODO
	return;
});

gulp.task('clean:cep', function() {
	// TODO
	return;
});

gulp.task( 'deploy:custom', function() {
	var locations = config['build-locations'];
	if ( !locations) {
		return;
	}
	locations.forEach(function(location) {
		var stream = gulp.src([
			'./dist/aeq.js',
			'./dist/aeq-ui.js'
		]);
		var useJsx = false;
		if ( Array.isArray(location)) {
			useJsx = location[1];
			location = location[0];
		}
		if (useJsx) {
			stream.pipe(rename(function(path) {
				path.extname = ".jsx";
			}));
		} else {
			stream.pipe(rename(function(path) {
				path.extname = ".js";
			}));
		}
		stream.pipe(gulp.dest(location));
	});
} );

gulp.task('build:docs', function () {
	var cmd = './node_modules/.bin/jsdoc lib/ --configure ./.jsdocrc.json';

	if (os.platform() !== 'darwin')
		cmd = cmd.replace(/\//g, '\\');

	exec(cmd, err => {
		if (err) {
			console.error(err)
			return
		}
		// Something is messing up the names of a couple of doc files.
		// Rename to expected values
		gulp.src('docs/aeq.layer_.html')
			.pipe(rename('aeq.Layer_.html'))
			.pipe(gulp.dest('docs/'))

		gulp.src('docs/aeq.Layer.html')
			.pipe(rename('aeq.layer.html'))
			.pipe(gulp.dest('docs/'))
	})
});

gulp.task('clean:docs', function() {
	return del(['docs'], {
		force: true
	});
})

gulp.task('package:all', function () {
	return gulp.src(['./dist/aeq.js', './dist/aeq-ui.js', './dist/README.pdf'])
		.pipe(zip(pkg.name + '-' + pkg.version + '-' + now() + '.zip'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('update-version', ['update-version:aeq', 'build:docs'] )

gulp.task('update-version:aeq', function() {
	return gulp.src(['lib/main.js'])
		.pipe(replace( /^(aeq\.version = ")\d+\.\d+\.\d+(")/m, `$1${pkg.version}$2`))
		.pipe(gulp.dest('lib/'))
})


function now() {
	var div = "";
	var date = new Date(),
		month = date.getMonth()+1,
		day = date.getDay(),
		hrs = date.getHours(),
		min = date.getMinutes();
	return month + div + day + div + hrs + div + min;
}

function compilePeg() {
	return change(function (content) {
		var parser = PEG.buildParser(content, {output: 'source'});
		var exportVar = 'var cssselector=';

		return exportVar + parser;
  });
}

function logVersions(buildObj) {
	for (var obj in buildObj) {
		util.log('Will deploy to AE ' + util.colors.magenta(obj));
	}
}

function getVersions(appdir, system) {
	var aeVersions = {};
	var arch = os.arch();
	var apps = fs.readdirSync(appdir);

	apps.forEach(function (appname) {
		if (appname.indexOf('After Effects') != -1) {
			var split = appname.split(' ');
			var slice = split.slice(3);
			var version = slice.join('');
			var cepdir;

			if (system == 'darwin') {
				if (version == 'CC2015' || version == 'CC2014') {
					cepdir = '/Library/Application Support/Adobe/CEP/extensions/';
				} else {
					cepdir = undefined;
				}

				aeVersions[version] = {
					esdir: appdir + appname + '/Scripts/ScriptUI Panels/',
					cepdir: cepdir
				};
			} else {
				if (version == 'CC2015' || version == 'CC2014') {
					if (arch == 'x64') {
						cepdir = 'C:/Program Files (x86)/Common Files/Adobe/CEP/extensions';
					} else {
						cepdir = 'C:/Program Files/Common Files/Adobe/CEP/extensions';
					}
				} else {
					cepdir = undefined;
				}

				aeVersions[version] = {
					esdir: appdir + '/Adobe/' + appname + '/Support Files/Scripts/ScriptUI Panels/',
					cepdir: cepdir
				};
			}
		}
	});

	return aeVersions;
}
