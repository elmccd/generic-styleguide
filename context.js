const jsdoc2md = require('jsdoc-to-markdown');

module.exports = {
    title: "Style Guide",
    links: [
        {
            name: "Docs",
            url: "/"
        }, {
            name: "Github",
            url: "http://github.com"
        }
    ],

    defaultTheme: 'default',

    themesDir: './themes',

    themes: [
        {
            id: 'default',
            label: 'Default',
            entry: 'default.jade'
        },
        {
            id: 'direct',
            label: 'Direct template',
            entry: 'direct.jade'
        },
        {
            id: 'raw',
            label: 'Raw Data',
            entry: 'raw.jade'
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
                    }, {
                        id: 'documentation',
                        label: 'Documentation',
                        content: function () {
                            return jsdoc2md.renderSync({ files: 'utils/**/*.js' });
                        },
                        parser: 'markdown'
                    }, {
                        id: 'changelog',
                        label: 'Changelog',
                        file: './utils/CHANGELOG.md'
                    }],
                    links: [
                        {
                            name: "Source",
                            url: "http://github.com"
                        }
                    ]
                },
                {
                    id: 'utils',
                    label: 'Utils',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }]
                },
                {
                    id: 'api',
                    label: 'Utils API',
                    file: './utils/CHANGELOG.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }]
                },
                {
                    id: 'tabs',
                    label: 'Tabs',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
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
                },
                {
                    id: 'utils',
                    label: 'Utils',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }]
                },
                {
                    id: 'api',
                    label: 'Utils API',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }]
                },
                {
                    id: 'tabs',
                    label: 'Tabs',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }]
                }
            ]

        }

    ]
};