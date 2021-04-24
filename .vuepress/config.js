module.exports = {
    title: 'Guida Installazione Opencore',
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

    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-multimd-table'), {
                rowspan: true,
            });
        }
    },

    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/macos86/OpenCore-Install-Guide',
        editLinks: true,
        smoothScroll: true,
        editLinkText: 'Aiutaci a tradurre questa pagina!',
        logo: 'homepage.png',
        nav: [
            {
                text: 'Guide Dortania',
                ariaLabel: 'Language Menu',
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
                sidebarDepth: 1,
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
                sidebarDepth: 2,
                children: [
                    {
                        title: 'Creare la USB',
                        collapsable: true,
                        path: '/installer-guide/',
                        sidebarDepth: 1,
                        children: [
                            '/installer-guide/mac-install',
                            '/installer-guide/winblows-install',
                            '/installer-guide/linux-install',
                        ],
                    },
                    '/installer-guide/opencore-efi',
                    'ktext',
                    ['https://dortania.github.io/Getting-Started-With-ACPI/', 'Iniziamo con ACPI'],
                    '/config.plist/',
                ]
            },
            {
                title: 'Configurazione OpenCore',
                collapsable: false,
                children: [
                    {
                        title: 'Intel Desktop config.plist',
                        collapsable: true,
                        sidebarDepth: 1,
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
                        collapsable: true,
                        sidebarDepth: 1,
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
                        collapsable: true,
                        sidebarDepth: 1,
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
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            '/AMD/fx',
                            '/AMD/zen',
                        ]
                    },
                ]
            },
            {
                title: 'Installazione',
                collapsable: false,
                children: [
                    '/installation/installation-process',

                ]
            },
            {
                title: 'Troubleshooting',
                collapsable: false,
                children: [
                    '/troubleshooting/troubleshooting',
                    {
                        title: '',
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
                title: 'Post-Install (EN)',
                collapsable: false,
                children: [
                    ['https://dortania.github.io/OpenCore-Post-Install/', 'Post-Install'],
                    {
                        title: 'Universal',
                        collapsable: true,
                        sidebarDepth: 1,
                        children: [
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/security', 'Security and FileVault'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/audio', 'Fixing Audio'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/oc2hdd', 'Booting without USB'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/update', 'Updating OpenCore, kexts and macOS'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/drm', 'Fixing DRM'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/iservices', 'Fixing iServices'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/pm', 'Fixing Power Management'],
                            ['https://dortania.github.io/OpenCore-Post-Install/universal/sleep', 'Fixing Sleep'],
                            ['https://dortania.github.io/OpenCore-Post-Install/usb/', 'Fixing USB'],
                        ]
                    },
                    {
                        title: 'Laptop Specifics',
                        collapsable: true,
                        children: [
                            ['https://dortania.github.io/OpenCore-Post-Install/laptop-specific/battery', 'Fixing Battery Read-outs'],

                        ]
                    },
                    {
                        title: 'Cosmetics',
                        collapsable: true,
                        children: [
                            ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/verbose', 'Fixing Resolution and Verbose'],
                            ['https://dortania.github.io/OpenCore-Post-Install/cosmetic/gui', 'Add GUI and Boot-chime'],
                        ]
                    },
                    {
                        title: 'Multiboot',
                        collapsable: true,
                        children: [
                            ['https://dortania.github.io/OpenCore-Multiboot/', 'OpenCore Multiboot'],
                            ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap', 'Setting up LauncherOption'],
                            ['https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp', 'Installing BootCamp'],
                        ]
                    },
                    {
                        title: 'Miscellaneous',
                        collapsable: true,
                        children: [
                            ['https://dortania.github.io/OpenCore-Post-Install/misc/rtc', 'Fixing RTC'],
                            ['https://dortania.github.io/OpenCore-Post-Install/misc/msr-lock', 'Fixing CFG Lock'],
                            ['https://dortania.github.io/OpenCore-Post-Install/misc/nvram', 'Emulated NVRAM'],
                        ]
                    },
                ]
            },
            {
                title: 'Extra',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    '/extras/kaslr-fix',
                    '/extras/spoof',
                    '/extras/big-sur/',
                    {
                        collapsable: true,
                        sidebarDepth: 1,
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
            {
                title: 'Misc',
                collapsable: false,
                children: [
                    'CONTRIBUTING',
                    '/misc/credit',
                ]
            },
        ],
    },
    plugins: [
        '@vuepress/back-to-top',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
