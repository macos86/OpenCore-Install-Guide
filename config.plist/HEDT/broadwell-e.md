# Broadwell-E

| Supporto | Versione |
| :--- | :--- |
| Supporto di macOS iniziale | OS X 10.11, El Capitan |

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

![ACPI](../../images/config/config-universal/aptio-v-acpi.png)

### Add

::: tip Informazioni

Qui aggiungerai i tuoi SSDT al sistema, sono molto importanti per **avviare macOS** e hanno molti usi come [USB maps (EN)](/OpenCore-Post-Install/usb/), [disabilitare GPU non supportate](/extras/spoof.md) e altro. E con il nostro sistema, **è soprattutto richiesto per l'avvio**. Guide per farli può essere trovata qui: **[Iniziamo con ACPI](/Getting-Started-With-ACPI/)**

Nota che **non dovresti** aggiungere `DSDT.aml` qui, è aggiunto già dal tuo firmware. Perciò se presente, toglilo dal tuo `config.plist` e da EFI/OC/ACPI.

Gli SSDT hanno l'estensione **.aml** (Assembled) e andranno dentro la cartella `EFI/OC/ACPI` e **devono** essere specificati nel config anche nella sezione `ACPI -> Add`.

| SSDT Richiesti | Descrizione |
| :--- | :--- |
| **SSDT-PLUG** | Permette il power management della CPU su Haswell e più recenti |
| **SSDT-EC-USBX** | Sistema il controller integrato e l'energia dei USB |
| **SSDT-RTC0-RANGE** | Richiesto per tutti gli utenti Big Sur per assicurare la compatibilità RTC |
| **SSDT-UNC** | Richiesto per tutti gli utenti Big Sur per assicurare la compatibilità UNC |

:::

### Delete

Questa sezione previene il caricamento di certe tabelle ACPI, per noi è ignorabile.

### Patch

Questa sezione ci permette di modificare dinamicamente le parti di ACPI (DSDT, SSDT, ecc.) tramite OpenCore. Per noi, le nostre patch sono legate agli SSDT. Questa è una soluzione più pulita perché ci permetterà di avviare Windows e altri sistemi con OpenCore

### Quirks

Impostazioni relative a ACPI, lascia tutto come default dato che non useremo questi quirk.

## Booter

![Booter](../../images/config/config-universal/aptio-iv-booter.png)

Questa sezione è dedicata alle stranezze relative al patching boot.efi con OpenRuntime, il sostituto di AptioMemoryFix.efi

### MmioWhitelist

Questa sezione consente il passaggio di spazi a macOS che vengono generalmente ignorati, utile se abbinato a `DevirtualiseMmio`

Questa sezione è dedicata alle stranezze relative al patching boot.efi con OpenRuntime, il sostituto di AptioMemoryFix.efi

### MmioWhitelist

Questa sezione consente il passaggio di spazi a macOS che vengono generalmente ignorati, utile se abbinato a `DevirtualiseMmio`

### Quirks

::: tip
Le impostazioni relative alle patch boot.efi e alle correzioni del firmware, per noi, lo lasciamo come predefinito
:::
::: details Informazioni più approfondite

* **AvoidRuntimeDefrag**: SÌ
  * Corregge i servizi di runtime UEFI come data, ora, NVRAM, controllo dell'alimentazione, ecc
* **EnableSafeModeSlide**: SÌ
  * Abilita le variabili di diapositiva da utilizzare in modalità provvisoria.
* **EnableWriteUnprotector**: SÌ
  * Necessario per rimuovere la protezione da scrittura dal registro CR0.
* **ProvideCustomSlide**: SÌ
  * Utilizzato per il calcolo della variabile Slide. Tuttavia la necessità di questa stranezza è determinata dal messaggio `OCABC: Only N/256 slide values are usable!` Nel registro di debug. Se il messaggio `OCABC: All slides are usable! You can disable ProvideCustomSlide!` È presente nel tuo registro, puoi disabilitare `ProvideCustomSlide`.
