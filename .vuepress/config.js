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
                        link: '/installer-guide/opencore-efi.md'
                    },
                    {
                        text: 'Raccogliere i File',
                        link: '/ktext.md'
                    },
                    {
                        text: 'Iniziamo Con ACPI',
                        link: 'https://macos86.github.io/Getting-Started-With-ACPI/'
                    }
                ]
            },
            {
                text: 'Setup del Config.plist',
                link: '/config.plist/'
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
                    '/prerequisites.md',
                    '/macos-limits.md',
                    '/find-hardware.md',
                    '/terminology.md',
                    '/why-oc.md'
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
                            '/installer-guide/mac-install.md',
                            '/installer-guide/winblows-install.md',
                            '/installer-guide/linux-install.md'
                        ],
                    },
                    '/installer-guide/opencore-efi.md',
                    '/ktext.md',
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
                            ['/config.plist/penryn.md', 'Penryn'],
                            ['/config.plist/clarkdale.md', 'Clarkdale'],
                            ['/config.plist/sandy-bridge.md', 'Sandy Bridge'],
                            ['/config.plist/ivy-bridge.md', 'Ivy Bridge'],
                            ['/config.plist/haswell.md', 'Haswell'],
                            ['/config.plist/skylake.md', 'Skylake'],
                            ['/config.plist/kaby-lake.md', 'Kaby Lake'],
                            ['/config.plist/coffee-lake.md', 'Coffee Lake'],
                            ['/config.plist/comet-lake.md', 'Comet Lake']
                        ]
                    },
                    {
                        title: 'Intel Laptop config.plist',
                        children: [
                            ['/config-laptop.plist/arrandale.md', 'Arrandale'],
                            ['/config-laptop.plist/sandy-bridge.md', 'Sandy Bridge'],
                            ['/config-laptop.plist/ivy-bridge.md', 'Ivy Bridge'],
                            ['/config-laptop.plist/haswell.md', 'Haswell'],
                            ['/config-laptop.plist/broadwell.md', 'Broadwell'],
                            ['/config-laptop.plist/skylake.md', 'Skylake'],
                            ['/config-laptop.plist/kaby-lake.md', 'Kaby Lake'],
                            ['/config-laptop.plist/coffee-lake.md', 'Coffee Lake and Whiskey Lake'],
                            ['/config-laptop.plist/coffee-lake-plus.md', 'Coffee Lake Plus and Comet Lake'],
                            ['/config-laptop.plist/icelake.md', 'Ice Lake']
                        ]
                    },
                    {
                        title: 'Intel HEDT config.plist',
                        children: [
                            '/config-HEDT/nehalem',
                            '/config-HEDT/ivy-bridge-e.md',
                            '/config-HEDT/haswell-e.md',
                            '/config-HEDT/broadwell-e.md',
                            '/config-HEDT/skylake-x.md'
                        ]
                    },
                    {
                        title: 'AMD Desktop config.plist',
                        children: [
                            '/AMD/fx.md',
                            '/AMD/zen.md'
                        ]
                    },
                ]
            },
            {
                title: 'Processo di Installazione',
                path: '/installation.md'
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
                            '/troubleshooting/extended/opencore-issues.md',
                            '/troubleshooting/extended/kernel-issues.md',
                            '/troubleshooting/extended/userspace-issues.md',
                            '/troubleshooting/extended/post-issues.md',
                            '/troubleshooting/extended/misc-issues.md'
                        ]
                    },
                    '/troubleshooting/debug.md',
                    '/troubleshooting/boot.md',
                    '/troubleshooting/kernel-debugging.md'
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
                    '/extras/kaslr-fix.md',
                    '/extras/spoof.md',
                    '/extras/big-sur.md',
                    {
                        title: 'Macchine Virtuali',
                        children: [
                            '/extras/virtualbox.md',
                            '/extras/fusion.md',
                            '/extras/workstation.md'
                        ]
                    },
                    {
                        path: '/clover-conversion/',
                        title: 'Conversioni da Clover',
                        children: [
                            '/clover-conversion/Clover-config.md',
                            '/clover-conversion/clover-efi.md',
                            '/clover-conversion/Clover-boot-arg.md',
                            '/clover-conversion/clover-patch.md'
                        ]
                    },
                    '/extras/smbios-support.md'
                ]
            },
            '/CONTRIBUTING.md',
            '/credit.md'
        ],
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom'
    ]
}
