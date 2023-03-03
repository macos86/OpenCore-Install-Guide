---
home: true
heroImage: /acpi-logo.png
heroText: Iniziamo con gli ACPI by Dortania
actions:
  - text: SSDT Precompilati→
    link: ssdt-prebuilt.md
  - text: SSDTTime (Compilazione automatica)→
    link: ssdt-easy.md
  - text: Creazione manuale→
    link: manual.md
tagline: "Abbiamo tre metodi per creare i nostri SSDT:"
---

# Iniziamo con ACPI

Perciò, cosa sono gli DSDT/SSDT? Beh, queste tabelle presenti nel tuo firmware aggiungono dispositivi come controller USB, thread della CPU, controller integrato, orologio di sistema e altro.
Un DSDT (Differentiated System Description Table) può essere l'insieme di una serie di informazioni passate tramite gli SSDT (Secondary System Description Table).
Puoi pensare che il DSDT sia l'insieme degli SSDT con ulteriori dettagli riguardo al progetto

Puoi leggere maggiori informazioni riguardo alle specifiche ACPI qui: [Manuale ACPI 6.4 (En)](https://uefi.org/sites/default/files/resources/ACPI_Spec_6_4_Jan22.pdf)

> Perciò, perché ci importano queste tabelle?

macOS può essere ottuso riguardo ai dispositivi presenti nel tuo DSDT e dovremmo correggerlo.
<!--I principali dispositivi che richiedono la correzione per funzionare correttamente:

* Controller Integrati abbreviazione EC, da Embedded controller
  * Tutte le macchine moderne o meno con processore Intel hanno un EC (chiamato usualmente H\_EC, ECDV, EC0, ecc...) esposto nel loro DSDT, e anche la maggior parte dei sistemi AMD ce l'hanno esposto. Questi controller generalmente non sono compatibili con macOS e causano i panic, perciò vanno nascosti da macOS. macOS Catalina richiede un dispositivo con il nome `EC`, perciò nei casi limite creeremo un EC fantoccio.
  * Nei laptop, il controller integrato deve ancora essere abilitato per far funzionare batteria e tasti chiave, e rinominare l'EC può causare ulteriori problemi su Windows, perciò creeremo un finto EC senza disabilitare quello reale.
* Plugin type
  * Questo ci permette di usare XCPM che provvede una gestione dell'energia nativa per la CPU su **Intel** Haswell e CPU più recenti, questo SSDT si connetterà alla prima thread della CPU. Non riguarda AMD
* Orologio di sistema AWAC.
  * Si applica a tutte le schede madri della serie 300 incluse molte schede Z370, questi problemi specifici derivano dal nuovo orologio AWAC incluso in queste schede. Questo è un problema perché macOS non riesce a comunicare con gli orologi AWAC, perciò dobbiamo forzare l'utilizzo del vecchio orologio RTC o se non utilizzabile crearne uno per far giocare macOS
* SSDT per la NVRAM
  * Le vere schede madri della serie 300 (non Z370) non dichiarano il chip FW come MMIO in ACPI e perciò il kernel ignora la regione MMIO dichiarata nella mappa della memoria UEFI. Questo SSDT fa ritornare il supporto NVRAM
* SSDT per la retroilluminazione
  * Usato per sistemare il controllo della luminosità nei laptop
* SSDT GPIO
  * Usato per creare uno stub per far funzionare VoodooI2C, solo per laptop
* SSDT XOSI
  * Usato per reinstradare la chiamata OSI a questo SSDT, usata principalmente per ingannare il dispositivo e per farlo pensare di star avviando Windows per avere un maggiore supporto del trackpad. Questa è una soluzione da hacker, che può disturbare l'avvio di Windows, usa SSDT GPIO. L'uso di XOSI non sarà descritto in questa guida
* SSDT IRQ e patch ACPI
  * Necessarie per sistemare i conflitti IRQ con DSDT, principalmente per laptop. Esclusivo di SSDTTime
  * Nota che Skylake e sistemi più recenti hanno raramente conflitti IRQ, importante principalmente in Broadwell e meno recenti
-->
