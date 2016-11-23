var fs = require("fs");

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
                        file: './README.md'
                    }, {
                        id: 'api',
                        label: 'API',
                        content: function () {
                            var source = fs.readFileSync('examples/styles.scss').toString();

                            var colors = source.match(/\/\/@color\s*\n([^\n]*)/gi).map(group => {
                                return {
                                    variable: /(\$.+):/.exec(group)[1],
                                    value: /:\s*(.+);/.exec(group)[1]
                                }
                            });

                            return colors.reduce((result, color) => {
                               var variable = color.variable;
                               var value = color.value;
                               return result + `
                                    <div class="cx-color" data-color="${variable}">
                                        <span style="background-color:${value}">${variable} ${value}</span>
                                    </div>`;
                            }, '');
                        }
                    }, {
                        id: 'documentation',
                        label: 'Documentation',
                        content: function () {
                            return 3;
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