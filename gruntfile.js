module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        // the files to concatenate
        src: './js/**/*.js',
        // the location of the resulting JS file
        dest: './src/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
};
