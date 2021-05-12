# Legacy macOS: metodo Offline

Questo metodo ci permetterà di scaricare l'immagine direttamente dai server Apple, tuttavia è limitato a 10.10, Yosemite, perciò per sistemi più vecchi dovrai usare il "Metodo Online" mezionato sotto.

Per iniziare, vai al link sottostante:

* [Come ottenere le versioni precedenti di macOS](https://support.apple.com/it-it/HT211683)

Scarica la versione scelta e dovresti ottenere un file .pkg.

A seconda di quale sistema tu sia, puoi usare questo script e passare alla sezione [Configurare l'installer](./mac-install.md#configurare-l'installer), tuttavia potresti ricevere questo errore:

![](../images/installer-guide/legacy-mac-install-md/unsupported.png)

Questo significa che dovremmo estrarre manualmente l'installer.

## Estrarre l'Installer

Per iniziare, trascina il InstallMacOSX/InstallOS.dmg e montalo:

![](../images/installer-guide/legacy-mac-install-md/mount.png)

Dopo, apriremo una finestra di terminale e creeremo una finestra sulla scrivania. Usa questo comando una volta:

```sh
cd ~/Desktop
mkdir MacInstall && cd MacInstall
```

Ora inizia la parte divertente, estrarre l'installer (Nota che potrebbe metterci alcuni minuti):

* Per El Capitan (10.11) o più vecchi:

```sh
xar -xf /Volumes/Install\ OS\ X/InstallMacOSX.pkg
```

* Per Sierra (10.12):

```sh
xar -xf /Volumes/Install\ macOS/InstallOS.pkg
```

Dopo, usa i seguenti comandi(uno alla volta):

* Yosemite:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ Yosemite.app/Contents/SharedSupport/
mv Install\ OS\ X\ Yosemite.app /Applications
```

* El Capitan:

```sh
cd InstallMacOSX.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ OS\ X\ El\ Capitan.app/Contents/SharedSupport/
mv Install\ OS\ X\ El\ Capitan.app /Applications
```

* Sierra:

```sh
cd InstallOS.pkg
tar xvzf Payload
mv InstallESD.dmg Install\ macOS\ Sierra.app/Contents/SharedSupport/
mv Install\ macOS\ Sierra.app /Applications
```

### Quando hai finito, puoi passare a [Configurare l'installer](#configurare-l'installer)
