# Conversioni da Clover a OpenCore

Ora che hai visto lo strano bootloader OpenCore e non vedi l'ora di provarlo, beh, sei venuto nel luogo giusto! Molte cose in Clover sono state implementate, ma altre no, qui potrai vedere cosa è stato implementato e cosa no.

Per iniziare hai alcune risorse che ti aiuteranno:

* [Conversioni del Config.plist](/extras/Clover-config.md)
* [Conversione kext e driver Firmware (.kext, .efi)](/extras/clover-efi.md)
* [Conversione Boot Argument](/extras/Clover-boot-arg.md)
* [Conversione delle patch comuni di Kernel e Kext](/extras/clover-patch.md)

## Pulire la spazzatura Clover in macOS

Per iniziare, Clover ci fo**erà se stai emulando la NVRAM. Perché? Beh, sembra che installi della spazzatura che è una cosa dolorosa da rimuovere. Devi disabilitare il SIP per pulire.

Cosa controllare:

* `/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi`
* `/Volumes/EFI/nvram.plist`
* `/etc/rc.clover.lib`
* `/etc/rc.boot.d/10.save_and_rotate_boot_log.local`
* `/etc/rc.boot.d/20.mount_ESP.local`
* `/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled`
* `/etc/rc.shutdown.d/80.save_nvram_plist.local​`

Se le cartelle dopo la pulizia sono vuote, possono essere rimosse:

* `/etc/rc.boot.d`
* `/etc/rc.shutdown.d​`

Gli utenti del Pannello Preferenze di Clover dovranno anche rimuovere:

* `/Library/PreferencePanes/Clover.prefPane`
* `/Library/Application\ Support/clover`

## Rimuovere i kext da macOS (S/L/E e L/E)

Clover installava i kext dentro macOS, specificamente in System/Library/Extensions e Library/Extensions. Ragionando su come Clover inietta i kext, potrebbero fallire gli aggiornamenti di sistema o lasciarci senza motivo. Grazie ad OpenCore, è stato creato un sistema più robusto e stabile per iniettare i kext, che rendono più difficile causare problemi. Perciò è importante fare una piccola pulita.

**Nota**: OpenCore fallirà nell'iniettare kext che sono già nella tua kernelcache perciò la pulizia risolve anche questi problemi

Ora apri il terminale e scrivi:

```
sudo kextcache -i /
```

Questo comando dovrà pulire da tutti i kext non riconosciuti nelle cartelle S/L/E e L/E.

**Rimuovere tutti i kext di hack**:

```
sudo -s
touch /Library/Extensions /System/Library/Extensions​
kextcache -i /​
```

* **Nota**, macOS Catalina dovrà usare il comando `mount -uw /` per montare il volume di sistema come Read/Write

## Pulizia dalla spazzatura di Clover nel tuo hardware

L'altra cosa che Clover ha fatto è che potrebbe averti nascosto le variabili NVRAM, cosa che OpenCore non gradisce, dato che non sovrascriverà variabile a meno che non scritto con la funzionalità `Delete` trovabile in `NVRAM -> Delete`. Per sistemare questo, dovremmo pulirla usando la funzionalità `ClearNvram`.

Nel tuo config.plist:

* `Misc -> Security -> AllowNvramReset -> True`

Quando avvii OpenCore, seleziona l'opzione d'avvio `Reset NVRAM`. Questo pulirà tutto e riavvierà il sistema una volta finito.

* Nota: i laptop Thinkpad sono famosi per entrare in un semi-brick dopo un reset NVRAM in OpenCore, raccomandiamo di resettare la NVRAM aggiornando il BIOS in queste macchine.

## Opzionale: Evitare che il SMBIOS venga iniettato in altri sistemi

Di default OpenCore inietterà i dati del SMBIOS in tutti i sistemi, il motivo è:

* Questo permette un supporto corretto per programmi come [BootCamp](/OpenCore-Post-Install/multiboot/bootcamp.md)
* Evita casi limite dove i dati sono iniettati diverse volte, visto comunemente con Clover

Tuttavia, ci sono quirk in OpenCore che permette l'iniezione SMBIOS solo su macOS limitando il patch solo al momento nel quale macOS legge le informazioni del SMBIOS. Questi quirk possono non funzionare in futuro e perciò raccomandiamo di usarlo solo quando certi programmi non funzionano in altri sistemi. Per avere una maggiore stabilità, per favore evitalo

Per abilitare l'iniezione del SMBIOS solo su macOS:

* Kernel -> Quirks -> CustomSMBIOSGuid -> True
* PlatformInfo -> UpdateSMBIOSMode -> Custom
