# VMware Workstation (Player)

## Requirements

* VMware Workstation o VMware Workstation Player (solo Linux e Windows)
* qemu-img (Incluso nella installazione di [qemu](https://qemu.org)) utilizzabile anche [vboxmanage](./virtualbox.md#convertire-il-file-di-installazione)

## Scaricare il File di installazione

Puoi usare [macrecovery](https://github.com/acidanthera/OpenCorePkg/tree/master/Utilities/macrecovery): ecco la [guida](/installer-guide/winblows-install.md#scaricare-macos)) per ottenere il file .dmg (il file .chunklist non ci servirà).

## Convertire il File di Installazione

VMware non può leggere una immagine disco dmg, perciò dovremo convertirla come vmdk.
Con una conversione, creiamo una nuova immagine disco:

### Windows

```bash
### Muoviti alla directory contenente qemu-img
cd 'C:\Program Files\qemu'
### Cambia "BaseSystem" se il nome del .dmg differisce
.\qemu-img.exe convert PERCORSO\DEL\BaseSystem.dmg -O vmdk PERCORSO\DEL\BaseSystem.vmdk
```

### Linux

```bash
### Cambia "BaseSystem" se il nome del .dmg differisce
qemu-img convert PATH/TO/BaseSystem.dmg -O vmdk PERCORSO/DEL/BaseSystem.vmdk
```

## Sbloccare VMware

Per usare macOS su questa macchina virtuale, dobbiamo eseguire alcune patch. Per farlo in maniera automatizzata, consiglio [questo tool](https://github.com/paolo-projects/auto-unlocker/releases).
Eseguilo chiudendo prima VMware.

## Creare la Macchina Virtuale

Puoi usare le impostazioni che VMware offre, **ricorda che macOS non supporta i dischi IDE nè l'accelerazione grafica (per ora)**.

## Modificare il file vmx

Per avviare macOS, dobbiamo aggiungere alcune stringhe al file .vmx che contiene appunto tutte le impostazioni della nostra macchina virtuale.

### VMX patch for Intel Processors

```bash
hw.model = "iMac20,2" # Solo per iCloud
board-id = "Mac-AF89B6D9451A490B" # Solo per iCloud
```

### Patch per processori AMD

```bash
hw.model = "iMac20,2" # Solo per iCloud
board-id = "Mac-AF89B6D9451A490B" # Solo per iCloud
cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"
cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"
cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"
cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"
cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"
cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"
cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"
cpuid.1.edx = "0000:1111:1010:1011:1111:1011:1111:1111"
featureCompat.enable = "FALSE" # (non sicuro serva)
```

## Installare VMware tools

Montare il file `darwin.iso` incluso con VMware (lo puoi trovare anche [qui](https://www.insanelymac.com/forum/files/file/987-vmware-tools-for-os-x-macos-darwiniso-and-darwinpre15iso/))

## Posso avere l'accelerazione grafica?

Mi dispiace, ma al momento non è possibile. Se hai idee su come farlo, contattaci su [macos86.it](https://macos86.it)
