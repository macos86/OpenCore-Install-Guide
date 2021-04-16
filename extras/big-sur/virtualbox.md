# VirtualBox

## Requisiti

* VirtualBox
* Un computer con macOS
* Il software di installazione di macOS desiderato installato in / Applicazioni
* Un disco rigido o SSD collegato tramite USB

## Conversione dei supporti di installazione

VirtualBox non può utilizzare direttamente un'immagine disco non elaborata, quindi la convertiremo in un "VDI".

`cd` nella posizione dell'immagine del disco ed eseguire quanto segue:

```bash
### Cambia "Installa macOS Big Sur Beta" se il nome del file .img è diverso
VBoxManage convertfromraw "Install macOS Big Sur Beta.img" "Install macOS Big Sur Beta.vdi" --format VDI
```

## Installazione di macOS in VirtualBox

Innanzitutto, collega il disco USB che è il tuo obiettivo per l'installazione di macOS e crea un disco rigido virtuale che fa riferimento a esso da utilizzare con VirtualBox. Nota: potrebbe essere necessario rimuovere le partizioni del disco prima di utilizzarlo. Sarà inoltre necessario modificare il dispositivo di destinazione.

```bash
diskutil list
# individua il disco esterno che corrisponde e sostituisci / dev / disk3 di seguito con il percorso del dispositivo.
sudo VBoxManage internalcommands createrawvmdk -filename RawHDD.vmdk -rawdisk /dev/disk3
```

Quindi, avvia VirtualBox come root e crea una nuova macchina virtuale macOS.

```bash
sudo VirtualBox
```

* Nome: Big Sur
* Tipo: MacOS 64 bit

* 2-4 core della CPU
* 4-8 GB di RAM
* Non creare un disco virtuale.

Collega i dischi che hai creato nei passaggi precedenti come mostrato:

![](../../images/extras/big-sur/virtualbox/vbox-storage.png)

Ora chiudi VirtualBox e aggiungi le seguenti proprietà alla VM per consentirne l'avvio.

```bash
sudo VBoxManage modifyvm "Big Sur" --cpuidset 00000001 000306a9 04100800 7fbae3ff bfebfbff

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMacPro1,1"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-7BA5B2D9E42DDD94"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"

sudo VBoxManage setextradata "Big Sur" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

Avvia VirtualBox come root e avvia la VM. Il programma di installazione dovrebbe iniziare ad avviarsi. Completa l'installazione come faresti su qualsiasi altro dispositivo.

```bash
sudo VirtualBox
```

Quando l'installazione è completa e sei nella schermata di benvenuto, invia un segnale di arresto ACPI a macOS e seleziona Arresto.

Aggiungi il tuo EFI preparato alla partizione EFI sul dispositivo USB ed espellilo.

Riposiziona l'unità nel tuo hack e avvia normalmente.
