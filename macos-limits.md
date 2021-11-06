---
prev: why-oc.md
---

# Limitazioni Hardware

Con macOS, ci sono numerose limitazioni; perciò è necessario controllare quali sono prima di entrare nella fase dell'installazione. Questo è a causa delle quantità limitate del supporto dell'hardware Apple, perciò anche noi saremo limitati da Apple, oppure potremmo usare alcune patch create dalla community.

Le sezioni principali da verificare sono:

[[toc]]

E per informazioni più dettagliate, controlla qua:

* [GPU Buyers Guide (EN)](https://dortania.github.io/GPU-Buyers-Guide/)
  * Controlla se la tua CPU è supportata e quale versione di macOS puoi avviare.
* [Wireless Buyers Guide (EN)](https://dortania.github.io/Wireless-Buyers-Guide/)
  * ontrolla se la tua scheda di rete WiFi è supportata.
* [Anti-Hardware Buyers Guide (EN)](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)
  * Un insieme di hardware da evitare.

## Supporto CPU

Per il supporto CPU abbiamo queste linee guida:

* Sia 32 bit che 64-bit sono supportati
  * Questo tuttavia dipende dal supporto da parte del Sistema Operativo della tua architettura, guarda la sezione Requisiti CPU sotto
* Le CPU Intel per Desktop sono supportate.
  * Sono supportate in questa guida le cpu da Yonah a Comet Lake.
* CPU dei server e High End Desktop sono supportate.
  * Sono supportate in questa guida le cpu da Nehalem a Cascade Lake X.
* CPU dei laptop delle serie Intel Core "i" e Xeon
  * Sono supportate in questa guida le cpu da Arrandale a Ice Lake.
  * Nota che Mobile Atoms, Celeron e Pentium CPUs non sono supportati
* CPU Desktop AMD Bulldozer (15^), Jaguar (16^) and Ryzen (17^)
  * Le CPU Laptop **non** sono supportate
  * Non tutte le funzionalità di macOS non sono supportate con CPU AMD, vedi sotto

**Per maggiori informazioni, guarda qui: [Anti-Hardware Buyers Guide (EN)](https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/)**

::: details Requisiti CPU

Requisiti architettura

* CPU a 32 bit sono supportate da 10.4.1 a 10.6.8
  * Nota che 10.7.x richiede un userspace a 64-bit, limitando le CPU 32 bit a 10.6
* CPU a 32 bit sono supportate da 10.4.1 all'attuale versione di macOS

Requsiti SSE:

* SSE3 è richiesto per ogni versione di OSX/macOS
* SSSE3 è richiesto per ogni versione a 64-bit di OSX/macOS
  * Per le CPU senza SSSE3 (es. certi Pentium a 64-bit), raccomandiamo di avviare il sistema in userspace a 32 bit (`i386-user32`)
* SSE4 è richiesto per macOS 10.12 and più recenti
* SSE4.2 è richiesto per macOS 10.14 and più recenti
  * SSE4.1 CPU sono supportate grazie a [telemetrap.kext](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/post-28447707)
  * I nuovi driver AMD richiedono SSE4.2 per avere il supporto Metal. Per risolvere, vedi qui: [MouSSE: SSE4.2 emulation (EN)](https://forums.macrumors.com/threads/mp3-1-others-sse-4-2-emulation-to-enable-amd-metal-driver.2206682/)

Requisiti Firmware:

* Da OS X 10.4.1 a 10.4.7 richiedono EFI32 (ossia versione IA32 (32 bit) di OpenCore)
  * Da OS X 10.4.8 a 10.7.5 supportano sia EFI32 che EFI64
* Da OS X 10.8 e successivi richiedono EFI64 (ossia versione x64 (64-bit) di OpenCore)
* Da OS X 10.7 a 10.9 richiedono OpenPartitionDxe.efi per avviare la partizione Recovery

Requisiti Kernel:

* OS X 10.4 e 10.5 richiedono i kext a 32 bit dato che supportano solo un kernel a 32 bit
  * OS X 10.6 e 10.7 supportano sia kernel a 32 che a 64-bit
* OS X 10.8 e più recenti richiedono i kext a 64-bit dato che supportano solo un kernel a 64-bit
  * Digita `lipo -archs` per sapere quale architettura il tuo kext supporta (ricordati di eseguirlo sul binario, non sul bundle .kext)

Limiti nel calcolo dei Core/Thread:

* OS X 10.10 e meno recenti non avvieranno con più di 24 thread (evidente causa del panic `mp_cpus_call_wait() timeout`)
* OS X 10.11 e più recenti hanno il limite di 64 thread
* Il boot arg `cpus=` può essere una possibile arginazione del problema, oppure disabilitare hyperthreading

Note Speciali:

* Lilu e plugin richiedono 10.8 o più recenti per operare
  * Raccomandiamo di usare FakeSMC per vecchie versioni di OS X
* OS X 10.6 o più vecchi richiedono RebuildAppleMemoryMap abilitato
  * Questo risolve errori kernel all'inizio

:::

::: details Tabella supporto CPU Intel

Supporti basati su Kernel Vanilla (ossia senza modifiche):

| Generazione CPU | Supporto iniziale | Ultima versione supportata | Note | CPUID |
| :--- | :--- | :--- | :--- | :--- |
| [Pentium 4](https://en.wikipedia.org/wiki/Pentium_4) | 10.4.1 | 10.5.8 | Usato solo nei kit developer | 0x0F41 |
| [Yonah](https://en.wikipedia.org/wiki/Yonah_(microprocessor)) | 10.4.4 | 10.6.8 | 32 bit | 0x0006E6 |
| [Conroe](https://en.wikipedia.org/wiki/Conroe_(microprocessor)), [Merom](https://en.wikipedia.org/wiki/Merom_(microprocessor)) | 10.4.7 | 10.11.6 | Non c'è SSE4 | 0x0006F2 |
| [Penryn](https://en.wikipedia.org/wiki/Penryn_(microarchitecture)) | 10.4.10 | 10.13.6 | Non c'è SSE4.2 | 0x010676 |
| [Nehalem](https://en.wikipedia.org/wiki/Nehalem_(microarchitecture)) | 10.5.6 | <span style="color:green"> Attuale </span> | N/A | 0x0106A2 |
| [Lynnfield](https://en.wikipedia.org/wiki/Lynnfield_(microprocessor)), [Clarksfield](https://en.wikipedia.org/wiki/Clarksfield_(microprocessor)) | 10.6.3 | ^^ | Nessun supporto della iGPU in macOS 10.14+ | 0x0106E0 |
| [Westmere, Clarkdale, Arrandale](https://en.wikipedia.org/wiki/Westmere_(microarchitecture)) | 10.6.4 | ^^ | ^^ | 0x0206C0 |
| [Sandy Bridge](https://en.wikipedia.org/wiki/Sandy_Bridge) | 10.6.7 | ^^ | ^^ | 0x0206A0(M/H) |
| [Ivy Bridge](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.7.3 | ^^ | Nessun supporto della iGPU in macOS 12+ | 0x0306A0(M/H/G) |
| [Ivy Bridge-E5](https://en.wikipedia.org/wiki/Ivy_Bridge_(microarchitecture)) | 10.9.2 | ^^ | / | 0x0306E0 |
| [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture)) | 10.8.5 | ^^ | ^^ | 0x0306C0(S) |
| [Broadwell](https://en.wikipedia.org/wiki/Broadwell_(microarchitecture)) | 10.10.0 | ^^ | ^^ | 0x0306D4(U/Y) |
| [Skylake](https://en.wikipedia.org/wiki/Skylake_(microarchitecture)) | 10.11.0 | ^^ | ^^ | 0x0506e3(H/S) 0x0406E3(U/Y) |
| [Kaby Lake](https://en.wikipedia.org/wiki/Kaby_Lake) | 10.12.4 | ^^ | ^^ | 0x0906E9(H/S/G) 0x0806E9(U/Y) |
| [Coffee Lake](https://en.wikipedia.org/wiki/Coffee_Lake) | 10.12.6 | ^^ | ^^ | 0x0906EA(S/H/E) 0x0806EA(U)|
| [Amber](https://en.wikipedia.org/wiki/Kaby_Lake#List_of_8th_generation_Amber_Lake_Y_processors), [Whiskey](https://en.wikipedia.org/wiki/Whiskey_Lake_(microarchitecture)), [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.14.1 | ^^ | ^^ | 0x0806E0(U/Y) |
| [Comet Lake](https://en.wikipedia.org/wiki/Comet_Lake_(microprocessor)) | 10.15.4 | ^^ | ^^ | 0x0906E0(S/H)|
| [Ice Lake](https://en.wikipedia.org/wiki/Ice_Lake_(microprocessor)) | ^^ | ^^ | ^^ | 0x0706E5(U) |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | ^^ | ^^ | Requires Comet Lake CPUID | 0x0A0671 |
| [Tiger Lake](https://en.wikipedia.org/wiki/Tiger_Lake_(microprocessor)) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Non provato </span> | 0x0806C0(U) |

:::

::: details Limitazioni CPU AMD in macOS

Sfortunatamente molte funzionalità di macOS sono al momento non supportate con AMD e molte altre potrebbero essere buggate. Esse sono:

* Macchine virtuali che usano l'hypervisor Apple
  * Questo include VMWare, Parallels, Docker, Android Studio, ecc.
  * VirtualBox è la sola eccezione dato che ha un proprio hypervisor
  * VMware 10 e Parallels 13.1.0 supportano il proprio hypervisor, tuttavia usare software non aggiornati per gestire macchine virtuali, può causare problemi di sicurezza
* Supporto Adobe
  * La maggior parte dei prodotti Adobe si basa sul set di istruzioni Memfast (by Intel), che crasha con le CPU AMD
  * Puoi disabilitare funzioni come il supporto RAW per evitare il crash: [Adobe Fixes (EN)](https://gist.github.com/naveenkrdy/26760ac5135deed6d0bb8902f6ceb6bd)
* Supporto 32 bit
  * Per chi usa ancora software a 32 bit, in Mojave o più vecchi, le patch Vanilla non supportano il 32 bit.
  * Una soluzione è l'uso di un [kernel personalizzato](https://files.amd-osx.com/?dir=Kernels), tuttavia perderesti il supporto a iMessage e noi non ti aiuteremmo in quel caso
* Problemi di stabilità in molte app
  * Applicazioni per audio editing sono quelle con più problemi, per esempio Logic Pro
  * Anche DaVinci Resolve è famoso per avere molti problemi

:::

## Supporto GPU

Il supporto della GPU è complicato data la varietà di GPU quasi infinita presente nel mercato, ma le regole generali sono:

* Le GPU basate su GCN sono supportate fino all'ultima versione di macOS
  * Le APU AMD non sono supportate
  * Le schede AMD basate su [Lexa](https://www.techpowerup.com/gpu-specs/amd-lexa.g806) dalla serie Polaris non sono supportate
  * Nota speciale per utenti MSI Navi: [Installer not working with 5700XT #901 (EN)](https://github.com/acidanthera/bugtracker/issues/901)
    * Il problema scompare in macOS 11 (Big Sur).
* Il supporto delle GPU Nvidia è complesso
  * Le GPU [Maxwell(9XX)](https://it.wikipedia.org/wiki/GeForce_900_series) e [Pascal(10XX)](https://it.wikipedia.org/wiki/GeForce_10_series) sono limitate a macOS 10.13: High Sierra
  * Le GPU [Nvidia Turing(20XX,](https://it.wikipedia.org/wiki/GeForce_20_series)[16XX)](https://it.wikipedia.org/wiki/GeForce_16_series) **non supportate in nessuna versione di macOS**
  * Le GPU [Nvidia Ampere(30XX)](https://it.wikipedia.org/wiki/GeForce_30_series) **non supportate in nessuna versione di macOS**
  * Le GPU [Nvidia Kepler(6XX,](https://it.wikipedia.org/wiki/GeForce_600_series)[7XX)](https://it.wikipedia.org/wiki/GeForce_700_series) supportate fino a macOS 11 (Big Sur)
* La serie Intel [GT2+ tier](https://it.wikipedia.org/wiki/Intel_Graphics_Technology) di iGPU
  * Da Ivy Bridge a Ice Lake iGPU supportate in questa guida
    * Info sulle iGPU delle serie GMA possono essere trovate qui: [GMA Patching](/OpenCore-Post-Install/gpu-patching/)
  * Nota che GT2 si riferisce alle iGPU qualità, le iGPU GT1 trovate nei Pentium, Celeron e Atom non sono supportate in macOS

E una nota importante dei **Laptops con GPU discrete**:

* 90% delle GPU discrete non funzioneranno perché sono collegate in una configurazione non supportata da macOS (grafica interscambiabile). Nelle GPU NVIDIA, questo sistema viene chiamato di solito Optimus. Non è possibile usare queste GPU per lo schermo interno, perciò è suggerito di disabilitarle (sarà spiegato più tardi nella guida).
* Tuttavia in certi casi, queste GPU possono alimentare una qualsiasi porta video esterna (HDMI, mini DisplayPort, ec.), che potrebbe o no funzionare; nel caso funzioni, potrai non togliere la scheda e farla funzionare.
* Infine, ci sono laptop che non hanno la grafica interscambiabile, perciò la loro GPU può essere usata (se supportata da macOS), ma il setup e i cavi potrebbero causare problemi.

**Per una lista completa delle GPU supportate, vedi [GPU Buyers Guide (EN)](https://dortania.github.io/GPU-Buyers-Guide/)**

::: details Tabella supporto GPU Intel

| Generazione GPU | Supporto iniziale | Ultima versione supportata | Note |
| :--- | :--- | :--- | :--- |
| [GMA di 3° Generazione](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Third_generation) | 10.4.1 | 10.7.5 | [Richiede kernel a 32 bit e le patch](/OpenCore-Post-Install/gpu-patching/legacy-intel/) |
| [GMA di 4° Generazione](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen4) | 10.5.0 | ^^ | ^^ |
| [Arrandale (HD Graphics)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen5) | 10.6.4 | 10.13.6 | Solo le LVDS supportate, eDP e output esterni non sono supportati |
| [Sandy Bridge(HD 3000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen6) | 10.6.7 | ^^ | / |
| [Ivy Bridge(HD 4000)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.7.3 | 11.6.1 | ^^ |
| [Haswell(HD 4XXX, 5XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen7) | 10.8.5 | <span style="color:green"> Attuale </span> | ^^ |
| [Broadwell(5XXX, 6XXX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen8) | 10.10.0 | ^^ | ^^ |
| [Skylake(HD 5XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.11.0 | ^^ | ^^ |
| [Kaby Lake(HD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.12.4 | ^^ | ^^ |
| [Coffee Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.13.6 | ^^ | ^^ |
| [Comet Lake(UHD 6XX)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen9) | 10.15.4 | ^^ | ^^ |
| [Ice Lake(Gx)](https://en.wikipedia.org/wiki/List_of_Intel_graphics_processing_units#Gen11) | 10.15.4 | ^^ | Richiede i Argomenti di avvio `-igfxcdc` e `-igfxdvmt` |
| [Tiger Lake(Xe)](https://en.wikipedia.org/wiki/Intel_Xe) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Nessun driver disponibile </span> |
| [Rocket Lake](https://en.wikipedia.org/wiki/Rocket_Lake) | <span style="color:red"> N/A </span> | <span style="color:red"> N/A </span> | <span style="color:red"> Nessun driver disponibile </span> |

:::

::: details Tabella supporto GPU AMD

| Generazione GPU | Supporto iniziale | Ultima versione supportata | Note |
| :--- | :--- | :--- | :--- |
| [X800](https://en.wikipedia.org/wiki/Radeon_X800_series) | 10.3.x | 10.7.5 | Richiede kernel a 32 bit |
| [X1000](https://en.wikipedia.org/wiki/Radeon_X1000_series) | 10.4.x | ^^ | / |
| [TeraScale](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [TeraScale 2/3](https://en.wikipedia.org/wiki/TeraScale_(microarchitecture)) | 10.6.x | ^^ | ^^ |
| [GCN 1](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.8.3 | <span style="color:green">Attuale</span> | ^^ |
| [GCN 2/3](https://en.wikipedia.org/wiki/Graphics_Core_Next) | 10.10.x | ^^ | ^^ |
| [Polaris 10](https://en.wikipedia.org/wiki/Radeon_RX_400_series), [20](https://en.wikipedia.org/wiki/Radeon_RX_500_series) | 10.12.1 | ^^ | ^^ |
| [Vega 10](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.12.6 | ^^ | ^^ |
| [Vega 20](https://en.wikipedia.org/wiki/Radeon_RX_Vega_series) | 10.14.5 | ^^ | ^^ |
| [Navi 10](https://en.wikipedia.org/wiki/Radeon_RX_5000_series) | 10.15.1 | ^^ | Richiede `agdpmod=pikera` nei Argomenti di avvio |
| [Navi 20](https://en.wikipedia.org/wiki/Radeon_RX_6000_series) | 11.4 | ^^ | <span style="color:yellow">Correntemente solo alcuni modelli di Navi 21 funzionano</span> |

:::

::: details Tabella supporto GPU Nvidia

| Generazione GPU | Supporto iniziale | Ultima versione supportata | Note |
| :--- | :--- | :--- | :--- |
| [GeForce 6](https://en.wikipedia.org/wiki/GeForce_6_series) | 10.2.x | 10.7.5 | Richiede kernel a 32 bit e [patch del NVCAP](/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [GeForce 7](https://en.wikipedia.org/wiki/GeForce_7_series) | 10.4.x | ^^ | [Requires patch del NVCAP](/OpenCore-Post-Install/gpu-patching/nvidia-patching/) |
| [Tesla](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)) | 10.4.x | 10.13.6 | ^^ |
| [Tesla v2](https://en.wikipedia.org/wiki/Tesla_(microarchitecture)#Tesla_2.0) | 10.5.x | ^^ | ^^ |
| [Fermi](https://en.wikipedia.org/wiki/Fermi_(microarchitecture)) | 10.7.x | ^^ | ^^ |
| [Kepler](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.7.x | 11.6.1 | / |
| [Kepler V2](https://en.wikipedia.org/wiki/Kepler_(microarchitecture)) | 10.8.x | ^^ | ^^ |
| [Maxwell](https://en.wikipedia.org/wiki/Maxwell_(microarchitecture)) | 10.10.x | 10.13.6 | [Richiede Web Driver NVIDIA](https://www.nvidia.com/download/driverResults.aspx/149652/) |
| [Pascal](https://en.wikipedia.org/wiki/Pascal_(microarchitecture)) | 10.12.4 | ^^ | ^^ |
| [Turing](https://en.wikipedia.org/wiki/Turing_(microarchitecture)) | <span style="color:red"> / </span> | <span style="color:red"> / </span> | <span style="color:red"> Nessun driver disponibile </span> |
| [Ampere](https://en.wikipedia.org/wiki/Ampere_(microarchitecture)) | ^^ | ^^ | ^^ |

:::

## Supporto scheda madre

Per la maggior parte, tutte le motherboard sono supportate, finchè la CPU lo è. Precedentemente, le board B550 causavano problemi:

* [~~Piattaforme B550 AMD~~](https://en.wikipedia.org/wiki/List_of_AMD_chipsets)

Tuttavia grazie ai seguenti sviluppi, le piattaforme B550 sono avviabili ora con l'aggiunta di [SSDT-CPUR](https://github.com/naveenkrdy/Misc/blob/master/SSDTs/SSDT-CPUR.dsl). Più informazioni saranno date sia in [Ottenere i File](/ktext.md) e nella [configurazione Zen](/AMD/zen.md)

## Supporto dispositivi di archiviazione

Per la maggior parte, tutti i dischi basati su SATA e la maggior parte di quelli NVMe funzioneranno. Solo poche eccezioni:

* **SSD NVMe Samsung PM981, PM991 e Micron 2200S**
  * Questi SSD non sono compatibili (causano kernel panic) e richiedono [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases) per tentare di sistemare gli errori. Nota che questi dischi potrebbero avere ancora problemi anche se applicato NVMeFix.kext.
  * In questo caso, anche gli SSD NVMe Samsung 970 EVO Plus hanno lo stesso problema, che viene risolto con un aggiornamento firmware; ottieni l'aggiornamento (da Windows tramite Samsung Magician o con un ISO avviabile) [qui](https://www.samsung.com/semiconductor/minisite/ssd/download/tools/).
  * Nota che i laptop che usano [Intel Optane Memory](https://www.intel.com/content/www/us/en/architecture-and-technology/optane-memory.html) oppure [Micron 3D XPoint](https://www.micron.com/products/advanced-solutions/3d-xpoint-technology) per accelerare il disco rigido non è supportata in macOS. Qualche utente ha segnalato un successo in Catalina, con supporto alla lettura e scrittura, ma raccomandiamo di rimuovere il disco per prevenire problemi di avvio.
  
* **Intel 600p**
  * Pur non essendo nella lista nera, stai attento a questo modello perché può causare numerosi problemi. [Any fix for Intel 600p NVMe Drive? #1286 (EN)](https://github.com/acidanthera/bugtracker/issues/1286)

## Connessione Cablata

Teoricamente tutti gli adattatori ethernet hanno qualche forma di supporto in macOS, ci sono driver ufficiali e quelli fatti dalla community. Le maggiori eccezioni:

* I NIC con Intel I225 2.5Gb
  * Trovato nelle schede Desktop Comet Lake NIC
  * Arginazioni del problema ci sono: [Fonte](https://www.hackintosh-forum.de/forum/thread/48568-i9-10900k-gigabyte-z490-vision-d-er-läuft/?postID=606059#post606059) ed [Esempio](config.plist/comet-lake.md#deviceproperties)
* I server NIC con Intel I350 1Gb
  * Trovato normalmente nelle schede Intel e Supermicro di diverse generazioni
  * [Soluzione](config-HEDT/ivy-bridge-e.md#deviceproperties)
* Server NIC di Intel 10Gb
  * Soluzioni possibili per i [chipset X520 e X540](https://www.tonymacx86.com/threads/how-to-build-your-own-imac-pro-successful-build-extended-guide.229353/)
* I server NIC di Mellanox and Qlogic

## Connessione Wireless

La maggior parte delle schede WiFi che sono nei laptop non sono supportate dato che sono solitamente Intel/Qualcomm. Se sei fortunato, potresti avere una scheda supportata Atheros, ma che arriva fino ad High Sierra.

La migliore opzione è una scheda Broadcom supportata; vedi [WiFi Buyer's Guide (EN)](https://dortania.github.io/Wireless-Buyers-Guide/) per suggerimenti.

Nota: è supportato Intel WiFi non ufficialmente (driver di terze parti), vedi [WiFi Buyer's Guide (EN)](https://dortania.github.io/Wireless-Buyers-Guide/) per maggiori informazioni riguardo i driver e le schede supportate.

## Mix

* **Sensori impronte digitali**
  * Non c'è modo per emulare il sensore Touch ID, perciò non funzionerà.
* **Riconoscimento Facciale Windows Hello**
  * Alcuni laptop hanno questa tecnologia collegata con una connessione I2C (e usata attraverso la tua iGPU), non funzionerà.
  * Alcuni laptop hanno questa tecnologia collegata con una connessione USB, se sarai fortunato, la fotocamera potrebbe funzionare, ma nient'altro.
* **Intel Smart Sound Technology**
  * Laptop con Intel SST non funzionerà nulla collegato a questa tecnologia (di solito microfono interno), perché non supportata. Puoi controllare con il Device Manager su Windows.
* **Headphone Jack Combo**
  * Alcuni laptop con combo headphone jack non potranno usare l'audio con queste, il microfono interno o nemmeno un microfono esterno collegato da una USB.
* **Thunderbolt USB-C ports**
  * (Hackintosh) Il supporto Thunderbolt è correntemente continua ad essere dubbioso per macOS, anche con i controller Alpine Ridge, che molti laptop attuali hanno. Ci sono stati tentativi per tenere i controller accesi, che permettono a Thunderbolt e USB-C hotplug di funzionare, ma porta kernel panic e/o errori di post-sleep con le USB-C. Se vuoi usare il lato delle porte delle USB-C e fanno lo sleep, devi collegarle all'avvio e tenerle collegate.
  * Nota: Questo non si applica alle porte USB-C - solo alle porte combinate da Thunderbolt 3 e USB-C.
  * Anche disabilitando il Thunderbolt dal BIOS lo risolverà.
