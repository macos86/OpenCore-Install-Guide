# VMware Fusion

## Requisiti

* VMware Fusion (su mac genuini o Hackintosh)
* qemu-img
  * Lo ottieni installando [qemu](https://www.qemu.org) (`brew install qemu` per installarlo da [brew](https://brew.sh)).
  * Puoi anche usare [vboxmanage](./virtualbox.md#convertire-il-file-di-installazione)

## Scaricare il File di installazione

Puoi usare [macrecovery](https://github.com/acidanthera/OpenCorePkg/tree/master/Utilities/macrecovery): ecco la [guida](/installer-guide/winblows-install.md#scaricare-macos)) per ottenere il file .dmg (il file .chunklist non ci servirà).

## Convertire il File di Installazione

VMware non può leggere una immagine disco dmg, perciò dovremo convertirla come vmdk.
Con una conversione, creiamo una nuova immagine disco:

```bash
### Cambia "BaseSystem" se il nome del .dmg differisce
qemu-img convert BaseSystem.dmg -O vmdk BaseSystem.vmdk
```

Questo comando converte la nostra immagine disco dmg in un disco vmdk.

## Installare macOS Big Sur su VMware Fusion

1. Dopo, avvia VMware Fusion. Dovresti vedere la homepage. Se no, chiudi tutte le finestre aperte e seleziona `File` > `Nuovo` dalla barra del menù.
  ![](/images/extras/fusion/homepage.png)
2. Seleziona l'opzione "Crea una macchina virtuale personalizzata", e seleziona la versione che vuoi usare.
  ![](/images/extras/fusion/choose-os.png)
3. Seleziona "Usa un disco virtuale già esistente" nello schermo sottostante.
  ![](/images/extras/fusion/choose-virtual-disk.png)
4. Dopo, clicca su "Scegli un disco virtuale" e seleziona il nostro `BaseSystem.vmdk` creato precedentemente.
  ![](/images/extras/fusion/choose-virtual-disk-finder.png)
  Una volta fatto, dovrebbe apparire come qui.
  ![](/images/extras/fusion/choose-virtual-disk-filled.png)
5. Seleziona Continua, dopo clicca su "Personalizza Impostazioni".
  Once done, you should arrive at a screen that looks like this.
  ![](/images/extras/fusion/vm-settings-home.png)
6. Aggiungi un secondo disco rigido (minimo di 100 GB) dove installare macOS.
7. Sucessivamente devi avviare il selettore di avvio, mostrato sotto. Per farlo, seleziona tra le opzioni di avvio "Avvia sul Firmware" e poi seleziona il corretto disco ("EFI VMware Virtual SATA Hard Drive (0.0)" nell'esempio). La macchina dovrebbe avviare la recovery online.
  ![](/images/extras/fusion/vm-boot-manager.png)
8. Completa l'installazione come in ogni altro sistema.
  The installation is complete, and you are at the Welcome screen, select "Virtual Machine" > "Shut Down" from the menu bar.
  If needed, add your prepared EFI to the EFI partition on the device, then eject it.
  Place the drive back in your hack and boot normally. You now have Big Sur!

## Aggiungere le Patch Video

In alcuni casi potresti non avere l'accelerazione grafica. Possiamo provare un fix su macOS 11.0, Big Sur ([based on](https://kb.vmware.com/s/article/81657)):

* Chiudi VMware Fusion. Trova la cartella "macOS.vmwarevm" (o come l'hai chiamato quando hai salvato la macchina virtual) nel Finder, mouse destro e seleziona > "Mostra Contenuto Pacchetto".
  Il risultato potrebbe essere quello dell'immagine sottostante.
  ![](/images/extras/fusion/vm-folder.png)
* Apri il file .vmx (non vmxf o vmx.lck) in TextEdit. Dovresti ottenere una cosa simile:
  ![](/images/extras/fusion/vmx-initial.png)
* Aggiungi le seguenti linee:

  ```
  appleGPU0.present = "True"
  svga.present = "FALSE"
  ```
