# macOS 12: Monterey

**Ricorda che Dortania e ogni tool menzionato in questa guida non sono responsabili per corruzioni di file, perdita di dati, o altri effetti negativi che potrebbero essere causati da questa guida, inclusi quelli causati da errori di battitura. Tu, l'utente finale, devi comprendere che questo è un software in versione beta eseguito su hardware non supportato, quindi non tormentare gli sviluppatori per ottenere correzioni. Dortania non accetterà issues riguardanti questa mini-guida ad eccezione di errori di battitura e/o errori.**
**Questa guida si aspetta che tu conosca le basi del mondo hackintosh. Se non ti è familiare, ti raccomandiamo fortemente di attendere fino a quando sarà disponibile una soluzione più facile e più lineare.**

## Table of Contents

[[toc]]

## Prerequisiti

### SMBIOS supportati

SMBIOS non più supportati in Monterey:

* iMac15,x e precedenti
* Macmini6,x e precedenti
* MacBook8,1 e precedenti
* MacBookAir6,x e precedenti
* MacBookPro11,3 e precedenti
  * MacBookPro11,4 e 11,5 sono ancora supportati

Se il tuo SMBIOS era supportato in Big Sur e non è incluso nella lista sopra, sei a posto!

::: details SMBIOS supportati

* iMac16,1 e successivi
* MacPro6,1 e successivi
* iMacPro1,1 e successivi
* Macmini7,1 e successivi
* MacBook9,1 e successivi
* MacBookAir7,1 e successivi
* MacBookPro11,4 e successivi

[Clicca qui](./smbios-support.md) per la lista completa dei SMBIOS supportati.

:::

Per quelli con Haswell o Ivy Bridge, queste sono alcune semplici conversioni:

* Ivy Bridge: i desktop con dGPU dovrebbero usare MacPro6,1
* Haswell: i desktop con dGPU dovrebbero usare iMac17,1
* Haswell: i desktop con solo la iGPU dovrebbero usare iMac16,2
* Haswell: i laptop dovrebbero usare MacBookPro11,4 o MacBookPro11,5

### Hardware supportato

GPU non più supportate:

