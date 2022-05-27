# Problemi di boot di OpenCore

Problemi relativi all'avvio iniziale dell'USB stesso prima di scegliere di avviare il programma di installazione di macOS

[[toc]]

## Bloccato su uno schermo nero prima del selettore oppure si riavvia sempre

Questo è probabilmente un errore sul tuo firmware o su OpenCore, in particolare sta avendo problemi a caricare tutti i driver e presentare il menu. Il modo migliore per diagnosticare è tramite [Versione DEBUG di OpenCore](/extras/debug.md) e controllare i log se OpenCore è stato effettivamente caricato e, in tal caso, su cosa si è bloccato.

**Situazioni in cui OpenCore non veniva caricato**:

* Se non sono presenti log anche dopo aver impostato la versione DEBUG di OpenCore con Target impostato su 67, è probabile che si tratti di un problema di:
  * Struttura della cartella USB errata
  * Vedi [L'avvio di OpenCore si riavvia nel BIOS](#l-avvio-di-opencore-riavvia-nel-bios) per maggiori informazioni
  * Il firmware non supporta UEFI
  * Dovrai configurare DuetPkg, questo è trattato nelle pagine di installazione sia in [macOS](/installer-guide/mac-install.md) che in [Windows](/installer-guide/winblows-install.md)

**Situazioni in cui OpenCore è stato caricato**:

* Controlla l'ultima riga stampata nei tuoi log, probabilmente ci sarà un driver .efi che è stato caricato o una qualche forma di ASSERT
  * Per ASSERT, ti consigliamo di informare effettivamente gli sviluppatori di questo problema: [Bugtracker di Acidanthera](https://github.com/acidanthera/bugtracker)
  * **Problemi di caricamento di HfsPlus.efi:**
    * Prova a utilizzare [HfsPlusLegacy.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlusLegacy.efi)
    * Consigliato per CPU che non supportano RDRAND, principalmente rilevante per Ivy Bridge i3 di terza generazione e versioni precedenti
    * Un'altra opzione è [VBoxHfs.efi](https://github.com/acidanthera/AppleSupportPkg/releases/tag/2.1.7), tuttavia è molto più lenta della versione di HfsPlus
  * **Problemi di caricamento di HiiDatabase.efi:**
    * Probabilmente il tuo firmware supporta già HiiDatabase, quindi il driver è in conflitto. Rimuovi semplicemente il driver perché non ti serve.

## Bloccato su `no vault provided!`

Disattiva Vaulting nel tuo config.plist in `Misc -> Security -> Vault` impostandolo su:

* `Optional`

Se hai già eseguito `sign.command` dovrai ripristinare il file OpenCore.efi poiché la firma RSA-2048 a 256 byte è stata inserita. Puoi prendere una nuova copia di OpenCore.efi qui: [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

**Nota**: Vault e FileVault sono 2 cose separate, vedi [Sicurezza e FileVault](/OpenCore-Post-Install/universal/security.md) per maggiori dettagli

## Bloccato su `OC: Invalid Vault mode`

Questo è probabilmente un errore di ortografia, le opzioni in OpenCore fanno distinzione tra maiuscole e minuscole quindi assicurati di controllare attentamente, **O**ptional è il modo corretto per inserirlo in `Misc -> Security -> Vault`

## Non riesco a vedere le partizioni macOS

Cose principali da controllare:

* ScanPolicy impostato su "0" per mostrare tutte le unità
* Avere i driver del firmware appropriati come HfsPlus (Nota che ApfsDriverLoader non dovrebbe essere usato nella 0.5.8)
* Imposta UnblockFsConnect su True in config.plist -> UEFI -> Quirks. Necessario per alcuni sistemi HP
* Imposta **Modalità SATA**: `AHCI` nel BIOS
* Imposta `UEFI -> APFS` per vedere le unità basate su APFS:
  * **EnableJumpstart**: YES
  * **HideVerbose**: NO
  * Se si eseguono versioni precedenti di High Sierra (ad es. 10.13.5 o precedenti), impostare quanto segue:
    * **MinDate**: `-1`
    * **MinVersion**: `-1`

## Bloccato su `OCB: OcScanForBootEntries failure - Not Found`

Ciò è dovuto al fatto che OpenCore non è in grado di trovare alcuna unità con lo ScanPolicy corrente, l'impostazione su "0" consentirà di mostrare tutte le opzioni di avvio

* `Misc -> Security -> ScanPolicy -> 0`

## Bloccato su `OCB: failed to match a default boot option`

Stessa correzione con "OCB: `OCB: OcScanForBootEntries failure - Not Found`, OpenCore non è in grado di trovare alcuna unità con la ScanPolicy corrente, l'impostazione su "0" consentirà la visualizzazione di tutte le opzioni di avvio

* `Misc -> Security -> ScanPolicy -> 0`

## Bloccato su `OCB: System has no boot entries`

Stessa soluzione delle 2 precedenti:

* `Misc -> Security -> ScanPolicy -> 0`

## Bloccato su `OCS: No schema for DSDT, KernelAndKextPatch, RtVariable, SMBIOS, SystemParameters...`

Ciò è dovuto all'uso di un config di Clover in OpenCore o all'utilizzo di un configuratore come Clover di Mackie e/o il configuratore OpenCore. Dovrai ricominciare da capo e fare una nuova configurazione o capire tutta la spazzatura che devi rimuovere dalla tua configurazione. **Questo è il motivo per cui non supportiamo i configuratori, sono noti per questi problemi**

* Nota: questi stessi problemi si verificheranno anche se mescoli configurazioni obsolete con versioni più recenti di OpenCore. Si prega di aggiornarli di conseguenza

## Bloccato su: Driver XXX.efi at 0 cannot be found`

Ciò è dovuto a una voce nel tuo config.plist, tuttavia non presente nel tuo EFI. Risolvere:

* Assicurati che il tuo EFI/OC/Drivers corrisponda al tuo config.plist -> UEFI->Drivers
  * In caso contrario, eseguire Cmd/Ctrl+R con OpenCore per eseguire nuovamente l'istantanea del file config.plist

Notare che le voci fanno distinzione tra maiuscole e minuscole.

## Ricezione di "Failed to parse real field of type 1"

Ciò è dovuto a un valore impostato come "real" quando non dovrebbe esserlo, generalmente dovuto a  Xcode che ha convertito "HaltLevel" per sbaglio:

```xml
<key>HaltLevel</key>
 <real>2147483648</real>
```

Per risolvere, cambia `real` con `integer`:

```xml
<key>HaltLevel</key>
 <integer>2147483648</integer>
```

## Non è possibile selezionare nulla nel selettore

Ciò è dovuto ad alcune cose:

* Driver della tastiera incompatibile:
  * Disabilita `PollAppleHotKeys` e abilita`KeySupport`, quindi rimuovi [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) dal tuo config.plist->UEFI->Drivers
  * Se quanto sopra non funziona, inverti: disabilita `KeySupport`, quindi aggiungi [OpenUsbKbDxe](https://github.com/acidanthera/OpenCorePkg/releases) al tuo config.plist->UEFI->Driver

* Driver della tastiera PS2 mancante (ignorare se si utilizza una tastiera USB):
  * Sebbene la maggior parte dei firmware lo includa per impostazione predefinita, alcuni laptop e PC meno recenti potrebbero comunque aver bisogno di [Ps2KeyboardDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases) per funzionare correttamente. Ricorda di aggiungere anche questo al tuo config.plist

## SSDT non vengono aggiunti

Con OpenCore, sono stati aggiunti alcuni controlli di sicurezza aggiuntivi intorno ai file ACPI, in particolare che l'intestazione della lunghezza della tabella deve essere uguale alla dimensione del file. Questo è in realtà causa di iASL quando hai compilato il file. Esempio di come trovarlo:

``` c
* Intestazione tabella originale:
*     Signature        "SSDT"
*     Length           0x0000015D (349)
*     Revision         0x02
*     Checksum         0xCF
*     OEM ID           "ACDT"
*     OEM Table ID     "SsdtEC"
*     OEM Revision     0x00001000 (4096)
*     Compiler ID      "INTL"
*     Compiler Version 0x20190509 (538510601)
```

Il valore `Length` e `checksum` è ciò che ci interessa, quindi se il nostro SSDT è effettivamente 347 byte, allora vogliamo cambiare `Length` in `0x0000015B (347)` (lo è `015B` in HEX)

Il modo migliore per risolvere effettivamente questo problema è prendere una copia più recente di iASL o la copia di Acidanthera di [MaciASL](https://github.com/acidanthera/MaciASL/releases) e rifare l'SSDT

* Nota: i MaciASL distribuiti da Rehabman sono soggetti alla corruzione di ACPI, evitarlo poiché non mantengono più i loro repository

## L'avvio di OpenCore riavvia nel BIOS

* Struttura delle cartelle EFI errata, assicurati che tutti i tuoi file OC si trovino in una cartella EFI situata sulla tua ESP (partizione di sistema EFI)

::: details Esempio di struttura di cartelle

![](../images/troubleshooting/troubleshooting-md/oc-structure.png)

:::

## OCABC: Incompatible OpenRuntime r4, require r10

OpenRuntime.efi obsoleto, assicurati che BOOTx64.efi, OpenCore.efi e OpenRuntime **siano tutti della stessa identica build**. Qualunque cosa non corrispondente interromperà l'avvio

* **Nota**: FwRuntimeServices è stato rinominato OpenRuntime con 0.5.7 e versioni successive

## Impossibile aprire l'immagine OpenCore Access Denied

Sui firmware dei dispositivi Microsoft Surface più recenti, il caricamento di OpenCore ora comporterà una violazione della sicurezza anche quando l'avvio protetto è disabilitato. Per risolvere questo problema, abilita `UEFI -> Quirks -> DisableSecurityPolicy` nel tuo config.plist. Vedi qui per maggiori informazioni: [Impossibile aprire l'immagine OpenCore - Access Denied # 1446](https://github.com/acidanthera/bugtracker/issues/1446)

## OC: Failed to find SB model disable halting on critical error

Questo è un errore di battitura, assicurati che nel tuo config.plist `Misc -> Secuirty -> SecureBootModel` sia impostato su Disable**d**
