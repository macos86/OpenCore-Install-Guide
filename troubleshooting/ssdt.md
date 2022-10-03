# Problemi legati alla compilazione SSDT

[[toc]]

## Correzione per SSDTTime: `Could not locate or download iasl!`

Ciò è solitamente dovuto a una versione obsoleta di Python; prova ad aggiornarlo o aggiungi iasl alla cartella degli script per SSDTTime:

* [iasl versione macOS e Linux](https://github.com/macos86/ACPI-Tools-Binaries-generator/releases)
* [iasl versione Windows](https://acpica.org/downloads/binary-tools)

## Non posso eseguire`acpidump.efi`

Apri la shell OpenCore:

```
shell> fs0: //inserire il drive aduguato

fs0:\> dir //per verificare che questa sia la directory giusta

  Directory of fs0:\

   01/01/01 3:30p  EFI
fs0:\> cd EFI\OC\Tools //nota che è con le backslash

fs0:\EFI\OC\Tools> acpidump.efi -b -n DSDT -z
```

## iASL warning, only X unresolved

Se provi a decompilare il tuo DSDT e ottieni un errore simile a questo:

```
iASL Warning: There were 19 external control methods found during disassembly, but only 0 were resolved (19 unresolved)
```

Ciò accade quando una tabella ACPI richiede il resto per un corretto riferimento, non accetta la creazione di DSDT poiché la stiamo utilizzando solo per la creazione di pochi SSDT selezionati. Per coloro che sono preoccupati, puoi eseguire quanto segue:

```
iasl * [insersci tutti i file ACPI files qui]
```

## Decompiliation Error

![](../images/troubleshooting/troubleshooting-md/decompile-error.png)

```
Loading Acpi table from file iASLAwjHrs.aml
Acpi table [DSDT] successfully installed and loaded
Pass 1 parse of [DSDT]
```

Questo è un errore comune nei DSDT che hanno metodi non supportati da MaciASL, la cosa migliore da fare in questo caso, è cancellare MaciASL e assicurarsi di scaricarla dalla repo Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases/latest)

## Invalid character (0x3D), expecting ASL keyword or name

![](../images/troubleshooting/troubleshooting-md/invalid-parse.png)

Similmente all'errore superiore, stai usando una vecchia versione di MaciASL. Assicurati di star usando l'ultima versione dalla repo Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases/latest)

## Syntax error, unexpected PARSEOP_ONE, expecting '('

![](../images/troubleshooting/troubleshooting-md/invalid-parse.png)

Similmente agli errori superiori, stai usando una vecchia versione di MaciASL. Assicurati di star usando l'ultima versione dalla repo Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases/latest)
