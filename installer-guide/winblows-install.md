# Creare l'Installer su Windows

* Versione supportata: 0.6.8

Poiché non hai bisogno di macOS per usare OpenCore, alcuni utenti preferiscono avere un'aggiornamento su come aggiornare macOS.

Per iniziare avrai bisogno di:

* USB da 4GB

* Per USB più grandi di 16 GB per formattarla in FAT32 usa il [metodo Rufus](#metodo-rufus)

* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  * Richiederà [l'installazione di Python](https://www.python.org/downloads/)

## Scaricare macOS

Ottenere vecchi installer è superfacile, per prima cosa trascina una copia di [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases) e vai in `/Utilities/macrecovery/`. Dopo copia il percorso della cartella:

![](../images/installer-guide/winblows-install-md/file-path.png)

Da qui, apri una finestra del Prompt dei Comandi e cd fino alla cartella macrecovery copiata prima:

```sh
cd Paste_Folder_Path
```

![](../images/installer-guide/winblows-install-md/command-prompt.png)

Ora avvia uno dei seguenti comandi a seconda della versione di macOS che tu vuoi (NOTA che questo script si basa su [Python](https://www.python.org/downloads/), installalo se non l'hai fatto):

```sh
# Lion(10.7):
python macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# Mountain Lion(10.8):
python macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# Mavericks(10.9):
python macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# Yosemite(10.10):
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# El Capitan(10.11):
python macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# Sierra(10.12):
python macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# High Sierra(10.13)
python macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# Mojave(10.14)
python macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# Catalina(10.15)
python macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Latest version
# ie. Big Sur(11)
python macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

* **Nota su macOS 11, Big Sur**: Dato che questo sistema è parecchio nuovo, ci sono ancora dei problemi in certi sistemi che non si possono risolvere. Per maggiori informazioni, guarda qui: [OpenCore e macOS 11: Big Sur](../extras/big-sur.md)
  * Per gli utenti le prime volte raccomandiamo macOS 10.15, Catalina
* **Nota sulle GPU Nvidia**: Ricordati di verificare se il tuo hardware supporta sistemi nuovi, vedi [Limitazioni Hardware](../macos-limits.md)

Ci metterà un po' di tempo, tuttavia quando hai finito dovresti avere i file o BaseSystem o RecoveryImage:

![](../images/installer-guide/winblows-install-md/macrecovery-done.png)

| BaseSystem | RecoveryImage |
| :--- | :--- |
|![](../images/installer-guide/winblows-install-md/basesystem-example.png) | ![](../images/installer-guide/winblows-install-md/macrecovery-after.jpg) |

Ora con l'installer scaricato, dobbiamo formattare la USB.

## Creare l'installer

Qui dobbiamo formattare la nostra USB e aggiungerci macOS, abbiamo 2 optioni:

* [Metodo Gestione Disco](#metodo-gestione-disco)
  * Basato su interfaccia grafica, metodo più semplice
  * Solo sistemi UEFI supportati (2012+)
* [Metodo Rufus](#metodo-rufus)
  * Basato su interfaccia grafica, metodo più semplice
  * Per USB più grandi (16GB+)
* [Metodo diskpart](#metodo-diskpart)
  * Basato su linea di comando, più lavoro da fare
  * Richiesto per sistemi legacy (non-UEFI, prima del 2012)

### Metodo Gestione Disco

Semplicemente apri Gestione Disco e formatta la USB come FAT32:

1. Click destro sul pulsante Start sulla barra delle applicazioni e seleziona Gestione Disco.
2. Dovresti vedere tutte le tue partizioni e i dischi. Sulla metà bassa, ci sono i tuoi dispositivi. Trova la tua USB.
3. Formattala in modo da avere una partizione in FAT32.

* Se hai più partizioni nella USB, fai un click destro su ogni partizione e seleziona Cancella Volume (Questo rimuoverà tutti i dati, assicurati di aver fatto un backup e di rimuovere solo le partizioni della tua USB)
  * Fai un click destro sullo spazio non allocato e crea un volume semplice. Assicurati che sia formattata in FAT32 e falla grande almeno un gigabyte or due. Chiamala "EFI".
* Se non è il caso, fai un click destro sulla partizione della USB e clicca su Formatta e impostala in FAT32.

![](../images/installer-guide/winblows-install-md/DiskManagement.jpg)

Dopo, vai alla radice della USB e crea una cartella chiamata `com.apple.recovery.boot`. Dopo muovi i file BaseSystem o RecoveryImage scaricati prima. Assicurati di copiare sia il file .dmg che quello .chunklist nella cartella:

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Ora prendi OpenCorePkg, scaricato prima, e aprilo:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Come vedi ci sono le cartelle IA32 (CPU a 32 Bit) e X64 (CPU a 64 Bit), secgli quella più appropriata per il tuo hardware e aprila. Dopo trascina la cartella EFI dentro la radice della USB vicino a com.apple.recovery.boot. Alla fine questo dovrebbe essere il risultato finale:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

### Metodo Rufus

1. Scarica [Rufus](https://rufus.ie/it/)
2. Seleziona la selezione boot come non avviabile
3. Seleziona il File System come Large FAT32
4. Seleziona Avvia
5. Cancella tutti i file autorun nella partizione USB

![](../images/installer-guide/winblows-install-md/format-usb-rufus.png)

Dopo, vai alla radice della USB e crea una cartella chiamata `com.apple.recovery.boot`. Dopo muovi i file BaseSystem o RecoveryImage scaricati prima. Assicurati di copiare sia il file .dmg che quello .chunklist nella cartella:

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Ora prendi OpenCorePkg, scaricato prima, e aprilo:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Come vedi ci sono le cartelle IA32 (CPU a 32 Bit) e X64 (CPU a 64 Bit), secgli quella più appropriata per il tuo hardware e aprila. Dopo trascina la cartella EFI dentro la radice della USB vicino a com.apple.recovery.boot. Alla fine questo dovrebbe essere il risultato finale:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

### Metodo diskpart

::: details Metodo diskpart

Premi Windows + R e digita `diskpart`.

Ora usa i seguenti comandi:

```sh
# List available disks
list disk
# Select your disk(ie. disk 1)
select disk 1
# Format the drive
clean
# Convert to GPT
# Due to an odd bug with BOOTICE and DuetPkg, MBR disks will fail to boot
convert gpt
# Create a new partition
create partition primary
# Select your partition
# Running clean ensures we only have 1 partition so it will be "partition 1"
select partition 1
# Format the drive as FAT32
format fs=fat32 quick
# Assign a drive letter(ie. Drive E, ensure it's not currently in use)
ASSIGN LETTER=E
```

Dopo, vai alla radice della USB e crea una cartella chiamata `com.apple.recovery.boot`. Dopo muovi i file BaseSystem o RecoveryImage scaricati prima. Assicurati di copiare sia il file .dmg che quello .chunklist nella cartella:

![](../images/installer-guide/winblows-install-md/com-recovery.png)

Ora prendi OpenCorePkg, scaricato prima, e aprilo:

![](../images/installer-guide/winblows-install-md/base-oc-folder.png)

Come vedi ci sono le cartelle IA32 (CPU a 32 Bit) e X64 (CPU a 64 Bit), secgli quella più appropriata per il tuo hardware e aprila. Dopo trascina la cartella EFI dentro la radice della USB vicino a com.apple.recovery.boot. Alla fine questo dovrebbe essere il risultato finale:

![](../images/installer-guide/winblows-install-md/com-efi-done.png)

::: details Setup Installer Legacy

Se il tuo firmware non supporta UEFI, vedi la sezione qua sotto:

Per iniziare, abbiamo bisogno di:

* [7-Zip](https://www.7-zip.org/)
* [BOOTICE](https://www.majorgeeks.com/files/details/bootice_64_bit.html)
* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

Dopo, apri BOOTICE e assicurati che sia selezionato il disco corretto.

![](../images/installer-guide/winblows-install-md/bootice.png)

Dopo, seleziona "Process MBR" e dopo "Restore MBR" e seleziona il file **boot0** da `Utilities/LegacyBoot/` nel OpenCorePkg:

| Ripristino MBR | Ripristino file boot0 |
| :--- | :--- |
| ![](../images/installer-guide/winblows-install-md/restore-mbr.png) | ![](../images/installer-guide/winblows-install-md/restore-mbr-file.png) |

Dopo torna alla schermata principale e seleziona "Process PBR", dopo "Restore PBR". Da qui, scegli il file **Boot1f32** da `Utilities/LegacyBoot/` sempre nel OpenCorePkg:

| Ripristino PBR | Ripristino file boot1f32 |
| :--- | :--- |
| ![](../images/installer-guide/winblows-install-md/restore-pbr.png) | ![](../images/installer-guide/winblows-install-md/restore-pbr-file.png) |

Una volta finito, torna alla tua USB e fai un'ultima cosa. Trascina il file **bootx64**(CPU a 64 Bit) o **bootia32**(CPU a 32 Bit) da `Utilities/LegacyBoot/` e piazzalo nella radice della USB. **Rinominalo come boot** per assicurarti che DuetPkg funzioni correttamente:

![](../images/installer-guide/winblows-install-md/final-boot-file.png)

:::

## Ora che tutto questo è fatto, vai a [Configurare la EFI](./opencore-efi.md) per finire il tuo lavoro
