var gulp = require('gulp')
var pm2 = require('pm2')

gulp.task('start', function(){
    pm2.connect(true, function(){
        pm2.start({
            name: 'meteoapp',
            script: 'app.js',
            exec_mode: 'cluster',
            instances: 2
        }, function(){
            console.log("MeteoApp lanzado con éxito.")
        });
    });
});

gulp.task('stop', shell.task(['pm2 stop meteoapp']));