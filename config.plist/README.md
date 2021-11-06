# Setup del config.plist

Ora che abbiamo tutti i nostri kext (.kext), SSDT (.aml) e driver del firmware (.efi), la tua USB potrebbe apparire qualcosa come questo:

![Cartella EFI popolata](../images/installer-guide/opencore-efi-md/populated-efi.png)

* **Nota**: La tua USB **sarà diversa**, ogni sistema ha requisiti differenti.

## Creare il tuo config.plist

Per prima cosa prenderemo il sample.plist da [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases), sarà allocato nella cartella `Docs`:

![](../images/config/config-universal/sample-location.png)

Ora muoviamolo nella partizione EFI della USB (si chiamerà BOOT in Windows) dentro `EFI/OC/`, e rinominalo come config.plist:

![](../images/config/config-universal/renamed.png)

## Aggiungere i tuoi SSDT, Kext e Driver del Firmware

Per il resto della guida, avrai bisogno di qualche forma di plist editing. Per questa guida, useremo ProperTree e GenSMBIOS per automatizzare un po' di compiti tediosi:

* [ProperTree](https://github.com/corpnewt/ProperTree)
  * Plist editor universale
* [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS)
  * Per generare le nostre specifiche di SMBIOS

Ora, apriamo ProperTree e modifichiamo il nostro config.plist:

* `ProperTree.command`
  * Per macOS
  * Suggerimento: c'è una utility chiamata `buildapp.command` nella cartella `Scripts` che ti permette di trasformare ProperTree in un'app dedicata per macOS
* `ProperTree.bat`
  * Per Windows

Una volta che ProperTree è avviato, apri il tuo config.plist premendo **Cmd/Ctrl + O** e selezionando il file `config.plist` sulla tua USB.

Dopo che hai aperto il config, premi **Cmd/Ctrl + Shift + R** e seleziona la tua cartella EFI/OC per applicare un "Clean Snapshot":

* Questo rimuoverà tutte le sezioni inutili dal tuo config.plist e successivamente aggiungerà SSDT, Kext e Driver Firmware al config.
* **Cmd/Ctrl + R** è un'altra opzione che ti aggiungerà i file, ma lascerà le sezioni inutili disabilitate come erano prima, utile quando hai bisogno di risolvere problemi, ma non usato da noi ora

![](../images/config/config-universal/before-snapshot.png)

Quando hai fatto, vedrai i tuoi SSDT, Kext e driver firmware applicati nel tuo config.plist:

![](../images/config/config-universal/after-snapshot.png)

* **Nota:** Se ottieni un pop up "Disable the following kexts with Duplicate CFBundleIdentifiers?", seleziona "Yes". Questo assicura che tu non abbia kext duplicati, dato che a volte i kext hanno lo stesso plugin (VoodooInput sia nei plugin di VoodooPS2 che di VoodooI2C)

![](../images/config/config-universal/duplicate.png)

Se vuoi continuare la pulizia del file, puoi rimuovere la sezioni `#WARNING`. Attraverso quelle non creerai nessun problema, sono solo per preferenza personale.

::: danger ATTENZIONE
Il file config.plist **deve** corrispondere ai contenuti della cartella EFI. Se cancelli un file ma lasci la sua voce nel config.plist, OpenCore segnalerà un errore e bloccherà l'avvio.

Se vuoi fare una qualche modifica, ricordiamo l'esistenza dello strumento OC snapshot (**Cmd/Ctrl + R**) in ProperTree per aggiornare il config.plist.
:::

## Scegliere la tua piattaforma

Ora arriva la parte importante, selezionare la tua configurazione. Ogni piattaforma ha caratteristiche uniche per cui sapere il tuo hardware è super importante. Vedi sotto per seguire:

### Desktop Intel

* Nota: I NUC della Intel sono considerati dispositivi portatili, per queste situazioni devi seguire la [Sezione Laptop Intel](#intel-laptop)

| Nome in Codice | Serie | Rilascio |
| :--- | :--- | :--- |
| [Yonah, Conroe e Penryn](penryn.md) | E8XXX, Q9XXX, [etc 1](https://en.wikipedia.org/wiki/Yonah_(microprocessor)), [etc 2](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 2006-2009 era |
| [Lynnfield and Clarkdale](clarkdale.md) | 5XX-8XX | era 2010 |
| [Sandy Bridge](sandy-bridge.md) | 2XXX | era 2011 |
| [Ivy Bridge](ivy-bridge.md) | 3XXX | era 2012 |
| [Haswell](haswell.md) | 4XXX | era 2013-2014 |
| [Skylake](skylake.md) | 6XXX | era 2015-2016 |
| [Kaby Lake](kaby-lake.md) | 7XXX | era 2017 |
| [Coffee Lake](coffee-lake.md) | 8XXX-9XXX | era 2017-2019 |
| [Comet Lake](comet-lake.md) | 10XXX | era 2020 |

### Laptop Intel

| Nome in Codice | Serie | Rilascio |
| :--- | :--- | :--- |
| [Clarksfield e Arrandale](laptop/arrandale.md) | 3XX-9XX | era 2010 |
| [Sandy Bridge](laptop/sandy-bridge.md) | 2XXX | era 2011 |
| [Ivy Bridge](laptop/ivy-bridge.md) | 3XXX | era 2012 |
| [Haswell](laptop/haswell.md) | 4XXX | era 2013-2014 |
| [Broadwell](laptop/broadwell.md) | 5XXX | era 2014-2015 |
| [Skylake](laptop/skylake.md) | 6XXX | era 2015-2016 |
| [Kaby Lake e Amber Lake](laptop/kaby-lake.md) | 7XXX | era 2017 |
| [Coffee Lake e Whiskey Lake](laptop/coffee-lake.md) | 8XXX | era 2017-2018 |
| [Coffee Lake Plus e Comet Lake](laptop/coffee-lake-plus.md) | 9XXX-10XXX | era 2019-2020 |
| [Ice Lake](laptop/icelake.md) | 10XXX | era 2019-2020 |

### HEDT Intel

Questa sezione include sia enthusiast computer e server.

| Nome in Codice | Serie | Rilascio |
| :--- | :--- | :--- |
| [Nehalem and Westmere](HEDT/nehalem.md) | 9XX, X3XXX, X5XXX, [etc 1](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)), [2](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | era 2008-2010 |
| [Sandy/Ivy Bridge-E](HEDT/ivy-bridge-e.md) | 3XXX, 4XXX | era 2011-2013 |
| [Haswell-E](HEDT/haswell-e.md) | 5XXX | era 2014 |
| [Broadwell-E](HEDT/broadwell-e.md) | 6XXX | era 2016 |
| [Skylake/Cascade Lake-X/W](HEDT/skylake-x.md) | 7XXX, 9XXX, 10XXX | era 2017-2019 |

### AMD

| Nome in Codice | Serie | Rilascio |
| :--- | :--- | :--- |
| [Bulldozer/Jaguar](AMD/fx.md) | [È strano](https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)) | [AMD è stata veramente terribile nel scegliere i nomi](https://en.wikipedia.org/wiki/List_of_AMD_processors#Bulldozer_architecture;_Bulldozer,_Piledriver,_Steamroller,_Excavator_(2011%E2%80%932017)) |
| [Zen](AMD/zen.md) | 1XXX, 2XXX, 3XXX, 5XXX | era 2017-2020 |

* Note: ~~3° generazione (39XX), chiamate Threadripper, non sono supportate, la 1° e 2° generazione tuttavia sono supportate~~
  * L'ultima versione del BIOS e di OpenCore ha risolto il problema, tutte le piattaforme Threadripper sono supportate
