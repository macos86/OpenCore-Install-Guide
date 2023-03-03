# SSDT precompilati

Semplicemente scegli il tipo di hardware e la generazione, dopo scarica i file associati. Una volta scaricati, mettili nella tua EFI nella cartella EFI/OC/ACPI e torna al [Setup del config.plist](/config.plist/)

::: danger Attenzione
Si ricorda che le tabelle non sono perfette. Quindi consigliamo vivamente di leggere prima il resto per capire cosa (e a chi serve) quel particolare SSDT per evitare di aggiungerne in più o dimenticarne per strada. Si sa, uomo avvisato...

Grazie!
:::

[[toc]]

## Spiegazione dei vari SSDT

### SSDT-EC e SSDT-EC-USBX

- Usato per disabilitare il tuo Embedded controller e crearne uno finto per farci lavorare macOS.
- Il modulo USBX viene usato per iniettare le proprietà di gestione energetica delle USB, mancanti in Skylake e più recenti (anche in tutte le CPU AMD)

### SSDT-IMEI

Richiesto dai chipset:

- B75
- Q75
- Z75
- H77
- Q77
- Z77
- H61
- B65
- Q65
- P67
- H67
- Q67
- Z68
Per risolvere un problema di scheda video.

### CPU-PM e SSDT-PLUG-DRTNIA (by [@gentik84](https://github.com/Gengik84))

- SSDT-PLUG-DRTNIA: Usato per abilitare XCPM in macOS, migliorando molto la gestione energetica della CPU.
- CPU-PM: In mancanza di power management nativo, usiamo quello modificato da noi.

### SSDT-AWAC e SSDT-RTC0-RANGE-HEDT

Usato per abilitare il vecchio orologio RTC in macOS, AWAC non è ancora supportato

### SSDT-PMC

Richiesto per risolvere NVRAM su:

- B360
- B365
- H310
- H370
- Z390

Tutti i laptop di nona generazione meglio che ce l'abbiano.

### SSDT-RHUB

Usato per resettare i controller USB sulla serie 400 di **Asus** e nei laptop Ice Lake (principalmente Dell) data la mancanza di implementazioni da parte della azienda

> Nota che le schede madri desktop Gigabyte, MSI, AsRock... non necessitano questo SSDT. **Solo Asus**

### SSDT-PNLF

Usato per controllare la retroilluminazione dei display dei laptop e AIO

### SSDT-GPI0

[Maggiori riferimenti qui]((../Laptops/trackpad/))

### SSDT-UNC

Assicura che bridge uncore mancanti e spenti siano disabilitati, altrimenti causerebbero dei kernel panic su macOS Big Sur in IOPCIFamily

### SSDT-CPUR

Richiesto da:

- B550
- A520
- più recenti

X570 e meno recenti **NON** richiedono SSDT-CPUR (Nessuna macchina threadripper richiede questo SSDT).

Usato per risolvere le definizioni della CPU in ACPI, dato che macOS non supporta i metodi usati nelle più recenti schede madre AMD.

### [IRQ](../Universal/irq.md)

In hardware più vecchi potrebbe anche essere necessario utilizzare SSDT-Time per applicare i fix all'IRQ.

## Tabelle riassuntive

::: danger Attenzione
Si ricorda che le tabelle non sono perfette. Quindi consigliamo vivamente di leggere prima il resto per capire cosa (e a chi serve) quel particolare SSDT per evitare di aggiungerne in più o dimenticarne per strada. Si sa, uomo avvisato...

Grazie!
:::

### Desktop

| Piattaforme | **CPU** | **EC** | **AWAC** | **NVRAM** | **USB** | **IMEI** |
| ----------- | ------- | ------ | -------- | --------- | ------- | -------- |
| Penryn | / | [SSDT-EC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-DESKTOP.aml) | / | / | / | / |
| Lynnfield e Clarkdale | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Sandy Bridge | [CPU-PM](/OpenCore-Post-Install/universal/pm.md#sandy-and-ivy-bridge-power-management) (Da fare nel Post-Install) | ^^ | ^^ | ^^ | ^^ | [SSDT-IMEI](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-IMEI.aml) |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PLUG-DRTNIA.aml) | ^^ | ^^ | ^^ | ^^ | / |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX-DESKTOP](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-USBX-DESKTOP.aml) | ^^ | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake | ^^ | ^^ | [SSDT-AWAC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-AWAC.aml) | [SSDT-PMC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PMC.aml) | ^^ | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | / | [SSDT-RHUB](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-RHUB.aml) | ^^ |
| AMD (15/16h) | / | ^^ | / | ^^ | / | ^^ |
| AMD (17h) | [SSDT-CPUR for B550 and A520](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-CPUR.aml) | ^^ | ^^ | ^^ | ^^ | ^^ |

### Deskop di Alta Fascia

| Piattaforme | **CPU** | **EC** | **RTC** | **PCI** |
| ------- | ----- | --- | ----- | ----- |
| Nehalem e Westmere | / | [SSDT-EC-DESKTOP](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-DESKTOP.aml) | / | / |
| Sandy Bridge-E | ^^ | ^^ | ^^ | [SSDT-UNC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-UNC.aml) |
| Ivy Bridge-E | ^^ | ^^ | ^^ | ^^ |
| Haswell-E | [SSDT-PLUG-DRTNIA](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PLUG-DRTNIA.aml) | [SSDT-EC-USBX-DESKTOP](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-USBX-DESKTOP.aml) | [SSDT-RTC0-RANGE-HEDT](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-RTC0-RANGE-HEDT.aml) | ^^ |
| Broadwell-E | ^^ | ^^ | ^^ | ^^ |
| Skylake-X | ^^ | ^^ | ^^ | / |

### Laptop

| Piattaforme | **CPU** | **EC** | **Backlight** | **AWAC** | **USB** | **NVRAM** | **IMEI** |
| ------- | ----- | ---- | ----------- | -------------- | ------ | ---- | ----- |
| Clarksfield e Arrandale | / | [SSDT-EC-LAPTOP](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-LAPTOP.aml) | [SSDT-PNLF](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PNLF.aml) | / | / | / | / |
| SandyBridge | [CPU-PM](/OpenCore-Post-Install/universal/pm.md#sandy-and-ivy-bridge-power-management) (Run in Post-Install) | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-IMEI](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-IMEI.aml) |
| Ivy Bridge | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Haswell | [SSDT-PLUG-DRTNIA](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PLUG-DRTNIA.aml) | ^^ | ^^ | ^^ | ^^ | ^^ | / |
| Broadwell | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Skylake | ^^ | [SSDT-EC-USBX-LAPTOP](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-EC-USBX-LAPTOP.aml) | ^^ | ^^ | ^^ | ^^ | ^^ |
| Kaby Lake | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ | ^^ |
| Coffee Lake (ottava Generazione) e Whiskey Lake | ^^ | ^^ | ^^ | [SSDT-AWAC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-AWAC.aml) | ^^ | ^^ | ^^ |
| Coffee Lake (nona Generazione) | ^^ | ^^ | ^^ | ^^ | ^^ | [SSDT-PMC](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-PMC.aml) | ^^ |
| Comet Lake | ^^ | ^^ | ^^ | ^^ | ^^ | / | ^^ |
| Ice Lake | ^^ | ^^ | ^^ | ^^ | [SSDT-RHUB](https://github.com/macos86/Getting-Started-With-ACPI/raw/main/extra-files/compiled/SSDT-RHUB.aml) | ^^ | ^^ |
