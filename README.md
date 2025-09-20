# Mastodon Widget
![GitHub language count](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/created_at/social/calendarjelly) ![GitHub Repo stars](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/stars/social/starjelly)  ![GitHub license](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/license/social/crownjelly/*/c1d82f-black) ![GitHub release (latest by date)](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/release/social/wandjelly) ![GitHub top language](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/top_language_count/social/codejelly) ![GitHub language count](https://mini-badges.rondevhub.de/github/RonDevHub/MastoTimeline/commit/social/calendarjelly)

[![Buy me a coffee](https://mini-badges.rondevhub.de/icon/cuptogo/Buy_me_a_Coffee-c1d82f-222/for-the-badge "Buy me a coffee")](https://www.buymeacoffee.com/RonDev)
[![Buy me a coffee](https://mini-badges.rondevhub.de/icon/cuptogo/ko--fi.com-c1d82f-222/for-the-badge "Buy me a coffee")](https://ko-fi.com/U6U31EV2VS)
[![Sponsor me](https://mini-badges.rondevhub.de/icon/hearts-red/Sponsor_me/for-the-badge "Sponsor me")](https://github.com/sponsors/RonDevHub)
[![Pizza Power](https://mini-badges.rondevhub.de/icon/pizzaslice/Buy_me_a_pizza/for-the-badge "Pizza Power")](https://www.paypal.com/paypalme/Depressionist1/4,99)

A **customizable Mastodon widget** that allows you to display **Toots from a specific user or instance**. It supports **multiple themes**, **custom options**, and a **responsive design**.

## Preview
![mastotimeline local_](https://github.com/user-attachments/assets/0b9ed77f-e432-4588-927e-dd02c883b5f4)


## Features

* **Customizable Themes**: Supports various color themes like `dark`, `mastodon`, `green`, `midnight`, `inkblack`, and `costume`.
* **Responsive Design**: Flexibly adapts to different screen sizes.
* **Custom Options**: Configurable via JavaScript options.
* **Mastodon Feature Support**: Displays Toots, media, replies, boosts, and favorites.
* **Hover Effects and Icons**: Improved user interaction through SVG icons and effects.
* **Automatic Refresh**: Reloads Toots at regular intervals.

---

## Installation

1.  **Include CSS**
    Add the `mastodon-widget.css` file to your project and link it in your HTML:

    ```html
    <link rel="stylesheet" href="mastodon-widget.css">
    ```

2.  **Include JavaScript**
    Add the `mastodon-widget.js` file to your project:

    ```html
    <script src="mastodon-widget.js"></script>
    ```

3.  **Add HTML Container**
    Create a container where the widget will be displayed:

    ```html
    <div id="mastodon-widget"></div>
    ```

4.  **Initialize Widget**
    Initialize the widget with your settings:

    ```html
    <script>
      MastodonWidget.init({
        instanceUrl: "[https://mastodon.social](https://mastodon.social)",
        user: "@username",
        elementId: "mastodon-widget",
        theme: "dark",
        maxToots: 5,
        showHeader: true,
        showFooter: true,
        interval: 60, // Refresh every 60 seconds
      });
    </script>
    ```

---

## CSS Details

### Global Variables

The `mastodon-widget.css` file uses CSS variables for easy customization:

```css
:root {
  --bg: #fff; /* Background color */
  --text: #111; /* Text color */
  --border: #ccc; /* Border color */
  --hashtag: #027ec5; /* Hashtag color */
  --button-bg: #a3a3a3; /* Button background color */
  --button-text: #111; /* Button text color */
}
```
Theme-specific Variables
Each theme defines its own colors:

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
Main Container
```CSS
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
## JavaScript Details
Initialization
The init function is used to configure and start the widget:

```JavaScript
MastodonWidget.init({
  instanceUrl: "[https://mastodon.social](https://mastodon.social)",
  user: "@username",
  elementId: "mastodon-widget",
  theme: "dark",
  maxToots: 5,
  showHeader: true,
  showFooter: true,
  interval: 60, // Refresh every 60 seconds
});
```
## Options
* `instanceUrl`: The URL of the Mastodon instance.
* `user`: The username of the Mastodon account (e.g., @username).
* `elementId`: The ID of the container where the widget will be displayed.
* `theme`: The theme of the widget (dark, mastodon, green, etc.).
* `maxToots`: Maximum number of Toots to display.
* `showHeader`: Shows the header with user information.
* `showFooter`: Shows the footer with a profile link.
* `interval`: Interval for automatic refresh (in seconds).
## Functions
* `WorkspaceToots`: Loads Toots from the Mastodon API.
* `renderToots`: Renders the Toots in the HTML container.
* `formatRelativeTime`: Formats the date into a relative time (e.g., "2 hours ago").
## Example
Here's an example of using the widget:

```HTML
<!DOCTYPE html>
<html lang="en">
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
      instanceUrl: "[https://mastodon.social](https://mastodon.social)",
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
## License
This project is licensed under the MIT License.

---

Have fun using the **Mastodon Widget**!