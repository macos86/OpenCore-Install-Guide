# Convertire le proprietà comuni da Clover a OpenCore

Perciò questa piccola (beh, ora non più così piccola...) pagina è fatta per chi ha problemi a migrare da Clover a OpenCore dato che alcuni quirk per sistemi legacy sono richiesti oppure nel Configuration.pdf che non ha dettagli per i laptop.

[[toc]]

## Kext e Driver Firmware

Vedi [Kext e Driver Firmware](/extras/clover-efi.md).

## Acpi

### ACPI renames

Nella transizione da Clover a OpenCore dobbiamo rimuovere le patch non necessarie che sono state utilizzate per lungo tempo:

* Patch di EHCI: Raccomandato lo spegnimento del controller con [SSDT-EHCx_OFF](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-EHCx_OFF.dsl). Skylake e più recenti non lo avranno, perciò non è necessario.
  * cambiare EHC1 a EH01
  * cambiare EHC2 a EH02
* Patch di XHCI: Non necessarie dato che è stato fatto un [kext che inietta le porte](https://github.com/corpnewt/USBMap)
  * cambiare XHCI a XHC
  * cambiare XHC1 a XHC
* Patch di SATA: Puramente cosmetico in macOS in questo momento
  * cambiare SAT0 a SATA
  * change SAT1 a SATA
* Patch di IMEI: Gestito da [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
  * cambiare HECI a IMEI
  * cambiare HEC1 a IMEI
  * cambiare MEI a IMEI
  * cambiare IDER a MEID
* Patch di GFX: Gestito da [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
  * cambiare GFX0 a IGPU
  * cambiare PEG0 a GFX0
  * cambiare PEGP a GFX0
  * cambiare SL01 a PEGP
* Patch di EC: Vedi per una soluzione migliore: [Iniziamo con ACPI](/Getting-Started-With-ACPI/)
  * cambiare EC0 a EC
  * cambiare H_EC a EC
  * cambiare ECDV a EC
  * cambiare PGEC a EC
* Audio renames: Gestito da [AppleALC](https://github.com/acidanthera/AppleALC)
  * cambiare HDAS a HDEF
  * cambiare CAVS a HDEF
  * cambiare AZAL a HDEF
  * cambiare ALZA a HDEF
  * cambiare B0D3 a HDAU
* Fix del bug nella Z390 legato al RTC del BIOS: Vedi qui per una soluzione migliore: [Iniziamo con ACPI](/Getting-Started-With-ACPI/) (SSDT-AWAC)
  * cambiare STAS a [Blank]
  * Fix del bug nella Z390 legato al RTC del BIOS
  * Fix del bug nella serie 300 legato al RTC del BIOS
* Patch del NVMe: [NVMeFix](https://github.com/acidanthera/NVMeFix) sistema il power management
  * cambiare PXSX a ANS1
  * cambiare PXSX a ANS2
* Patch di Airport/WiFi: [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup)
  * cambiare PXSX a ARPT
* Altre patch puramente cosmetiche:
  * cambiare LPC0 a LPCB(usa [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl) per sistemare il supporto SMBUS)
  * cambiare PC00 a PCIO
  * cambiare FPU a MATH
  * cambiare TMR a TIMR
  * cambiare PIC a IPIC
  * cambiare GBE1 a ETH0

### Patches

* Patch del TgtBridge:
  * `ACPI -> Patch -> ... -> Base`

* DisableASPM:
  * `DeviceProperties -> Add -> PciRoot... -> pci-aspm-default | Data | <00>`

* HaltEnabler:
  * `ACPI -> Quirks -> FadtEnableReset -> YES`

### Fixes

* **FixAirport**:
  * [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup)
* **FixIPIC**:
  * [SSDTTime](https://github.com/corpnewt/SSDTTime) di Corpnewt per creare un vero e proprio SSDT, `FixHPET - Patch out IRQ Conflicts`

* **FixSBUS**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl)

* **FixShutdown**:
  * [FixShutdown-USB-SSDT](https://github.com/macos86/OpenCore-Post-Install/blob/master/extra-files/FixShutdown-USB-SSDT.dsl)
  * [`_PTS` to `ZPTS` Patch](https://github.com/macos86/OpenCore-Post-Install/blob/master/extra-files/FixShutdown-Patch.plist)
  * Ciò non danneggerà le installazioni Windows o Linux poiché si tratta solo di aggiungere metodi mancanti che avrebbero dovuto essere lì per iniziare. *Incolpare gli autori del firmware*

* **FixDisplay**:
  * Patch del framebuffer manuale, WhateverGreen fa già la maggior parte del lavoro

* **FixHDA**:
  * Gestito da AppleALC
* **FixHPET**:
  * [SSDTTime](https://github.com/corpnewt/SSDTTime) di Corpnewt per creare un vero e proprio SSDT, `FixHPET - Patch out IRQ Conflicts`
* **FixSATA**:
  * `Kernel -> Quirks -> ExternalDiskIcons -> YES`

* **FixADP1**:
  * Rinomina `AC0_` a `ADP1`, vedi [Rename-SSDT](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Rename-SSDT.dsl) per un esempio
  * Inietta anche `Name (_PRW, Package (0x02) {0x1C,0x03})` nel dispositivo se non presente. [Fonte](https://github.com/CloverHackyColor/CloverBootloader/blob/81f2b91b1552a4387abaa2c48a210c63d5b6233c/rEFIt_UEFI/Platform/FixBiosDsdt.cpp#L1677-L1692)

* **FixRTC**:
  * [SSDTTime](https://github.com/corpnewt/SSDTTime) di Corpnewt per creare un vero e proprio SSDT, `FixHPET - Patch out IRQ Conflicts`
* **FixTMR**:
  * [SSDTTime](https://github.com/corpnewt/SSDTTime) di Corpnewt per creare un vero e proprio SSDT, `FixHPET - Patch out IRQ Conflicts`

* **AddPNLF**:
  * Vedi [SSDT-PNLF](/Getting-Started-With-ACPI/Laptops/backlight.html)
* **AddMCHC**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl)
* **AddIMEI**:
  * [SSDT-SBUS-MCHC](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-SBUS-MCHC.dsl)
  * WhateverGreen si occuperà di rinominare IMEI
  * Per Sandy Bridge su Z77 o per IvyBridge su Z67, IMEI deve essere ricreato: [SSDT-IMEI](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-IMEI.dsl)
* **FakeLPC**:
  * `DeviceProperties -> Add -> PciRoot... -> device-id`
  * Dovrai ingannare macOS per supportare un controller LPC già presente in AppleLPC

* **FixIntelGfx**:
  * WhateverGreen se ne occupa

* **AddHDMI**:
  * WhateverGreen se ne occupa

**DropTables**:

* `ACPI -> Delete`

### SSDTs

* **PluginType**:
  * [SSDT-PLUG](/Getting-Started-With-ACPI/Universal/plug/)
  * Vedi [Iniziamo con ACPI](/Getting-Started-With-ACPI/) per più dettagli

* **Generate P States**: [ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh) (Per Sandy Bridge e IvyBridge)
* **Generate C States**: [ssdtPRGen.sh](https://github.com/Piker-Alpha/ssdtPRGen.sh) (Per Sandy Bridge e IvyBridge)

## Boot

### Boot Argument

* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> Argomenti di avvio`

### NeverHibernate

* `Misc -> Boot -> HibernateMode -> None`

### Default Boot Volume

* `Misc -> Security -> AllowSetDefault -> True`
  * Premi Ctrl+Enter nel picker per impostare il dispositivo di avvio predefinito
* L'alternativa è  Disco di Avvio nelle Preferenze di Sistema di macOS, come nei veri Mac

## Boot Graphics

### DefaultBackgroundColor

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14 -> DefaultBackgroundColor`
  * `00000000`: Syrah Black
  * `BFBFBF00`: Light Gray
  * Per calcolare il tuo, converti un valore `RGB` in `HEX`

### EFILoginHiDPI

* Flag presente solo su Clover, per lo scaling della UI di OpenCore vedi UIScale e `UEFI -> Output`

### flagstate

* `NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14 -> flagstate | Data | <>`
  * 0 -> `<00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000` (ricavato da un mac)
  * La location della NVRAM deve essere controllata più volte per questa opzione

### UIScale

* `UEFI -> Quirks -> UIScale | Integer |`
  * `1` —> 1x scaling, corrisponde a display normali.
  * `2` —> 2x scaling, corresponde a display HiDPI.
  * `-1` —> lascia la variabile invariata the current variable unchanged.
  * `0` —> scegli automaticamente in base alla risoluzione.

## CPU

### Type

* `PlatformInfo -> Generic -> ProcessorType`
* Vedi [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) per tutti i valori supportati

### HWPEnable

Migliore alternativa è modificare il `MSR 0x770` con [HWPEnable](https://github.com/headkaze/HWPEnable)

### QEMU

Supporto per corrette VM/KVM è implementato in OpenCore

### TurboDisable

Migliore alternativa è controllare le frequenze con [CPUFriend](https://github.com/acidanthera/CPUFriend) o [ssdtPRGen](https://github.com/Piker-Alpha/ssdtPRGen.sh)

## Devices

### USB

* FixOwnership: `UEFI -> Quirk -> ReleaseUsbOwnership`
  * Dovresti anche abilitare nel BIOS `XHCI Hand-off`
* ClockID: `DeviceProperties -> Add -> PciRoot... -> AAPL,clock-id`
* HighCurrent: `DeviceProperties -> Add -> PciRoot... -> AAPL, HighCurrent`
  * Irrilevante per OS X 10.11 o più recenti
  * Una nuova variante può essere anche PowerProperties definita in `IOUSBHostFamily.kext -> AppleUSBHostPlatformProperties` o aggiunta con un SSDT USBX in SMBIOS Skylake e più recenti

### Audio

Per questo, dovrai conoscere il PciRoot per il tuo audio controller e il suo nome (comunemente come HDEF, ma anche HDAS, HDAU e simili), lo puoi trovare con [gfxutil](https://github.com/acidanthera/gfxutil/releases):

```
path/to/gfxutil -f HDEF
```

* Inietta: `DeviceProperties -> Add -> PciRoot... -> layout-id`
* AFGLowPowerState: `DeviceProperties -> Add -> PciRoot... -> AFGLowPowerState -> <01000000>`
* ResetHDA: `UEFI -> Audio -> ResetTrafficClass`
  * C'è anche il boot-arg di AppleALC `alctsel=1` oppure [JackFix](https://github.com/fewtarius/jackfix)

### Add Properties

* Nessun equivalente, devi specificare la path PciRoot

### Properties

* `DeviceProperties -> Add`

### FakeID

Per i seguenti, devi conoscere la PciRoot per il tuo dispositivo e applicare le loro proprietà con `DeviceProperties -> Add`, PciRoot lo puoi trovare con  [gfxutil](https://github.com/acidanthera/gfxutil/releases)

* **USB**
  * `device-id`
  * `device_type`
  * `device_type`
* **IMEI**
  * `device-id`
  * `vendor-id`

* **WIFI**

  * `name`
  * `compatible`

* **LAN**

  * `device-id`
  * `compatible`
  * `vendor-id`

* **XHCI**

  * `device-id`
  * `device_type: UHCI`
  * `device_type: OHCI`

device_type: EHCI

* `device-id`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-in-sleep`
* `built-in`

device_type: XHCI

* `device-id`
* `AAPL,current-available`
* `AAPL,current-extra`
* `AAPL,current-available`
* `AAPL,current-in-sleep`
* `built-in`

### ForceHPET

* `UEFI -> Quirks -> ActivateHpetSupport`

## Disable Drivers

Semplicemente non aggiungere i tuoi driver in `UEFI -> Drivers`, oppure aggiungi `#` davanti al nome del driver nel config.plist per farlo saltare a OpenCore.

## Gui

## Graphics

* Nota: dovresti rimpiazzarlo con PciRoot...

### InjectIntel

* [GMA Patching (EN)](/OpenCore-Post-Install/gpu-patching/)

### InjectAti

* `DeviceProperties -> Add -> PciRoot... -> device-id`
  * `<B0670000>` per R9 390X
* `DeviceProperties -> Add -> PciRoot... -> @0,connector-type`
  * Dovresti aggiungere i seguenti Connettori (ie. @1,connector-type, @2,connector-type) per il numero di porte che hai. Vedi qui per il numero corrispondente al connettore:

```
LVDS                    <02 00 00 00>
DVI (Dual Link)         <04 00 00 00>
DVI (Single Link)       <00 02 00 00>
VGA                     <10 00 00 00>
S-Video                 <80 00 00 00>
DP                      <00 04 00 00>
HDMI                    <00 08 00 00>
DUMMY                   <01 00 00 00>
```

### InjectNvidia

* [NVIDIA Patching (EN)](/OpenCore-Post-Install/gpu-patching/)

### FakeIntel

* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> device-id`
  * `66010003` per HD 4000
* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> vendor-id -> <86800000>`

### FakeAti

* `DeviceProperties -> Add -> PciRoot... -> device-id`
  * `<B0670000>` per R9 390X
* `DeviceProperties -> Add -> PciRoot... -> ATY,DeviceID`
  * `<B067>` per R9 390X
* `DeviceProperties -> Add -> PciRoot... -> @0,compatible`
  * `ATY,Elodea` per HD 6970M
* `DeviceProperties -> Add -> PciRoot... -> vendor-id-> <02100000>`
* `DeviceProperties -> Add -> PciRoot... -> ATY,VendorID -> <0210>`

**Nota**: Vedi qui per fare un SSDT per fare lo Spoofing della GPU, la iniezione via DeviceProperties sembra fallire alcune volte quando tenti di usare lo spoof della GPU: [Renaming GPUs](/Getting-Started-With-ACPI/Universal/spoof.html)
Per altri InjectAti, vedi il [Sample.dsl](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/Sample.dsl) nelle documentazioni di WhateverGreen

### Custom EDID

* [WhateverGreen's EDID docs (EN)](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md#edid)

### Dual Link

* `DeviceProperties -> Add -> PciRoot... -> AAPL00,DualLink`
  * 1 -> `<01000000>`
  * 0 -> `<00000000>`

### NVCAP

* [NVIDIA Patching (EN)](/OpenCore-Post-Install/gpu-patching/)

### display-cfg

* `DeviceProperties -> Add -> PciRoot... -> @0,display-cfg`
* Vedi il post di fassl riguardo a questo: [NVIDIA injection (EN)](https://www.insanelymac.com/forum/topic/215236-nvidia-injection/)

### LoadVBios

* Vedi [sample.dsl](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/Sample.dsl) per maggiori informazioni su una iniezione personalizzata del VBIOS

### PatchVBios

Vedi LoadVBIOS

### NvidiaGeneric

* `DeviceProperties -> Add -> PciRoot... -> model | string | Add the GPU name`

### NvidiaSingle

Vedi [disabling unsupported GPUs (EN)](/OpenCore-Post-Install/)

### NvidiaNoEFI

* `DeviceProperties -> Add -> PciRoot... -> NVDA,noEFI | Boolean | True`
* Vedi il commento di FredWst per maggiori informazioni: [GT 640 scramble (EN)](https://www.insanelymac.com/forum/topic/306156-clover-problems-and-solutions/?do=findComment&comment=2443062)

### ig-platform-id

* `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0) -> APPL,ig-platform-id`

### BootDisplay

* `DeviceProperties -> Add -> PciRoot... ->  @0,AAPL,boot-display`

### RadeonDeInit

Nella maggior parte dei casi è possibile usare WhateverGreen, dato che se ne occupa automaticamente. Questo SSDT non è necessario se WhateverGreen è usato.

* [Radeon-Denit-SSDT](https://github.com/dortania/OpenCore-Install-Guide/blob/master/extra-files/Radeon-Deinit-SSDT.dsl)
  * Viene usato di default per GFX0, sistemalo per il tuo sistema

## Kernel and Kext Patches

### KernelPm

* `Kernel -> Quirks -> AppleXcpmCfgLock -> YES`
* Nota che Clover applicherà questa patch automaticamente, senza controllare se MSR E2 era bloccato, perciò forse potresti non aver bisogno di questo quirk anche se Clover lo richiedeva

### AppleIntelCPUPM

* `Kernel -> Quirks -> AppleCpuPmCfgLock -> YES`

### DellSMBIOSPatch

Una strana quirk per i sistemi Dell che usano APTIO V

* `Kernel -> Quirks -> CustomSMBIOSGuid -> YES`
* `PlatformInfo -> UpdateSMBIOSMode -> Custom`

### KextsToPatch

* `Kernel -> Patch`
* Vedi [Conversione delle patch comuni di Kernel e Kext](/extras/clover-patch.md) per comuni conversioni delle patch

### KernelToPatch

* `Kernel -> Patch`
* Vedi [Conversione delle patch comuni di Kernel e Kext](/extras/clover-patch.md) per comuni conversioni delle patch

### ForceKextsToLoad

* `Kernel -> Force`

### Kernel LAPIC

* `Kernel -> Quirks -> LapicKernelPanic -> YES`

### KernelXCPM

* `Kernel -> Quirks -> AppleXcpmExtraMsrs -> YES`

Per una lista completa di patch, per favore confronta [OpenCore's `CommonPatches.c`](https://github.com/acidanthera/OpenCorePkg/blob/master/Library/OcAppleKernelLib/CommonPatches.c) con [Clover's kernel_patcher.c](https://github.com/CloverHackyColor/CloverBootloader/blob/master/rEFIt_UEFI/Platform/kernel_patcher.cpp). Alcune patch non sono trasferite perciò se devi usarne una, puoi farlo liberamente. Nell'esempio convertiamo il [`KernelIvyBridgeXCPM()`](https://github.com/CloverHackyColor/CloverBootloader/tree/1a02f530db91fdfa6880295b6a8b3f096c29e7cc/rEFIt_UEFI/Platform/kernel_patcher.cpp#L1617-L1719) per OpenCore:

```
Base: _xcpm_bootstrap
Comment: _xcpm_bootstrap (Ivy Bridge) 10.15
Count: 1
Enabled: YES
Find: 8D43C43C22
Identifier: kernel
Limit: 0
Mask: FFFF00FFFF
MinKernel: 19.
MaxKernel: 19.99.99
Replace: 8D43C63C22
ReplaceMask: 0000FF0000
Skip: 0
```

[Fonte](https://github.com/khronokernel/OpenCore-Vanilla-Desktop-Guide/issues/32)

Per Haswell+ Low end come Celeron, consulta qui per le patch raccomandate: [Bugtracker Issues 365 (EN)](https://github.com/acidanthera/bugtracker/issues/365)

### USB Port Limit Patches

* `Kernel -> Quirks -> XhciPortLimit -> YES`

### External Icons Patch

* `Kernel -> Quirks -> ExternalDiskIcons -> YES`
* Usato quando il tuo disco interno segnato come esterno su macOS

### AppleRTC

Problemi con AppleRTC, piccolo fix:

* config.plist -> Kernel -> Quirks -> DisableRtcChecksum -> true

**Nota**: Se continui ad avere problemi, devi usare [RTCMemoryFixup](https://github.com/acidanthera/RTCMemoryFixup/releases) ed escludere i casi limite. Vedi [qui per maggiori info (EN)](https://github.com/acidanthera/bugtracker/issues/788#issuecomment-604608329), e [qui](/OpenCore-Post-Install/misc/rtc.html) per una guida.

### FakeCPUID

* `Kernel -> Emulate`:
  * `CpuidMask`: `<Clover_FCPUID_Extended_to_4_bytes_Swapped_Bytes> | 00 00 00 00 | 00 00 00 00 | 00 00 00 00`
    * es: (`0x0306A9`): `A9060300 00000000 00000000 00000000`
  * `CpuidData`(Scambia `00` con `FF` se devi scambiarlo con un valore lungo)
    * es: `FFFFFFFF 00000000 00000000 00000000`

Nota: Trovare il CPUID in Intel può essere un po' più difficile che guardare nell'Intel ARK, la via più veloce è di scoprirlo è cercarlo dal sito della Microsoft: [Riepilogo degli aggiornamenti di microcodice Intel](https://support.microsoft.com/it-it/topic/riepilogo-degli-aggiornamenti-di-microcodice-intel-08c99af2-075a-4e16-1ef1-5f6e4d8637c4)

## Rt Variables

### ROM

* Nessuna traduzione diretta di `UseMacAddr0` dato che devi provvedere un ROM hardware, lo puoi trovare in `Preferenze di Sistema -> Network -> Avanzate -> Hardware`
* Verifica anche che En0 è ancora built-in quando avvii OpenCore, questo può rompere iMessage e iCloud quando non c'è la proprietà `built-in` property.

### MLB

* `PlatformInfo -> Generic -> MLB`

### BooterConfig

* `UEFI -> Quirks -> UIScale | Integer |`
  * `1` —> 1x scaling, corrisponde a display normali.
  * `2` —> 2x scaling, corresponde a display HiDPI.
  * `-1` —> lascia la variabile invariata the current variable unchanged.
  * `0` —> scegli automaticamente in base alla risoluzione.

### CsrActiveConfig

* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> csr-active-config`:

  * 0x0: `00000000`
  * 0x3: `03000000`
  * 0x67: `67000000`
  * 0x3E7: `E7030000`

## SMBIOS

### Product Name

* `PlatformInfo -> Generic -> SystemProductName`

### Serial Number

* `PlatformInfo -> Generic -> SystemSerialNumber`

### Board Serial Number

* `PlatformInfo -> Generic -> MLB`

### SmUUID

* `PlatformInfo -> Generic -> SystemUUID`

### Memory

* `PlatformInfo -> CustomMemory -> True`
* `PlatformInfo -> Memory`
  * Vedi [Configuration.pdf (EN)](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) per maggiori informazioni

### Slots AAPL Injection

* `DeviceProperties -> Add -> PciRoot... -> APPL,slot-name | string | Add slot`

## System Parameters

### CustomUUID

* Deprecato da molto e non raccomandato neanche su Clover, nessun equivalente su OpenCore
* Più info: [Hardware UUID injection for OpenCore #711](https://github.com/acidanthera/bugtracker/issues/711)

### InjectSystemID

* Anche questo legacy dato che viene usato per replicare l'UUID degli utenti Chameleon

### BacklightLevel

* Impostato correttemente in NVRAM
* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> backlight-level | Data | <Insert value>`
  * 0x0101 -> `<0101>`

### InjectKexts

* Nessun equivalente ma non hai alcuna scusa per tenere FakeSMC dentro macOS

### NoCaches

* Questo funziona fino a 10.7 su Clover, e OpenCore richiede un sistema che supporta prelinked (10.7) perciò non ci può essere un equivalente

### ExposeSysVariables

* Aggiungi semplicemente le tue proprietà SMBIOS in `PlatformInfo`
* Quirk confusionale, non viene nemmeno menzionata documentazioni delle versioni più recenti di Clover (AppleLife)

### NvidiaWeb

* Questo applica ```sudo nvram nvda_drv=1``` ad ogni boot. Per ottenere simili effetti devi aggiungere il seguente path:
* `NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82 -> nvda_drv: <31>`

## Status

**Sezione finite al 100%**:

* Boot Graphics
* Disable Drivers
* KernelAndKextPatches
* RTVariables
* SMBIOS
* SystemParameters

**Sezioni finite per la maggior parte**:

* Acpi
* Boot
* CPU
* Device

**Sezioni mancanti**:

* GUI
