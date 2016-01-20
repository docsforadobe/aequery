'use strict';

var gulp = require('gulp'),
	os = require('os'),
	del = require('del'),
	queue = require('streamqueue'),
	concat = require('gulp-concat'),
	zip = require('gulp-zip'),
	pdf = require('gulp-markdown-pdf'),
	uglify = require('gulp-uglify');

var pkg = require('./package.json'),
	name = pkg.name,
	lib = ['lib/main.js', 'lib/*.js', '!lib/(main)*.js'],
	dest;

/* Expects you have After Effects CC 2015 installed 
 * in the default location 
 */
if (os.platform() == 'darwin') {
	console.log('OS: Mac OS X (darwin)');
	dest = '/Applications/Adobe After Effects CC 2015/Scripts/ScriptUI Panels/' + name;
} else {
	console.log('OS: Windows (win32)');
	dest = 'C:/Program Files/Adobe/Adobe After Effects CC 2015/Support Files/Scripts/ScriptUI Panels/' + name;
}


/* Or define you own path by uncommenting
 * and changing the path below: 
 */
//	dest = '/Your/Path/To/Adobe After Effects CC 2015/Scripts/ScriptUI Panels/' + name;


// DEFAULT TASK
gulp.task('default', ['debug', 'watch']);

// WATCH
gulp.task('watch', function () {
	gulp.watch('lib/*.js', ['debug']);
});

// CLEAN
gulp.task('clean', function () {
	return del([dest], {
		force: true
	});
});

// DEBUG
gulp.task('debug', ['clean'], function () {
	var stream = gulp.src(lib)
		.pipe(concat(name + '.js'))
		.pipe(gulp.dest(dest));
	console.log('Wrote ' + name + '.js to: \r\n' + dest);
	return stream;
});

// RELEASE
var div = '-',
	ugliness = {};

gulp.task('release', ['clean'], function () {
	var stream = queue({ objectMode: true });
		
	stream.queue(
		gulp.src(lib)
			.pipe(concat(name + '.js'))
			.pipe(uglify())
			.pipe(gulp.dest(dest))
	);
	
	stream.queue(
		gulp.src('README.md')
			.pipe(pdf())
	);
		
	console.log('Wrote ' + name + '.js to: \r\n' + dest);
		
	return stream.done()
		.pipe(zip(pkg.name + div + pkg.version + div + now() + '.zip'))
		.pipe(gulp.dest('dist'));
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

// BUILD - when you want a concat version in the root
gulp.task('build', ['clean:build'], function () {
	var stream = gulp.src(lib)
		.pipe(concat(name + '.js'))
		.pipe(gulp.dest('build'));
	console.log('Wrote ' + name + '.js to: \r\n/build');
	return stream;
});

// CLEAN BUILD
gulp.task('clean:build', function () {
	return del(['build'], {
		force: true
	});
});
