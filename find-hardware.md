---
next: /installer-guide/
---

# Trovare il tuo Hardware

Questa sezione è una mini-guida che spiega come trovare il tuo hardware corrente; questo è rilevante per laptop e preassemblati, poiché l'hardware è un po' più difficile da comprendere. Se conosci il tuo hardware, puoi proseguire direttamente a [Creare l'Installer](/installer-guide/).

| **Sistema Operativo** | Windows | Linux |
|-----------------------|---------|-------|
| **Programmi richiesti** | Gestione Dispositivi integrato di Windows o [AIDA64](https://www.aida64.com/downloads) per avere un'interfaccia più semplice | Strumenti integrati di default su tutte le maggiori distro Linux (`cat` `pciutils` `dmidecode`) |

## Modello CPU

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/cpu-model-aida64.png) | ![](./images/finding-hardware-md/cpu-model-devicemanager.png) |

---

```sh
cat /proc/cpuinfo | grep -i "model name"
```

## Modello GPU

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/GPU-model-aida64.png) | ![](./images/finding-hardware-md/GPU-model-devicemanager.png) |

---

```sh
lspci | grep -i --color "vga\|3d\|2d"
```

## Modello Chipset

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/chipset-model-aida64.png) | ![](./images/finding-hardware-md/chipset-model-devicemanager.png) |

* Nota: CPU basate su Intel SOC avranno il loro chipset e altre funzionalità sullo stesso chip invece di avere chip dedicati. Questo rende più difficile trovare il tipo esatto di chipset.

---

```sh
dmidecode -t baseboard
```

## Tastiera, Trackpad e Touchscreen per tipo di connettore

| Gestione Dispositivi |
| :--- |
| ![](./images/finding-hardware-md/trackpad-model-devicemanager.png) |

AIDA64 sfortunatamente non fornisce informazioni utili riguardanti questi dispositivi, perciò vi raccomandiamo di usare Gestione Dispositivi per questo.

* Puoi trovare i dispositivi in queste sezioni:
  * `Human Interface Devices (HID)`
  * `Tastiere`
  * `Mouse e altri dispositivi di puntatamento`

* Per vedere il tipo esatto di connettore, seleziona il tuo mouse e dopo `Visualizza -> Dispositivi per connettore`. Questo chiarirà se è un dispositivo PS2, I2C, SMBus, USB, etc

In dipendenza dal dispositivo, potresti trovare molti nomi e connettori. Distingui i seguenti casi:
  
::: details SMBus
  
Questi si mostreranno come dispositivo PCI come `Synaptics SMBus Driver` o `ELAN SMBus Driver`

* Dispositivi Synaptics si mostreranno sia in PS2 come `Synaptics PS2 device`/`Synaptics Pointing Device` e in PCI come `Synaptics SMBus Driver`

![](./images/finding-hardware-md/Windows-SMBus-Device.png)

Come vedi, abbiamo ottenuto due dispositivi Synaptics nell'immagine a sinistra, tuttavia se guardiamo meglio vediamo che il dispositivo più alto è il PS2, mentre quello più basso è il SMBus. Mentre puoi usare il trackpad nell'altro modo, SMBus generalmente provvede maggiore supporto nei gesti e più precisione.

:::

::: details USB

| Dispositivi per tipo | Dispositivi per connettore |
| :--- | :--- |
| ![](./images/finding-hardware-md/USB-trackpad-normal.png) | ![](./images/finding-hardware-md/USB-trackpad-by-connection.png)

Questo si mostrerà come `PS2 Compliant Trackpad`, e sotto USB quando ci spostiamo in `Dispositivi per connettore`

:::

::: details I2C

![](./images/finding-hardware-md/i2c-trackpad.png)
Questi saranno quasi sempre mostrati come dispositivi Microsoft HID, anche se possono apparire anche come altri trackpad. Saranno sempre sotto I2C.

:::

---

```sh
dmesg | grep -i input
```
  
## Codec Audio

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/audio-controller-aida64.png) | ![](./images/finding-hardware-md/audio-controller-aida64.png.png) |

A causa degli OEM che mostrano nomi vaghi, l'informazione più dettagliata che puoi ottenere da Gestione Dispositivi è tramite il PCI ID (es. pci 14F1,50F4). Questo ti obbliga a cercare su Google l'ID per capire quale ti serve, tuttavia AIDA64 può presentarti il nome correttamente, facilitando la procedura all'utente finale.

---

```sh
aplay -l
```

## Modello del Controller di Rete

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/nic-model-aida64.png) | ![](./images/finding-hardware-md/nic-model-devicemanager.png) |

A causa degli OEM che mostrano nomi vaghi, l'informazione più dettagliata che puoi ottenere da Gestione Dispositivi è tramite il PCI ID (es. `PCI\VEN_14E4&DEV_43A0`, ossia un vendor ID uguale a `14E4` e un device ID uguale a `43A0`). Questo ti obbliga a cercare su Google l'ID per capire quale ti serve, tuttavia AIDA64 può presentarti il nome correttamente, facilitando la procedura all'utente finale.

---

Informazioni di base:

```sh
lspci | grep -i network
```

Informazioni dettagliate:

```sh
lshw -class network
```

## Modello del disco

| AIDA64 | Gestione Dispositivi|
| :--- | :--- |
| ![](./images/finding-hardware-md/disk-model-aida64.png) | ![](./images/finding-hardware-md/disk-model-devicemanager.png) |

A causa degli OEM che presentano nomi vaghi, sarai costretto a cercare su Google il tuo modello.

---

```sh
lshw -class disk -class storage
```
