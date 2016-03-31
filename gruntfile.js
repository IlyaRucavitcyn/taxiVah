module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: './js/src/*.js',
        dest: './js/location.js'
      }
    },
    watch: {
      scripts: {
          files: ['./js/src/*.js'],
          tasks: ['concat'],
          options: {
              spawn: false,
          },
      }
    },
    unused: {
      options: {
        reference: './**/',
        directory: ["index.html",'./css/*.css'],
        days: 30,
        remove: false, // set to true to delete unused files from project
        reportOutput:'./report.txt', // set to false to disable file output
        fail: false // set to true to make the task fail when unused files are found
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-unused');
  grunt.registerTask('default', ['watch']);
};
