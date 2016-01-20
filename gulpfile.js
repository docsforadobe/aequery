'use strict';

var gulp = require('gulp'),
	os = require('os'),
	del = require('del'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var name = 'aequery',
	dest;

// Expects you have After Effects CC 2015 installed in the default location
if (os.platform() == 'darwin') {
	console.log('OS: Mac OS X (darwin)');
	dest = '/Applications/Adobe After Effects CC 2015/Scripts/ScriptUI Panels/' + name;
} else {
	console.log('OS: Windows (win32)');
	dest = 'C:/Program Files/Adobe/Adobe After Effects CC 2015/Support Files/Scripts/ScriptUI Panels/' + name;
}

//	Or define your own path:
//	dest = '/Your/Path/To/Adobe After Effects CC 2015/Scripts/ScriptUI Panels/' + name;

gulp.task('watch', function () {
	gulp.watch('lib/*.js', ['concat']);
});

gulp.task('clean', function () {
	return del([dest], {
		force: true
	});
});

gulp.task('clean:build', function () {
	return del(['build'], {
		force: true
	});
});

gulp.task('concat', ['clean'], function () {
	var stream = gulp.src('lib/*.js')
		.pipe(concat(name + '.js'))
		// .pipe(uglify())
		.pipe(gulp.dest(dest));
	console.log('Wrote ' + name + '.js to: \r\n' + dest);
	return stream;
});

gulp.task('concat:build', ['clean'], function () {
	var stream = gulp.src('lib/*.js')
		.pipe(concat(name + '.js'))
		.pipe(gulp.dest('build'));
	console.log('Wrote ' + name + '.js to: \r\n/build');
	return stream;
});

gulp.task('deploy', ['concat']);

gulp.task('build', ['concat:build']);

gulp.task('default', ['deploy', 'watch']);
