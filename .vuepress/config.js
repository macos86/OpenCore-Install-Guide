module.exports = {
    title: 'Guida Installazione Opencore',
    lang: 'it-IT',
    head: [
        [
            'meta', {
                name: 'theme-color',
                content: '#3eaf7c'
            }
        ],
        [
            'meta', {
                name: 'apple-mobile-web-app-capable',
                content: 'yes'
            }
        ],
        [
            'meta', {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black'
            }
        ],
    ],
    base: '/OpenCore-Install-Guide/',

    extendMarkdown: md => {
        md.use(require('markdown-it-multimd-table'), {
            rowspan: true,
        });
    },

    themeConfig: {
        lastUpdated: 'Ultimo Aggiornamento',
        repo: 'macos86/OpenCore-Install-Guide',
        editLinks: true,
        smoothScroll: true,
        editLinkText: 'Aiutaci a tradurre questa pagina!',
        nav: [
            {
                text: 'Creazione Installer',
                link: '/installer-guide/'
            },
            {
                text: 'Aggiunta dei file',
                items: [
                    {
                        text: 'Aggiungere i file di base',
                        link: '/installer-guide/opencore-efi'
                    },
                    {
                        text: 'Raccogliere i File',
                        link: '/ktext'
                    },
                    {
                        text: 'Iniziamo Con ACPI',
                        link: 'https://macos86.github.io/Getting-Started-With-ACPI/'
                    }
                ]
            },
            {
                text: 'Setup del Config.plist',
                link: '/config.plist'
            },
            {
                text: 'Risoluzione dei problemi',
                link: '/troubleshooting/'
            },
            {
                text: 'Guide Dortania',
                items: [
                    {
                        text: 'Home Site (EN)',
                        link: 'https://dortania.github.io/'
                    },
                    {
                        text: 'Iniziamo con ACPI',
                        link: 'https://macos86.github.io/Getting-Started-With-ACPI/'
                    },
                    {
                        text: 'OpenCore Post-Install (EN)',
                        link: 'https://dortania.github.io/OpenCore-Post-Install/'
                    },
                    {
                        text: 'OpenCore Multiboot (EN)',
                        link: 'https://dortania.github.io/OpenCore-Multiboot/'
                    },
                    {
                        text: 'GPU Buyers Guide (EN)',
                        link: 'https://dortania.github.io/GPU-Buyers-Guide/'
                    },
                    {
                        text: 'Wireless Buyers Guide (EN)',
                        link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
                    },
                    {
                        text: 'Anti Buyers Guide (EN)',
                        link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
                    },
                ]
            },
        ],
        sidebar: [
            {
                title: 'Introduzione',
                collapsable: false,
                children: [
                    'prerequisites',
                    'macos-limits',
                    'find-hardware',
                    'terminology',
                    'why-oc',
                ]

            },
            {
                title: 'Creazione della USB',
                collapsable: false,
                children: [
                    {
                        title: 'Creare la USB',
                        path: '/installer-guide/',
                        children: [
                            '/installer-guide/mac-install',
                            '/installer-guide/winblows-install',
                            '/installer-guide/linux-install',
                        ],
                    },
                    '/installer-guide/opencore-efi',
                    'ktext',
                    ['https://dortania.github.io/Getting-Started-With-ACPI/', 'Iniziamo con ACPI']
                ]
            },
            {
                title: 'Configurazione OpenCore',
                collapsable: false,
                children: [
                    '/config.plist/',
                    {
                        title: 'Intel Desktop config.plist',
                        children: [
                            ['/config.plist/penryn', 'Penryn'],
                            ['/config.plist/clarkdale', 'Clarkdale'],
                            ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                            ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                            ['/config.plist/haswell', 'Haswell'],
                            ['/config.plist/skylake', 'Skylake'],
                            ['/config.plist/kaby-lake', 'Kaby Lake'],
                            ['/config.plist/coffee-lake', 'Coffee Lake'],
                            ['/config.plist/comet-lake', 'Comet Lake'],
                        ]
                    },
                    {
                        title: 'Intel Laptop config.plist',
                        children: [
                            ['/config-laptop.plist/arrandale', 'Arrandale'],
                            ['/config-laptop.plist/sandy-bridge', 'Sandy Bridge'],
                            ['/config-laptop.plist/ivy-bridge', 'Ivy Bridge'],
                            ['/config-laptop.plist/haswell', 'Haswell'],
                            ['/config-laptop.plist/broadwell', 'Broadwell'],
                            ['/config-laptop.plist/skylake', 'Skylake'],
                            ['/config-laptop.plist/kaby-lake', 'Kaby Lake'],
                            ['/config-laptop.plist/coffee-lake', 'Coffee Lake and Whiskey Lake'],
                            ['/config-laptop.plist/coffee-lake-plus', 'Coffee Lake Plus and Comet Lake'],
                            ['/config-laptop.plist/icelake', 'Ice Lake'],
                        ]
                    },
                    {
                        title: 'Intel HEDT config.plist',
                        children: [
                            '/config-HEDT/nehalem',
                            '/config-HEDT/ivy-bridge-e',
                            '/config-HEDT/haswell-e',
                            '/config-HEDT/broadwell-e',
                            '/config-HEDT/skylake-x',
                        ]
                    },
                    {
                        title: 'AMD Desktop config.plist',
                        children: [
                            '/AMD/fx',
                            '/AMD/zen',
                        ]
                    },
                ]
            },
            {
                title: 'Processo di Installazione',
                path: '/installation/installation-process',
            },
            {
                title: 'Troubleshooting',
                collapsable: false,
                children: [
                    {
                        title: 'Risoluzione dei problemi',
                        path: '/troubleshooting/',
                        collapsable: false,
                        children: [
                            '/troubleshooting/extended/opencore-issues',
                            '/troubleshooting/extended/kernel-issues',
                            '/troubleshooting/extended/userspace-issues',
                            '/troubleshooting/extended/post-issues',
                            '/troubleshooting/extended/misc-issues',

                        ]
                    },
                    '/troubleshooting/debug',
                    '/troubleshooting/boot',
                    '/troubleshooting/kernel-debugging',
                ]
            },
            {
                title: 'Dopo l\'installazione',
                collapsable: false,
                children: [
                    ['https://dortania.github.io/OpenCore-Post-Install/','Post-Install (EN)']
                ]
            },
            {
                title: 'Extra',
                collapsable: false,
                children: [
                    '/extras/kaslr-fix',
                    '/extras/spoof',
                    '/extras/big-sur',
                    {
                        title: 'Macchine Virtuali',
                        children: [
                            '/extras/virtualbox',
                            '/extras/fusion',
                            '/extras/workstation'
                        ]
                    },
                    {
                        path: '/clover-conversion/',
                        title: 'Conversioni da Clover',
                        children: [
                            '/clover-conversion/Clover-config',
                            '/clover-conversion/clover-efi',
                            '/clover-conversion/Clover-boot-arg',
                            '/clover-conversion/clover-patch',
                        ]
                    },
                    '/extras/smbios-support.md',
                ]
            },
            'CONTRIBUTING',
            '/misc/credit'
        ],
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom'
    ]
}
