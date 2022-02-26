---
home: true
heroImage: dortania-logo-clear.png
heroText: Guida di Installazione OpenCore by Dortania
actions:
  - text: Iniziamo→
    link: prerequisites.md
tagline: Ricordiamo che questa è una traduzione NON UFFICIALE! Se vuoi vedere l'originale, visita Dortania. Se vuoi contribuire a una traduzione, clicca sul tasto in fondo alla pagina.
---

# Cos'è OpenCore e per chi è stata scritta questa guida

OpenCore è quello che potremmo chiamare un "boot loader" – ossia un complesso programma che prepara i nostri sistemi per macOS – specificamente iniettando i nostri nuovi dati adatti a macOS nel SMBIOS, nelle tabelle ACPI e nei kext. Questo tool si differenzia dagli altri (ad esempio da Clover), poiche' è stato progettato avendo come priorità la sicurezza e la qualità, permettendoci di usare molte funzionalità esistenti nei Mac reali, come il [System Integrity Protection](https://support.apple.com/en-ca/HT204899) e il [FileVault](https://support.apple.com/en-ca/HT204837). Maggiori dettagli possono essere trovati in: [Perché OpenCore è migliore di Clover e di altri](why-oc.md).

Questa guida si focalizza soprattutto su:

* Installare macOS su un PC basato su X86
* Insegnare come l'hack funziona

Perciò, sarà necessario leggere, imparare e soprattutto usare Google. Non è un setup semplice del tipo "click e installa".

Per favore ricorda che OpenCore è ancora nuovo e correntemente in beta. Tuttavia è abbastanza stabile, molto più di Clover da certi punti di vista, ed è aggiornato costantemente, per questo le sue voci di configurazione potrebbero essere cambiate spesso (es. nuovi quirk che rimpiazzano quelli vecchi).

Infine, se hai problemi puoi sempre visitare [r/Hackintosh subreddit](https://www.reddit.com/r/hackintosh/) e [r/Hackintosh Discord](https://discord.gg/u8V7N5C) per ulteriore aiuto.