* Ivy Bridge (HD 4000 e HD 2500)
* Nvidia Kepler (GTX 6xx/7xx)
* Puoi usare [OpenCore-Legacy-Patcher](https://github.com/dortania/OpenCore-Legacy-Patcher/) per supportarle ancora
  * Non verrà fornito supporto agli Hackintosh che usano OCLP!
  * Perderai accesso agli aggiornamenti parziali (Aggiornamenti da 1-3GB)
  * Richiede di disabilitare SIP, Apple Secure Boot e AMFI.

Le iGPU Haswell sono ancora supportate in Monterey

* Macmini7,1 usa i driver per quelle schede

### Patch per AMD

Per quelli con CPU AMD, assicurati di aggiornare le tue [kernel patches](https://github.com/AMD-OSX/AMD_Vanilla) per Monterey.
Non dimenticare di aggiornare le tue patch anche con il numero di core della tua CPU.
Le patch che devono essere modificate si chiamano tutte `algrey - Force cpuid_cores_per_package` e devi solo cambiare il valore di `Replace`. Dovresti cambiare:

* `B8000000 0000` => `B8 <numero di core> 0000 0000`
* `BA000000 0000` => `BA <numero di core> 0000 0000`
* `BA000000 0090` => `BA <numero di core> 0000 0090`

Dove `<numero di core>` è sostituito con il numero di core fisici della tua CPU in esadecimale. Per esempio, un 8-Core 5800X avrà come valore in Replace:

* `B8 08 0000 0000`
* `BA 08 0000 0000`
* `BA 08 0000 0090`

::: details Numero di Core => Esadecimale Table

| Numero di Core | Esadecimale |
| :--------- | :---------- |
| 4 Core | `04` |
| 6 Core | `06` |
| 8 Core | `08` |
| 12 Core | `0C` |
| 16 Core | `10` |
| 24 Core | `18` |
| 32 Core | `20` |
| 64 Core | `40` |

:::

### Bluetooth

::: warning

Nota che non tutte le schede sono state ancora sistemate e che si sta ancora lavorando al supporto per il bluetooth.

Non sorprenderti se la tua scheda non funziona e, per favore, sii paziente!

:::

Con Monterey, Apple ha completamente riscritto lo stack del bluetooth. Al momento della scrittura, molti dispositivi bluetooth non funzionano (vecchie Broadcom and Intel). Con la riscrittura, i kext injector rompono il supporto al bluetooth su Monterey, sebbene kext che aggiornano il firmware sono ancora necessari. Assicurati di:

* Disabilitare i kext injector
  * IntelBluetoothInjector.kext per le schede Intel
  * BrcmBluetoothInjector.kext per le schede Broadcom
  * Se avvii ancora Big Sur o precedenti, in alternativa puoi impostare la voce `MaxKernel` su `20.99.9` per il tuo injector sul config.plist.
* Mantienere i kext che aggiornano il Firmware
  * IntelBluetoothFirmware.kext per Intel
  * BrcmPatchRAM2/3.kext + BrcmFirmwareData.kext per Broadcom
* Aggiungere [BlueToolFixup](https://github.com/acidanthera/BrcmPatchRAM/releases)
  * Necessario per tutti i dispositivi Bluetooth non nativi (e su quelli Intel)
  * Se avvii ancora Big Sur o precedenti, puoi impostare la voce `MinKernel` s `21.00.0` per impedire a BlueToolFixup di essere caricato sulle versioni precedenti.

Per maggiori dettagli, guarda i seguenti issues:

* [BlueToolFixup PR](https://github.com/acidanthera/BrcmPatchRAM/pull/12)
* [Monterey Beta 5+ issues](https://github.com/acidanthera/bugtracker/issues/1821)

### Aggiornamenti OTA

A partire da Monterey, gli aggiornamenti non sono distribuiti ai Mac con chip T2 che non hanno abilitato il Secure Boot, e gli aggiornamenti non si installano correttamente se il tuo SecureBootModel non corrisponde a quello del tuo SMBIOS (es. SMBIOS senza T2 che usano j137 o iMacPro1,1 che usa j160). Gli hackintosh che usano un SMBIOS con T2 **DEVONO** avere OpenCore 0.7.4+ con SecureBootModel impostato su `Default`. Se il tuo SMBIOS non ha un chip T2, allora vanno bene sia `Default` che `Disabled`. Sono disponibili più informazioni alla [pagina di Apple Secure Boot](https://dortania.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html).

::: tip Lista dei SMBIOS con T2

| SMBIOS                                              | Versione minima di macOS |
| :---                                                | :---                  |
| iMacPro1,1 (December 2017)                          | 10.13.2 (17C2111)     |
| MacBookPro15,1 (July 2018)                          | 10.13.6 (17G2112)     |
| MacBookPro15,2 (July 2018)                          | 10.13.6 (17G2112)     |
| Macmini8,1 (October 2018)                           | 10.14 (18A2063)       |
| MacBookAir8,1 (October 2018)                        | 10.14.1 (18B2084)     |
| MacBookPro15,3 (May 2019)                           | 10.14.5 (18F132)      |
| MacBookPro15,4 (July 2019)                          | 10.14.5 (18F2058)     |
| MacBookAir8,2 (July 2019)                           | 10.14.5 (18F2058)     |
| MacBookPro16,1 (November 2019)                      | 10.15.1 (19B2093)     |
| MacPro7,1 (December 2019)                           | 10.15.1 (19B88)       |
| MacBookAir9,1 (March 2020)                          | 10.15.3 (19D2064)     |
| MacBookPro16,2 (May 2020)                           | 10.15.4 (19E2269)     |
| MacBookPro16,3 (May 2020)                           | 10.15.4 (19E2265)     |
| MacBookPro16,4 (June 2020)                          | 10.15.5 (19F96)       |
| iMac20,1 (August 2020)                              | 10.15.6 (19G2005)     |
| iMac20,2 (August 2020)                              | 10.15.6 (19G2005)     |

:::

Not1: Non è necessario il boot argument `-revsbvmm` da RestrictEvents. Usa OpenCore 0.7.4 o successivi.

### Risoluzione dei problemi

#### No Aggiornamenti

Assicurati che la SIP sia abilitata. Nello specifico, due bit nella SIP causano problemi:

* CSR_ALLOW_APPLE_INTERNAL (Bit 4 = 0x10)
  * Impedisce a tutti aggiornamenti di comparire
* CSR_ALLOW_UNAUTHENTICATED_ROOT (Bit 11 = 0x800)
  * Impedisce aggiornamenti incrementali OTA

Se vuoi ancora avere la SIP disabilitata, usa uno dei seguenti:

* `csrutil disable --no-internal` nella Recovery
* Un valore della SIP value che non include le due flags sopra

Per abilitare la SIP:

* Imposta `csr-active-config` su `<00 00 00 00>` nel tuo config.plist
* Usa `csrutil clear` nella Recovery
  * In alternativa, puoi aggiungere `csr-active-config` su NVRAM->Delete o fare un reset della NVRAM
