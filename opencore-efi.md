# Aggiungere i file di base

Per impostare la struttura di OpenCore, dovrai prendere la EFI trovata nei [rilasci di OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases/). Nota che saranno nelle cartelle IA32 o X64, rispettivamente per i Firmware a 32-bit e a 64-bit:

![](./images/installer-guide/opencore-efi-md/ia32-x64.png)

Riguardo a Versione DEBUG vs Versione RELEASE:

| DEBUG | RELASE |
| :-----: | :------: |
| Può effettuare grandi debug contro i problemi di avvio, tuttavia può aggiungere un po' di attesa all'avvio (tipo 3-5 secondi per arrivare al picker). Una volta installato puoi facilmente traslare alla sezione RELEASE | Tempi di avvio più veloci, tuttavia non provvede informazioni utili per la risoluzione di problemi come invece fa la versione di DEBUG. |

Una volta scaricata, posiziona la cartella EFI (da OpenCorePkg) nella radice della tua partizione EFI:

![](./images/installer-guide/opencore-efi-md/efi-moved.png)

::: tip Note
Se usate l'installazione via Recovery, dovete copiare la cartella EFI nella radice della partizione primaria della chiavetta
:::

Ora apriamo la nostra EFI e vediamo che c'è al suo interno:

![](./images/installer-guide/opencore-efi-md/base-efi.png)

Ora noterai che ci sono un sacco di file nelle cartelle `Drivers` e `Tools`, la maggior parte di questi non ci serviranno (Per maggiori dettagli vedi sotto):

| Driver | Stato | Descrizione |
| :--- | :--- | :--- |
| OpenUsbKbDxe.efi | <span style="color:#30BCD5"> Optionale </span> | Richiesto per i sistemi non UEFI (prima del 2012) |
| OpenPartitionDxe.efi | ^^ | Richiesto per avviare la recovery di macOS 10.7-10.9 |
| OpenRuntime.efi | <span style="color:red"> Richiesto </span> | Richiesto per eseguire correttamente le operazioni |

::: details Più informazioni riguardo ai driver

* AudioDxe.efi
  * Non relazionato col supporto audio in macOS
* CrScreenshotDxe.efi
  * Usato per fare degli screenshot nel UEFI, non necessario per noi
* HiiDatabase.efi
  * Usato per sistemare l'interfaccia grafica in Sandy Bridge o meno recenti per tool come OpenShell.efi
  * Non richiesto per avviare
* NvmExpressDxe.efi
  * Usato da Haswell o più vecchi quando non ci sono driver NVMe nel firmware
  * Non usare se non sai che stai facendo
* OpenCanopy.efi
  * Questo è la interfaccia grafica opzionale di OpenCore, spiegheremo come impostarla in [Post Install (EN)](/OpenCore-Post-Install/cosmetic/gui.md) perciò rimuovila per ora
* OpenHfsPlus.efi
  * Driver Open Source per il file system HFS Plus, è un po' lento perciò non lo raccomandiamo se non sai che stai facendo.
* OpenPartitionDxe.efi
  * Richiesto per avviare la recovery da OS X 10.7 a 10.9
    * Nota: gli utenti OpenDuet (senza UEFI) avranno il driver integrato, perciò in quel caso non richiesto
* OpenUsbKbDxe.efi
  * Usato come picker di OpenCore nei **sistemi legacy che usano DuetPkg**, [non raccomandato e veramente rognoso in Ivy Bridge o più nuovi](https://applelife.ru/threads/opencore-obsuzhdenie-i-ustanovka.2944066/page-176#post-856653)
* Ps2KeyboardDxe.efi + Ps2MouseDxe.efi
  * Ovvio che devi usarlo quando è necessario, la tastiera e il mouse USB non lo necessitano
  * Reminder: PS2 ≠ USB
* UsbMouseDxe.efi
  * Idea simile a OpenUsbKbDxe, usato solo dai sistemi legacy che usano DuetPkg
* XhciDxe.efi
  * Usato da Sandy Bridge o più vecchi quando il driver XHCI non è nel firmware
  * Necessario se stai usando una scheda di espansione USB 3.0 in una macchina vecchia

:::

* **Per casi più ostici tieni i seguenti Tool:**

| Tool | Stato | Descrizione |
| :--- | :--- | :--- |
| OpenShell.efi | <span style="color:#30BCD5"> Opzionale </span> | Raccomandato per debug più semplice |

Una EFI pulita:

![](./images/installer-guide/opencore-efi-md/clean-efi.png)

Ora puoi mettere i **tuoi** driver firmware (.efi) nella cartella _Drivers_ e Kext/ACPI nelle rispettive cartelle. Vedi la sezione [Ottenere i File](/ktext.md) per maggiori info su quali file dovrai usare.

::: tip Nota
Non puoi usare i driver UEFI di Clover (EmuVariableUEFI, AptioMemoryFix, OsxAptioFixDrv, ...) su OpenCore! Vedi [Conversione driver Firmware](/clover-conversion/clover-efi.md) per maggiori informazioni sui driver supportati e quelli già inclusi con OpenCore.
:::

Ecco come una EFI **_può_** apparire (la tua potrebbe essere differente):

![](./images/installer-guide/opencore-efi-md/populated-efi.png)

::: warning Ricorda!

* Gli SSDT e il DSDT personalizzato (`.aml`) vanno nella cartella ACPI
* I Kext (`.kext`) vanno nella cartella kexts
* I driver firmware (`.efi`) vanno nella cartella drivers

:::
