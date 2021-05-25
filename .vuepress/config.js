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
                text: 'Risoluzione dei problemi',
                link: '/troubleshooting/'
            },
            {
                text: 'Iniziamo con ACPI',
                link: '/Getting-Started-With-ACPI/'
            },
            {
                text: 'Setup del Config.plist',
                link: '/config.plist/'
            },
            {
                text: 'Guide',
                items: [
                    {
                        text: 'Dortania (EN)',
                        link: 'https://dortania.github.io/'
                    },
                    {
                        text: 'OpenCore Post-Install (EN)',
                        link: 'https://dortania.github.io/OpenCore-Post-Install/'
                    },
                    {
                        text: 'OpenCore Multiboot',
                        link: 'https://macos86.github.io/OpenCore-Multiboot/'
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
        sidebar: {
            '/Getting-Started-With-ACPI/': [
                '/Getting-Started-With-ACPI/ssdt-platform',
                {
                    title: 'Come Creare gli SSDT',
                    path: '/Getting-Started-With-ACPI/ssdt-methods/',
                    collapsable: false,
                    children: [
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-prebuilt',
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-easy',
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-long',
                    ]
                },
                {
                    title: 'Manuale',
                    collapsable: false,
                    children: [
                        '/Getting-Started-With-ACPI/dump',
                        '/Getting-Started-With-ACPI/compile',
                    ]
                },
                '/Getting-Started-With-ACPI/desktop',
                {
                    title: 'Laptop',
                    collapsable: false,
                    children: [
                        {
                            title: 'Risolvere Retroilluminazione',
                            path: '/Getting-Started-With-ACPI/Laptops/backlight/',
                            children: [
                                ['/Getting-Started-With-ACPI/Laptops/backlight/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Laptops/backlight/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'Risolvere Trackpad',
                            path: '/Getting-Started-With-ACPI/Laptops/trackpad/',
                            children: [
                                ['/Getting-Started-With-ACPI/Laptops/trackpad/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Laptops/trackpad/manual', 'Manuale'],
                            ]
                        },
                        ['/Getting-Started-With-ACPI/Laptops/laptop-disable', 'Disabilitare le dGPU dei Laptop'],
                    ]
                },
                {
                    title: 'Universali',
                    collapsable: false,
                    children: [
                        {
                            title: 'Controller Integrato',
                            path: '/Getting-Started-With-ACPI/Universal/ec/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/ec/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/ec/ssdttime', 'SSDTTime'],
                                ['/Getting-Started-With-ACPI/Universal/ec/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'Gestione Energia CPU',
                            path: '/Getting-Started-With-ACPI/Universal/plug/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/plug/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/plug/ssdttime', 'SSDTTime'],
                                ['/Getting-Started-With-ACPI/Universal/plug/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'AWAC vs RTC',
                            path: '/Getting-Started-With-ACPI/Universal/awac/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/awac/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/awac/ssdttime', 'SSDTTime'],
                                ['/Getting-Started-With-ACPI/Universal/awac/manual', 'Manuale'],
                                ['/Getting-Started-With-ACPI/Universal/awac/manual-hedt', 'Manuale per HEDT'],
                            ]
                        },
                        {
                            title: 'NVRAM PMC',
                            path: '/Getting-Started-With-ACPI/Universal/nvram/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/nvram/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/nvram/ssdttime', 'SSDTTime'],
                                ['/Getting-Started-With-ACPI/Universal/nvram/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'USB RHUB',
                            path: '/Getting-Started-With-ACPI/Universal/rhub/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/rhub/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/rhub/ssdttime', 'SSDTTime'],
                                ['/Getting-Started-With-ACPI/Universal/rhub/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'IMEI',
                            path: '/Getting-Started-With-ACPI/Universal/imei/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/imei/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/imei/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'Risolvere Brigde Uncore',
                            path: '/Getting-Started-With-ACPI/Universal/unc0/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/unc0/prebuilt', 'Precompilato'],
                                ['/Getting-Started-With-ACPI/Universal/unc0/manual', 'Manuale'],
                            ]
                        },
                        {
                            title: 'Risolvere il Supporto SMBus',
                            path: '/Getting-Started-With-ACPI/Universal/smbus/',
                            children: [
                                ['/Getting-Started-With-ACPI/Universal/smbus/manual', 'Manuale'],
                            ]
                        },
                        '/Getting-Started-With-ACPI/Universal/irq',
                        '/Getting-Started-With-ACPI/Universal/spoof'
                    ]
                },
                '/Getting-Started-With-ACPI/cleanup',
                '/Getting-Started-With-ACPI/troubleshooting'
            ],
            '/config.plist/': [
                '/config.plist/',
                {
                    title: 'Intel Desktop config.plist',
                    collapsable: false,
                    children: [
                        ['/config.plist/penryn', 'Penryn'],
                        ['/config.plist/clarkdale', 'Clarkdale'],
                        ['/config.plist/sandy-bridge', 'Sandy Bridge'],
                        ['/config.plist/ivy-bridge', 'Ivy Bridge'],
                        ['/config.plist/haswell', 'Haswell'],
                        ['/config.plist/skylake', 'Skylake'],
                        ['/config.plist/kaby-lake', 'Kaby Lake'],
                        ['/config.plist/coffee-lake', 'Coffee Lake'],
                        ['/config.plist/comet-lake', 'Comet Lake']
                    ]
                },
                {
                    title: 'Intel Laptop config.plist',
                    collapsable: false,
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
                        ['/config-laptop.plist/icelake', 'Ice Lake']
                    ]
                },
                {
                    title: 'Intel HEDT config.plist',
                    collapsable: false,
                    children: [
                        '/config-HEDT/nehalem',
                        '/config-HEDT/ivy-bridge-e',
                        '/config-HEDT/haswell-e',
                        '/config-HEDT/broadwell-e',
                        '/config-HEDT/skylake-x'
                    ]
                },
                {
                    title: 'AMD Desktop config.plist',
                    collapsable: false,
                    children: [
                        '/AMD/fx',
                        '/AMD/zen'
                    ]
                },
            ],
            '/': [
                {
                    title: 'Introduzione',
                    collapsable: false,
                    children: [
                        '/prerequisites',
                        '/macos-limits',
                        '/find-hardware',
                        '/terminology',
                        '/why-oc'
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
                                '/installer-guide/linux-install'
                            ],
                        },
                        '/installer-guide/opencore-efi',
                        '/ktext',
                        ['/Getting-Started-With-ACPI/', 'Iniziamo con ACPI']
                    ]
                },
                {
                    title: 'Configurazione OpenCore',
                    path: '/config.plist/'
                },
                {
                    title: 'Processo di Installazione',
                    path: '/installation'
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
                                '/troubleshooting/extended/misc-issues'
                            ]
                        },
                        '/troubleshooting/debug',
                        '/troubleshooting/boot',
                        '/troubleshooting/kernel-debugging'
                    ]
                },
                {
                    title: 'Dopo l\'installazione',
                    collapsable: false,
                    children: [
                        ['https://dortania.github.io/OpenCore-Post-Install/', 'Post-Install (EN)']
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
                                '/clover-conversion/clover-patch'
                            ]
                        },
                        '/extras/smbios-support'
                    ]
                },
                '/CONTRIBUTING',
                '/credit'
            ],
        },
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom'
    ]
}