* **SetupVirtualMap**: SI
  * Risolve le chiamate SetVirtualAddresses agli indirizzi virtuali, richiesto dalle schede Gigabyte per risolvere i primi kernel panic

:::

## DeviceProperties

![DeviceProperties](../../images/config/config-universal/DP-no-igpu.png)

### Add

Imposta le proprietà del dispositivo da una mappa.

Per impostazione predefinita, Sample.plist ha questa sezione impostata per l'audio. Per l'audio imposteremo il layout nella sezione Argomenti di avvio, quindi possiamo ignorarlo.

### Elimina

Rimuove le proprietà del dispositivo dalla mappa, per noi possiamo ignorarlo

## Kernel

![Kernel](../../images/config/config-HEDT/broadwell-e/kernel.png)

### Add

Qui è dove specifichiamo quali kext caricare, in quale ordine specifico caricare e per quali architetture è destinato ciascun kext. Per impostazione predefinita, si consiglia di lasciare ciò che ha fatto ProperTree, tuttavia per le CPU a 32 bit, vedere di seguito:

::: details Informazioni più approfondite

La cosa principale che devi tenere a mente è:

* Carica l'ordine
  * Ricorda che qualsiasi plugin dovrebbe essere caricato *dopo* le sue dipendenze
  * Ciò significa che kext come Lilu **devono** venire prima di VirtualSMC, AppleALC, WutelyGreen, ecc.

