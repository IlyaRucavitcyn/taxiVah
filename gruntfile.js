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
  }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};
