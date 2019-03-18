module.exports = function (grunt) {
	"use strict";
	var webAppDir = "webapp";
	var targetDir = "dist";
	var tmpDir = targetDir + "/tmp";
	var tmpDirDbg = targetDir + "/tmp-dbg";
	var tmpDirBabel = targetDir + "/tmp-babel";
	
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	grunt.registerTask("default", [
    	'clean:build',
			'babel',
			'build',
			'lint',
			'clean:cleanBabel'
	]);
	
	var config = {
		babel: {
			options: {
				sourceMap: false,
				presets: ['env']
			},
			dist: {
				files: [{
					expand: true, 
					cwd: 'webapp/', 
					src: ['**/*.js'],
					dest: tmpDirBabel, 
					filter: function(filepath) {
						return !filepath.match(new RegExp('webapp/libs', 'gi'));
					}
				}]
			}
		},
		clean: {
			build: [targetDir],
			cleanBabel: [tmpDirBabel]
		},
		copy: {
			copyToDbg: {
				files: [{
					expand: true,
					src: "**/*.js",
					dest: tmpDirDbg,
					cwd: tmpDirBabel,
					filter: function(filepath) {
						return !filepath.match(new RegExp(webAppDir + "(\\/|\\\\)localService", "gi"));
					}
				}, {
					expand: true,
					src: 'libs/**/*.js',
					dest: tmpDir,
					cwd: webAppDir
				}, {
					expand: true,
					src: "**/*.css",
					dest: tmpDirDbg,
					cwd: webAppDir
				}]
			},
			copyToTmp: {
				files: [{
					expand: true,
					src: '**/*.js',
					dest: tmpDir,
					cwd: tmpDirBabel,
					filter: function(filepath) {
						// prevent js from localService to be copied
						return !filepath.match(new RegExp('build' + '(\\/|\\\\)localService', 'gi'));
					}
				}, {
					expand: true,
					src: 'libs/**/*.js',
					dest: tmpDir,
					cwd: webAppDir
				}, {
					expand: true,
					src: '**/*.css',
					dest: tmpDir,
					cwd: webAppDir
				}, {
					expand: true,
					src: 'localService/metadata.xml',
					dest: tmpDir,
					cwd: webAppDir
				}, {
					expand: true,
					src: '**/*',
					dest: tmpDir,
					cwd: webAppDir,
					filter: function(filepath) {
						return !filepath.match(new RegExp("(" + webAppDir +
							"(\\/|\\\\)test|${webAppDir}(\\/|\\\\)localService|\\.js$|\\.css$|\\.ts$|\\test.html$)", "gi"));
					}
				}]
			}
		}
	};

	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-test");
	grunt.loadNpmTasks('grunt-babel');
	grunt.registerTask("unit_and_integration_tests", ["test"]);
	grunt.config.merge(config);
	grunt.config.merge({
		coverage_threshold: {
			statements: 0,
			branches: 100,
			functions: 0,
			lines: 0
		}
	});
};