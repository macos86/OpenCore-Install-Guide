# OpenCore Debugging

Hai bisogno di capire perché stai riscontrando problemi o ti stai bloccando? Bene, sei nel posto giusto:

[[toc]]

## Scambio di file

Per iniziare, assicurati di utilizzare le versioni "DEBUG" o "NOOPT" di OpenCore. Questo fornirà molte più informazioni rispetto alla versione `RELEASE`; i file specifici che devono essere scambiati sono:

* EFI/BOOT/
  * `BOOTx64.efi`
* EFI/OC/Drivers/
  * `OpenRuntime.efi`
  * `OpenCanopy.efi`(se lo stai usando)
* EFI/OC/
  * `OpenCore.efi`

![](../images/troubleshooting/debug-md/replace.png)

* **Nota**: Generalmente è meglio eseguire il debug di sistemi senza OpenCanopy, se necessario assicurati che questo file provenga da DEBUG altrimenti non ci saranno praticamente informazioni di debug.

## Modifiche al Config

Successivamente, vai al tuo config.plist e individua la sezione `Misc`, abbiamo un paio di voci da configurare:

### Misc

Qui abiliteremo quanto segue:

* **AppleDebug**: YES
  * Fornisce molte più informazioni di debug, in particolare riguardo a boot.efi e memorizzerà anche il log su disco.

* **ApplePanic**: YES
  * Questo consentirà di archiviare su disco i kernel panic, consigliamo vivamente di mantenere `keepyms = 1` nelle Argomenti di avvio per preservare quante più informazioni possibili.

* **DisableWatchdog**: YES
  * Disabilita UEFI watchdog, usato per quando OpenCore si blocca su qualcosa di non critico.

* **Target**: `67`(o calcolarne uno usando i parametri qui di seguito)
  * Utilizzato per abilitare diversi livelli di debug

| Valore | Commento |
| :--- | :--- |
| `0x01` | Abilita Registrazione |
| `0x02` | Abilita il debug su schermo |
| `0x04` | Abilita la registrazione per Data Hub. |
| `0x08` | Abilita la registrazione per porta seriale. |
| `0x10` | Abilita la registrazione per variabili. |
| `0x20` | Abilita la registrazione per variabili UEFI non-volatili. |
| `0x40` | Abilita la registrazione con scrittura su file. |

Per calcolare il Target, possiamo utilizzare un calcolatore HEX e quindi convertirlo in decimale. Poi vogliamo che i nostri valori vengano memorizzati su un file .txt per una visualizzazione successiva:

* `0x01` — Abilita registrazione
* `0x02` — Abilita il debug su schermo
  * Si noti che questo può aumentare notevolmente i tempi di avvio sui firmware con implementazioni GOP scadenti
* `0x10` — Abilita la registrazione delle variabili UEFI.
* `0x40` — Abilita la registrazione su file.

`0x01` + `0x02` + `0x10` + `0x40` = `0x53`

`0x53` convertito in decimale diventa `83`

Quindi possiamo impostare `Misc` -> `Debug` -> `Target` -> `83`

* **DisplayLevel**: `2147483714`(o calcolarne uno usando i parametri qui di seguito)
  * Utilizzato per impostare ciò che viene registrato

| Value | Comment |
| :--- | :--- |
| `0x00000002` | DEBUG_WARN in DEBUG, NOOPT, RELEASE. |
| `0x00000040` | DEBUG_INFO in DEBUG, NOOPT. |
| `0x00400000` | DEBUG_VERBOSE in custom builds. |
| `0x80000000` | DEBUG_ERROR in DEBUG, NOOPT, RELEASE. |

  Un elenco completo può essere trovato in [DebugLib.h](https://github.com/tianocore/edk2/blob/UDK2018/MdePkg/Include/Library/DebugLib.h).

A noi interessa solo quanto segue:

* `0x00000002` — DEBUG_WARN in DEBUG, NOOPT, RELEASE.
* `0x00000040` — DEBUG_INFO in DEBUG, NOOPT.
* `0x80000000` — DEBUG_ERROR in DEBUG, NOOPT, RELEASE.

Proprio come con `Target`, usiamo una calcolatrice HEX quindi convertiamo in decimale:

`0x80000042` convertito in decimale diventa `Misc` -> `Debug` -> `DisplayLevel` -> `2147483714`

Una volta fatto, il tuo config.plist dovrebbe assomigliare a questo:

![](../images/troubleshooting/debug-md/debug.png)

## Disabilitazione di tutti i log

Per rimuovere completamente la registrazione dei file e eseguire il debug dei messaggi, è sufficiente sostituire tutti i file OpenCore con quelli in RELEASE come abbiamo fatto prima nella sezione [Cambio dei File](#file-swap).

Infine, per rimuovere la scrittura su disco, impostare quanto segue:

* AppleDebug = `NO`
* ApplePanic = `NO`
* Target = `0`
