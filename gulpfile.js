/* eslint-env node, es6 */
'use strict';

const gulp = require( 'gulp' );

const os = require( 'os' );

const del = require( 'del' ),
	concat = require( 'gulp-concat' ),
	replace = require( 'gulp-replace' ),
	change = require( 'gulp-change' ),
	rename = require( 'gulp-rename' ),
	PEG = require( 'pegjs' ),
	addsrc = require( 'gulp-add-src' ),
	eslint = require( 'gulp-eslint' );

const exec = require( 'child_process' ).exec;

// ===========================================================================
// Default tasks
// ===========================================================================


gulp.task( 'watch', function () {
	return gulp.watch( [ './lib/**/*.js', './**/*.jsx' ], gulp.series( 'build:aeq' ) );
});

gulp.task( 'clean:all', function () {
	return del( [ 'build', 'dist' ], {
		force: true
	});
});

// ===========================================================================
// Docs
// ===========================================================================

gulp.task( 'clean:docs', function () {
	return del( [ 'docs' ], {
		force: true
	});
});

gulp.task( 'build:docs', function () {
	var cmd = './node_modules/.bin/jsdoc lib/ --configure ./.jsdocrc.json';

	if ( os.platform() !== 'darwin' ) {
		cmd = cmd.replace( /\//g, '\\' );
	}

	return exec( cmd, err => {
		if ( err ) {
			console.error( err );
		}
	});
});

// ===========================================================================
// Build aequery
// ===========================================================================

gulp.task( 'build:aeq-core', function () {
	return gulp.src( [
		'lib/intro.js',
		'lib/main.js',
		'lib/**/*.js',
		'!lib/ui/**/*.js',
		'!lib/outro.js'
	] )
		.pipe( replace( /(\/\*.*?\*\/\n+)?(var )?aeq = \(function ?\(aeq\) \{/g, '' ) )
		.pipe( replace( /'use strict';/g, '' ) )
		.pipe( replace( /return aeq;\n+\}\(aeq \|\| \{\}\)\);/g, '' ) )
		.pipe( addsrc.append( 'lib/outro.js' ) )
		.pipe( concat( 'core.js' ) )
		.pipe( gulp.dest( './build' ) );
});

// ===========================================================================
// Variations
// ===========================================================================

gulp.task( 'build:aeq-parser', function () {
	return gulp.src( [
		'build/core.js',
		'build/parser.js'
	] )
		.pipe( concat( 'aeq-parser.js' ) )
		.pipe( gulp.dest( './dist' ) );
});

gulp.task( 'build:aeq-ui', function () {
	return gulp.src( [
		'build/core.js',
		'build/ui.js'
	] )
		.pipe( concat( 'aeq-ui.js' ) )
		.pipe( gulp.dest( './dist' ) );
});

gulp.task( 'build:aeq-slim', function () {
	return gulp.src( [
		'build/core.js'
	] )
		.pipe( concat( 'aeq-slim.js' ) )
		.pipe( gulp.dest( './dist' ) );
});

gulp.task( 'build:aeq-variations', gulp.series( 'build:aeq-parser', 'build:aeq-ui', 'build:aeq-slim' ) );

// ===========================================================================
// UI
// ===========================================================================

gulp.task( 'build:aeq-ui', function () {
	return gulp.src( [
		'lib/ui/**/*.js'
	] )
		.pipe( concat( 'ui.js' ) )
		.pipe( gulp.dest( './build' ) );
});

// ===========================================================================
// Parser
// ===========================================================================

gulp.task( 'build:aeq-parser', function () {
	return gulp.src( 'grammar/aeq.peg' )
		.pipe( compilePeg() )
		.pipe( rename({ basename: 'parser', extname: '.js' }) )
		.pipe( gulp.dest( './build' ) );
});

function compilePeg() {
	return change( function ( content, done ) {
		var parser = PEG.generate( content, { output: 'source' });
		var exportVar = 'var cssselector=';

		done( null, exportVar + parser );
	});
}

// ===========================================================================
// Utility: Update version number
// ===========================================================================

gulp.task( 'update-version:aeq', function () {
	let pkg = require( './package.json' );
	return gulp.src( [ 'lib/main.js' ] )
		.pipe( replace( /^(aeq\.version = ')\d+\.\d+\.\d+(')/m, `$1${pkg.version}$2` ) )
		.pipe( gulp.dest( 'lib/' ) );
});

gulp.task( 'update-version', gulp.series( 'update-version:aeq', 'build:docs' ) );

// ===========================================================================
// Utility: Lint files
// ===========================================================================

gulp.task( 'lint', function () {
	return gulp.src( [
		'lib/main.js',
		'lib/**/*.js',
		'!lib/intro.js',
		'!lib/outro.js'
	] )
		.pipe( eslint() )
		.pipe( eslint.format() );
});

// ===========================================================================
// Define main tasks
// ===========================================================================

gulp.task( 'build:aeq', gulp.series( 'build:aeq-core', 'build:aeq-parser', 'build:aeq-ui', function () {
	return gulp.src( './build/*.js' )
		.pipe( concat( 'aeq.js' ) )
		.pipe( gulp.dest( './dist' ) );
}) );

gulp.task( 'default', gulp.series( 'clean:all', 'build:aeq', 'build:aeq-variations', 'build:docs' ) );
