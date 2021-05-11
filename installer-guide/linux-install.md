# Creazione dell'installer in Linux

Poiché non hai bisogno di macOS per usare OpenCore, alcuni utenti preferiscono avere un'aggiornamento su come aggiornare macOS.

Per iniziare avrai bisogno di:

* USB da 4GB+
* [macrecovery.py](https://github.com/acidanthera/OpenCorePkg/releases)
  
## Scaricare macOS

Ora per iniziare, cd dentro [la cartella di macrecovery](https://github.com/acidanthera/OpenCorePkg/releases) e usa uno dei seguenti comandi:

![](/images/installer-guide/legacy-mac-install-md/macrecovery.png)

```sh
# Sistema il comando a seconda della cartella corretta
cd ~/Downloads/OpenCore-0/Utilities/macrecovery/
```

Next, run one of the following commands depending on the OS you'd like to boot:

```sh
# Lion(10.7):
python ./macrecovery.py -b Mac-2E6FAB96566FE58C -m 00000000000F25Y00 download
python ./macrecovery.py -b Mac-C3EC7CD22292981F -m 00000000000F0HM00 download

# Mountain Lion(10.8):
python ./macrecovery.py -b Mac-7DF2A3B5E5D671ED -m 00000000000F65100 download

# Mavericks(10.9):
python ./macrecovery.py -b Mac-F60DEB81FF30ACF6 -m 00000000000FNN100 download

# Yosemite(10.10):
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000GDVW00 download

# El Capitan(10.11):
python ./macrecovery.py -b Mac-FFE5EF870D7BA81A -m 00000000000GQRX00 download

# Sierra(10.12):
python ./macrecovery.py -b Mac-77F17D7DA9285301 -m 00000000000J0DX00 download

# High Sierra(10.13)
python ./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000J80300 download
python ./macrecovery.py -b Mac-BE088AF8C5EB4FA2 -m 00000000000J80300 download

# Mojave(10.14)
python ./macrecovery.py -b Mac-7BA5B2DFE22DDD8C -m 00000000000KXPG00 download

# Catalina(10.15)
python ./macrecovery.py -b Mac-00BE6ED71E35EB86 -m 00000000000000000 download

# Latest version
# ie. Big Sur(11)
python ./macrecovery.py -b Mac-E43C1C25D4880AD6 -m 00000000000000000 download
```

Da qui, avvia uno di questi comandi nel terminale e una volta finito otterrai un output simile a questo:

![](/images/installer-guide/legacy-mac-install-md/download-done.png)

* **Note**: In dipendenza dal sistema, otterrai i file BaseSystem o RecoveryImage. Agiscono allo stessa maniera perciò quando ci riferisce a uno, anche l'altro è coinvolto

* **Nota su macOS 11, Big Sur**: Dato che questo sistema è parecchio nuovo, ci sono ancora dei problemi in certi sistemi che non si possono risolvere. Per maggiori informazioni, guarda qui: [OpenCore e macOS 11: Big Sur](/extras/big-sur.md)
  * Per gli utenti le prime volte raccomandiamo macOS 10.15, Catalina
* **Nota sulle GPU Nvidia**: Ricordati di verificare se il tuo hardware supporta sistemi nuovi, vedi [Limitazioni Hardware](/macos-limits.md)

## Creare l'installer

Questa sezione ha l'obiettivo di creare le partizioni necessarie nel disco. Puoi usare il tuo programma preferito, come `gdisk` `fdisk` `parted` `gparted` or `gnome-disks`. Questa guida si focalizzerà su `gdisk` perché è comodo e può cambiare il tipo di partizione dopo, dato che dovremmo usare farlo per avviare il Recovery HD di macOS (La distro usata qui sarà Ubuntu 18.04, altre versioni o distro potrebbero funzionare lo stesso).

Crediti a [midi1996](https://github.com/midi1996) per il suo lavoro riguardo alla [Internet Install Guide (EN)](https://midi1996.github.io/hackintosh-internet-install-gitbook/) sulla quale è basata questa.

### Metodo 1

In terminal:

1. Scrivi `lsblk` per determinare l'identificatore della USB
  ![lsblk](/images/installer-guide/linux-install-md/unknown-5.png)
2. Scrivi `sudo gdisk /dev/<identificatore della USB>`
   1. Se ti viene chiesto quale tabella delle partizioni usare, seleziona GPT.
      ![Seleziona GPT](/images/installer-guide/linux-install-md/unknown-6.png)
   2. Scrivi `p` per stampare il blocco della tua partizione \(e verificare qual'è necessaria\)
      ![](/images/installer-guide/linux-install-md/unknown-13.png)
   3. Scrivi `o` per pulire la tabella delle partizioni e creare un nuovo GPT (se non vuoto)
      1. Conferma con `y`
         ![](/images/installer-guide/linux-install-md/unknown-8.png)
   4. Scrivi `n`
      1. `partition number`: tieni vuoto per avere il default
      2. `first sector`: tieni vuoto per avere il default
      3. `last sector`: ktieni vuoto per usare l'intero disco
      4. `Hex code or GUID`: `0700` per la partizione di tipo dati base Microsoft
   5. Scrivi `w`
      * Conferma con `y`
      ![](/images/installer-guide/linux-install-md/unknown-9.png)
      * In alcuni casi un riavvio è richiesto, ma di rado, se vuoi stare sicuro, riavvia il tuo computer. Puoi anche provare a ricollegare la tua chiavetta.
   6. Chiudi `gdisk` scrivendo `q` (normalmente dovrebbe chiudersi da sola)
3. Usa `lsblk` di nuovo per determinare l'identificatore della partizione
4. Scrivi `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<identificatore della partizione>` per formattarla come FAT32 e nominarla OPENCORE
5. Dopo `cd` alla cartella `/OpenCore/Utilities/macrecovery/` e dovresti trovarci un file `.dmg` e uno `.chunklist`
   1. Monta la partizione della USB con `udisksctl` (`udisksctl mount -b /dev/<identificatore della partizione>`, non serve sudo in molti casi) o con `mount` (`sudo mount /dev/<identificatore della partizione> /where/your/mount/stuff`, sudo richiesto)
   2. `cd` nella tua USB e `mkdir com.apple.recovery.boot` nella radice della tua partizione formattata come FAT32
   3. Ora `cp` o `rsync` sia `BaseSystem.dmg` che `BaseSystem.chunklist` nella cartella `com.apple.recovery.boot`.

### Metodo 2 (nel caso il n° 1 non funzioni)

Nel terminale:

1. Scrivi `lsblk` e determina l'identificatore della USB
   ![](/images/installer-guide/linux-install-md/unknown-11.png)
2. Scrivi `sudo gdisk /dev/<identificatore della USB>`
   1. Se ti viene chiesto quale tabella delle partizioni usare, seleziona GPT.
      ![](/images/installer-guide/linux-install-md/unknown-12.png)
   2. Scrivi `p` per stampare il blocco della tua partizione \(e verificare qual'è necessaria\)
      ![](/images/installer-guide/linux-install-md/unknown-13.png)
   3. Scrivi `o` per pulire la tabella delle partizioni e creare un nuovo GPT (se non vuoto)
      1. Conferma con `y`
         ![](/images/installer-guide/linux-install-md/unknown-14.png)
   4. Scrivi `n`
      1. partition number: tieni vuoto per avere il default
      2. first sector: tieni vuoto per avere il default
      3. last sector: `+200M` per creare una partizione da 200MB chiamata OPENCORE
      4. Hex code or GUID: `0700` per la partizione di tipo dati base Microsoft
      ![](/images/installer-guide/linux-install-md/unknown-15.png)
   5. Scrivi `n`
      1. partition number: tieni vuoto per avere il default
      2. first sector: tieni vuoto per avere il default
      3. last sector: tieni vuoto per avere il default \(o puoi farlo `+3G` se vuoi partizionare il resto della USB\)
      4. Hex code or GUID: `af00` per la partizione di tipo Apple HFS/HFS+
      ![](/images/installer-guide/linux-install-md/unknown-16.png)
   6. Scrivi `w`
      * Conferma con `y`
      ![](/images/installer-guide/linux-install-md/unknown-17.png)
      * In alcuni casi un riavvio è richiesto, ma di rado, se vuoi stare sicuro, riavvia il tuo computer. Puoi anche provare a ricollegare la tua chiavetta.
   7. Chiudi `gdisk` scrivendo `q` (normalmente dovrebbe chiudersi da sola)
3. Usa `lsblk` di nuovo per determinare l'identificatore delle partizioni (quella da 200MB e l'altra)
   ![](/images/installer-guide/linux-install-md/unknown-18.png)
4. Scrivi `sudo mkfs.vfat -F 32 -n "OPENCORE" /dev/<identificatore partizione da 200MB>` per formattare la partizione da 200MB come FAT32 e nominarla OPENCORE
5. Dopo `cd` alla cartella `/OpenCore/Utilities/macrecovery/` e dovresti trovarci un file `.dmg` e uno `.chunklist`
   1. Monta la partizione della USB con `udisksctl` (`udisksctl mount -b /dev/<identificatore della USB>`, non serve sudo in molti casi) o con `mount` (`sudo mount /dev/<identificatore della USB> /where/your/mount/stuff`, sudo richiesto)
   2. `cd` nella tua USB e `mkdir com.apple.recovery.boot` nella radice della tua partizione formattata come FAT32
   3. Scarica `dmg2img` (disponibile in quasi tutte le distro)
   4. Scrivi `dmg2img -l BaseSystem.dmg` e determina quale partizione ha la proprietà `disk image`
      ![](/images/installer-guide/linux-install-md/unknown-20.png)
   5. Scrivi `dmg2img -p <num della partizione> -i BaseSystem.dmg -o <identificatore della partizione HFS+>` per estrarre e scrivere l'immagine di recovery nella partizione del disco
      * Ci metterà un po' di tempo. UN SACCO di tempo se usi una USB lenta (fammi dire che ci ho messo meno di 5 minuri con una USB 2.0 abbastanza veloce).
      ![](/images/installer-guide/linux-install-md/unknown-21.png)

## Ora che tutto questo è fatto, vai a [Configurare la EFI](./opencore-efi.md) per finire il tuo lavoro
