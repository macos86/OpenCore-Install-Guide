---
next: /Getting-Started-With-ACPI/
---

# Creare la EFI

Per impostare la struttura di OpenCore, dovrai prendere la EFI trovata nei [rilasci di OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases/). Nota che saranno nelle cartelle IA32 o X64, rispettivamente per i Firmware a 32-bit e a 64-bit:

![](./images/installer-guide/opencore-efi-md/ia32-x64.png)

## DEBUG versus RELEASE?

| DEBUG | RELASE |
| :-----: | :------: |
| Può effettuare grandi debug contro i problemi di avvio, tuttavia può aggiungere un po' di attesa all'avvio (tipo 3-5 secondi per arrivare al picker). Una volta installato puoi facilmente traslare alla sezione RELEASE | Tempi di avvio più veloci, tuttavia non provvede informazioni utili per la risoluzione di problemi come invece fa la versione di DEBUG. |

## Copia l'EFI

Una volta scaricata, posiziona la cartella EFI (da OpenCorePkg) nella radice della tua partizione EFI:

![](./images/installer-guide/opencore-efi-md/efi-moved.png)

::: tip Note
Se usate l'installazione via Recovery, dovete copiare la cartella EFI nella radice della partizione primaria della chiavetta
:::

Ora apriamo la nostra EFI e vediamo che c'è al suo interno:

![](./images/installer-guide/opencore-efi-md/base-efi.png)