Un promemoria che gli utenti di [ProperTree](https://github.com/corpnewt/ProperTree) possono eseguire **Cmd/Ctrl+Shift+R** per aggiungere tutti i loro kext nell'ordine corretto senza digitare manualmente ogni kext in uscita.

* **Arch**
  * Architetture supportate da questo kext
  * I valori attualmente supportati sono `Any`, `i386` (32-bit), and `x86_64` (64-bit)
* **BundlePath**
  * Nome del kext
  * es: `Lilu.kext`
* **Enabled**
  * Autoesplicativo, abilita o disabilita il kext
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

:::

### Emulate

::: tip Info

Necessario per lo spoofing di CPU non supportate e l'attivazione della gestione dell'alimentazione

* **Broadwell E:**

  * Cpuid1Data: `D4060300 00000000 00000000 00000000`
  * Cpuid1Mask: `FFFFFFFF 00000000 00000000 00000000`

:::

::: details Informazioni più approfondite

* **CpuidData**: `D4060300 00000000 00000000 00000000`
  * Fake CPUID entry
* **CpuidMask**: `FFFFFFFF 00000000 00000000 00000000`
  * Mask per fake CPUID
* **DummyPowerManagement**: No
  * Disabilita AppleIntelCPUPowerManagement, richiesto solo per AMD CPUs
* **MinKernel**: Lascia questo vuoto
  * Versione del kernel più bassa in cui verranno inserite le patch di cui sopra, se nessun valore specificato verrà applicato a tutte le versioni di macOS. Vedere la tabella sotto per i valori possibili
  * es. `12.00.00` for OS X 10.8
* **MaxKernel**: Leave this blank
  * Lascia questo vuoto
  * Versione del kernel più alta in cui verranno inserite le patch di cui sopra, se nessun valore specificato verrà applicato a tutte le versioni di macOS. Vedere la tabella sotto per i valori possibili
  * es. `11.99.99` for OS X 10.7

::: details Kernel Support Table

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

:::

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
| AppleCpuPmCfgLock | NO | Necessario se si esegue 10.10 o precedente e non è possibile disabilitare `CFG-Lock` nel BIOS |
| AppleXcpmCfgLock | YES | Non serve se `CFG-Lock` è disabilitato nel BIOS |
| AppleXcpmExtraMsrs | YES | |
| DisableIoMapper | YES | Non serve se `VT-D` è disabilitato nel BIOS |
| LapicKernelPanic | NO | Le macchine HP potrebbero richiedere queso quirk |
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
* **AppleXcpmExtraMsrs**: YES
  * Disabilita l'accesso multiplo MSR necessario per CPU non supportate come Pentium e molti Xeon. Richiesto per Broadwell-E e inferiore
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
* **IncreasePciBarSize**: NO
  * Aumenta la dimensione della barra PCI a 32 bit in IOPCIFamily da 1 a 4 GB, abilitando Above4GDecoding nel BIOS è un approccio molto più pulito e sicuro. Alcune schede X99 potrebbero richiederlo, generalmente sperimenterai un panico del kernel su IOPCIFamily se ne hai bisogno. Nota che questo non dovrebbe essere necessario su Mojave e versioni successive
* **LapicKernelPanic**: NO
  * Disabilita il kernel panic su AP core lapic interrupt, generalmente necessario per i sistemi HP. L'equivalente in Clover è `Kernel LAPIC`
* **LegacyCommpage**: NO
  * Risolve il requisito SSSE3 per le CPU a 64 bit in macOS, principalmente rilevante per le CPU Pentium 4 a 64 bit (es. Prescott)
* **PanicNoKextDump**: YES
  * Consente di leggere i log del kernel panic quando si verificano i kernel panic
* **PowerTimeoutKernelPanic**: YES
  * Aiuta a risolvere i problemi di panico del kernel relativi ai cambiamenti di alimentazione con i driver Apple in macOS Catalina, in particolare con l'audio digitale.
* **SetApfsTrimTimeout**: `-1`
* Imposta il timeout del Trim in microsecondi per i file system APFS su SSD, applicabile solo per macOS 10.14 e versioni successive con SSD problematici.
* **XhciPortLimit**: YES
  * Questa è in realtà la patch del limite di 15 porte, non fare affidamento su di essa perché non è una soluzione garantita per riparare USB. Crea un file [USB map](/OpenCore-Post-Install/usb/) quando possibile.

Il motivo è che UsbInjectAll reimplementa la funzionalità macOS incorporata senza un'adeguata regolazione della corrente. È molto più pulito descrivere le tue porte in un unico kext solo plist, che non sprecherà runtime memory e simili

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

Impostazioni per la schermata di avvio (lascia tutto come predefinito).

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
* **SerialInit**: NO
  * Necessario per configurare l'output seriale con OpenCore
* **SysReport**: NO
  * Utile per il debug come il dumping delle tabelle ACPI
  * Nota che questo è limitato alle versioni DEBUG di OpenCore
* **Target**: `67`
  * Mostra più informazioni di debug, richiede la versione di debug di OpenCore

Questi valori si basano su quelli calcolati in [OpenCore debugging](/troubleshooting/debug.md)

:::

### Security

::: tip Info

Sicurezza si spiega da sé, **non saltare**. Modificheremo quanto segue:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| AllowNvramReset | YES | |
| AllowSetDefault | YES | |
| BlacklistAppleUpdate | YES | |
| ScanPolicy | 0 | |
| SecureBootModel | Default |  Questa è una parola e distingue tra maiuscole e minuscole, impostare su `Disabled` se non si desidera un avvio sicuro (ad esempio, sono necessari i driver Web di Nvidia) |
| Vault | Opzionale | Questa è una parola, non è facoltativo omettere questa impostazione. Te ne pentirai se non lo imposti su `Optional`, nota che fa distinzione tra maiuscole e minuscole |

:::

::: details Informazioni più approfondite

* **AllowNvramReset**: YES
  * Consente il ripristino della NVRAM sia nel selettore di avvio che quando si preme `Cmd+Opt+P+R`
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
* **SecureBootModel**: Disabled
  * Controlla le funzionalità di avvio sicuro di Apple in macOS, fare riferimento alla sezione [Security](/OpenCore-Post-Install/universal/security.md) per ulteriori informazioni.
  * Nota: gli utenti potrebbero scoprire che l'aggiornamento di OpenCore su un sistema già installato può causare errori precoci di avvio. Per risolvere questo problema, vedere qui: [Stuck on OCB: LoadImage failed - Security Violation](/troubleshooting/extended/kernel-issues.md#stuck-on-ocb-loadimage-failed-security-violation)

:::

### Tools

Utilizzata per eseguire strumenti di debug OC come la shell, la funzione snapshot di ProperTree li aggiungerà per te.

### Entries

Utilizzato per specificare percorsi di avvio irregolari che non possono essere trovati naturalmente con OpenCore.

Non verrà trattato qui, vedere 8.6 di [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) per maggiori informazioni

## NVRAM

![NVRAM](../../images/config/config-HEDT/broadwell-e/nvram.png)

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
  * Da utilizzare insieme a RTCMemoryFixup, vedere qui per maggiori informazioni: [Fixing RTC write issues (EN)](/OpenCore-Post-Install/misc/rtc.html#finding-our-bad-rtc-region)
  * La maggior parte degli utenti può ignorare questa sezione

:::

::: tip 7C436110-AB2A-4BBB-A880-FE41995C9F82

System Integrity Protection bitmask

* **General Purpose Argomenti di avvio**:

| Argomenti di avvio | Description |
| :--- | :--- |
| **-v** | Ciò abilita la modalità dettagliata, che mostra tutto il testo dietro le quinte che scorre durante l'avvio invece del logo Apple e della barra di avanzamento. È inestimabile per qualsiasi Hackintosher, in quanto ti offre uno sguardo all'interno del processo di avvio e può aiutarti a identificare problemi, kext di problemi, ecc. |
| **debug=0x100** | Questo disabilita il watchdog di macOS che aiuta a prevenire un riavvio in caso di kernel panic. In questo modo puoi *si spera* raccogliere alcune informazioni utili e seguire i breadcrumb per superare i problemi. |
| **keepsyms=1** | Questa è un'impostazione complementare per debug = 0x100 che dice al sistema operativo di stampare anche i simboli in caso di kernel panic. Ciò può fornire informazioni più utili su ciò che sta causando il panico stesso. |
| **npci=0x2000** | Questo disabilita alcuni debug PCI relativi a `kIOPCIConfiguratorPFM64`, l'alternativa è `npci= 0x3000` che disabilita anche il debug relativo a `gIOPCITunnelledKey`. Necessario per quando si rimane bloccati su `PCI Start Configuration` poiché ci sono conflitti IRQ relativi alle proprie corsie PCI. [Source](https://opensource.apple.com/source/IOPCIFamily/IOPCIFamily-370.0.2/IOPCIBridge.cpp.auto.html) |
| **alcid=1** | Usato per impostare il layout-id per AppleALC, vedi [codec supportati](https://github.com/acidanthera/applealc/wiki/supported-codecs) per capire quale layout usare per il tuo sistema specifico. Maggiori informazioni su questo sono trattate nella [pagina di post-installazione (EN)](/OpenCore-Post-Install/) |

* **Argomenti di avvio specifici per GPU**:

| Argomenti di avvio | Description |
| :--- | :--- |
| **agdpmod=pikera** | Utilizzato per disabilitare board ID su GPU Navi (serie RX 5000), senza di questo otterrai una schermata nera. **Non usare se non hai Navi**(es. Le schede Polaris e Vega non dovrebbero usarlo) |
| **nvda_drv_vrl=1** | Utilizzato per abilitare i driver Web di Nvidia su schede Maxwell e Pascal in Sierra e High Sierra |

* **csr-active-config**: `00000000`
  * Impostazioni per "System Integrity Protection" (SIP). In genere si consiglia di cambiarlo con `csrutil` tramite la partizione di ripristino.
  * csr-active-config per impostazione predefinita è impostato su`00000000` che abilita la protezione dell'integrità del sistema. Puoi scegliere un numero di valori diversi, ma nel complesso consigliamo di mantenerlo abilitato per le migliori pratiche di sicurezza. Maggiori informazioni possono essere trovate nella nostra pagina di risoluzione dei problemi: [Disabilitare SIP](/troubleshooting/extended/post-issues.md#disabilitare-sip)

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

::: tip Info

Riscrive forzatamente le variabili NVRAM, si noti che `Add` **non sovrascriverà** i valori già presenti nella NVRAM, quindi valori come `Argomenti di avvio` dovrebbero essere lasciati soli. A causa di problemi con la NVRAM su X99, modificheremo quanto segue:

| Quirk | Enabled |
| :--- | :--- |
| LegacyEnable | YES |
| LegacyOverwrite | YES |
| WriteFlash | NO |

:::

::: details Informazioni più approfondite

* **LegacyEnable**: YES
  * Consente la memorizzazione della NVRAM su nvram.plist, necessaria per i sistemi senza NVRAM nativa come X99

* **LegacyOverwrite**: YES
  * Consente la sovrascrittura delle variabili del firmware da nvram.plist, necessario solo per i sistemi senza NVRAM nativa come X99

* **LegacySchema**
  * Utilizzato per assegnare variabili NVRAM, utilizzato con LegacyEnable impostato su YES

* **WriteFlash**: NO
  * Consente la scrittura nella memoria flash per tutte le variabili aggiunte, non compatibile con la NVRAM emulata

:::

## PlatformInfo

![PlatformInfo](../../images/config/config-universal/iMacPro-smbios.png)

::: tip Info

Per impostare le informazioni SMBIOS, utilizzeremo l'applicazione [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) di CorpNewt.

Per questo esempio Broadwell-E, sceglieremo iMacPro1,1 SMBIOS.

Esegui GenSMBIOS, scegli l'opzione 1 per scaricare MacSerial e l'opzione 3 per selezionare SMBIOS. Questo ci darà un output simile al seguente:

```sh
  #######################################################
 #              iMacPro1,1 SMBIOS Info                 #
#######################################################

Type:         iMacPro1,1
Serial:       C02YX0TZHX87
Board Serial: C029269024NJG36CB
SmUUID:       DEA17B2D-2F9F-4955-B266-A74C47678AD3
```

La parte `Type` viene copiata in Generic -> SystemProductName.

La parte `Serial` viene copiata in Generic -> SystemSerialNumber.

La parte `Board Serial` viene copiata in Generic -> MLB.

La parte `SmUUID` viene copiata in Generic -> SystemUUID.

Possiamo impostare Generic -> ROM su una ROM Apple (ricavata da un vero Mac), o sul tuo indirizzo MAC NIC o qualsiasi indirizzo MAC casuale (potrebbe essere solo 6 byte casuali, per questa guida useremo `11223300 0000`. Dopo segui la pagina[Fixing iServices](/OpenCore-Post-Install/universal/iservices.html) su come trovare il tuo vero indirizzo MAC)

> Ricorda che ti serve un numero di serie non valido o valido ma non in uso;  dsi deve ricevere un messaggio del tipo: "Numero di serie non valido" o "Data di acquisto non convalidata"

[Apple Check Coverage page](https://checkcoverage.apple.com)

**Automatic**: YES

* Genera PlatformInfo in base alla sezione generica anziché alle sezioni DataHub, NVRAM e SMBIOS

:::

### Generic

::: details Informazioni più approfondite

* **AdviseFeatures**: NO
  * Utilizzato quando la partizione EFI non è la prima sull'unità di Windows

* **MaxBIOSVersion**: NO
  * Imposta la versione del BIOS su Max per evitare gli aggiornamenti del firmware in Big Sur+, applicabile principalmente a Mac originali.

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

![UEFI](../../images/config/config-universal/aptio-iv-uefi.png)

**ConnectDrivers**: YES

* Forza i driver .efi, la modifica a NO connetterà automaticamente i driver UEFI aggiunti. Ciò può rendere l'avvio leggermente più veloce, ma non tutti i driver si connettono da soli. Per esempio. alcuni driver del file system potrebbero non essere caricati.

### Drivers

Aggiungi qui i tuoi driver .efi.

I soli driver presenti qui dovrebbero essere:

* HfsPlus.efi
* OpenRuntime.efi

### APFS

::: tip Info
Opzioni riguardo al caricamento del driver APFS, per noi dobbiamo modificare:

| Opzione | Valore | Commento |
| :--- | :--- | :--- |
| MinDate | `-1` | Necessario per avviare versioni più vecchie di Big Sur |
| MinVersion | `-1` | Necessario per avviare versioni più vecchie di Big Sur |

:::

::: details Informazioni più approfondite

* **MinDate**: `-1`
  * Imposta la data minima necessaria per caricare il driver APFS. Ora il valore di default è 01/01/2021, che quindi limita tutte le versioni precedenti a Big Sur.
  * Se devi avviare High Sierra, Mojave o Catalina, imposta il valore a `-1`, altrimenti non cambiarlo.

* **MinVersion**: `-1`
  * Imposta la versione minima necessaria per caricare il driver APFS. Ora il valore di default permette l'avvio del driver di Big Sur (e sucessivi), di conseguenza non potrai avviare le versioni precedenti.
  * Se devi avviare High Sierra, Mojave o Catalina, imposta il valore a `-1`, altrimenti non cambiarlo.

:::

### Audio

Relativamente alle impostazioni di AudioDxe, per noi ignoreremo (lasciare come impostazione predefinita). Questo non è correlato al supporto audio in macOS.

* Per un ulteriore utilizzo di AudioDxe e della sezione Audio, consultare la pagina Post Install: [Add GUI and Boot-chime (EN)](/OpenCore-Post-Install/)

### Input

In relazione al passthrough della tastiera boot.efi utilizzato per FileVault e il supporto dei tasti di scelta rapida, lasciare tutto qui come predefinito poiché non abbiamo alcun uso per questei Quirks. Vedi qui per maggiori dettagli: [Security and FileVault](/OpenCore-Post-Install/)

### Output

Relativamente all'output visivo di OpenCore, lascia tutto qui come predefinito poiché non abbiamo alcuna utilità per queste stranezze.

### ProtocolOverrides

Principalmente rilevante per macchine virtuali, Mac legacy e utenti FileVault. Vedi qui per maggiori dettagli: [Security and FileVault](/OpenCore-Post-Install/)

### Quirks

::: tip Info
RRiguardo alle stranezze con l'ambiente UEFI, per noi cambieremo quanto segue:

| Quirk | Enabled | Comment |
| :--- | :--- | :--- |
| IgnoreInvalidFlexRatio | YES | |
| UnblockFsConnect | NO | Necessario principalmente dalle schede madri HP |

:::

::: details Informazioni più approfondite

* **IgnoreInvalidFlexRatio**: YES
  * Risolto il problema per cui MSR_FLEX_RATIO (0x194) non può essere disabilitato nel BIOS, richiesto per tutti i sistemi basati su Skylake

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

* Nota: la maggior parte di queste opzioni potrebbe non essere presente nel tuo firmware, ti consigliamo di abbinarle il più fedelmente possibile, ma non preoccuparti se molte di queste opzioni non sono disponibili nel tuo BIOS

### Disabilita

* Fast Boot
* Secure Boot
* Serial/COM Port
* Parallel Port
* VT-d (può essere disabilitata se impostato `DisableIoMapper` su YES)
* CSM
* Thunderbolt (per l'installazione iniziale, poiché Thunderbolt può causare problemi se non configurato correttamente)
* Intel SGX
* Intel Platform Trust
* CFG Lock (MSR 0xE2 write protection)(**deve essere disattivato, se non riesci a trovare l'opzione abilita `AppleXcpmCfgLock` in Kernel->Quirks. Il tuo hack non si avvierà con CFG-Lock abilitato**)
  * Per 10.10 e versioni precedenti, dovrai abilitare anche AppleCpuPmCfgLock

### Enable

* VT-x
* Above 4G decoding
* Hyper-Threading
* Execute Disable Bit
* EHCI/XHCI Hand-off
* OS type: Windows 8.1/10 UEFI Mode
* SATA Mode: AHCI

> Ora, con tutto questo fatto, vai a [Pagina Installazione](/installation.md)
