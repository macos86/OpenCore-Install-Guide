# Creare la USB

* Versione supportata: 0.6.8

Requisiti:

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases), altamente raccomandato l'uso della versione di debug per avere più informazioni
* [ProperTree](https://github.com/corpnewt/ProperTree) per modificare i file .plist (OpenCore Configurator è un altro strumento, ma è veramente poco aggiornato e le versioni di Mackie sono famose per corrompersi. **Evita questo tipo di strumenti ad ogni costo!**).
* Devi rimuovere Clover interamente dal tuo sistema se vuoi usare OpenCore come bootloader principale. Mantieni un backup della tua EFI di Clover. Guarda qui cosa serve che sia pulito: [Clover Conversion (EN)](https://github.com/dortania/OpenCore-Install-Guide/tree/master/clover-conversion)

## Installer Online vs Offline

Gli installer Offline hanno una copia completa di macOS, mentre gli installer Online contengono solo un'immagine di recovery (~500MB) che scarica dai server Apple il resto dell'immagine una volta avviato.

* Offline
  * Possibile farli solo in macOS
  * Windows/Linux non hanno i driver APFS/HFS necessari per assemblare un'installer completo
* Online
  * Possibile farlo da macOS/Linux/Windows
  * Richiede una connessione internet tramite un adattatore di rete supportato da macOS sull'Hackintosh

## Creare l'installer

In dipendenza da che sistema operativo stai usando, guarda la tua specifica sezione per costruire la USB:

* [Utenti macOS](../installer-guide/mac-install.md)
  * Supporto da OS X 10.4 alla versione attuale
  * Supporto sia per installazioni legacy e UEFI
* [Utenti Windows](../installer-guide/winblows-install.md)
  * Supporto da OS X 10.7 alla versione attuale
  * Solo installer Online
  * Supporto sia per installazioni legacy e UEFI
* [Utenti (UEFI) Linux](../installer-guide/linux-install.md)
  * Supporto da OS X 10.7 alla versione attuale
  * Solo installer Online
  * Fatto per macchine che supportano l'avvio UEFI
