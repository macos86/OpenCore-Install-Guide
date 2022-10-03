---
next: macos-limits.md
---

# OpenCore: funzionalità e differenze da Clover

Questa sezione contiene un briefing riguardo al perché la comunità si sta trasferendo su OpenCore, e di smentire alcuni miti comuni nella comunità. Quelli che vogliono solo una macchina con macOS, possono saltare questa pagina.

[[toc]]

## Funzionalità di OpenCore

* Supporto di più sistemi!
  * OpenCore ora supporta nativamente più versioni di OS X e macOS senza penosi hack alla Clover o alla Chameleon da implementare
  * Questo include sistemi fino alla 10.4, Tiger, e fino all'ultima compilazione della 13, Ventura!
* Nella media, i sistemi con OpenCore avviano più veloci rispetto a Clover, dato che vengono fatte meno patch
* In generale più stabilità dato che le patch sono più precise:
  * [macOS 10.15.4 update (EN)](https://www.reddit.com/r/hackintosh/comments/fo9bfv/macos_10154_update/)
  * Le patch AMD OSX non hanno bisogno di aggiornarsi nei piccoli aggiornamenti di sicurezza
* Più sicurezza in molte forme:
  * Non necessario di disabilitare il System Integrity Protection (SIP)
  * Il supporto per FileVault 2 integrato
  * [Vault](/OpenCore-Post-Install/universal/security.md#Vault), che permette di creare delle immagini della EFI per evitare modifiche non volute
  * Vero supporto al secure-boot
    * Sia UEFI che Apple
* Cambio dal BootCamp e selezione del dispositivo da una lettura delle variabili NVRAM impostate dal Disco di Avvio, come un vero Mac.
* Supporto delle combinazioni di avvio del `boot.efi` - tenere `Option` o `ESC` all'avvio per scegliere il dispositivo di avvio, `Cmd+R` per entrare in Recovery o `Cmd+Opt+P+R` per fare un reset NVRAM.

## Supporto dei programmi

La più grande ragione è che qualcuno che sta confrontando OpenCore con altri, è il supporto di molti programmi:

* I kext non più testati su Clover:
  * Hai un bug con un kext? Molti sviluppatori inclusa l'organizzazione [Acidanthera](https://github.com/acidanthera) (fautrice di tutti i tuoi kext preferiti) non provvederà supporto se non usi OpenCore
* Molti driver del firmware sono stati integrati in OpenCore:
  * [Supporto APFS](https://github.com/acidanthera/AppleSupportPkg)
  * [Supporto FileVault](https://github.com/acidanthera/AppleSupportPkg)
  * [Patch del Firmware](https://github.com/acidanthera/AptioFixPkg)

## Brevi obiettivi di OpenCore

La maggior parte delle funzionalità di Clover attualmente sono supportate in OpenCore in qualche tipo di quirk, tuttavia mentre transizioni dovresti stare attento alle funzionalità che sono mancanti da OpenCore o che vorresti avere:

* Non supporta l'avvio dei sistemi basati su MBR
  * Per usarlo ci si appoggia a rEFInd
* Non supporta i patch dei VBIOS basati su UEFI
  * Questo tuttavia è supportato su macOS
* Non supporta l'iniezione automatica dei DeviceProperty per le GPU vecchie
  * come InjectIntel, InjectNvidia o InjectAti
  * Tuttavia può essere fatto manualmente: [GPU patching](/OpenCore-Post-Install/gpu-patching/)
* Non supporta il patch dei conflitti IRQ
  * Risolvibile con [SSDTTime](https://github.com/corpnewt/SSDTTime)
* Non supporta gli attributi P e C nelle CPU più vecchie
* Non supporta l'iniezione dell'Hardware UUID
* Non supporta molte patch XCPM di Clover per architetture come Ivy Bridge
* Non supporta il nascondere specifici dischi
* Non supporta cambiare le impostazioni dal menù di OpenCore
* Non supporta le patch del valore PCIRoot UID
* Non supporta patch degli ACPI solo per macOS

## Miti comuni

### OpenCore non è stabile perché è una beta?

Risposta breve: No

Risposta lunga: No

Il numero che accompagna OpenCore non rappresenta la qualità del progetto. Infatti, è più difficile visualizzare i punti chiave del progetto. Acidanthera continua, come piace a noi, ad aggiungere rifinimenti e nuove funzionalità.

Ad esempio, OpenCore passa attraverso adeguati controlli di sicurezza per assicurarsi che sia conforme a UEFI Secure Boot ed è l'unico bootloader di Hackintosh a sottoporsi a queste rigorose revisioni e ad avere tale supporto.

La versione 0.6.1 è stata originariamente pensata per essere la prima versione ufficiale di OpenCore dato che ha proprio aggiunto UEFI/Apple Secure Boot, e sarebbe stato l'anno in cui OpenCore avrebbe festeggiato il primo rilascio come tool pubblico. Tuttavia, a causa di alcune circostanze legate a macOS Big Sur e la riscrittura del prelinker di OpenCore per supportarlo, è stato deciso di attendere un'altro anno per applicare la 1.0.0.

Il piano corrente:

* 2019: Anno della Beta
* 2020: Anno del Secure Boot
* 2021: Anno dei ritocchi Refinement

Quindi, per favore, non vedere il numero di versione come un ostacolo, piuttosto come qualcosa su cui riflettere.

### OpenCore inietta sempre il SMBIOS e i dati ACPI negli altri sistemi?

Di default, OpenCore assumerà che tutti i sistemi dovrebbero essere trattati in maniera uniforme rispetto agli ACPI e alle informazioni SMBIOS. La ragione per questo pensiero consiste in tre parti:

* Questo permette per un corretto supporto al multiboot, come con [BootCamp](/OpenCore-Post-Install/multiboot/bootcamp.html)
* Evitare i DSDT scarsi e incoraggiare le pratiche ACPI corrette
* Evitare casi limite quando le informazioni sono iniettate diverse volte, comunemente successo con Clover
  * Per esempio, come inietteresti i dati SMBIOS e ACPI una volta avviato boot.efi, ma dopo rischidando di essere buttato fuori? Le modifiche sono già nella memoria, rimuoverle può essere pericoloso. Questo è perché Clover è sconsigliato.

Tuttavia, ci sono quirk in OpenCore che permettono di inettare il SMBIOS solo per macOS modificando da dove macOS legge le informazioni SMBIOS. Il quirk `CustomSMIOSGuid` con `CustomSMBIOSMode` impostato su `Custom` può causare break a lungo andare e perciò raccomandiamo questa opzione solo nel caso che certi sistemi non supportino il SMBIOS di macOS. Per maggiore stabilità, disabilita quei quirk.

### OpenCore richiede un'installazione pulita?

Nel caso in cui tu non abbia una installazione "Vanilla" – che si riferisce al lasciare il sistema immutato, senza installare strumenti/kext di terze parti nel volume di sistema o altre modifiche non supportate da Apple. Quando il tuo sistema viene pesantemente modificato, anche con utility di terze parti come Hackintool, raccomandiamo una installazione pulita per evitare potenziali errori.

Nota speciale per gli utenti Clover: per favore esegui un reset NVRAM quando installi OpenCore. Molte variabili di Clover possono entrare in conflitto con OpenCore o macOS.

* Nota: I laptop Thinkpad sono famosi per essere semi-bricked dopo un reset NVRAM da OpenCore, raccomandiamo di aggiornare il BIOS in queste macchine, che prevede nel mezzo anche un NVRAM reset.

### OpenCore supporta solo alcune versioni di macOS?

Da OpenCore 0.6.2, puoi avviare ogni versione Intel di macOS tornando indietro fino a OS X 10.4! Un supporto completo dipende dal tuo hardware, perciò verificalo da solo: [Limitazioni Hardware](macos-limits.md)

::: details Galleria Installazioni macOS

Acidanthera ha provato molte versione, e io stesso ho avviato molte versioni di OS X nel mio vecchio HP DC 7900 (Core2 Quad Q8300). Qua c'è una piccola galleria di cosa ho testato:

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.4-Tiger.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.5-Leopard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.6-Snow-Loepard.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.7-Lion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.8-MountainLion.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.9-Mavericks.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.10-Yosemite.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.12-Sierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.13-HighSierra.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/10.15-Catalina.png)

![](./images/installer-guide/legacy-mac-install-md/dumpster/11-Big-Sur.png)

:::

### OpenCore supporta hardware più vecchi?

Ora come ora, la maggior parte degli hardware Intel è supportata dato che il sistema operativo stesso li supporta! Tuttavia per favore guarda la sezione [Limitazioni Hardware](macos-limits.md) per maggiori informazioni su quale hardware è supportato in quale versione di OS X/macOS.

Correntemente, le serie Intel Yonah o più recenti sono stati testati correttamente con OpenCore.

### OpenCore supporta l'avvio di Linux e Windows?

OpenCore riconoscerà automaticamente Windows senza nessuna configurazione. Da OpenCore 0.7.3, OpenLinuxBoot è stato aggiunto ad OpenCore come driver EFI, il quale tenterà di aggiungere in maniera automatica le partizioni Linux. Richiede anche `[ext4_x64.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/ext4_x64.efi)` o `[btrfs_x64.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/btrfs_x64.efi)`, a seconda del file system utilizzato dalla tua distro. Per ogni sistema con bootloader con nomi o percorsi irregolari, puoi semplicemente aggiungerlo nella sezione BlessOverride.

### Legalità dell'Hackintoshing

Mentre l'argomento hackintoshing respira aria grigia dal punto di vista legale, molti notano che questo allo stesso tempo non è illegale perché non stiamo infrangendo l'EULA. Le ragioni per cui non è illegale:

* Scarichiamo macOS dai [server Apple direttamente](https://github.com/acidanthera/OpenCorePkg/blob/0.6.9/Utilities/macrecovery/macrecovery.py#L125)
* Lo facciamo in qualità di organizzazione non-profit per uso personale e informativo
  * Chi pianifica di usare il proprio Hackintosh per lavoro o vuole rivenderli dovrebbero riferirsi al [caso Psystar](https://en.wikipedia.org/wiki/Psystar_Corporation) e alle loro leggi regionali

Mentre l'EULA dichiara che macOS dovrebbe essere installato solo in Mac reali o macchine virtuali usate su veri Mac ([sections 2B-i and 2B-iii](https://www.apple.com/legal/sla/docs/macOSBigSur.pdf)), tuttavia non ci sono leggi che non te lo permettono chiaramente. Tuttavia, i siti che reimpacchettano o modificano gli installer di macOS potrebbero potenzialmente rischiare di [DMCA takedowns](https://it.wikipedia.org/wiki/Digital_Millennium_Copyright_Act) e simili.

* **Nota**: Questo non è un suggerimento legale, perciò fai le tue considerazioni da solo e discutendo col tuo avvocato se hai qualsiasi dubbio.

### macOS supporta le GPU Nvdia?

A causa di un problema riguardo al supporto NVIDIA nelle nuove versioni di macOS, molti utenti hanno preso la notizia come se macOS non supporta e non supporterà mai le GPU NVIDIA. Apple supported Macs with NVIDIA GPUs (such as the 2013 MacBook Pro with a Kepler dGPU) until the release of Monterey Beta 7. While there are community-made patches to bring back support, they require SIP (System Integrity Protection) to be disabled, disabling important security features in macOS.

Questo problema è con ogni GPU NVIDIA più nuova, dato che Apple ha smesso di vendere macchine con queste GPU e non avranno presto nessun supporto ufficiale da Apple. Invece, gli utenti hanno bisogno di affidarsi a driver di terze parti di NVIDIA. A causa del Secure Boot introdotto da poco, non potevano più supportare questi Web Drivers e NVIDIA non poteva più pubblicarli per piattaforme più nuove, limitandosi a macOS 10.13, High Sierra.

Per maggiori informazioni riguardo al supporto del sistema operativo, vedi qui: [GPU Buyers Guide (EN)](https://dortania.github.io/GPU-Buyers-Guide/)
