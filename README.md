# Mastodon Widget

Ein anpassbares Mastodon-Widget, das es ermöglicht, Toots von einem bestimmten Benutzer oder einer Instanz anzuzeigen. Es unterstützt mehrere Themes, benutzerdefinierte Optionen und ein responsives Design.

## Vorschau



## Features

- **Anpassbare Themes**: Unterstützung für verschiedene Farbthemen wie `dark`, `mastodon`, `green`, `midnight`, `inkblack` und `costume`.
- **Responsives Design**: Passt sich flexibel an verschiedene Bildschirmgrößen an.
- **Benutzerdefinierte Optionen**: Konfigurierbar über JavaScript-Optionen.
- **Unterstützung für Mastodon-Funktionen**: Zeigt Toots, Medien, Antworten, Boosts und Favoriten an.
- **Hover-Effekte und Icons**: Verbesserte Benutzerinteraktion durch SVG-Icons und Effekte.
- **Automatische Aktualisierung**: Lädt Toots in regelmäßigen Abständen neu.

---

## Installation

1. **CSS einbinden**  
   Füge die Datei `mastodon-widget.css` in dein Projekt ein und binde sie in deinem HTML ein:
   ```html
   <link rel="stylesheet" href="mastodon-widget.css">
   ```

2. **JavaScript einbinden**  
   Füge die Datei `mastodon-widget.js` in dein Projekt ein:
   ```html
   <script src="mastodon-widget.js"></script>
   ```

3. **HTML-Container hinzufügen**  
   Erstelle einen Container, in dem das Widget angezeigt werden soll:
   ```html
   <div id="mastodon-widget"></div>
   ```

4. **Widget initialisieren**  
   Initialisiere das Widget mit deinen Einstellungen:
   ```html
   <script>
     MastodonWidget.init({
       instanceUrl: "https://mastodon.social",
       user: "@username",
       elementId: "mastodon-widget",
       theme: "dark",
       maxToots: 5,
       showHeader: true,
       showFooter: true,
       interval: 60, // Aktualisierung alle 60 Sekunden
     });
   </script>
   ```

---

## CSS-Details

### Globale Variablen
Die Datei `mastodon-widget.css` verwendet CSS-Variablen, um die Anpassung zu erleichtern:
```css
:root {
  --bg: #fff; /* Hintergrundfarbe */
  --text: #111; /* Textfarbe */
  --border: #ccc; /* Rahmenfarbe */
  --hashtag: #027ec5; /* Farbe für Hashtags */
  --button-bg: #a3a3a3; /* Hintergrundfarbe für Buttons */
  --button-text: #111; /* Textfarbe für Buttons */
}
```

### Theme-spezifische Variablen
Jedes Theme definiert eigene Farben:
```css
[data-theme="dark"] {
  --bg: #1e1e1e;
  --text: #eee;
  --border: #444;
  --hashtag: #6f6f6f;
  --button-bg: #454545;
  --button-text: #eee;
}
[data-theme="mastodon"] {
  --bg: #563ACC;
  --text: #f4f4f4;
  --border: #785ee3;
  --hashtag: #f4f4f4;
  --button-bg: #f4f4f4;
  --button-text: #563ACC;
}
```

### Hauptcontainer
```css
#mastodon-widget {
  font-family: "Roboto", sans-serif;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  resize: both;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
```

---

## JavaScript-Details

### Initialisierung
Die `init`-Funktion wird verwendet, um das Widget zu konfigurieren und zu starten:
```javascript
MastodonWidget.init({
  instanceUrl: "https://mastodon.social",
  user: "@username",
  elementId: "mastodon-widget",
  theme: "dark",
  maxToots: 5,
  showHeader: true,
  showFooter: true,
  interval: 60, // Aktualisierung alle 60 Sekunden
});
```

### Optionen
- `instanceUrl`: Die URL der Mastodon-Instanz.
- `user`: Der Benutzername des Mastodon-Kontos (z. B. `@username`).
- `elementId`: Die ID des Containers, in dem das Widget angezeigt wird.
- `theme`: Das Theme des Widgets (`dark`, `mastodon`, `green`, etc.).
- `maxToots`: Maximale Anzahl der anzuzeigenden Toots.
- `showHeader`: Zeigt den Header mit Benutzerinformationen an.
- `showFooter`: Zeigt den Footer mit einem Profil-Link an.
- `interval`: Intervall für die automatische Aktualisierung (in Sekunden).

### Funktionen
- **`fetchToots`**: Lädt Toots von der Mastodon-API.
- **`renderToots`**: Rendert die Toots im HTML-Container.
- **`formatRelativeTime`**: Formatiert das Datum in eine relative Zeitangabe (z. B. "vor 2 Stunden").

---

## Beispiel

Hier ist ein Beispiel für die Verwendung des Widgets:
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mastodon Widget</title>
  <link rel="stylesheet" href="mastodon-widget.css">
</head>
<body>
  <div id="mastodon-widget"></div>
  <script src="mastodon-widget.js"></script>
  <script>
    MastodonWidget.init({
      instanceUrl: "https://mastodon.social",
      user: "@username",
      elementId: "mastodon-widget",
      theme: "dark",
      maxToots: 5,
      showHeader: true,
      showFooter: true,
      interval: 60,
    });
  </script>
</body>
</html>
```

---

## Lizenz

Dieses Projekt steht unter MIT Lizenz.

---

Viel Spaß beim Verwenden des Mastodon-Widgets!

<a href="https://www.buymeacoffee.com/RonDev"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=RonDev&button_colour=5F7FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" /></a>