Ora puoi mettere i **tuoi** file (Driver del Firmware, Tools, Kext e ACPI nelle rispettive cartelle. Ecco come una EFI **potrebbe** apparire (la tua potrebbe essere differente):

![](./images/installer-guide/opencore-efi-md/populated-efi.png)

::: warning Ricorda!

* Gli SSDT e il DSDT personalizzato (`.aml`) vanno nella cartella ACPI
* I Kext (`.kext`) vanno nella cartella kexts
* I driver firmware (`.efi`) vanno nella cartella drivers
:::

## Driver del Firmware

I driver del Firmware sono dei driver utilizzati da OpenCore negli ambienti UEFI. Servono principalmente per avviare una computer, estendendo la capacità di patch di OpenCore oppure mostrandoti le diverse unità nel selettore(ovvero le unità HFS).

OpenCore viene distribuito con numerosi driver, tuttavia nella maggior parte dei casi solo alcuni sono necessari:

| Driver | Stato | Descrizione |
| :--- | :--- | :--- |
| Un driver HFS+ (Vedere sotto per una lista) | <span style="color:red"> Richiesto </span> | Richiesto per avviare la recovery o sistemi che usano questo file system |
| OpenRuntime.efi | ^^ | Estende Opencore e lo aiuta a modificare il file boot.efi per correggere la NVRAM e per una migliore gestione della batteria |
| OpenUsbKbDxe.efi | <span style="color:#30BCD5"> Optionale </span> | Richiesto per i sistemi non UEFI |
| OpenPartitionDxe.efi | ^^ | Richiesto per avviare la recovery di macOS 10.7-10.9 |

::: tip Note

* Non puoi usare i driver UEFI di Clover (EmuVariableUEFI, AptioMemoryFix, OsxAptioFixDrv, ...) su OpenCore! Vedi [Conversione driver Firmware](/extras/clover-efi.md) per maggiori informazioni sui driver supportati e quelli già inclusi con OpenCore.
* **Devono** essere posizionati sotto `EFI/OC/Drivers/`
:::

### Scegliere il driver HFS+

Attualmente si consiglia l'utilizzo di:

* OpenHfsPlus: variante opensource creata dagli sviluppatori di OpenCore e aggiunto di default alla EFI
* [HfsPlus.efi](https://github.com/acidanthera/OcBinaryData/raw/master/Drivers/HfsPlus.efi), driver sviluppato da Apple

Nel caso di sistemi con particolari condizioni:

* [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/raw/master/Drivers/HfsPlusLegacy.efi), variante legacy di HfsPlus.efi, usato per sistemi che non hanno il supporto delle istruzioni RDRAND, per processori Ivy Bridge di fascia bassa e più vecchi
* [HfsPlus32.efi](https://github.com/acidanthera/OcBinaryData/raw/master/Drivers/HfsPlus32.efi), usato per processori a 32 bit.

::: details Più informazioni riguardo agli altri driver

* AudioDxe.efi
  * Non relazionato col supporto audio in macOS
* CrScreenshotDxe.efi
  * Usato per fare degli screenshot nel UEFI, non necessario per noi
* HiiDatabase.efi
  * Usato per sistemare l'interfaccia grafica in Sandy Bridge o meno recenti per tool come OpenShell.efi
  * Non richiesto per avviare
* NvmExpressDxe.efi
  * Usato da Haswell o più vecchi quando non ci sono driver NVMe nel firmware
  * Non usare se non sai che stai facendo
* OpenCanopy.efi
  * Questo è la interfaccia grafica opzionale di OpenCore, spiegheremo come impostarla in [Post Install (EN)](/OpenCore-Post-Install/cosmetic/gui.md) perciò rimuovila per ora
* Ps2KeyboardDxe.efi + Ps2MouseDxe.efi
  * Ovvio che devi usarlo quando è necessario, la tastiera e il mouse USB non lo necessitano
  * Reminder: PS2 ≠ USB
* UsbMouseDxe.efi
  * Idea simile a OpenUsbKbDxe, usato solo dai sistemi legacy che usano DuetPkg
* XhciDxe.efi
  * Usato da Sandy Bridge o più vecchi quando il driver XHCI non è nel firmware
  * Necessario se stai usando una scheda di espansione USB 3.0 in una macchina vecchia
:::

### Utenti Legacy

Oltre a ciò che abbiamo detto in precedenza, se il tuo hardware è particolarmente vecchio (indicativamente dal 2011 o meno recenti) oppure hai intenzioni particolari, potresti aver bisogno di quanto segue.

* [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases/latest)
  * Utilizzato per il selettore Opencore su  **sistemi legacy non supportano UEFI e lo emulano tramite DuetPkg**, [non raccomandato ed addirittura dannoso su UEFI](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653)
* [OpenPartitionDxe](https://github.com/acidanthera/OpenCorePkg/releases/latest)
  * Necessario per avviare la recovery da OS X 10.7 fino al 10.9
    * Nota: gli utenti OpenDuet (cioè senza UEFI) avranno gia questo driver integrato, non gli servirà
  * Non necessario per OS X 10.10 e successivi

## Tools

| Tool | Stato | Descrizione |
| :--- | :--- | :--- |
| OpenShell.efi | <span style="color:#30BCD5"> Opzionale </span> | Raccomandato per debug più semplice, in caso di situazioni particolari |

## Kext

Un kext è un **k**ernel **ext**ension (estensione kernel), li possiammo immaginare come una sorta di drivers per MacOs, questi file andranno nella cartella kext della tua EFI.

* **Nota per Windows e Linux**: I kext saranno visti come normali cartelle dal vostro sistema, **controlla più volte** che la cartella che stai installando abbia un'estensione .kext visibile(e non aggiungere manulamente l'estensione se non è presente).
  * Se qualche kext dovesse includere un file  `.dSYM`, lo puoi semplicemente cancellare. Sono utili solamente per il debug.
* **Nota sul posizionamento**: Questi files **devono** essere posizionati sotto `EFI/OC/Kexts/`.

Tutti i kext elencati in precedenza possono essere trovati **pre-compilati** nella [Kext Repo](http://kexts.goldfish64.com/). I kext qui indicati vengono compilati ogni volta che c'è un nuovo aggiornamento.

### Obbligatori

::: tip Kext richiesti

Senza i due qua sotto nessun sistema è avviabile:

* (<span style="color:red">Richiesto</span>) [VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases/latest)
  * Emula il chip SMC che si trova sui veri Mac, senza questo MacOs non si avvierà.
  * Necessita OS X 10.4 o più recenti
* (<span style="color:red">Richiesto</span>) [Lilu](https://github.com/acidanthera/Lilu/releases/latest)
  * Un kext per modificare molti processi necessario per AppleALC, WhateverGreen, VirtualSMC e molti altri kext. Senza lilu non funzioneranno.
  * Nota bene che Lilu ed i plugins per funzionare richiedono OS X 10.4 o più recenti

:::

#### Plugin di VirtualSMC

I plug-in seguenti non sono necessari per l'avvio e aggiungono semplicemente funzionalità extra al sistema come il monitoraggio dell'hardware(Nota mentre VirtualSMC supporta 10.6, i plugins potrebbero richiedere 10.8+):

* SMCProcessor.kext
  * Utilizzato per monitorare la temperatura della CPU, **non funziona su sistemi basati su CPU AMD**
  * Richiede OS X 10.7 o più recenti
* SMCSuperIO.kext
  * Utilizzato per monitorare la velocità della ventola, **non funziona su sistemi basati su CPU AMD**
  * Richiede OS X 10.6 o più recenti
* SMCLightSensor.kext
  * Utilizzato per il sensore di luminosità sui laptop, **i desktop possono ignorare**
  * Non utilizzare se non si ha un sensore di luminosità, può causare problemi in caso contrario
  * Richiede OS X 10.6 o più recenti
* SMCBatteryManager.kext
  * Utilizzato per misurare la batteria sui laptop, **i desktop possono ignorare**
  * Richiede OS X 10.4 o più recenti
* SMCDellSensors.kext
  * Consente un monitoraggio e un controllo più accurato delle ventole sulle macchine Dell che supportano il System Management Mode (SMM)
  * **Non utilizzare se non si dispone di una macchina Dell supportata**, principalmente i laptop Dell possono trarre vantaggio da questo kext
  * Richiede OS X 10.7 o più recenti

### Grafica

* [WhateverGreen](https://github.com/acidanthera/WhateverGreen/releases/latest)
  * Utilizzato per la patch grafica di DRM, controllo del board ID, correzioni di framebuffer...
  * Tutte le GPU beneficiano di questo kext.
  * Necessita di OS X 10.6 o più recenti

### Audio

* [AppleALC](https://github.com/acidanthera/AppleALC/releases/latest)
  * Utilizzato per patch di AppleHDA, consentendo il supporto per la maggior parte dei controller audio integrati
  * I processori AMD 15°/16° potrebbero avere problemi con questo kext e i sistemi Ryzen/Threadripper raramente supportano il microfono
  * Necessita di OS X 10.8 o più recenti
  
::: details Kext audio per i sistemi legacy

Per coloro che intendono avviare 10.7 e versioni precedenti, è preferibile optare per questi kext:

* [VoodooHDA](https://sourceforge.net/projects/voodoohda/files/latest/download)
  * Necessita OS X 10.6 o più recenti
  
* [VoodooHDA-FAT](https://github.com/khronokernel/Legacy-Kexts/raw/master/FAT/Zip/VoodooHDA.kext.zip)
  * Simile al kext sopra, tuttavia supporta i kernel a 32 e 64 bit, quindi perfetto per l'avvio di OS X 10.4-5 e CPU a 32 bit

:::

### Ethernet

Qui supponiamo che tu sappia quale scheda ethernet ha il tuo sistema, ricorda che le pagine delle specifiche del prodotto molto probabilmente elencheranno il tipo di scheda di rete.

* [IntelMausi](https://github.com/acidanthera/IntelMausi/releases/latest)
  * Necessario per la maggior parte delle schede di rete Intel, i chipset basati su I211 avranno bisogno di SmallTreeIntel82576 kext
  * I NIC Intel 82578, 82579, I217, I218 e I219 sono ufficialmente supportati
  * Necessita OS X 10.9 o più recenti, gli utenti 10.6-10.8 possono utilizzare IntelSnowMausi
* [SmallTreeIntel82576 kext](https://github.com/khronokernel/SmallTree-I211-AT-patch/releases/latest)
  * Richiesto per i211 NIC, basato sul kext SmallTree ma patchato per supportare I211
  * Richiesto per la maggior parte delle schede AMD che eseguono NIC Intel (non funziona su macOS 12 [Monterey](./extras/monterey.md#ethernet)
  * Richiede OS X 10.9-12 (v1.0.6), macOS 10.13-14 (v1.2.5), macOS 10.15+ (v1.3.0)
* [AtherosE2200Ethernet](https://github.com/Mieze/AtherosE2200Ethernet/releases/latest)
  * Richiesto per Atheros e i NIC Killer
  * Richiede OS X 10.8 o successivo
  * Nota: i modelli Atheros Killer E2500 sono in realtà basati su Realtek, per questi sistemi si consiglia di utilizzare [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
* [RealtekRTL8111](https://github.com/Mieze/RTL8111_driver_for_OS_X/releases)
  * Per i Gigabit Ethernet di Realtek
  * Richiede OS X 10.8 e meno recenti per la versione 2.2.0 e inferiori, macOS 10.12 e sucessivi per le versioni 2.2.2, macOS 10.14 e sucessivi per la versione 2.3.0 e sucessive
  * **NOTA: a volte i Gigabit Ethernet di Realtek potrebbe non funzionare correttamente se si utilizza l'ultima versione del kext. Se hai qualche problema, prova ad usare vecchie versioni.**
* [LucyRTL8125Ethernet](https://www.insanelymac.com/forum/files/file/1004-lucyrtl8125ethernet/)
  * Per i 2,5 Gb Ethernet di Realtek
  * Richiede macOS 10.15 o successivo
* Per i NIC I225-V di Intel, le patch sono menzionate nella sezione desktop [Comet Lake DeviceProperties](/config.plist/comet-lake.md#deviceproperties). Non è richiesto nessun kext.
  * Richiede macOS 10.15 o successivo
* For Intel's I350 NICs, patches are mentioned in the HEDT [Sandy and Ivy Bridge-E DeviceProperties](/config-HEDT/ivy-bridge-e.md#deviceproperties) section. No kext is required.
  * Requires OS X 10.10 or newer

::: details Kext Ethernet per sistemi Legacy

Rilevante per le installazioni di macOS legacy o per vecchi computer.

* [AppleIntele1000e](https://github.com/chris1111/AppleIntelE1000e/releases/latest)
  * Principalmente rilevante per i controller Ethernet Intel basati su 10/100MBe
  * Richiede 10.6 o più recenti
* [RealtekRTL8100](https://www.insanelymac.com/forum/files/file/259-realtekrtl8100-binary/)
  * Principalmente rilevante per i controller Ethernet Realtek Ethernet basati su 10/100MBe
  * Richiede macOS 10.12 o versione successiva con v2.0.0 +
* [BCM5722D](https://github.com/chris1111/BCM5722D/releases/latest)
  * Principalmente rilevante per i controller Broadcom Ethernet basati su BCM5722
  * Richiede OS X 10.6 o successivi

:::

Inoltre, tieni presente che alcune schede NIC sono effettivamente supportate in modo nativo in macOS:

::: details Controller Ethernet Nativamente Supportati

#### Serie Aquantia

```md
# AppleEthernetAquantiaAqtion.kext
pci1d6a,1    = Aquantia AQC107
pci1d6a,d107 = Aquantia AQC107
pci1d6a,7b1  = Aquantia AQC107
pci1d6a,80b1 = Aquantia AQC107
pci1d6a,87b1 = Aquantia AQC107
pci1d6a,88b1 = Aquantia AQC107
pci1d6a,89b1 = Aquantia AQC107
pci1d6a,91b1 = Aquantia AQC107
pci1d6a,92b1 = Aquantia AQC107
pci1d6a,c0   = Aquantia AQC113
pci1d6a,4c0  = Aquantia AQC113
```

**Nota bene**: A causa di alcuni firmware obsoleti forniti su molti NIC Aquantia, potrebbe essere necessario aggiornare il firmware da Linux/Windows per assicurarsi che sia compatibile con macOS.

#### Serie Intel

```md
# AppleIntel8254XEthernet.kext
pci8086,1096 = Intel 80003ES2LAN
pci8086,100f = Intel 82545EM
pci8086,105e = Intel 82571EB/82571GB

# AppleIntelI210Ethernet.kext
pci8086,1533 = Intel I210
pci8086,15f2 = Intel I225LM (Added in macOS 10.15)

# Intel82574L.kext
pci8086,104b = Intel 82566DC
pci8086,10f6 = Intel 82574L

```

#### Serie Broadcom

```md
# AppleBCM5701Ethernet.kext
pci14e4,1684 = Broadcom BCM5764M
pci14e4,16b0 = Broadcom BCM57761
pci14e4,16b4 = Broadcom BCM57765
pci14e4,1682 = Broadcom BCM57762
pci14e4,1686 = Broadcom BCM57766
```

:::

### USB

* [USBInjectAll](https://bitbucket.org/RehabMan/os-x-usb-inject-all/downloads/RehabMan-USBInjectAll-2018-1108.zip)
  * Utilizzato per iniettare i contreller USB Intel su sistemi senza porte USB definite in ACPI
  * Non dovrebbe essere necessario su Desktop Skylake e versioni più recenti
    * Su AsRock questo kext è invece sempre necessario
    * Si consiglia tuttavia di utilizzare questo kext anche con processori Coffee Lake e laptop meno recenti
  * Non funziona su **nessuna** CPU AMD
  * Necessita di OS X 10.11 o più recenti

* [XHCI-unsupported](https://github.com/RehabMan/OS-X-USB-Inject-All/archive/refs/heads/master.zip)
  * Necessario per i controller USB non nativi
  * CPU basate su sistemi AMD non lo necessitano questo kext
  * Schede madri che solitamente richiedono questo kext:
    * H370
    * B360
    * H310
    * Z390(Non necessario su Mojave e versioni più recenti)
    * X79
    * X99
    * Schede AsRock (Necessario sulle schede madri Intel, non necessario tuttavia sulle schede B460/Z490+)

### WiFi e Bluetooth

#### Intel

* [AirportItlwm](https://github.com/OpenIntelWireless/itlwm/releases/latest)
  * Aggiunge il supporto per un'ampia varietà di schede wireless Intel e funziona in modo nativo nella recovery grazie all'integrazione della famiglia IO80211
  * Richiede macOS 10.13 o più recente e Apple Secure Boot per funzionare correttamente
* [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases/latest)
  * Aggiunge il supporto Bluetooth a macOS se associato a una scheda wireless Intel
  * Richiede MacOs 10.13 o più recenti

::: details Ulteriori informazioni sull'attivazione di AirportItlwm

Per abilitare il supporto di AirportItlwm con OpenCore, dovrai:

* Abilita `Misc -> Security -> SecureBootModel` impostandolo come`Default` o qualche altro valore valido
  * Questo è discusso successivamente più avanti in questa guida ma anche nella guida post-installazione: [Apple Secure Boot](/OpenCore-Post-Install/universal/security/applesecureboot.md)
* Se non puoi abilitare SecureBootModel, puoi comunque forzare l'inserimento di IO80211Family (**Altamente sconsigliato**)
  * Imposta quanto segue in `Kernel -> Force` nel tuo config.plist (discusso più avanti in questa guida):
  
![](./images/ktext-md/force-io80211.png)

:::

#### Broadcom

* [AirportBrcmFixup](https://github.com/acidanthera/AirportBrcmFixup/releases/latest)
  * Utilizzato per patchare schede Broadcom non Apple/non Fenvi, **Non funzionerà su schede Intel, Killer, Realtek, ecc**
  * Richiede OS X 10.10 o versioni più recenti
* [BrcmPatchRAM](https://github.com/acidanthera/BrcmPatchRAM/releases/latest)
  * Utilizzato per caricare il firmware sul chipset Broadcom Bluetooth, richiesto per tutte le schede non Apple/non Fenvi Airport.
  * Da associare a BrcmFirmwareData.kext
    * BrcmPatchRAM3 per 10.15+ ( deve essere asscociato con BrcmBluetoothInjector)
    * BrcmPatchRAM2 per 10.11-10.14
    * BrcmPatchRAM per 10.8-10.10

::: details BrcmPatchRAM ordine di caricamento

L'ordine in `Kernel -> Add` dovrebbe essere:

1. BrcmBluetoothInjector
2. BrcmFirmwareData
3. BrcmPatchRAM3

ProperTree lo gestirà automaticamente, quindi non te ne devi preoccupare

:::

### Kexts specifici per CPU AMD

* [XLNCUSBFIX](https://cdn.discordapp.com/attachments/566705665616117760/566728101292408877/XLNCUSBFix.kext.zip)
  * Fix USB per sistemi AMD FX, non consigliata per Ryzen
  * Richiede macOS 10.13 o versioni più recenti
* [VoodooHDA](https://sourceforge.net/projects/voodoohda/files/latest/download)
  * Audio per sistemi FX e supporto Microfono + Audio sul pannello frontale per i sistemi Ryzen, non usare con AppleALC. La qualità audio è notevolmente peggiore di AppleALC sulle CPU Zen
  * Richiede OS X 10.6 o successivo

### Extra

* [AppleMCEReporterDisabler](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * Utile a partire da Catalina per disabilitare il kext AppleMCEReporter che causerebbe kernel panic su CPU AMD e sistemi dual-socket
  * SMBIOS interessati:
    * MacPro6,1
    * MacPro7,1
    * iMacPro1,1
  * Richiede macOS 10.15 o versioni più recenti
* [CpuTscSync](https://github.com/lvs1974/CpuTscSync/releases/latest)
  * Necessario per la sincronizzazione del TSC su alcune schede madri Intel HEDT e server, senza questo macOS potrebbe essere estremamente lento o non avviabile.
  * **Non funziona su CPU AMD**
  * Richiede OS X 10.8 o versioni più recenti
* [NVMeFix](https://github.com/acidanthera/NVMeFix/releases/latest)
  * Utilizzato per correggere la gestione dell'alimentazione e l'inizializzazione di NVMe non Apple
  * Richiede macOS 10.14 o versioni più recenti
* [SATA-Unsupported](https://github.com/khronokernel/Legacy-Kexts/raw/master/Injectors/Zip/SATA-unsupported.kext.zip)
  * Aggiunge il supporto per un'ampia varietà di controller SATA, principalmente utile per i laptop che hanno problemi nel vedere l'unità SATA in macOS. Si consiglia prima di provare senza questo.
  * Nota per MacOs Big Sur: [CtlnaAHCIPort](https://github.com/dortania/OpenCore-Install-Guide/raw/master/extra-files/CtlnaAHCIPort.kext.zip) dovrà essere utilizzato invece perché numerosi controller sono stati eliminati dal binario stesso
    * Coloro che utilizzano Catalina e versioni precedenti non ne sono coinvolti

::: details Kext SATA per sistemi Legacy

* [AHCIPortInjector](https://github.com/khronokernel/Legacy-Kexts/raw/master/Injectors/Zip/AHCIPortInjector.kext.zip)
  * Iniettore Legacy  SATA/AHCI,  principalmente utile per le macchine più vecchie dell'era Penryn
* [ATAPortInjector](https://github.com/khronokernel/Legacy-Kexts/raw/master/Injectors/Zip/ATAPortInjector.kext.zip)
  * Iniettore Legacy ATA, utile principalmente per i dispositivi IDE e ATA (cioè quando non è presente alcuna opzione AHCI nel BIOS)
  
:::

### Tastiera, mouse e trackpad dei laptop

Per capire che tipo di tastiera e trackpad hai, controlla Gestione dispositivi in Windows o `dmesg | grep -i input` in Linux

::: warning Attenzione

La maggior parte delle tastiere dei laptop sono PS2! Dovresti provare un tentativo con VoodooPS2 anche se hai un trackpad di altre tipologie.

:::

#### Trackpad/Tastiere PS2

* [VoodooPS2](https://github.com/acidanthera/VoodooPS2/releases/latest)
  * Funziona con molti sistemi con tastiere, mouse e trackpad di tipo PS2
  * Richiede almeno macOS 10.11 per le funzioni MT2 (Magic Trackpad 2)
* [RehabMan VoodooPS2](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/RehabMan-Voodoo-2018-1008.zip)
  * Per i sistemi meno recenti con tastiere, mouse e trackpad PS2 o quando non si vuole utilizzare VoodooInput
  * Supporta macOS 10.6 e più recenti

#### Trackpad SMBus

* [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/latest)
  * Per sistemi con dispositivi basati su Synaptics SMBus.
  * Richiede macOS 10.11 o più recenti per le funzioni MT2.
  * Dipende da [VoodooPS2 di Acidanthera](https://github.com/acidanthera/VoodooPS2/releases/latest)
* [VoodooSMBus](https://github.com/VoodooSMBus/VoodooSMBus/releases/latest)
  * Per sistemi con dispositivi basati su ELAN SMBus.
  * Attualmente supporta macOS 10.14 o versioni più recenti.

#### Dispositivi HID I2C/USB

* [VoodooI2C](https://github.com/VoodooI2C/VoodooI2C/releases/latest)
  * Richiede almeno macOS 10.11.
  * Si collega ai controller I2C per permettere ai plugin di collegarsi ai trackpad I2C
  * I dispositivi USB che usano i plugin sottostanti necessitano di VoodooI2C
  * Devi essere accoppiato con uno dei plugin sottostanti:

::: tip Plugin di VoodooI2C

| Tipo di connessione | Plugin | Note |
| :--- | :--- | :--- |
| Multitouch HID | VoodooI2CHID | Utilizzabile con i Touchscreen e Trackpad I2C/USB |
| ELAN Proprietary | VoodooI2CElan | ELAN1200+ invece richiede VoodooI2CHID |
| FTE1001 touchpad | VoodooI2CFTE | |
| Atmel Multitouch Protocol | VoodooI2CAtmelMXT | |
| Synaptics HID | [VoodooRMI](https://github.com/VoodooSMBus/VoodooRMI/releases/) | I2C Synaptic Trackpads (Richiede VoodooI2C solo per la modalità I2C) |
| Alps HID | [AlpsHID](https://github.com/blankmac/AlpsHID/releases) | Utilizzabile con trackpad Alps USB o I2C. Visibile maggiormente nei laptop Dell e in alcuni HP EliteBook. |

:::

#### Kext misti per Laptop

* [ECEnabler](https://github.com/1Revenger1/ECEnabler/releases/latest)
  * Risolve le letture della batteria in molti dispositivi (Permette le letture dei field EC lunghi 8 bit)
* [BrightnessKeys](https://github.com/acidanthera/BrightnessKeys/releases/latest)
  * Risolve i tasti di luminosità automaticamente

Fare riferimento a [Kexts.md](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Kexts.md) per un elenco completo dei kext supportati

## SSDT

Quando vedi tutti quegli SSDT nella cartella AcpiSamples ti potresti chiedere se ne hai bisogno. Esamineremo gli SSDT di cui hai bisogno nella guida [Iniziamo con ACPI](/Getting-Started-With-ACPI/), la quale ha una sezione estesa sugli SSDT inclusa la loro compilazione sulle diverse piattaforme.

:::tip Note

Una volta che hai recuperato i SSDT devi solo aggiungerli ad OpenCore.

* Devi posizionarli in due sezioni:
  * EFI/OC/ACPI (Solo file .aml, ricordati di compilare i tuoi SSDT)
  * config.plist -> ACPI -> Add

* Ricordati di non aggiungere il tuo DSDT.aml alla EFI

:::details Per gli utenti di FixHPET
Dovrete unire al config.plist le patch del file oc_patches.plist:

* Apri entrambi i file
* Cancella la sezione `ACPI -> Patch` dal config.plist
* Copia la sezione `ACPI -> Patch` dal oc_patches.plist
* Incolla le patch nella sezione `ACPI -> Patch` nel config.plist
:::
<!--Un rapido chiarimento degli SSDT necessari (questo è il codice sorgente, dovrai compilarli in un file .aml):

### Desktop

| Piattaforme | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** |
| :-------: | :-----: | :----: | :------: | :-------: | :-----: |
| Penryn | Nessuno | [SSDT-EC](/Getting-Started-With-ACPI/Universal/ec-fix.md) | Nessuno | Nessuno | Nessuno |
| Lynnfield and Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ |
| SandyBridge | [CPU-PM](/OpenCore-Post-Install/universal/pm.md#sandy-and-ivy-bridge-power-management) (Da fare nel post-installazione) | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](/Getting-Started-With-ACPI/Universal/plug.md) | ^^ | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](/Getting-Started-With-ACPI/Universal/ec-fix.md) | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](/Getting-Started-With-ACPI/Universal/awac.md) | [SSDT-PMC](/Getting-Started-With-ACPI/Universal/nvram.md) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | Nessuno | [SSDT-RHUB](/Getting-Started-With-ACPI/Universal/rhub.md) |
| AMD (15/16h) | Nessuno | ^^ | Nessuno | ^^ | Nessuno |
| AMD (17/19h) | [SSDT-CPUR for B550 and A520](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ |

### Desktop di fascia alta

| Piattaforme | **CPU** | **EC** | **RTC** | **PCI** |
| :-------: | :-----: | :----: | :-----: | :-----: |
| Nehalem and Westmere | Nessuno | [SSDT-EC](/Getting-Started-With-ACPI/Universal/ec-fix.md) | Nessuno | Nessuno |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](/Getting-Started-With-ACPI/Universal/unc0) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG](/Getting-Started-With-ACPI/Universal/plug.md) | [SSDT-EC-USBX](/Getting-Started-With-ACPI/Universal/ec-fix.md) | [SSDT-RTC0-RANGE](/Getting-Started-With-ACPI/Universal/awac.md) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | Nessuno |

### Laptop

| Piattaforme | **CPU** | **EC** | **Backlight** | **I2C Trackpad** | **AWAC** | **USB** | **IRQ** |
| :-------: | :-----: | :----: | :-----------: | :--------------: | :------: | :-----: | :-----: |
| Clarksfield and Arrandale | Nessuno | [SSDT-EC](/Getting-Started-With-ACPI/Universal/ec-fix.md) | [SSDT-PNLF](/Getting-Started-With-ACPI/Laptops/backlight.md) | Nessuno | Nessuno | Nessuno | [IRQ SSDT](/Getting-Started-With-ACPI/Universal/irq.md) |
| SandyBridge | [CPU-PM](/OpenCore-Post-Install/universal/pm.md#sandy-and-ivy-bridge-power-management) (Da fare nel post-install) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](/Getting-Started-With-ACPI/Universal/plug.md) | ^^ | ^^ | [SSDT-GPI0](/Getting-Started-With-ACPI/Laptops/trackpad.md) | ^^ | ^^ | ^^ |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX](/Getting-Started-With-ACPI/Universal/ec-fix.md) | ^^ | ^^ | ^^ | ^^ | Nessuno |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake (8th Gen) and Whiskey Lake | ^^ | ^^ | ^^ | ^^ | [SSDT-AWAC](/Getting-Started-With-ACPI/Universal/awac.md) | ^^ | ^^ |
| Coffee Lake (9° Gen) | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](/Getting-Started-With-ACPI/Universal/rhub.md) | ^^ |

Continuando:

| Piattaforme | **NVRAM** | **IMEI** |
| :-------: | :-------: | :------: |
|  Clarksfield and Arrandale | Nessuno | Nessuno |
| Sandy Bridge | ^^| [SSDT-IMEI](/Getting-Started-With-ACPI/Universal/imei.md) |
| Ivy Bridge | ^^ | ^^ |
| Haswell | ^^ | Nessuno |
| Broadwell | ^^ | ^^ |
| Skylake | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ |
| Coffee Lake (8th Gen) and Whiskey Lake | ^^ | ^^ |
| Coffee Lake (9th Gen) | [SSDT-PMC](/Getting-Started-With-ACPI/Universal/nvram.md) | ^^ |
| Comet Lake | Nessuno | ^^ |
| Ice Lake | ^^ | ^^ |
-->
