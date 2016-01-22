'use strict';

var gulp = require('gulp'),
	os = require('os'),
	del = require('del'),
	queue = require('streamqueue'),
	concat = require('gulp-concat'),
	zip = require('gulp-zip'),
	pdf = require('gulp-markdown-pdf'),
	uglify = require('gulp-uglify'),
	change = require('gulp-change'),
	rename = require('gulp-rename'),
	rseq = require('run-sequence'),
	PEG = require('pegjs');

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
}

/* 
 * Expects you have After Effects CC 2015 installed 
 * in the default location 
 */
if (os.platform() == 'darwin') 
{
	console.log('OS: Mac OS X (darwin)');
	build.deploy = {
		"AE2015" : {
			"esdir" : '/Applications/Adobe After Effects CC 2015/Scripts/ScriptUI Panels/',
			"cepdir" : "/Library/Application Support/Adobe/CEP/extensions/"
		}
	}
} 
else 
{
	console.log('OS: Windows (win32)');
	build.deploy = {
		"AE2015" : {
			"esdir" : 'C:/Program Files/Adobe/Adobe After Effects CC 2015/Support Files/Scripts/ScriptUI Panels/',
			"cepdir" : ""
		}
	}
}


gulp.task('default', ['debug']);


gulp.task('watch', function () {
	gulp.watch(['./lib/**/*.js', './**/*.jsx'], ['default']);
});


gulp.task('clean', ['clean:extendscript', 'clean:cep'], function () {
	return del(['build', 'dist'], {
		force: true
	});
});


gulp.task('debug', function (cb) {
	build.configuration = configuration.debug;
	build.deployment = deployment.local;

	uglify = require('gulp-empty');

	return rseq('clean', 'build:aeq', 'build:aeq-ui', 'deploy:all', cb);
});


gulp.task('release', function (cb) {
	build.configuration = configuration.release;
	build.deployment = deployment.local;

	// TODO: configure uglify...

	return rseq('clean', 'build:all', 'deploy:all', 'package:zip', cb);
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
			'lib/main.js', 
			'!lib/ui/**/*.js', 
			'lib/**/*.js', 
		])
		.pipe(concat('core.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:aeq-parser', function () {
	gulp.src('grammar/aeq.peg')
		.pipe(compilePeg())
		.pipe(rename({ basename : 'parser', extname : '.js' }))
		.pipe(gulp.dest('./build'))
})

gulp.task('build:aeq-ui', function () {
	return gulp.src([
			'lib/ui/**/*.js', 
		])
		.pipe(concat('aeq-ui.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('deploy:all', ['deploy:extendscript', 'deploy:cep']);

gulp.task('deploy:extendscript', [], function () {
	var stream = gulp.src([
		'./dist/aeq.js',
		'./dist/aeq-ui.js',
		'./testproject/extendscript/aeq_test.jsx'
	]);

	for (var aever in build.deploy)
	{
		var aeconfig = build.deploy[aever];

		stream = stream.pipe(gulp.dest(aeconfig.esdir))
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

gulp.task('build:docs', function () {
	return gulp.src('README.md')
		.pipe(pdf())
		.pipe(gulp.dest('./build'));
});

gulp.task('package:zip', function () {
	return gulp.src(['./build/aeq.js', './build/aeq.js', './build/README.pdf'])
		.pipe(zip(pkg.name + '-' + pkg.version + '-' + now() + '.zip'))
		.pipe(gulp.dest('./dist'));
});


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
		var parser = PEG.buildParser(content, {output: 'source'})
		var exportVar = 'var cssselector='

		return exportVar + parser
  })
}

