# Laptop Ivy Bridge

| Supporto | Versione |
| :--- | :--- |
| Supporto di macOS iniziale | OS X 10.7, Lion |
| Nota 1 | Le iGPU Ivy Bridge sono supportate fino a macOS 11 |

## Punto d'Inizio

Fare un config.plist potrebbe sembrare difficile, ma non lo è. Ci metterai solo un po' di tempo ma questa guida ti dice come configurare il tutto, non rimarrai a bocca asciutta. Questo significa anche che se hai problemi, rivedi come hai impostato il config per essere sicuro che siano corrette. Le cose principali da definire con OpenCore:

* **Tutte le proprietà devono essere definite**, non c'è un fallback di default, perciò **non cancellare sezioni a meno che non ti sia esplicitamente richiesto**. Se la guida non parla di quella sezione, lascia come il predefinito.
* **Il Sample.plist non può essere usato così com'è**, devi configurarlo per il tuo sistema
* **NON USARE CONFIGURATORI**, questi raramente rispettano la configurazione di OpenCore e alcuni di quelli come Mackie aggiungeranno proprietà di Clover o potrebbero corrompere il plist!

Ora che hai letto questo, un piccolo reminder degli strumenti necessari

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * Plist editor universale
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * Per geneare i dati del nostro SMBIOS
* [Sample/config.plist](https://github.com/acidanthera/OpenCorePkg/releases)
  * Vedi la sezione precedente per capire come ottenerlo: [Setup del config.plist](/)

**E leggi questa guida una volta prima di impostare OpenCore e sii sicuro di aver impostato tutto correttamente. Nota che le immagini non potranno essere sempre aggiornatissime, perciò leggi le didascalie sotto, se nulla viene menzionato, lascia com'è di default.**

## ACPI

![ACPI](../../images/config/config-laptop.plist/ivy-bridge/acpi.png)

### Add

::: tip Informazioni

Qui aggiungerai i tuoi SSDT al sistema, sono molto importanti per **avviare macOS** e hanno molti usi come [USB maps (EN)](/OpenCore-Post-Install/usb/), [disabilitare GPU non supportate](/extras/spoof.md) e altro. E con il nostro sistema, **è soprattutto richiesto per l'avvio**. Guide per farli può essere trovata qui: **[Iniziamo con ACPI](/Getting-Started-With-ACPI/)**

Nota che **non dovresti** aggiungere `DSDT.aml` qui, è aggiunto già dal tuo firmware. Perciò se presente, toglilo dal tuo `config.plist` e da EFI/OC/ACPI.

Gli SSDT hanno l'estensione **.aml** (Assembled) e andranno dentro la cartella `EFI/OC/ACPI` e **devono** essere specificati nel config anche nella sezione `ACPI -> Add`.

| SSDT Richiesti | Descrizione |
| :--- | :--- |
| **SSDT-PM** | Necessario per un power management della CPU, dovrai usare lo script ssdtPRGen.sh di Pike per generarlo. Questo sarà da fare nel [post-install (EN)](/OpenCore-Post-Install/). |
| **SSDT-EC** | Sistema il controller integrato. |
| **SSDT-XOSI** | Fa funzionare la specifica _OSI di Windows anche per l'identificatore di macOS (Darwin). Aiuta ad abilitare funzionalità come XHCI e altro. |
| **SSDT-PNLF** | Sistema il controllo della luminosità. Nota che i NUC Intel non gli serve questo |
| **SSDT-IMEI** | Necessario per aggiungere il dispositivo IMEI mancante sulle CPU Sandy Bridge con le schede madri di 7^ generazione |

:::

### Delete

::: tip Informazioni

Questa sezione previene il caricamento di certe tabelle ACPI ed è molto importante in questo caso. La ragione principale per cui XCPM di Apple non supporta nessun SandyBridge e causerà panic su AppleIntelCPUPowerManagement all'avvio. Per evitarli dobbiamo fare il nostro PM SSDT nel [Post-Install (EN)](/OpenCore-Post-Install/) e lasciare le vecchie tabelle (Nota che è solo temporaneo fino a prima di fare il nostro SSDT-PM, lo riabiliteremo più tardi):

Rimuovere CpuPm:

| Chiave | Tipo | Valore |
| :--- | :--- | :--- |
| All | Boolean | YES |
| Comment | String | Delete CpuPm |
| Enabled | Boolean | YES |
| OemTableId | Data | `437075506d000000` |
| TableLength | Number | 0 |
| TableSignature | Data | `53534454` |

Rimuovere Cpu0Ist:

| Chiave | Tipo | Valore |
| :--- | :--- | :--- |
| All | Boolean | YES |
| Comment | String | Delete Cpu0Ist |
| Enabled | Boolean | YES |
| OemTableId | Data | `4370753049737400` |
| TableLength | Number | 0 |
| TableSignature | Data | `53534454` |

:::

### Patch

::: tip Informazioni

Questa sezione ci permette di modificare dinamicamente le parti di ACPI (DSDT, SSDT, ecc.) tramite OpenCore. Per noi, serviranno i seguenti:

* OSI rename
  * Questo è richiesto quando usi SSDT-XOSI dato che possiamo richiamare tutte le chiamate OSI a questo SSDT

| Comment | String | Change _OSI to XOSI |
| :--- | :--- | :--- |
| Enabled | Boolean | YES |
| Count | Number | 0 |
| Limit | Number | 0 |
| Find | Data | `5f4f5349` |
| Replace | Data | `584f5349` |

:::

### Quirks

Impostazioni relative a ACPI, lascia tutto come default dato che non useremo questi quirk.

## Booter

![Booter](../../images/config/config-universal/aptio-iv-booter.png)

Questa sezione è dedicata ai Quirks relativi al patching boot.efi con OpenRuntime, il sostituto di AptioMemoryFix.efi

### MmioWhitelist

Questa sezione consente il passaggio dei dispositivi a macOS che vengono generalmente ignorati, utile quando appaiata con `DevirtualiseMmio`

### Quirks

::: tip Info
Le impostazioni relative alle patch boot.efi e alle correzioni del firmware, per noi, lo lasciamo come predefinito
:::
::: details Informazioni più approfondite

* **AvoidRuntimeDefrag**: YES
  * Risolve i servizi di runtime UEFI come data, ora, NVRAM, controllo dell'alimentazione, ecc.
* **EnableSafeModeSlide**: YES
  * Abilita le variabili di diapositiva da utilizzare in modalità provvisoria.
* **EnableWriteUnprotector**: YES
  * Necessario per rimuovere la protezione da scrittura dal registro CR0.
* **ProvideCustomSlide**: YES
  * Utilizzato per il calcolo della variabile Slide. Tuttavia la necessità di questa stranezza è determinata dal messaggio `OCABC: Only N/256 slide values are usable!` Nel registro di debug. Se il messaggio `OCABC: All slides are usable! You can disable ProvideCustomSlide!` è presente nel tuo registro, puoi disabilitare `ProvideCustomSlide`.
* **SetupVirtualMap**: YES
  * Risolve le chiamate SetVirtualAddresses agli indirizzi virtuali, richiesto dalle schede Gigabyte per risolvere i primi kernel panic.

:::

## DeviceProperties

![DeviceProperties](../../images/config/config-laptop.plist/haswell/DeviceProperties.png)

### Add

Imposta le proprietà del dispositivo da una mappa.

::: tip PciRoot(0x0)/Pci(0x2,0x0)

Questa sezione è configurata tramite la [Framebuffer Patching Guide](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) di WhateverGreen e viene utilizzata per impostare importanti proprietà iGPU.

Quando si configura la iGPU, la tabella seguente dovrebbe aiutare a trovare i valori giusti da impostare. Ecco una spiegazione di alcuni valori:

* **AAPL,ig-platform-id**
  * Viene utilizzato internamente per configurare iGPU
* **Type**
  * Se la voce è consigliata per laptop (ad es. Con display integrati) o per Intel NUC (ad es. Box indipendenti)

In genere, segui questi passaggi durante la configurazione delle proprietà iGPU. Segui le note di configurazione sotto la tabella se dicono qualcosa di diverso:

1. Quando configuri inizialmente il tuo config.plist, imposta solo `AAPL,ig-platform-id` - questo è normalmente sufficiente
2. Se si avvia e non si ottiene l'accelerazione grafica (7 MB di VRAM e sfondo a tinta unita per il dock), è probabile che sia necessario provare diversi valori di `AAPL,ig-platform-id`, aggiungere le patch stolenmem o persino aggiungere un `device-id`.

| AAPL,ig-platform-id | Type | Comment |
| ------------------- | ---- | ------- |
| **`03006601`** | Laptop | Usato di solito con **1366 by 768** displays or lower |
| **`04006601`** | Laptop | Usato di solito con **1600 by 900** displays or higher, see below for addition patches |
| **`09006601`** | Laptop | Usato di solito con alcuni dispositivi che hanno monitor collegato `eDP` (contrariamente al classico LVDS), deve essere testato prima con **`03006601`** e **`04006601`** prima di provare questo. |
| **`0b006601`** | NUC | Usato di solito Intel NUCs |

#### Note sulla configurazione

* VGA *non* è supportato (a meno che non sia in esecuzione tramite un adattatore interno da DP a VGA, che apparentemente solo i dispositivi rari lo vedranno come DP e non VGA, è tutta una questione di fortuna.)

* Se stai usando `04006601` come ig-platform-id, potresti dover aggiungere i seguenti parametri per correggere gli output esterni, altrimenti avrai solo un output. (Credito a Rehabman)

| Key | Type | Value | Explanation |
| :--- | :--- | :--- | :--- |
| `framebuffer-patch-enable` | Number | `1` | *enabling the semantic patches in principle* (from the WhateverGreen manual) |
| `framebuffer-memorycount` | Number | `2` | Matching FBMemoryCount to the one on `03006601` (1 on `04` vs 2 on `03`) |
| `framebuffer-pipecount` | Number | `2` | Matching PipeCount to the one on `03006601` (3 on `04` vs 2 on `03`) |
| `framebuffer-portcount` | Number | `4` | Matching PortCount to the one on `03006601` (1 on `04` vs 4 on `03`) |
| `framebuffer-stolenmem` | Data   | `00000004` | Matching STOLEN memory to 64MB (0x04000000 from hex to base 10 in Bytes) to the one on `03006601`<br />Check [here](https://www.tonymacx86.com/threads/guide-alternative-to-the-minstolensize-patch-with-32mb-dvmt-prealloc.221506/) for more information. |
| `framebuffer-con1-enable` | Number | `1` | Ciò consentirà l'applicazione di patch su *connector1* del driver. (Che è il secondo connettore dopo con0, che è quello eDP/LVDS one) |
| `framebuffer-con1-alldata` | Data | `02050000 00040000 07040000 03040000 00040000 81000000 04060000 00040000 81000000` | Quando si usa `all data` con un connector, o fornisci tutte le informazioni di questo connector (port-bused-type-flag) o quella porta e quelle che la seguono, come in questo caso.<br />In questo caso, le porte in `04` sono limitate a `1`:<br />`05030000 02000000 30020000` (che corrisponde alla porta 5, che è LVDS)<br />Tuttavia su `03` ci sono 3 porte extra:<br />`05030000 02000000 30000000` (LVDS, con0, like `04`)<br/>`02050000 00040000 07040000` (DP, con1)<br/>`03040000 00040000 81000000` (DP, con2)<br/>`04060000 00040000 81000000` (DP, con3)<br />Dato che abbiamo cambiato il numero di PortCount in `4` in una piattaforma che ne ha solo 1, significa che dobbiamo definire gli altri 3 (e noi che iniziamo con con1 fino alla fine).<br /> |

:::

::: tip PciRoot(0x0)/Pci(0x16,0x0)

**Sandy/IvyBridge Hybrids:**

Alcuni laptop di quest'epoca erano dotati di una configurazione di chipset mista, utilizzando CPU Ivy Bridge con chipset Sandy Bridge che crea problemi con macOS poiché si aspetta un certo ID [IMEI](https://en.wikipedia.org/wiki/Intel_Management_Engine) che non trova e si blocca all'avvio (poiché i driver iGPU di Apple richiedono un [dispositivo IMEI](https://en.wikipedia.org/wiki/Intel_Management_Engine)), per risolvere questo problema dobbiamo falsificare gli ID dell'IMEI in questi modelli

* Per sapere se sei interessato, controlla se la tua CPU è un Intel Core ix-3xxx e il tuo chipset è Hx6x (ad esempio un laptop con HM65 o HM67 con Core i3-3110M) tramite strumenti come AIDA64.
* Nella tua configurazione aggiungi un nuovo dispositivo PciRoot denominato `PciRoot(0x0)/Pci(0x16,0x0)`

| Key | Type | Value |
| :--- | :--- | :--- |
| device-id | Data | 3A1E0000 |

:::

::: tip PciRoot(0x0)/Pci(0x1b,0x0)

`layout-id`

* Applica l'iniezione audio AppleALC, dovrai fare la tua ricerca su quale codec ha la tua scheda madre e abbinarlo al layout di AppleALC. [AppleALC Supported Codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs).
* You can delete this property outright as it's unused for us at this time

* Puoi eliminare completamente questa proprietà poiché al momento non è utilizzata per noi

Per noi, useremo invece il boot-arg `alcid = xxx` per ottenere questo risultato. `alcid` sovrascriverà tutti gli altri ID di layout presenti. Maggiori informazioni su questo sono trattate nella [Post-Install Page](/OpenCore-Post-Install/)

:::

### Delete

Rimuove le proprietà del dispositivo dalla mappa, per noi possiamo ignorarlo

## Kernel

![Kernel](../../images/config/config-universal/kernel-modern-XCPM.png)

### Add

Qui è dove specifichiamo quali kext caricare, in quale ordine specifico caricare e per quali architetture è destinato ciascun kext. Per impostazione predefinita, si consiglia di lasciare ciò che ha fatto ProperTree, tuttavia per le CPU a 32 bit, vedere di seguito:

::: details Informazioni più approfondite

La cosa principale che devi tenere a mente è:

* Ordine di caricamento
  * Ricorda che qualsiasi plugin dovrebbe essere caricato *dopo* le sue dipendenze
  * Ciò significa che kext come Lilu **devono** venire prima di VirtualSMC, AppleALC, WhateverGreen, ecc.

A reminder that [ProperTree](https://github.com/corpnewt/ProperTree) users can run **Cmd/Ctrl + Shift + R** to add all their kexts in the correct order without manually typing each kext out.

* **Arch**
  * Architetture supportate da questo kext
  * I valori attualmente supportati sono `Any`, `i386` (32-bit), e `x86_64` (64-bit)
* **BundlePath**
  * Nome del kext
  * es: `Lilu.kext`
* **Enabled**
  * Autoesplicativo, abilita o disabilita kext
* **ExecutablePath**
  * Il percorso dell'eseguibile effettivo è nascosto all'interno di kext, puoi vedere quale percorso ha il tuo kext facendo clic con il pulsante destro del mouse e selezionando `Show Package Contents`. Generalmente sarà `Contents/MacOS/Kext` ma alcuni hanno kext nascosti nella cartella `Plugin`. Nota che i kexto con il solo plist non hanno bisogno di questo campo.
  * es: `Contents/MacOS/Lilu`
* **MinKernel**
  * la versione del kernel più bassa in cui verrà iniettato kext, vedere la tabella sotto per i valori possibili
  * es. `12.00.00` for OS X 10.8
* **MaxKernel**
  * La versione più alta del kernel in cui verrà iniettato il tuo kext, vedi la tabella sotto per i possibili valori
  * es. `11.99.99` for OS X 10.7
* **PlistPath**
  * Percorso a `info.plist` nascosto all'interno di kext
  * es: `Contents/Info.plist`

::: details Tabella di supporto del kernel

| OS X Version | MinKernel | MaxKernel |
| :--- | :--- | :--- |
| 10.4 | 8.0.0 | 8.99.99 |
| 10.5 | 9.0.0 | 9.99.99 |
| 10.6 | 10.0.0 | 10.99.99 |
| 10.7 | 11.0.0 | 11.99.99 |
| 10.8 | 12.0.0 | 12.99.99 |
| 10.9 | 13.0.0 | 13.99.99 |
| 10.10 | 14.0.0 | 14.99.99 |
| 10.11 | 15.0.0 | 15.99.99 |
| 10.12 | 16.0.0 | 16.99.99 |
| 10.13 | 17.0.0 | 17.99.99 |
| 10.14 | 18.0.0 | 18.99.99 |
| 10.15 | 19.0.0 | 19.99.99 |
| 11 | 20.0.0 | 20.99.99 |
| 12 | 21.0.0 | 21.99.99 |
| 13 | 22.0.0 | 22.99.99 |
:::

### Emulate

Necessario per lo spoofing di CPU non supportate come Pentium e Celeron

* **CpuidMask**: Lascia questo vuoto
* **CpuidData**: Lascia questo vuoto

### Force

Utilizzato per caricare kext dal volume di sistema, rilevante solo per i sistemi operativi più vecchi in cui alcuni kext non sono presenti nella cache (es. IONetworkingFamily nella 10.6).

Noi lo possiamo ignorare.

### Block

Blocca il caricamento di determinati kext. Non rilevante per noi.

### Patch

Corregge sia il kernel che kexts.

### Quirks

::: tip Info

Impostazioni relative al kernel, noi abiliteremo quanto segue:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| AppleXcpmCfgLock | YES | Non necessario se `CFG-Lock` è disabilitato nel BIOS |
| DisableIoMapper | YES | Non necessario se `VT-D` è disabilitato nel BIOS |
| LapicKernelPanic | NO | Le macchine HP richiederanno questo quirk |
| PanicNoKextDump | YES | |
| PowerTimeoutKernelPanic | YES | |
| XhciPortLimit | YES | |

:::

::: details Informazioni più approfondite

* **AppleCpuPmCfgLock**: NO
  * Necessario solo quando CFG-Lock non può essere disabilitato nel BIOS
  * Applicabile solo per Ivy Bridge e versioni precedenti
    * Nota: Broadwell e versioni precedenti richiedono questo quando si esegue 10.10 o versioni precedenti
* **AppleXcpmCfgLock**: YES
  * Necessario solo quando CFG-Lock non può essere disabilitato nel BIOS
  * Applicabile solo per Haswell e versioni successive
    * Nota: anche Ivy Bridge-E è incluso poiché supporta XCPM
* **CustomSMBIOSGuid**: NO
  * Esegue la patch GUID per UpdateSMBIOSMode impostato su `Custom`. Solitamente rilevante per i laptop Dell
  * L'abilitazione di questo Quirk con la modalità UpdateSMBIOSMode Custom può anche disabilitare l'iniezione di SMBIOS in sistemi operativi "non Apple", tuttavia non approviamo questo metodo poiché interrompe la compatibilità con Bootcamp. Utilizzare a proprio rischio
* **DisableIoMapper**: YES
  * Necessario per aggirare VT-D se non è possibile disabilitare nel BIOS o necessario per altri sistemi operativi, un'alternativa molto migliore a `dart = 0` poiché SIP può rimanere attivo in Catalina
* **DisableLinkeditJettison**: YES
  * Permette a Lilu e ad altri di avere prestazioni più affidabili senza `keepyms = 1`
* **DisableRtcChecksum**: NO
  * Impedisce ad AppleRTC di scrivere nel checksum principale (0x58-0x59), richiesto per gli utenti che ricevono il ripristino del BIOS o vengono inviati in modalità provvisoria dopo il riavvio/spegnimento
* **ExtendBTFeatureFlags** NO
  * Utile per chi ha problemi di continuità con schede non Apple/non Fenvi
* **LapicKernelPanic**: NO
  * Disabilita il kernel panic su AP core lapic interrupt, generalmente necessario per i sistemi HP. L'equivalente in Clover è `Kernel LAPIC`
* **LegacyCommpage**: NO
  * Risolve il requisito SSSE3 per le CPU a 64 bit in macOS, principalmente rilevante per le CPU Pentium 4 a 64 bit (es. Prescott)
* **PowerTimeoutKernelPanic**: YES
  * Aiuta a risolvere i problemi di panico del kernel relativi ai cambiamenti di alimentazione con i driver Apple in macOS Catalina, in particolare con l'audio digitale.
* **SetApfsTrimTimeout**: `-1`
  * Imposta il timeout del Trim in microsecondi per i file system APFS su SSD, applicabile solo per macOS 10.14 e versioni successive con SSD problematici.
* **XhciPortLimit**: YES
  * Questa è in realtà la patch del limite di 15 porte, non fare affidamento su di essa perché non è una soluzione garantita per riparare USB. Crea un file [USB map](/OpenCore-Post-Install/usb/) quando possibile.

Il motivo è che UsbInjectAll reimplementa la funzionalità macOS incorporata senza un'adeguata regolazione corrente. È molto più pulito descrivere le tue porte in un unico kext solo plist, che non sprecherà memoria di runtime e simili

:::

### Scheme

Impostazioni relative all'avvio legacy (es. 10.4-10.6), per la maggior parte puoi saltare, tuttavia per coloro che intendono avviare sistemi operativi legacy vedere qui di seguito:

::: details Informazioni più approfondite

* **FuzzyMatch**: True
  * Usato per ignorare i checksum con kernelcache, optando invece per l'ultima cache disponibile. Può aiutare a migliorare le prestazioni di avvio su molte macchine in 10.6
* **KernelArch**: x86_64
  * Imposta il kernel's arch type, puoi scegliere tra `Auto`, `i386` (32-bit), e `x86_64` (64-bit).
  * Se stai avviando sistemi operativi meno recenti che richiedono un kernel a 32 bit (es. 10.4 e 10.5), ti consigliamo di impostarlo su `Auto` e lasciare che macOS decida in base al tuo SMBIOS. Vedere la tabella sottostante per i valori supportati:
    * 10.4-10.5 — `x86_64`, `i386` o `i386-user32`
      * `i386-user32` fa riferimento allo spazio utente a 32 bit, quindi le CPU a 32 bit devono utilizzarlo (o le CPU che non hanno SSSE3)
      * `x86_64` avrà ancora uno spazio del kernel a 32 bit, tuttavia garantirà uno spazio utente a 64 bit nella versione 10.4/5
    * 10.6 — `i386`, `i386-user32`, or `x86_64`
    * 10.7 — `i386` or `x86_64`
    * 10.8 o più recenti — `x86_64`

* **KernelCache**: Auto
  * Imposta il tipo di cache del kernel, utile principalmente per il debug e quindi consigliamo `Auto` per il miglior supporto

:::

## Misc

![Misc](../../images/config/config-universal/misc.png)

### Boot

::: tip Info

| Quirk | Abilitata | Commento |
| :--- | :--- | :--- |
| HideAuxiliary | YES | Premi spazio per mostrare le recovery di macOS e altre entry ausiliarie |

:::

::: details Più informazioni

* **HideAuxiliary**: YES
  * Questa opzione nasconderà menù secondari, come le recovery di macOS e altri strumenti, dal picker. Nasconderle potrebbe incrementare le prestazioni di avvio in sistemi con più dischi. Puoi premere spazio per mostrare le opzioni nascoste

:::

### Debug

::: tip Info

Utile per il debug dei problemi di avvio di OpenCore (cambieremo tutto *tranne* `DisplayDelay`):

| Quirk | Enabled |
| :--- | :--- |
| AppleDebug | YES |
| ApplePanic | YES |
| DisableWatchDog | YES |
| Target | 67 |

:::

::: details Informazioni più approfondite

* **AppleDebug**: YES
  * Abilita la registrazione di boot.efi, utile per il debug. Nota che questo è supportato solo su 10.15.4 e versioni successive
* **ApplePanic**: YES
  * Tenta di registrare i kernel panic su disco
* **DisableWatchDog**: YES
  * Disabilita il watchdog UEFI, può aiutare con problemi precoci di avvio
* **DisplayLevel**: `2147483650`
  * Mostra ancora più informazioni di debug, richiede la versione di debug di OpenCore
* **SysReport**: NO
  * Utile per il debug come il dumping delle tabelle ACPI
  * Nota che questo è limitato alle versioni DEBUG di OpenCore
* **Target**: `67`
  * Mostra più informazioni di debug, richiede la versione di debug di OpenCore

Questi valori si basano su quelli calcolati in [OpenCore debugging](/extras/debug.md)

:::

### Security

::: tip Info

Sicurezza è abbastanza autoesplicativa, **Non saltare questo passo**. Modificheremo quanto segue:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| AllowSetDefault | YES | |
| BlacklistAppleUpdate | YES | |
| ScanPolicy | 0 | |
| SecureBootModel | Default | Lasciare `Default` per permettere ad OpenCore di settare automaticamente il valore corretto per il tuo SMBIOS |
| Vault | Optional | Questa è una parola, non è facoltativo omettere questa impostazione. Te ne pentirai se non lo imposti su Optional, nota che fa distinzione tra maiuscole e minuscole |

:::

::: details Informazioni più approfondite

* **AllowSetDefault**: YES
  * Permette `CTRL+Enter` e `CTRL+Index` per impostare il dispositivo di avvio predefinito nel selettore
* **ApECID**: 0
  * Utilizzato per la rete di identificatori di avvio sicuro personalizzati, attualmente questo Quirk non è affidabile a causa di un bug nell'installer di macOS, quindi ti consigliamo vivamente di lasciarlo come predefinito.
* **AuthRestart**: NO
  * Abilita il riavvio autenticato per FileVault 2 in modo che la password non sia richiesta al riavvio. Può essere considerato un rischio per la sicurezza quindi opzionale
* **BlacklistAppleUpdate**: YES
  * Utilizzato per bloccare gli aggiornamenti del firmware, utilizzato come ulteriore livello di protezione poiché macOS Big Sur non utilizza più la variabile `run-efi-updater`

* **DmgLoading**: Signed
  * Assicura il caricamento solo dei DMG firmati
* **ExposeSensitiveData**: `6`
  * Mostra più informazioni di debug, richiede la versione di debug di OpenCore
* **Vault**: `Optional`
  * Non ci occuperemo del vaulting quindi possiamo ignorare, **non avvierai con questo settato su Secure**
  * Questa è una parola, non è facoltativo omettere questa impostazione. Te ne pentirai se non lo imposti su `Optional`, nota che fa distinzione tra maiuscole e minuscole
* **ScanPolicy**: `0`
  * `0` consente di vedere tutte le unità disponibili, fare riferimento alla sezione [Security](/OpenCore-Post-Install/universal/security.md) per ulteriori dettagli. **Non avvierà i dispositivi USB con l'impostazione predefinita**
* **SecureBootModel**: Default
  * Controlla le funzionalità di avvio sicuro di Apple in macOS, fare riferimento alla sezione [Security](/OpenCore-Post-Install/universal/security.md) per ulteriori informazioni.
  * Nota: gli utenti potrebbero scoprire che l'aggiornamento di OpenCore su un sistema già installato può causare errori precoci di avvio. Per risolvere questo problema, vedere qui: [Stuck on OCB: LoadImage failed - Security Violation](/troubleshooting/kernel.md#stuck-on-ocb-loadimage-failed-security-violation)

:::

### Serial

Usato per il debugging da porta seriale (Lasciare tutto come in default).

### Tools

Utilizzato per specificare percorsi di avvio irregolari che non possono essere trovati naturalmente con OpenCore.

Non verrà trattato qui, vedere 8.6 di [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) per maggiori informazioni

## NVRAM

![NVRAM](../../images/config/config-universal/nvram.png)

### Add

::: tip 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14

Utilizzato per il ridimensionamento dell'interfaccia utente di OpenCore, l'impostazione predefinita funzionerà per noi. Vedere la sezione approfondita per maggiori informazioni

:::

::: details Informazioni più approfondite

Booter Path, utilizzato principalmente per il ridimensionamento dell'interfaccia utente

* **UIScale**:
  * `01`: Standard resolution
  * `02`: HiDPI (generalmente richiesto per il corretto funzionamento di FileVault su schermi più piccoli)

* **DefaultBackgroundColor**: Colore di sfondo utilizzato da boot.efi
  * `00000000`: Syrah Black
  * `BFBFBF00`: Light Gray

:::

::: tip 4D1FDA02-38C7-4A6A-9CC6-4BCCA8B30102

GUID NVRAM di OpenCore, principalmente rilevante per chi usa RTCMemoryFixup

:::

::: details Informazioni più approfondite

* **rtc-blacklist**: <>
  * Da utilizzare insieme a RTCMemoryFixup, vedere qui per maggiori informazioni: [Risolvere i problemi di scrittura RTC](/OpenCore-Post-Install/misc/rtc.html#finding-our-bad-rtc-region)
  * La maggior parte degli utenti può ignorare questa sezione

:::

::: tip 7C436110-AB2A-4BBB-A880-FE41995C9F82

System Integrity Protection bitmask

* **Argomenti di avvio generici**:

| Argomenti di avvio | Description |
| :--- | :--- |
| **-v** | Ciò abilita la modalità dettagliata, che mostra tutto il testo dietro le quinte che scorre durante l'avvio invece del logo Apple e della barra di avanzamento. È inestimabile per qualsiasi Hackintosher, in quanto ti offre uno sguardo all'interno del processo di avvio e può aiutarti a identificare problemi, kext di problemi, ecc. |
 **debug=0x100** | Questo disabilita il watchdog di macOS che aiuta a prevenire un riavvio in caso di kernel panic. In questo modo puoi *si spera* raccogliere alcune informazioni utili e seguire i breadcrumb per superare i problemi. |
| **keepsyms=1** | Questa è un'impostazione complementare per debug = 0x100 che dice al sistema operativo di stampare anche i simboli in caso di kernel panic. Ciò può fornire informazioni più utili su ciò che sta causando il panico stesso. |
| **alcid=1** | Usato per impostare il layout-id per AppleALC, vedi [codec supportati](https://github.com/acidanthera/applealc/wiki/supported-codecs) per capire quale layout usare per il tuo sistema specifico. Maggiori informazioni su questo sono trattate nella [pagina di post-installazione](/OpenCore-Post-Install/) |

* **Argomenti di avvio specifici per GPU**:

|| Argomenti di avvio | Description |
| :--- | :--- |
| **agdpmod=pikera** | Utilizzato per disabilitare il controllo del board ID su GPU Navi (serie RX 5000), senza di questo otterrai una schermata nera. **Non usare se non hai Navi** (es. Le schede Polaris e Vega non dovrebbero usarlo) |
| **nvda_drv_vrl=1** | Utilizzato per abilitare i Web Driver di NVIDIA su schede Maxwell e Pascal in Sierra e HighSierra |

* **csr-active-config**: `00000000`
  * Impostazioni per "System Integrity Protection" (SIP). In genere si consiglia di cambiarlo con `csrutil` tramite la partizione di ripristino.
  * csr-active-config per impostazione predefinita è impostato su`00000000` che abilita la protezione dell'integrità del sistema. Puoi scegliere un numero di valori diversi, ma nel complesso consigliamo di mantenerlo abilitato per le migliori pratiche di sicurezza. Maggiori informazioni possono essere trovate nella nostra pagina di risoluzione dei problemi: [Disabilitare SIP](/troubleshooting/post.md#disabilitare-sip)

* **run-efi-updater**: `No`
  * Viene utilizzato per impedire ai pacchetti di aggiornamento del firmware di Apple di installare e interrompere l'ordine di avvio; questo è importante in quanto questi aggiornamenti del firmware (pensati per i Mac) non funzioneranno.

* **prev-lang:kbd**: <>
  * Necessario per tastiere non latine nel formato `lang-COUNTRY: keyboard`, consigliato di lasciare il campo vuoto sebbene sia possibile specificarlo(**L'impostazione predefinita nella configurazione di esempio è il russo**):
  * American: `en-US:0`(`656e2d55533a30` in HEX)
  * L'elenco completo è disponibile in [AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt)
  * Hint: `prev-lang:kbd` può essere cambiato in una stringa in modo da poter inserire direttamente `en-US:0` invece di convertirlo in HEX

| Key | Type | Value |
| :--- | :--- | :--- |
| prev-lang:kbd | String | en-US:0 |

:::

### Delete

Riscrive forzatamente le variabili NVRAM, si noti che `Add` **non sovrascriverà** i valori già presenti nella NVRAM, quindi valori come `Argomenti di avvio` dovrebbero essere lasciati soli.

* **LegacyOverwrite**: YES
  * Consente la sovrascrittura delle variabili del firmware da nvram.plist, necessario solo per i sistemi senza NVRAM nativa come X99

* **LegacySchema**
  * Utilizzato per assegnare variabili NVRAM, utilizzato con `OpenVariableRuntimeDxe.efi`. Necessario solo per sistemi senza NVRAM nativa

* **WriteFlash**: NO
  * Consente la scrittura nella memoria flash per tutte le variabili aggiunte, non compatibile con la NVRAM emulata

:::

## PlatformInfo

![PlatformInfo](../../images/config/config-laptop.plist/ivy-bridge/smbios.png)

::: tip Info

Per impostare le informazioni SMBIOS, utilizzeremo l'applicazione [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) di CorpNewt.

Per questo esempio Ivy Bridge, sceglieremo MacBookPro10,1 SMBIOS - questo viene fatto intenzionalmente per motivi di compatibilità. La ripartizione tipica è la seguente:

| SMBIOS | CPU Type | GPU Type | Display Size |
| :--- | :--- | :--- | :--- |
| MacBookAir5,1 | Dual Core 17W | iGPU: HD 4000 | 11" |
| MacBookAir5,2 | Dual Core 17W | iGPU: HD 4000 | 13" |
| MacBookPro10,1 | Quad Core 45W | iGPU: HD 4000 + dGPU: GT650M | 15" |
| MacBookPro10,2 | Dual Core 35W (High End) | iGPU: HD 4000 | 13" |
| Macmini6,1 | Dual Core NUC | iGPU: HD 4000 | N/A |
| Macmini6,2 | Quad Core NUC | iGPU: HD 4000 | N/A |

**Nota**: i seguenti SMBIOS sono supportati solo fino a macOS 10.15 incluso, Catalina. Per i casi in cui è necessario avviare Big Sur, vedere di seguito:

::: details tavolo Big Sur SMBIOS

Si noti che la scelta di un SMBIOS dall'elenco seguente per Catalina o precedente non è consigliabile, poiché il risparmio energetico e simili possono interrompersi quando si utilizza SMBIOS non ottimizzato.

| SMBIOS | CPU Type | Display Size |
| :--- | :--- | :--- |
| MacBookAir6,1 | Dual Core 15W | 11" |
| MacBookAir6,2 | Dual Core 15W | 13" |
| MacBookPro11,1 | Dual Core 28W | 13" |
| MacBookPro11,2 | Quad Core 45W | 15" |
| MacBookPro11,3 | Quad Core 45W | 15" |
| MacBookPro11,4 | Quad Core 45W | 15" |
| MacBookPro11,5 | Quad Core 45W | 15" |
| Macmini7,1 | NUC Systems | N/A |

:::

Esegui GenSMBIOS, scegli l'opzione 1 per scaricare MacSerial e l'opzione 3 per selezionare SMBIOS. Questo ci darà un output simile al seguente:

```sh
  #######################################################
 #               MacBookPro10,2 SMBIOS Info            #
#######################################################

Type:         MacBookPro10,2
Serial:       C02KCYZLDNCW
Board Serial: C02309301QXF2FRJC
SmUUID:       A154B586-874B-4E57-A1FF-9D6E503E4580
```

La parte `Type` viene copiata in Generic -> SystemProductName.

La parte `Serial` viene copiata in Generic -> SystemSerialNumber.

La parte `Board Serial` viene copiata in Generic -> MLB.

La parte `SmUUID` viene copiata in Generic -> SystemUUID.

Possiamo impostare Generic -> ROM su una ROM Apple (ricavata da un vero Mac), o sul tuo indirizzo MAC NIC o qualsiasi indirizzo MAC casuale (potrebbe essere solo 6 byte casuali, per questa guida useremo `11223300 0000`. Dopo segui la pagina[Fixing iServices](/OpenCore-Post-Install/universal/iservices.html) su come trovare il tuo vero indirizzo MAC)

> Ricorda che ti serve un numero di serie non valido! Quando poni il tuo seriale nella [Apple's Check Coverage Page](https://checkcoverage.apple.com), dovresti ottenere il messaggio "Numero di serie non valido."

**Automatic**: YES

* Genera PlatformInfo in base alla sezione generica anziché alle sezioni DataHub, NVRAM e SMBIOS

:::

### Generic

::: details Informazioni più approfondite

* **AdviseFeatures**: NO
  * Utilizzato quando la partizione EFI non è la prima sull'unità di Windows

* **MaxBIOSVersion**: NO
  * Imposta la versione del BIOS su Max per evitare gli aggiornamenti del firmware in Big Sur +, applicabile principalmente a Mac originali.

* **ProcessorType**: `0`
  * Impostare a "0" per il rilevamento automatico del tipo, tuttavia questo valore può essere sovrascritto se lo si desidera. Vedi [AppleSmBios.h](https://github.com/acidanthera/OpenCorePkg/blob/master/Include/Apple/IndustryStandard/AppleSmBios.h) per i possibili valori

* **SpoofVendor**: YES
  * Scambia il campo fornitore per Acidanthera, generalmente non è sicuro utilizzare Apple come fornitore nella maggior parte dei casi

* **SystemMemoryStatus**: Auto
  * Imposta se la memoria è saldata o meno nelle informazioni SMBIOS, puramente cosmetica e quindi si consiglia `Auto`

* **UpdateDataHub**: YES
  * Aggiorna i campi di Data Hub

* **UpdateNVRAM**: YES
  * Aggiorna i campi NVRAM

* **UpdateSMBIOS**: YES
  * Aggiorna i campi SMBIOS

* **UpdateSMBIOSMode**: Create
  * Sostituisci le tabelle con EfiReservedMemoryType appena allocato, usa `Custom` su laptops Dell che richiedono il Quirk `CustomSMBIOSGuid`
  * L'impostazione su `Custom` con il quirk `CustomSMBIOSGuid` abilitato può anche disabilitare l'iniezione SMBIOS in sistemi operativi "non Apple", tuttavia non supportiamo questo metodo poiché interrompe la compatibilità Bootcamp. Utilizzare a proprio rischio

:::

## UEFI

![UEFI](../../images/config/config-universal/aptio-v-uefi.png)

**ConnectDrivers**: YES

* Forza i driver .efi, la modifica a NO connetterà automaticamente i driver UEFI aggiunti. Ciò può rendere l'avvio leggermente più veloce, ma non tutti i driver si connettono da soli. Per esempio. alcuni driver del file system potrebbero non essere caricati.

### Drivers

Aggiungi qui i tuoi driver .efi.

I soli driver presenti qui dovrebbero essere:

* HfsPlus.efi
* OpenRuntime.efi

::: details Informazioni dettagliate

| Chiave | Tipo | Descrizione |
| :--- | :--- | :--- |
| Path | String | Percorso del file dalla cartella `OC/Drivers` |
| LoadEarly | Boolean | Carica il driver prima del setup della NVRAM, dovrebbe essere abilitato solo per `OpenRuntime.efi` e `OpenVariableRuntimeDxe.efi` se si usa NVRAM legacy |
| Arguments | String | Alcuni driver possono accettare ulteriori argomenti che vanno specificati qui. |

:::

### APFS

Di default, OpenCore carica solamente alcuni driver APFS per cui la minima versione supportata è Big Sur. Se devi avviare Catalina o meno recenti, devi impostare ulteriori dati.

Non farlo potrebbe rendere nascosta la partizione con macOS da OpenCore!

macOS Sierra e meno recenti usano HFS al posto di APFS. Puoi ignorare questa sezioni per sistemi che usano HFS.

::: tip Versioni di APFS

Vanno cambiate sia MinVersion che MinDate.

| Versione di macOS | Min Version | Min Date |
| :------------ | :---------- | :------- |
| High Sierra (`10.13.6`) | `748077008000000` | `20180621` |
| Mojave (`10.14.6`) | `945275007000000` | `20190820` |
| Catalina (`10.15.4`) | `1412101001000000` | `20200306` |
| Nessuna restrizione | `-1` | `-1` |

:::

### Audio

Relativamente alle impostazioni di AudioDxe, per noi ignoreremo (lasciare come impostazione predefinita). Questo non è correlato al supporto audio in macOS.

* Per un ulteriore utilizzo di AudioDxe e della sezione Audio, consultare la pagina Post Install: [Add GUI and Boot-chime](/OpenCore-Post-Install/)

### Input

In relazione al passthrough della tastiera boot.efi utilizzato per FileVault e il supporto dei tasti di scelta rapida, lasciare tutto qui come predefinito poiché non abbiamo alcun uso per questei Quirks. Vedi qui per maggiori dettagli: [Security and FileVault](/OpenCore-Post-Install/)

### Output

Relativamente all'output visivo di OpenCore, lascia tutto qui come predefinito.

::: details Informazioni più dettagliate
| Quirk | Valore | Commento |
| :--- | :--- | :--- |
| UIScale | `0` | `0` sceglierà automaticamente in base alla risoluzione<br/>`-1` lascerà quella di default<br/>`1` per 1x scaling, per display normali<br/>`2` per 2x scaling, per display HiDPI |
:::

### ProtocolOverrides

Principalmente rilevante per macchine virtuali, Mac legacy e utenti FileVault. Vedi qui per maggiori dettagli: [Security and FileVault](/OpenCore-Post-Install/)

### Quirks

::: tip Info
Riguardo ai Quirk con l'ambiente UEFI, per noi cambieremo quanto segue:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| UnblockFsConnect | NO | Usato soprattutto su motherboards HP |

:::

::: details Informazioni più approfondite

* **IgnoreInvalidFlexRatio**: YES
  * Risolve il problema quando MSR_FLEX_RATIO (0x194) non può essere disabilitato nel BIOS, richiesto per tutti i sistemi basati su Skylake precedenti
* **ReleaseUsbOwnership**: YES
  * Rilascia il controller USB dal driver del firmware, necessario quando il firmware non supporta Handoff EHCI / XHCI. La maggior parte dei laptop ha firmware spazzatura, quindi avremo bisogno anche di questo
* **DisableSecurityPolicy**: NO
  * Disabilita i criteri di sicurezza della piattaforma nel firmware, consigliato per firmware con bug in cui la disabilitazione di Secure Boot non consente il caricamento dei driver del firmware di terze parti.
  * Se si esegue un dispositivo Microsoft Surface, si consiglia di abilitare questa opzione

* **RequestBootVarRouting**: YES
  * Reindirizza AptioMemoryFix da `EFI_GLOBAL_VARIABLE_GUID` a `OC_VENDOR_VARIABLE_GUID`. Necessario quando il firmware tenta di eliminare le voci di avvio e si consiglia di abilitarlo su tutti i sistemi per la corretta installazione degli aggiornamenti, il funzionamento del pannello di controllo del disco di avvio, ecc.

* **UnblockFsConnect**: NO
  * Alcuni firmware bloccano gli handle di partizione aprendoli in modalità By Driver, che impedisce l'installazione dei protocolli di file system. Principalmente rilevante per i sistemi HP quando non sono elencate le unità

:::

### ReservedMemory

Utilizzato per escludere determinate regioni di memoria dai sistemi operativi da utilizzare, principalmente rilevante per iGPU Sandy Bridge o sistemi con memoria difettosa. L'uso di questa stranezza non è trattato in questa guida

## Impostazioni BIOS Intel

## Intel impostazioni BIOS

* Nota: la maggior parte di queste opzioni potrebbe non essere presente nel tuo firmware, ti consigliamo di abbinarle il più fedelmente possibile, ma non preoccuparti se molte di queste opzioni non sono disponibili nel tuo BIOS

### Disabilita

* Fast Boot
* Secure Boot
* Serial/COM Port
* Parallel Port
* VT-d (può essere disabilitata se impostato `DisableIoMapper` to YES)
* CSM
* Thunderbolt (per l'installazione iniziale, poiché Thunderbolt può causare problemi se non configurato correttamente)
* Intel SGX
* Intel Platform Trust
* CFG Lock (MSR 0xE2 write protection)(**Deve essere disattivato, se non riesci a trovare l'opzione abilita `AppleXcpmCfgLock` in Kernel->Quirks. Il tuo hack non si avvierà con CFG-Lock abilitato**)

### Abilita

* VT-x
* Above 4G decoding
* Hyper-Threading
* Execute Disable Bit
* EHCI/XHCI Hand-off
* Compatibility Support Module (CSM)* DVMT Pre-Allocated(iGPU Memory): 64MB
* SATA Mode: AHCI

> Una volta completato, dobbiamo sistemare ancora un paio di cose. Fai un salto alla pagina riguardo a [Apple Secure Boot](security.md)
