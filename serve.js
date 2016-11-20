const context = require('./context');
const Primer = require('./index');

const app = new Primer(context);

app.serve(3000);

var browserSync = require('browser-sync');
browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["utils/**/*", "themes/**/*"],
    browser: "google chrome",
    port: 7000
});