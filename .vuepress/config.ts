import { defineUserConfig } from "vuepress";
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from '@vuepress/bundler-vite'
import multimdTable from "markdown-it-multimd-table";

export default defineUserConfig({
  bundler: viteBundler(),
  title: "Guida Installazione Opencore",
  lang: "it-IT",
  extendsMarkdown: (md) => {
    md.use(multimdTable, { rowspan: true });
  },
  theme: defaultTheme({
    lastUpdatedText: "Ultimo Aggiornamento",
    repo: "macos86/macos86.github.io",
    contributorsText: "Chi ha contribuito alla creazione di questa pagina",
    editLink: true,
    editLinkText: "Aiutaci a tradurre questa pagina!",
    logo: "/homepage.png",
    navbar: [
      {
        text: "Iniziamo con ACPI",
        link: "/Getting-Started-With-ACPI/",
      },
      "/config.plist/",
      "/troubleshooting/",
      {
        text: "Dopo l'installazione di OpenCore...",
        link: "/OpenCore-Post-Install/",
      },
      {
        text: "Guide",
        children: [
          {
            text: "Multibooting con OpenCore",
            link: "/OpenCore-Multiboot/",
          },
          {
            text: "Galleria OpenCanopy",
            link: "/OpenCanopy-Gallery/",
          },
          {
            text: "Dortania (EN)",
            link: "https://dortania.github.io/",
          },
          {
            text: "GPU Buyers Guide (EN)",
            link: "https://dortania.github.io/GPU-Buyers-Guide/",
          },
          {
            text: "Wireless Buyers Guide (EN)",
            link: "https://dortania.github.io/Wireless-Buyers-Guide/",
          },
          {
            text: "Anti Buyers Guide (EN)",
            link: "https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/",
          },
        ],
      },
    ],
    sidebar: {
      "/OpenCore-Post-Install": [
        {
          text: "Introduction",
          link: "/OpenCore-Post-Install/",
        },
        {
          text: "Universal",
          children: [
            "/OpenCore-Post-Install/universal/audio.md",
            "/OpenCore-Post-Install/universal/oc2hdd.md",
            "/OpenCore-Post-Install/universal/update.md",
            "/OpenCore-Post-Install/universal/drm.md",
            "/OpenCore-Post-Install/universal/iservices.md",
            "/OpenCore-Post-Install/universal/pm.md",
            "/OpenCore-Post-Install/universal/sleep.md",
          ],
        },
        {
          text: "USB Fixes",
          children: [
            "/OpenCore-Post-Install/usb/",
            "/OpenCore-Post-Install/usb/system-preparation.md",
            {
              text: "USB Mapping",
              children: [
                "/OpenCore-Post-Install/usb/intel-mapping/intel.md",
                "/OpenCore-Post-Install/usb/manual/manual.md",
              ],
            },
            {
              text: "Miscellaneous Fixes",
              link: "/OpenCore-Post-Install/usb/misc/",
              children: [
                "/OpenCore-Post-Install/usb/misc/power.md",
                "/OpenCore-Post-Install/usb/misc/shutdown.md",
                "/OpenCore-Post-Install/usb/misc/instant-wake.md",
                "/OpenCore-Post-Install/usb/misc/keyboard.md",
              ],
            },
          ],
        },
        {
          text: "Security",
          children: [
            {
              text: "Security and FileVault",
              link: "/OpenCore-Post-Install/universal/security.md",
              children: [
                "/OpenCore-Post-Install/universal/security/filevault.md",
                "/OpenCore-Post-Install/universal/security/vault.md",
                "/OpenCore-Post-Install/universal/security/scanpolicy.md",
                "/OpenCore-Post-Install/universal/security/password.md",
                "/OpenCore-Post-Install/universal/security/applesecureboot.md",
              ],
            },
          ],
        },
        {
          text: "Laptop Specifics - Fixing Battery Read-outs",
          link: "/OpenCore-Post-Install/laptop-specific/battery",
        },
        {
          text: "Cosmetics",
          children: [
            "/OpenCore-Post-Install/cosmetic/verbose.md",
            "/OpenCore-Post-Install/cosmetic/gui.md",
            "/OpenCore-Post-Install/universal/memory.md",
          ],
        },
        {
          text: "Multiboot",
          children: [
            "/OpenCore-Multiboot/",
            "/OpenCore-Post-Install/multiboot/bootstrap.md",
            "/OpenCore-Post-Install/multiboot/bootcamp.md",
          ],
        },
        {
          text: "Miscellaneous",
          children: [
            "/OpenCore-Post-Install/misc/rtc.md",
            "/OpenCore-Post-Install/misc/msr-lock.md",
            "/OpenCore-Post-Install/misc/nvram.md",
          ],
        },
        {
          text: "In-depth GPU patching",
          link: "/OpenCore-Post-Install/gpu-patching/",
          children: [
            {
              text: "Modern Intel iGPU",
              children: [
                "/OpenCore-Post-Install/gpu-patching/intel-patching/",
                "/OpenCore-Post-Install/gpu-patching/intel-patching/vram.md",
                "/OpenCore-Post-Install/gpu-patching/intel-patching/connector.md",
                "/OpenCore-Post-Install/gpu-patching/intel-patching/busid.md",
              ],
            },
            {
              text: "Legacy Intel iGPU",
              link: "/OpenCore-Post-Install/gpu-patching/legacy-intel/",
            },
            {
              text: "Legacy NVIDIA",
              link: "/OpenCore-Post-Install/gpu-patching/nvidia-patching/",
            },
          ],
        },
      ],
      "/OpenCore-Multiboot/": [
        "/OpenCore-Multiboot/",
        {
          text: "Per chi ha già esperienza con i multiboot",
          link: "/OpenCore-Multiboot/QUICK.md",
        },
        {
          text: "Introduzione al multibooting",
          children: [
            "/OpenCore-Multiboot/Intro/Def.md",
            {
              text: "UEFI? Legacy? CSM? Che!?",
              link: "/OpenCore-Multiboot/Intro/Booting-part.md",
            },
          ],
        },
        {
          text: "Multiboot su UEFI",
          children: [
            {
              text: "Dischi vuoti",
              link: "/OpenCore-Multiboot/empty/",
              children: [
                "/OpenCore-Multiboot/empty/samedisk.md",
                "/OpenCore-Multiboot/empty/diffdisk.md",
              ],
            },
            {
              text: "Dischi già occupati",
              link: "/OpenCore-Multiboot/exist/",
              children: [
                "/OpenCore-Multiboot/exist/data.md",
                "/OpenCore-Multiboot/exist/os.md",
              ],
            },
          ],
        },
        "/OpenCore-Multiboot/troubleshooting.md",
        {
          text: "Configurazioni di OpenCore",
          children: [
            "/OpenCore-Multiboot/oc/linux.md",
            "/OpenCore-Multiboot/Win.md",
            "/OpenCore-Multiboot/oc/duet.md",
            {
              text: "Usare LauncherOption",
              link: "/OpenCore-Post-Install/multiboot/bootstrap.md",
            },
            {
              text: "Installare BootCamp",
              link: "/OpenCore-Post-Install/multiboot/bootcamp.md",
            },
          ],
        },
      ],
      "/OpenCanopy-Gallery/": [
        {
          text: "Introduzione",
          link: "/OpenCanopy-Gallery/",
        },
        {
          text: "Repo con Temi Popolari",
          children: [
            "/OpenCanopy-Gallery/ocbinary.md",
            "/OpenCanopy-Gallery/blackosx.md",
          ],
        },
      ],
      "/": [
        {
          text: "Introduzione",
          collapsible: true,
          children: ["/prerequisites.md", "/terminology.md", "/why-oc.md"],
        },
        {
          text: "Comprendiamo il nostro hardware",
          collapsible: true,
          children: ["/macos-limits.md", "/find-hardware.md"],
        },
        {
          text: "Creare l'Installer",
          link: "/installer-guide/",
          children: [
            "/installer-guide/mac-install.md",
            "/installer-guide/mac-install-recovery.md",
          ],
        },
        "/opencore-efi.md",
        {
          text: "Iniziamo con gli ACPI",
          link: "/Getting-Started-With-ACPI/",
          children: [
            "/Getting-Started-With-ACPI/ssdt-prebuilt.md",
            "/Getting-Started-With-ACPI/ssdt-easy.md",
            "/Getting-Started-With-ACPI/manual.md",
            {
              text: "Gli SSDT",
              collapsible: true,
              children: [
                "/Getting-Started-With-ACPI/Universal/ec.md",
                "/Getting-Started-With-ACPI/Universal/plug.md",
                "/Getting-Started-With-ACPI/Universal/awac.md",
                "/Getting-Started-With-ACPI/Universal/nvram.md",
                "/Getting-Started-With-ACPI/Universal/rhub.md",
                "/Getting-Started-With-ACPI/Universal/imei.md",
                "/Getting-Started-With-ACPI/Universal/unc0.md",
                "/Getting-Started-With-ACPI/Universal/smbus.md",
                "/Getting-Started-With-ACPI/Universal/irq.md",
                "/Getting-Started-With-ACPI/Universal/spoof.md",
                "/Getting-Started-With-ACPI/desktop.md",
                {
                  text: "Specifici per i laptop",
                  collapsible: true,
                  children: [
                    "/Getting-Started-With-ACPI/Laptops/backlight.md",
                    "/Getting-Started-With-ACPI/Laptops/trackpad.md",
                    "/Getting-Started-With-ACPI/Laptops/laptop-disable.md",
                  ],
                },
              ],
            },
          ],
        },
        {
          text: "Setup del config.plist",
          link: "/config.plist/",
          children: [
            {
              text: "Intel Desktop config.plist",
              collapsible: true,
              children: [
                "/config.plist/penryn.md",
                "/config.plist/clarkdale.md",
                "/config.plist/sandy-bridge.md",
                "/config.plist/ivy-bridge.md",
                "/config.plist/haswell.md",
                "/config.plist/skylake.md",
                "/config.plist/kaby-lake.md",
                "/config.plist/coffee-lake.md",
                "/config.plist/comet-lake.md",
              ],
            },
            {
              text: "Intel Laptop config.plist",
              collapsible: true,
              children: [
                "/config.plist/laptop/arrandale.md",
                "/config.plist/laptop/sandy-bridge.md",
                "/config.plist/laptop/ivy-bridge.md",
                "/config.plist/laptop/haswell.md",
                "/config.plist/laptop/broadwell.md",
                "/config.plist/laptop/skylake.md",
                "/config.plist/laptop/kaby-lake.md",
                "/config.plist/laptop/coffee-lake.md",
                "/config.plist/laptop/coffee-lake-plus.md",
                "/config.plist/laptop/icelake.md",
              ],
            },
            {
              text: "Intel HEDT config.plist",
              collapsible: true,
              children: [
                "/config.plist/HEDT/nehalem.md",
                "/config.plist/HEDT/ivy-bridge-e.md",
                "/config.plist/HEDT/haswell-e.md",
                "/config.plist/HEDT/broadwell-e.md",
                "/config.plist/HEDT/skylake-x.md",
              ],
            },
            {
              text: "AMD Desktop config.plist",
              collapsible: true,
              children: ["/config.plist/AMD/fx.md", "/config.plist/AMD/zen.md"],
            },
          ],
        },
        "/installation.md",
        {
          text: "Risoluzione dei problemi",
          collapsible: true,
          children: [
            "/troubleshooting/opencore.md",
            "/troubleshooting/kernel.md",
            "/troubleshooting/ssdt.md",
            "/troubleshooting/userspace-issues.md",
            "/troubleshooting/post.md",
            "/troubleshooting/misc.md",
          ],
        },
        "/OpenCore-Post-Install/",
        {
          text: "Extra",
          collapsible: true,
          children: [
            "/extras/kaslr-fix.md",
            "/extras/spoof.md",
            "/extras/monterey.md",
            "/extras/debug.md",
            "/extras/boot.md",
            "/extras/kernel-debugging.md",
            {
              text: "Macchine Virtuali",
              children: [
                "/extras/virtualbox.md",
                "/extras/fusion.md",
                "/extras/workstation.md",
              ],
            },
            {
              text: "Conversioni da Clover",
              link: "/extras/clover",
              children: [
                "/extras/clover/config.md",
                "/extras/clover/efi.md",
                "/extras/Clover/boot-arg.md",
                "/extras/clover/patch.md",
              ],
            },
            "/extras/smbios-support.md",
            {
              text: "OpenCanopy Gallery",
              link: "/OpenCanopy-Gallery/",
            },
          ],
        },
        "/CONTRIBUTING.md",
        "/credit.md",
      ],
    },
  }),
});
