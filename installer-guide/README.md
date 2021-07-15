# Creare l'Installer

Requisiti:

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases), altamente raccomandato l'uso della versione di debug per avere più informazioni
* [ProperTree](https://github.com/corpnewt/ProperTree) per modificare i file .plist (OpenCore Configurator è un altro strumento, ma è veramente poco aggiornato e le versioni di Mackie sono famose per corrompersi. **Evita questo tipo di strumenti ad ogni costo!**).
* Devi rimuovere Clover interamente dal tuo sistema se vuoi usare OpenCore come bootloader principale. Mantieni un backup della tua EFI di Clover. Guarda qui cosa serve che sia pulito: [Clover Conversion (EN)](https://github.com/dortania/OpenCore-Install-Guide/tree/master/clover-conversion)

## Installer Online vs Offline

Gli installer Offline hanno una copia completa di macOS, mentre gli installer Online contengono solo un'immagine di recovery (~500MB) che scarica dai server Apple il resto dell'immagine una volta avviato.

* [Offline](./mac-install.md)
  * Supporto da OS X 10.10 alla versione attuale
  * Possibile farlo solo in macOS
  * Windows/Linux non hanno i driver APFS/HFS necessari per assemblare un'installer completo
  * Supporto sia per UEFI che per legacy
* [Online](./mac-install-recovery.md)
  * Supporto da OS X 10.4 alla versione attuale
  * Possibile farlo da un qualsiasi sistema
  * Richiede una connessione internet tramite un adattatore di rete supportato da macOS (esclusi 10.4-10.7)
  * Supporto sia per UEFI che per legacy (solo Windows, per ora)

::: warning Note

* **Nota su macOS 11, Big Sur**: Dato che questo sistema è parecchio nuovo, ci sono ancora dei problemi in certi sistemi che non si possono risolvere. Per maggiori informazioni, guarda qui: [OpenCore e macOS 11: Big Sur](/extras/big-sur.md)
  * Per gli utenti le prime volte raccomandiamo macOS 10.15, Catalina
* **Nota sulle GPU Nvidia**: Ricordati di verificare se il tuo hardware supporta sistemi nuovi, vedi [Limitazioni Hardware](/macos-limits.md)
* Ricorda questo metodo richiede una connessione ad Internet durante l'installazione, cosa non scontata dato che per sistemi particolari potrebbe non funzionare
:::
::: danger ATTENZIONE
Da macOS 11.3, [XhciPortLimit non funziona e causa dei bootloop](https://github.com/dortania/bugtracker/issues/162). Suggeriamo di disabilitare questo quirk (lo trovi su Kernel > Quirks > XhciPortLimit)
:::
