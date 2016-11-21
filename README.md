# Generic Styleguide

> Universal styleguide generator supporting markdown or any other format as a data source.
> Easily to integrate with all libraries you use.
> Goes well with browser-sync and can generate static website.

## Examples

### Run with server
```js
const primer = require('generic-styleguide');
const options = require('./options');

const app = primer(options);

app.serve(3000);
```

### Build standalone version
```js
const primer = require('generic-styleguide');
const options = require('./options');

const app = primer(options);

app.build('./build/path');
```

### Example options

```js
const options = {
    title: "Style Guide",

    defaultTheme: 'default',

    themesDir: './themes',

    themes: [
        {
            id: 'default',
            label: 'Default',
            entry: 'default.jade'
        }

    ],

    default: {
        group: 'styleguide',
        page: 'readme'
    },

    groups: [
        {
            id: "components",
            title: "Components",
            pages: [
                {
                    id: 'input-number',
                    label: 'Number Input',
                    tabs: [{
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
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        content: function () {
                            return '## Markdown';
                        },
                        parser: 'markdown'
                    }]
                }
            ]

        },
        {
            id: "styleguide",
            title: "Styleguide",
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
```


## API

app.serve(port: number)

app.build(path: string, theme?: string = 'default')