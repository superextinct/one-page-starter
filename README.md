# 1. Installation
## 1.1 node & npm installieren
Node ist eine Entwicklungsumgebung, mit der Javascript auf Serverebene ausgeführt werden kann. npm steht für den node package manager , damit können Libraries und Module zum eigenen Projekt hinzugefügt werden.

Im One-Page-Template nutzen wir neben d3  zum Beispiel auch scrollama  zum Steuern der Scrollposition.

### 1.1.2 Installer herunterladen
Node kann auf unterschiedliche Arten installiert werden. Am einfachsten geht es mit einem Installer, der unter https://nodejs.org/en/download/ heruntergeladen kann (sowohl für Windows auch als Mac). 

Nach dem Download den Installer ausführen.

### 1.1.3 Installation testen 
Ob die Installation geklappt hat, sieht man mit dem Befehl `npm -v`. Dazu ein neues Terminalfenster aufmachen (bzw. unter Windows „PowerShell”) und `npm -v`  eingeben und mit Enter bestätigen.

Anschließend sollte eine Versionsnummer zurückgegeben. Kommt hingegen ein Fehler, dass der Befehl *npm* nicht existiert, das Terminal/PowerShell-Fenster schließen und nochmal öffnen.

## 1.2 Repository herunterladen / clonen

Entweder das Repository als `.zip` herunterladen oder mit `git` im Terminal clonen:

```git clone https://github.com/superextinct/one-page-starter```

## 1.3 Dependencies installieren

Mit dem Terminal zum entpackten Verzeichnis navigieren und dort alle Dependencies installieren:

```npm install```

# 2. Server starten & stoppen

Anschließend mit `npm run dev`  den Server starten. Das Terminal-Fenster kann jetzt minimiert werden. Im Browser sollte das One-Page Template angezeigt werden.

Mit `Crtl + C`  kann der Server beendet werden. 

# 3. Kompilieren
Am Ende der Entwicklung sollte ein neuer Build erstellt werden, indem alle benötigten Dateien gebundelt werden. Das geht mit:

```npm run build```
