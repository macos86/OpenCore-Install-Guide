# Processo di Installazione

Ora sei pronto per salvare e mettere la tua EFI in EFI/OC.

Per chi ha problemi all'avvio, assicurati di aver letto la [sezione di risoluzione dei problemi](/troubleshooting/) e vedi se le tue domande hanno trovato una risposta. Altrimenti abbiamo un sacco di risorse a tua disposizione:

* [AMD OS X Discord](https://discord.com/invite/EfCYAJW)
* [r/Hackintosh Discord (Solo Intel)](https://discord.gg/2QYd7ZT)
* [r/Hackintosh Subreddit](https://www.reddit.com/r/hackintosh/)

## Promemoria del Config

### Utenti HP

* Kernel -> Quirks -> LapicKernelPanic -> True
  * Dovrai farlo altrimenti rischi un kernel panic su LAPIC
* UEFI -> Quirks -> UnblockFsConnect -> True

### Utenti Dell

Su Skylake e sucessivi:

* Kernel -> Quirk -> CustomSMBIOSGuid -> True
* PlatformInfo -> UpdateSMBIOSMode -> Custom

## Processo d'installazione

Ora che hai finito di impostare OpenCore, puoi finalmente avviare, principali cose da ricordare:

* Abilita le impostazioni del BIOS ottimali per macOS
* Leggi la [Guida Multiboot per OpenCore](/OpenCore-Multiboot/) e anche [Impostare LauncherOption](/OpenCore-Post-Install/multiboot/bootstrap.md)
  * Principalmente per coloro che stanno avviando un singolo disco con più sistemi
* Tieni sottomano la pagina di [Risoluzione dei Problemi - Generale](/troubleshooting/)
* Leggi anche la pagina riguardo all'[avvio di macOS](/troubleshooting/boot.md)
  * Può aiutare chi installa per la prima volta a capire dove sono bloccati
* E un sacco di pazienza

## Controlla due volte il tuo lavoro

L'ultima cosa da fare prima di avviare è controllare come è impostata la EFI:

Buona EFI          |  Cattiva EFI
:-------------------------:|:-------------------------:
![](./images/installation/install-md/good-efi.png)  |  ![](./images/installation/install-md/bad-efi.png)
La cartella EFI è nella partizione EFI | La cartella EFI non c'è
I file ACPI sono compilati (.aml) | I file ACPI non sono compilati (.dsl)
Il DSDT non è incluso | Il DSDT è incluso
Rimossi i Driver non necessari (.efi) | Lasciati tutti i Driver di default
Rimossi i Tool non necessari (.efi) | Lasciati tutti i Tool di default
Tutti i file nella cartella Kexts finiscono con .kext | Inclusi i file sorgente e altre cartelle
config.plist si trova in EFI/OC | Il file .plist non è né rinominato né messo il file nella cartella corretta
Usati i kext necessari | Scaricato ogni kext elencato

## Avviare la USB con OpenCore

Ora sei finalmente pronto per mettere la chiavetta nel tuo computer e spegnerlo. Ricordati che la maggior parte dei laptop e alcuni desktop avvieranno comunque il disco interno con Windows, perciò dovrai scegliere manualmente OpenCore dal menù "boot" nel BIOS. Dovrai cercare nel manuale oppure usare un po' Google per trovare quale tasto Fn accede al menù del BIOS (es. Esc, F2, F10 o F12)

Una volta avviata la USB, dovrai vedere le seguenti opzioni:

1. Windows
2. macOS Base System (External) / Install macOS Big Sur (External) / *Nome della USB* (External)
3. OpenShell.efi
4. Reset NVRAM

Per noi, l'**Opzione 2.** è quella interessata. In dipendenza di com'è stato fatto l'installer, potrebbe apparire anche come **"macOS Base System (External)"**, **"Install macOS Big Sur (External)"** o **"*Nome della USB* (External)"**

## macOS Installer

Perciò quando hai finalmente avviato l'installer, inizia l'installazione di macOS! Ora che sei a questo punto, ricordati questi punti chiave:

* I dischi in cui vuoi installare macOS **devono** essere Schema Partizioni GUID **e** APFS
  * High Sierra su un HDD e tutti gli utenti Sierra dovranno usare macOS Esteso (HFS+)
* Il disco **deve** avere anche una partizione da 200MB
  * Di default, macOS la creerà da solo se inizializzi un intero disco
  * Vedi [Multiboot Guide (EN)](/OpenCore-Multiboot/) per maggiori informazioni riguardo al partizionamento di un disco Windows

Una volta iniziata l'installazione, dovrai aspettare fino al riavvio. Una volta avviato ancora su OpenCore, non dovrai selezionare la tua USB recovery/installer, ma il macOS installer per continuare l'installazione. Dovresti avere il logo della mela, e dopo qualche minuto un timer sotto che dice "x minutei rimanenti". Questo potrebbe essere un buon momento per farsi uno snack o un drink perché ci metterà un po'. Si riavvierà un paio di volte, ma se tutto andra bene, dovresti finalmente arrivare allo schermata "Configura il tuo Mac"

Sei dentro! 🎉
Dovrai passare alle pagine di Post-Installation per finire la configurazione del tuo sistema.
