module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      main: {
        options: {
          paths: ["public/css"],
          yuicompress: false
        },
        files: {
          "public/css/main.css": "public/css/main.less"
        }
      }
    },
    watch: {
      css: {
        files: '**/*.less',
        tasks: ['less']
      }
    },
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less:main']);

};