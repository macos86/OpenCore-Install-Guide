# Conversione Boot Argument

Questa sezione viene spiegata per capire quali Argomenti di avvio sono irrilevanti con OpenCore, è comune con utenti che usano ancora arg legacy senza sapere che effetto abbiano per macOS o che hanno usato poco OpenCore

Questa lista è basata sulla nostra memoria e perciò essendo stufo di vedere questi flag continuare ad apparire, vi chiedo di avvisarmi [aprendo un issue](https://github.com/khronokernel/OpenCore-Vanilla-Desktop-Guide/issues) se ne trovate altri. Tutti gli aiuti sono benvenuti!

## Flag di macOS

### dart=0

* Usato per disabilitare il supporto VT-D
* In Clover, quando questo flag era presente dovevi anche lasciare la tabella DMAR da ACPI
* Questo flag richiede anche il SIP disabilitato in macOS 10.15 Catalina, perciò questo flag non viene più raccomandato e verrà usato invece `Kernel -> Quirks -> DisableIoMapper`

### kext-dev-mode=1

* Usato per eseguire kext non firmati, flag utile solo in Yosemite
* Il bit `CSR_ALLOW_UNSIGNED_KEXTS` viene to cambiato in `csr-active-config` fra le variabili NVRAM per nuovi relase
* Questo non è necessario in OpenCore dato il metodo di iniezione del kernel: attacco al prelinked kernel

## Flag dei Kext

### nvda_drv=1

Usato per abilitare i Web Driver Nvidia, non funziona più da macOS 10.12

* Questo flag verrà sostituito con `nvda_drv_vrl=1` in Sierra e High Sierra

## Flag per Chameleon

Per alcune ragioni le persone continuano ad usare questi flag in clover, senza che abbiano effetti, e perciò chiediamo loro di smetterla prima di usarli anche su OpenCore

### PCIRootUID=Value

* Questo imposta il `_UID` di `Device (PCI0)` per un qualsiasi valore, supposto per funzionare nelle vecchie GPU AMD, anche se è discutibile. Ironicamente gli utenti di Clover continuano ad usare questo flag e addirittura molti di loro sanno che proviene da Chameleon. [Fonte (EN)](https://github.com/CloverHackyColor/CloverBootloader/blob/81f2b91b1552a4387abaa2c48a210c63d5b6233c/rEFIt_UEFI/Platform/FixBiosDsdt.cpp#L1630-L1674)

### GraphicsEnabler=Yes/No

* InjectAMD/Nvidia era l'equivalente di Clover, ma nessuna funzione simile in OpenCore dato che usiamo [WhateverGreen](https://github.com/acidanthera/WhateverGreen)

### IGPEnabler=Yes/No

* Stessa idea di GraphicsEnabler, l'equivalente di Clover è InjectIntel perciò bisognerà studiare la [WhateverGreen's Framebuffer patching Guide (EN)](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)

## -f

* Attiva il boot cacheless su Chameleon e Clover, OpenCore usa una opzione nettamente differente in `Kernel -> Scheme -> KernelCache` impostandola a `Cacheless`
  * Correntemente il boot cacheless è supportato solo dai kernel a 64-bit da OS X 10.6 a 10.9
