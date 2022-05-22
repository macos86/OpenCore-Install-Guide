# Problemi vari

Problemi vari che non ruotano attorno a macOS stesso come per esempio il multiboot.

[[toc]]

## Il disco di avvio di Windows non riesce a vedere le unità APFS

* Driver BootCamp obsoleti (generalmente la ver 6.0 verrà fornita con brigadier, BootCamp Utility in macOS fornisce una versione più recente come la ver 6.1). CorpNewt ha anche biforcato il brigadier risolvendo anche questi problemi: [Brigadier di CorpNewt](https://github.com/corpnewt/brigadier)

## Risoluzione errata con OpenCore

* Segui [Fixing Resolution and Verbose (EN)](/OpenCore-Post-Install/cosmetic/verbose.md) per la corretta configurazione, imposta "UIScale" su "02" per HiDPI
* Gli utenti hanno anche notato che l'impostazione di `ConsoleMode` su Max a volte fallisce, lasciarlo vuoto può aiutare

## Impossibile trovare l'unità Windows/BootCamp fra i selettori

Con OpenCore, dobbiamo notare che non sono supportate le installazioni legacy di Windows, solo UEFI. La maggior parte delle installazioni ora sono basate su UEFI, ma quelle effettuate da BootCamp Assistant sono legacy, quindi dovrai trovare altri mezzi per creare un programma di installazione (Google è tuo amico). Ciò significa anche che anche le partizioni MasterBootRecord/Hybrid sono danneggiate, quindi dovrai formattare l'unità su cui desideri installare con DiskUtility. Consulta la [Multiboot Guide (EN)](/OpenCore-Multiboot/) sulle migliori pratiche

Ora per passare alla risoluzione dei problemi:

* Assicurati che "Misc -> Security -> ScanPolicy" sia impostato su "0" per mostrare tutte le unità
* Abilita `Misc -> Boot -> Hideself` quando il bootloader di Windows si trova sulla stessa unità

## La selezione del disco di avvio non si applica correttamente

Se si verificano problemi con il disco di avvio che applica correttamente la nuova voce di avvio, molto probabilmente è causato da un "DevicePathsSupported" mancante nel registro di I/O. Per risolvere questo problema, assicurati di utilizzare "PlatformInfo -> Automatic -> True"

Esempio di "DevicePathsSupported" mancante:

* [Default DevicePath match failure due to different PciRoot #664](https://github.com/acidanthera/bugtracker/issues/664#issuecomment-663873846)

## L'avvio di Windows provoca arresti anomali Bluescreen o crash di Linux

Ciò è dovuto a problemi di allineamento, assicurati che "SyncRuntimePermissions" sia abilitato sui firmware che supportano i MAT. Controlla i tuoi log se il tuo firmware supporta le tabelle degli attributi di memoria (generalmente visualizzate sui firmware 2018 e successivi)

Codice di errore comune di Windows:

* `0xc000000d`

## Errore di avvio di Windows: "OCB: StartImage failed - Already started"

Ciò è dovuto al fatto che OpenCore si confonde quando tenta di avviare Windows e pensa accidentalmente che stia avviando OpenCore. Questo può essere evitato spostando Windows sulla propria unità *o* aggiungendo un percorso di unità personalizzato in BlessOverride. Vedere [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) per maggiori dettagli.

## Incoerenza temporale tra macOS e Windows

Ciò è dovuto al fatto che macOS utilizza l'Ora Universale mentre Windows si basa su Greenwich, quindi dovrai forzare un sistema operativo a un modo diverso di misurare il tempo. Consigliamo vivamente di modificare Windows poiché è molto meno distruttivo e doloroso:

* [Installa l'utility Bootcamp (EN)](/OpenCore-Post-Install/multiboot/bootcamp.md)
* [Modificare il registro di Windows (EN)](https://superuser.com/q/494432)
