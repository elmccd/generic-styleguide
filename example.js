const context = require('./context');
const Primer = require('./index');

const app = new Primer(context);

app.build('./build/default', 'default');
app.build('./build/raw', 'raw');

app.serve(3000);