const { src, dest, symlink, parallel, watch } = require('gulp');
const del = require('del')
const gulpSass = require('gulp-sass')
const browserSync = require('browser-sync').create();

// function srcExemple() {
//     return src('./img/*.png')
//         //return src('./index.html)
//         .pipe(dest('./img-v2'))
// }

// function clean() {
//     return del('/img-v2/')
// }

// function linkExemple() {
//     return src('./test.html')
//         .pipe(symlink('./dossier1'))
// }

// function css(log) {
//     console.log("Tâche 1, exemple de compilation")
//     log();
// }

// function sass(log) {
//     console.log("Tâche 2, exemple de minification")
//     log();
// }

// recharge le navigateur
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('*.html').on("change", browserSync.reload);
}

// scss to css
function sass() {
    return src('./sass/import.scss')
        .pipe(gulpSass())
        .pipe(dest('./css/'))
        .pipe(browserSync.stream())
}

// Watch sass
function watcher(done) {
    watch('./sass/*.scss', sass)
    browserSync.reload();
    done();
}




// lancer la fonction browser et watcher en parallele


module.exports = {
    // srcExemple,
    // clean,
    // linkExemple,
    // build: parallel(css, sass)
    sass,
    watcher,
    browser: parallel(browser, watcher)
}