# Conversione kext e driver Firmware (.kext, .efi)

Le cose principale è notare che devi specificare quali kext e driver del Firmware nel config.plist, o non verranno caricati. Tutti i kext che sono disponibili per Clover saranno supportati su OpenCore, tuttavia molti sono stati deprecati dato che ci sono varianti integrate in OpenCore. I driver del Firmware sono un po' differenti perché possono bloccare l'avvio.

[[toc]]

## Kext

Per la maggior parte, tutti i kext sono supportati in OpenCore. Alcuni tuttavia sono integrati

**Kext Integrati:**

* NullCPUPowerManagement.kext
  * Integrato in `DummyPowerManagement` sotto `Kernel -> Emulate`
* BT4LEContinuityFixup.kext
  * Integrato in `ExtendBTFeatureFlags` sotto `Kernel -> Quirks`

## Driver del Firmware

**Quelli supportati:**

* AudioDxe.efi (Sii sicuro che viene da [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg) e **non** dalla repo di Goldfish64 o di Clover)
* CsmVideoDxe.efi (Nota che [BiosVideo.efi](https://github.com/acidanthera/DuetPkg) potrebbe essere preferibile)
* EnhancedFatDxe.efi
* ExFatDxeLegacy.efi
* ExFatDxe.efi
* GrubEXFAT.efi
* GrubISO9660.efi
* GrubNTFS.efi
* GrubUDF.efi
* HiiDatabase.efi
* HfsPlus.efi
* HfsPlusLegacy.efi
* NTFS.efi
* NvmExpressDxe.efi
* OpenRuntime.efi
* OpenUsbKbDxe.efi
* OsxFatBinaryDrv.efi
* Ps2MouseDxe.efi
* TbtForcePower.efi
* UsbMouseDxe.efi
* VBoxExt2.efi
* VBoxExt4.efi
* VBoxHfs.efi
* VBoxIso9600.efi
* XhciDxe.efi

**Driver integrati/provvisti dentro OpenCore e perciò non più necessari:**

* APFS.efi
* ApfsDriverLoader.efi
* AppleEvent.efi
* AppleGenericInput.efi
* AppleImageCodec.efi
* AppleKeyMapAggregator.efi
* AppleUiSupport.efi
* AppleUITheme.efi
* AptioInputFix.efi
* AptioMemoryFix.efi
* AudioDxe.efi (per questo, usa AudioDxe dato con [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg))
* BootChimeDxe.efi
* DataHubDxe.efi
* EmuVariableUEFI.efi
* EnglishDxe.efi
* FirmwareVolume.efi
* HashServiceFix.efi
* SMCHelper.efi
* OcQuirks.efi
* VirtualSMC.efi

**Driver esplicitamente non supportati:**

* AppleUsbKbDxe.efi (sostituito con OpenUsbKbDxe.efi)
* FSInject.efi
* FwRuntimeServices.efi (sostituito con OpenRuntime.efi)
* osxaptiofix2drv-free2000.efi
* osxaptiofix2drv.efi
* osxaptiofix3drv.efi
* osxaptiofixdrv.efi
* OsxFatBinaryDrv.efi
* OsxLowMemFixDrv.efi
* UsbKbDxe.efi (sostituito con OpenUsbKbDxe.efi)

### Nota su AptioMemoryFix

Prima abbiamo iniziato a convertire il config di Clover, ma dobbiamo parlare di convertire AptioMemoryFix. La cosa da notare è che è dentro OpenCore con OpenRuntime come estensione, questo significa che c'è AptioMemoryFix e addirittura altre molte opzioni da scegliere. Per favore vedi la sezione specifica per il tuo hardware per capire quali impostazioni del Booter il tuo sistema richiede (HEDT come X99 o X299 dovrebbero studiare la CPU più vicina come gli Skylake-X si dovrebbero riferire alla guida Skylake e **leggere i commenti** dato che menzionano specifiche per il tuo sistema).
