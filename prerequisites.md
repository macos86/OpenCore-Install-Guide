# Prerequisiti

Prima di iniziare seriamente a impostare un sistema basato su OpenCore, dovremmo controllare un paio di cose.

1. <span style="color:red">_**[CRUCIALE]**_</span> Tempo e pazienza.
   * Non iniziare a lavorare se hai scadenze o importanti lavori. Non puoi mettere la stessa fiducia negli Hackintosh rispetto alle macchine già funzionanti.
2. <span style="color:red">_**[CRUCIALE]**_</span> **CONOSCERE IL TUO HARDWARE**
   * Il nome della tua CPU e la sua generazione
   * Le tue GPU
   * I tuoi dispositivi di archiviazione (HDD/SSD, configurazione NVMe/AHCI/RAID/IDE)
   * Il tuo modello di Desktop/Laptop se è un computer OEM non assemblato
   * Il tuo **chipset Ethernet**
   * I tuoi chipset WLAN/Bluetooth
3. <span style="color:red">_**[CRUCIALE]**_</span> **UNA CONOSCENZA BASE SU COME USARE LE LINEE DI COMANDO E UN TERMINALE/PROMPT DEI COMANDI**
   * Questo non è solo [CRUCIALE], è la base di tutta la guida. Non possiamo aiutarti se non conosci come si fa `cd` verso una directory o come cancellare un file.
4. <span style="color:red">_**[CRUCIALE]**_</span> Una macchina compatibile come indicato nella sezione _**Compatibilità**_.
   * [Limitazioni Hardware](macos-limits.md)
5. <span style="color:red">_**[CRUCIALE]**_</span> Come minimo:
   * USB di 16GB se userai macOS per creare la USB
   * USB di 4GB se userai Windows o Linux per creare la USB
6. <span style="color:red">_**[CRUCIALE]**_</span> Una **connessione Ethernet** (nessun WiFi dongle, gli adattatori Ethernet USB potrebbero funzionare in dipendenza al supporto macOS) e devi conoscere il tuo modello di scheda di rete
   * Devi avere anche una porta Ethernet fisica, o un dongle/adattatore Ethernet compatibile con macOS. Se hai una [scheda WiFi compatibile](https://dortania.github.io/Wireless-Buyers-Guide/), puoi usare anche quella.
     * Nota: la maggioranza delle schede WiFi non sono supportate da macOS
   * Per chi non può usare l'Ethernet, ma ha un telefono Android, può connetterlo al WiFi e dopo collegarlo in tethering con una USB con [HoRNDIS](https://joshuawise.com/horndis#available_versions).
7. <span style="color:red">_**[CRUCIALE]**_</span> **Un sistema operativo degno di questo nome:**
   * Può essere:
     * macOS (versioni recenti)
     * Windows (Windows 10, 1703 o più recente)
     * Linux con Python 3
   * Per utenti Windows e Linux, **15GB** di spazio sul disco. Su Windows, il disco di sistema (C:) deve avere almeno **15GB** di spazio libero ulteriore.
   * Per utenti macOS, **30GB** di spazio sul disco di sistema.
   * La maggior parte dei tool dovranno aver [installato Python](https://www.python.org/downloads/)
