# Paginas

> Universal pages generator supporting multiple themes

> Easily to integrate with all libraries you use.

> Goes well with browser-sync and can generate static website.

## Examples

### Run with server
```js
const paginas = require('paginas');
const options = require('./options');

const app = paginas(options);

app.serve(3000);
```

### Build standalone version
```js
const paginas = require('paginas');
const options = require('./options');

const app = paginas(options);

app.build('./build/path', ['default', 'different_theme']);
```

### Example context options

```js
const getContext = () => {
    title: "Style Guide",

    defaultTheme: 'default',

    themesDir: './themes',

    themes: [
        {
            id: 'default',
            label: 'Default',
            entry: 'default.html'
        },
        {
            id: 'different_theme',
            label: 'different_theme',
            entry: 'different_theme.html'
        }

    ],

    default: ['components', 'input', 'preview'],

    pages: [
        {
            id: "components",
            title: "Components",
            pages: [
                {
                    id: 'input',
                    label: 'Input',
                    pages: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }, {
                        id: 'api',
                        label: 'API',
                        content: function () {
                            return 'I am the content ' + Math.random();
                        }
                    }],
                },
                {
                    id: 'utils',
                    label: 'Utils',
                    content: function () {
                        return '## Markdown';
                    },
                    parser: 'markdown'
                }
            ]

        },
        {
            id: "readme",
            title: "Readme",
            pages: [
                {
                    id: 'readme',
                    label: 'Readme',
                    file: 'README.md'
                }
            ]

        }

    ]
}

const parsers = {
    markdown: require('markdown-it')({
                html: true
              }).render,
    noop(data) {
      return data;
    }
};

//map file extensions to the corresponding parser
const extensions = {
    md: 'markdown'
};

module.exports = {
    value: getContext(), //static version of the context
    getContext, //dynamic context accessor
    extensions, 
    parsers
}
```


## API

`app.serve(port: number)`

`app.build(path: string, themes: Array<string>)`
