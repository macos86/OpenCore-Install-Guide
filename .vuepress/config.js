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

    extendsMarkdown: md => {
        md.use(require('markdown-it-multimd-table'), {
            rowspan: true,
        });
    },

    themeConfig: {
        lastUpdatedText: 'Ultimo Aggiornamento',
        repo: 'macos86/macos86.github.io',
        contributorsText: 'Chi ha contribuito alla creazione di questa pagina',
        editLinks: true,
        editLinkText: 'Aiutaci a tradurre questa pagina!',
        navbar: [
            {
                text: 'Risoluzione dei problemi',
                link: '/troubleshooting/'
            },
            {
                text: 'Iniziamo con ACPI',
                link: '/Getting-Started-With-ACPI/'
            },
            {
                text: 'Multibooting con OpenCore',
                link: '/OpenCore-Multiboot/'
            },
            {
                text: 'Galleria OpenCanopy',
                link: '/OpenCanopy-Gallery/'
            },
            {
                text: 'Guide',
                children: [
                    {
                        text: 'Dortania (EN)',
                        link: 'https://dortania.github.io/'
                    },
                    {
                        text: 'OpenCore Post-Install (EN)',
                        link: 'https://dortania.github.io/OpenCore-Post-Install/'
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
                '/Getting-Started-With-ACPI/ssdt-platform.md',
                {
                    text: 'Come Creare gli SSDT',
                    link: '/Getting-Started-With-ACPI/ssdt-methods/',
                    isGroup: true,
                    children: [
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-prebuilt.md',
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-easy.md',
                        '/Getting-Started-With-ACPI/ssdt-methods/ssdt-long.md',
                    ]
                },
                {
                    text: 'Manuale',
                    isGroup: true,
                    children: [
                        '/Getting-Started-With-ACPI/dump.md',
                        '/Getting-Started-With-ACPI/compile.md',
                    ]
                },
                '/Getting-Started-With-ACPI/desktop.md',
                {
                    text: 'Laptop',
                    isGroup: true,
                    children: [
                        {
                            text: 'Risolvere Retroilluminazione',
                            link: '/Getting-Started-With-ACPI/Laptops/backlight/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Laptops/backlight/prebuilt.md',
                                '/Getting-Started-With-ACPI/Laptops/backlight/manual.md'
                            ]
                        },
                        {
                            text: 'Risolvere Trackpad',
                            link: '/Getting-Started-With-ACPI/Laptops/trackpad/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Laptops/trackpad/prebuilt.md',
                                '/Getting-Started-With-ACPI/Laptops/trackpad/manual.md'
                            ]
                        },
                        '/Getting-Started-With-ACPI/Laptops/laptop-disable.md'
                    ]
                },
                {
                    text: 'Universali',
                    isGroup: true,
                    children: [
                        {
                            text: 'Controller Integrato',
                            link: '/Getting-Started-With-ACPI/Universal/ec/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/ec/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/ec/ssdttime.md',
                                '/Getting-Started-With-ACPI/Universal/ec/manual.md'
                            ]
                        },
                        {
                            text: 'Gestione Energia CPU',
                            link: '/Getting-Started-With-ACPI/Universal/plug/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/plug/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/plug/ssdttime.md',
                                '/Getting-Started-With-ACPI/Universal/plug/manual.md'
                            ]
                        },
                        {
                            text: 'AWAC vs RTC',
                            link: '/Getting-Started-With-ACPI/Universal/awac/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/awac/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/awac/ssdttime.md',
                                '/Getting-Started-With-ACPI/Universal/awac/manual.md',
                                '/Getting-Started-With-ACPI/Universal/awac/manual-hedt.md'
                            ]
                        },
                        {
                            text: 'NVRAM PMC',
                            link: '/Getting-Started-With-ACPI/Universal/nvram/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/nvram/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/nvram/ssdttime.md',
                                '/Getting-Started-With-ACPI/Universal/nvram/manual.md'
                            ]
                        },
                        {
                            text: 'USB RHUB',
                            palinkth: '/Getting-Started-With-ACPI/Universal/rhub/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/rhub/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/rhub/ssdttime.md',
                                '/Getting-Started-With-ACPI/Universal/rhub/manual.md'
                            ]
                        },
                        {
                            text: 'IMEI',
                            link: '/Getting-Started-With-ACPI/Universal/imei/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/imei/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/imei/manual.md'
                            ]
                        },
                        {
                            text: 'Risolvere Brigde Uncore',
                            link: '/Getting-Started-With-ACPI/Universal/unc0/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/unc0/prebuilt.md',
                                '/Getting-Started-With-ACPI/Universal/unc0/manual.md'
                            ]
                        },
                        {
                            text: 'Risolvere il Supporto SMBus',
                            link: '/Getting-Started-With-ACPI/Universal/smbus/',
                            isGroup: true,
                            children: [
                                '/Getting-Started-With-ACPI/Universal/smbus/manual.md'
                            ]
                        },
                        '/Getting-Started-With-ACPI/Universal/irq.md',
                        '/Getting-Started-With-ACPI/Universal/spoof.md'
                    ]
                },
                '/Getting-Started-With-ACPI/cleanup.md',
                '/Getting-Started-With-ACPI/troubleshooting.md'
            ],
            '/config.plist/': [
                {
                    text: 'Setup del config.plist',
                    link: '/config.plist/',
                    isGroup: true,
                    children: [
                        {
                            text: 'Intel Desktop config.plist',
                            isGroup: true,
                            children: [
                                '/config.plist/penryn.md',
                                '/config.plist/clarkdale.md',
                                '/config.plist/sandy-bridge.md',
                                '/config.plist/ivy-bridge.md',
                                '/config.plist/haswell.md',
                                '/config.plist/skylake.md',
                                '/config.plist/kaby-lake.md',
                                '/config.plist/coffee-lake.md',
                                '/config.plist/comet-lake.md'
                            ]
                        },
                        {
                            text: 'Intel Laptop config.plist',
                            isGroup: true,
                            children: [
                                '/config.plist/laptop/arrandale.md',
                                '/config.plist/laptop/sandy-bridge.md',
                                '/config.plist/laptop/ivy-bridge.md',
                                '/config.plist/laptop/haswell.md',
                                '/config.plist/laptop/broadwell.md',
                                '/config.plist/laptop/skylake.md',
                                '/config.plist/laptop/kaby-lake.md',
                                '/config.plist/laptop/coffee-lake.md',
                                '/config.plist/laptop/coffee-lake-plus.md',
                                '/config.plist/laptop/icelake.md'
                            ]
                        },
                        {
                            text: 'Intel HEDT config.plist',
                            isGroup: true,
                            children: [
                                '/config.plist/HEDT/nehalem.md',
                                '/config.plist/HEDT/ivy-bridge-e.md',
                                '/config.plist/HEDT/haswell-e.md',
                                '/config.plist/HEDT/broadwell-e.md',
                                '/config.plist/HEDT/skylake-x.md'
                            ]
                        },
                        {
                            text: 'AMD Desktop config.plist',
                            isGroup: true,
                            children: [
                                '/config.plist/AMD/fx.md',
                                '/config.plist/AMD/zen.md'
                            ]
                        }
                    ]
                }
            ],
            '/OpenCore-Multiboot/': [
                '/OpenCore-Multiboot/',
                {
                    text: 'Per chi ha già esperienza con i multiboot',
                    link: '/OpenCore-Multiboot/QUICK.md'
                },
                {
                    text: 'Introduzione al multibooting',
                    isGroup: true,
                    children: [
                        '/OpenCore-Multiboot/Intro/Def.md',
                        {
                            text: 'UEFI? Legacy? CSM? Che!?',
                            link: '/OpenCore-Multiboot/Intro/Booting-part.md'
                        }
                    ]
                },
                {
                    text: 'Multiboot su UEFI',
                    isGroup: true,
                    children: [
                        {
                            text: 'Dischi vuoti',
                            link: '/OpenCore-Multiboot/empty/',
                            isGroup: true,
                            children: [
                                '/OpenCore-Multiboot/empty/samedisk.md',
                                '/OpenCore-Multiboot/empty/diffdisk.md'
                            ]
                        },
                        {
                            text: 'Dischi già occupati',
                            link: '/OpenCore-Multiboot/exist/',
                            isGroup: true,
                            children: [
                                '/OpenCore-Multiboot/exist/data.md',
                                '/OpenCore-Multiboot/exist/os.md'
                            ]
                        },
                    ]
                },
                '/OpenCore-Multiboot/troubleshooting.md',
                {
                    text: 'Configurazioni di OpenCore',
                    isGroup: true,
                    children: [
                        '/OpenCore-Multiboot/oc/linux.md',
                        '/OpenCore-Multiboot/Win.md',
                        '/OpenCore-Multiboot/oc/duet.md',
                        {
                            text: 'Usare LauncherOption',
                            link: 'https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html'
                        },
                        {
                            text: 'Installare BootCamp',
                            link: 'https://dortania.github.io/OpenCore-Post-Install/multiboot/bootcamp.html'
                        }
                    ]
                }
            ],
            'OpenCanopy-Gallery':
                [
                    {
                        title: 'Introduzione',
                        link: '/OpenCanopy-Gallery/'
                    },
                    {
                        title: 'Repo con Temi Popolari',
                        isgroup: true,
                        children: [
                            '/OpenCanopy-Gallery/ocbinary.md',
                            '/OpenCanopy-Gallery/blackosx.md'
                        ]
                    }
                ],
            '/': [
                {
                    text: 'Introduzione',
                    isGroup: true,
                    children: [
                        '/prerequisites.md',
                        '/macos-limits.md',
                        '/find-hardware.md',
                        '/terminology.md',
                        '/why-oc.md'
                    ]

                },
                {
                    text: 'Creazione della USB',
                    isGroup: true,
                    children: [
                        {
                            text: 'Creare la USB',
                            link: '/installer-guide/',
                            isGroup: true,
                            children: [
                                '/installer-guide/mac-install.md',
                                {
                                    text: 'macOS: metodi legacy',
                                    isGroup: true,
                                    children: [
                                        '/installer-guide/mac-install-pkg.md',
                                        '/installer-guide/mac-install-recovery.md',
                                        '/installer-guide/mac-install-dmg.md'
                                    ]
                                },
                                '/installer-guide/winblows-install.md',
                                '/installer-guide/linux-install.md'
                            ]
                        },
                        '/installer-guide/opencore-efi.md',
                        '/ktext.md',
                        '/Getting-Started-With-ACPI/',
                        '/config.plist/',
                        '/installation.md',
                        {
                            text: 'Dopo l\'installazione',
                            link: 'https://dortania.github.io/OpenCore-Post-Install/'
                        }
                    ]
                },
                {
                    text: 'Risoluzione dei problemi',
                    link: '/troubleshooting/',
                    isGroup: true,
                    children: [
                        {
                            text: 'Risoluzione dei problemi',
                            isGroup: true,
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
                    text: 'Extra',
                    isGroup: true,
                    children: [
                        '/extras/kaslr-fix.md',
                        '/extras/spoof.md',
                        '/extras/big-sur.md',
                        {
                            text: 'Macchine Virtuali',
                            isGroup: true,
                            children: [
                                '/extras/virtualbox.md',
                                '/extras/fusion.md',
                                '/extras/workstation.md'
                            ]
                        },
                        {
                            text: 'Conversioni da Clover',
                            link: '/clover-conversion/',
                            isGroup: true,
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
    }
}
