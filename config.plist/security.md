---
next: installation.md
---
# Apple Secure Boot

Queste impostazioni nel tuo config.plist possono ridurre le versioni di OSX che openCore farà partire.E' meglio controllare queste velocemente prima di partire dalla tua USB

## Misc

### Security -> SecureBootModel

Di default, Opencore ha [Apple Secure Boot](https://macos86.github.io/OpenCore-Post-Install/universal/security/applesecureboot.html#what-is-apple-secure-boot) abilitata
Questo abilita la funzionalità di sicurezza come la verifica di `boot.efi` di macOS, con l'effetto collaterale di limitare le versioni di macOS che OpenCore potrà avviare.
* Big Sur e superiori (11.0+): Il valore raccomandato e' 'Default'.
* High Sierra-Catalina (10.13-10.15):
 * Se il tuo modello non e' presente nella lista qui sotto imposta il valore su `Disabled`.
 * Se utilizzi I driver Web Nvidia, imposts il valore su `Disabled`.
 * Se il tuo modello e' presente nella lista, compara la minima versione che stai usando , Disabilitalo se il tuo installer e' inferiore alla versione in lista per il tuo SMBIOS
* Sierra e inferiori (10.4-10.12): Questa impostazione non ha effetto.
* Se hai multiple versioni di OSX potresti dover impostare il valore su `Disabled`.
  * per esempio, un SMBIOS non T" che fa partire HighSierra e Big Sur potrebbe necessitare del valore impostato su 'Disabled'
  * Un SMBIOS T2 verrebbe limitato alla versione minima visibile qui sotto.

::: details modelli Mac T2

| SMBIOS                                              | Minimum macOS Version |
| :---                                                | :---                  |
| iMacPro1,1 (December 2017)                          | 10.13.2 (17C2111)     |
| MacBookPro15,1 (July 2018)                          | 10.13.6 (17G2112)     |
| MacBookPro15,2 (July 2018)                          | 10.13.6 (17G2112)     |
| Macmini8,1 (October 2018)                           | 10.14 (18A2063)       |
| MacBookAir8,1 (October 2018)                        | 10.14.1 (18B2084)     |
| MacBookPro15,3 (May 2019)                           | 10.14.5 (18F132)      |
| MacBookPro15,4 (July 2019)                          | 10.14.5 (18F2058)     |
| MacBookAir8,2 (July 2019)                           | 10.14.5 (18F2058)     |
| MacBookPro16,1 (November 2019)                      | 10.15.1 (19B2093)     |
| MacPro7,1 (December 2019)                           | 10.15.1 (19B88)       |
| MacBookAir9,1 (March 2020)                          | 10.15.3 (19D2064)     |
| MacBookPro16,2 (May 2020)                           | 10.15.4 (19E2269)     |
| MacBookPro16,3 (May 2020)                           | 10.15.4 (19E2265)     |
| MacBookPro16,4 (June 2020)                          | 10.15.5 (19F96)       |
| iMac20,1 (August 2020)                              | 10.15.6 (19G2005)     |
| iMac20,2 (August 2020)                              | 10.15.6 (19G2005)     |

:::
