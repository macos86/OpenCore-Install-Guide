# Conversione delle patch comuni di Kernel e Kext

## Convertire una patch manuale

Quando converti una patch del kernel/kext in una per OpenCore, devi ricordare due cose

* `InfoPlistPatch` non ha una funzione in questo caso
* `MatchOS` è sostituito con `MinKernel` e `MaxKernel`
* Sia le patch del kernel che kext vanno in `Kernel -> Patch`, usa un `Identifier` per dire che cosa stai patchando

Ora vediamo un esempio:

**KernelToPatch**:

| Key | Type | Value |
| :--- | :--- | :--- |
| Comment | String | cpuid_set_cpufamily - force CPUFAMILY_INTEL_PENRYN |
| Disabled | Boolean | False |
| MatchBuild | String | 18G95,18G103 |
| MatchOS | String | 10.14.6 |
| Find | Data | `31db803d4869980006755c` |
| Replace | Data | `bbbc4fea78e95d00000090` |

Per convertire questa patch, vedi sotto:

* `Comment`: Disponibile sia per Clover che per OpenCore
* `Disabled`: OpenCore usa invece `Enabled`
* `MatchBuild`: OpenCore usa `MinKernel` e `MaxKernel`, vedi sotto per maggiori informazioni
* `MatchOS`: OpenCore usa `MinKernel` e `MaxKernel`, vedi sotto per maggiori informazioni
* `Find`: Disponibile sia per Clover che per OpenCore
* `Replace`: Disponibile sia per Clover che per OpenCore
* `MaskFind`: OpenCore usa invece `Mask`
* `MaskReplace`: Disponibile sia per Clover che per OpenCore

Perciò la patch diventerebbe:

**Kernel -> Patch**:

| Key | Type | Value |
| :--- | :--- | :--- |
| Comment | String | cpuid_set_cpufamily - force CPUFAMILY_INTEL_PENRYN |
| Enabled | Boolean | True |
| MinKernel | String | 18.7.0 |
| MaxKernel | String | 18.7.0 |
| Find | Data | `31db803d4869980006755c` |
| Replace | Data | `bbbc4fea78e95d00000090` |
| Identifier | String | kernel |
| Limit | Number | 0 |
| Count | Number | 0 |
| Skip | Number | 0 |
| Mask | Data | |
| ReplaceMask | Data | |

Per Min e MaxKernel, possiamo usare le informazioni sotto per informarci, perciò 18G95 ha la versione del kernel `18.7.0` e 18G103 ha `18.7.0` (entrambe hanno lo stesso kernel):

* [macOS Mojave: Pubblicazioni](https://it.wikipedia.org/wiki/MacOS_Mojave#Pubblicazione)

Per il campo Identifier, devi definire `kernel` o il kext che vuoi modificare (come `com.apple.iokit.IOGraphicsFamily` )

Riguardo Limit, Count e Skip, sono impostate su `0` perciò sono applicate in ogni istanza. `Mask` e `ReplaceMask` possono essere lasciate in bianco perché Clover non supporta il masking (se non di recentissimo ma non verrà spiegato).

## Patch comuni in OpenCore & Co

Piccola sezione in cui menzioniamo le patch comuni che sono state assorbite in OpenCore o in altri kext. Questa lista non è completa e perciò molti di queste possono essere state dimenticate o segnalate aprendo una nuova [issue](https://github.com/khronokernel/OpenCore-Vanilla-Desktop-Guide/issues). Ogni aiuto sarà apprezzato

### Patch del Kernel

Per una lista completa delle patch che OpenCore supporta, vedi [/Library/OcAppleKernelLib/CommonPatches.c](https://github.com/acidanthera/OpenCorePkg/blob/master/Library/OcAppleKernelLib/CommonPatches.c)

**Patch Generali**:

* `MSR 0xE2 _xcpm_idle instant reboot` (c) Pike R. Alpha
  * `Kernel -> Quirks -> AppleXcpmCfgLock`

**Patch specifiche per HEDT**:

Tutte le seguenti patch sono dentro `Kernel -> Quirk -> AppleXcpmExtraMsrs`

* `_xcpm_bootstrap` © Pike R. Alpha
* `xcpm_pkg_scope_msrs` © Pike R. Alpha
* `_xcpm_SMT_scope_msrs` 1 © Pike R. Alpha
* `_xcpm_SMT_scope_msrs` #2 (c) Pike R. Alpha
* `_xcpm_core_scope_msrs` © Pike R. Alpha
* `_xcpm_ performance_patch` © Pike R. Alpha
* xcpm MSR Patch 1 and 2 @Pike R. Alpha
* `/0x82D390/MSR_PP0_POLICY 0x63a xcpm support` patch 1 e 2 Pike R. Alpha

### Patch ai Kext

* Disabilita il logging dei Kext durante un Panic
  * `Kernel -> Quirks -> PanicNoKextDump`
* AppleAHCIPort External Icon Patch1
  * `Kernel -> Quirks -> ExternalDiskIcons`
* Abilitare Trim su SSD
  * `Kernel -> Quirks -> ThirdPartyDrives`
* Patch dei Limiti delle Porte USB
  * `Kernel -> Quirks -> XhciPortLimit`
* Patch di DP/HDMI FredWst
  * [AppleALC](https://github.com/acidanthera/AppleALC/releases) + [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
* Patch del IOPCIFamily
  * `Kernel -> Quirks -> IncreasePciBarSize`
* Disabilita il check del board-ID
  * [WhateverGreen](https://github.com/acidanthera/whatevergreen/releases)
* Patch di AppleHDA
  * [AppleALC](https://github.com/acidanthera/AppleALC/releases)
* Patch Input/Output di NVMe
  * Non richiesto più su High Sierra o più recenti
  * Per il power management su Mojave e più recenti: [NVMeFix](https://github.com/acidanthera/NVMeFix/releases)
