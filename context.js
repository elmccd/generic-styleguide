module.exports = {
    title: "Style Guide2",
    links: [
        {
            name: "Docs",
            url: "/"
        }, {
            name: "Github",
            url: "/github"
        }
    ],

    defaultTheme: './index.jade',

    customThemes: [
        {
            id: 'direct',
            path: './direct.jade'
        }

    ],

    groups: [
        {
            title: "Components",
            pages: [
                {
                    id: 'input-number',
                    label: 'Number Input',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }, {
                        id: 'api',
                        label: 'API',
                        file: './utils/DOCUMENTATION.md'
                    }, {
                        id: 'changelog',
                        label: 'Changelog',
                        file: './utils/CHANGELOG.md'
                    }]
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

        },

        {
            title: "Styleguide",
            pages: [
                {
                    id: 'input-number',
                    label: 'Number Input',
                    file: './utils/README.md',
                    tabs: [{
                        id: 'preview',
                        label: 'Preview',
                        file: './utils/README.md'
                    }, {
                        id: 'api',
                        label: 'API',
                        file: './utils/DOCUMENTATION.md'
                    }, {
                        id: 'changelog',
                        label: 'Changelog',
                        file: './utils/CHANGELOG.md'
                    }]
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