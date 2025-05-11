const MastodonWidget = (function () {
  let config = {};
  let tootCache = [];
  let nextUrl = null;
  const icons = {
    reply:
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 98.86" style="enable-background:new 0 0 122.88 98.86" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M0,49.43l48.93,49.43V74.23c30.94-6.41,55.39,0.66,73.95,24.19c-3.22-48.4-36.29-71.76-73.95-73.31V0L0,49.43 L0,49.43L0,49.43z"/></g></svg>',
    boost:
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 121.08" style="enable-background:new 0 0 122.88 121.08" xml:space="preserve"><g><path d="M15.36,86.24c1.14-0.89,2.79-0.68,3.68,0.46c0.89,1.14,0.68,2.79-0.46,3.68L5.35,100.66l-0.1,13.85l16.25-0.91l8.82-14.02 c0.77-1.22,2.39-1.59,3.61-0.82c1.22,0.77,1.59,2.39,0.82,3.61l-9.5,15.09c-0.43,0.73-1.21,1.24-2.12,1.29L2.76,119.9v0 c-0.05,0-0.1,0-0.15,0c-1.44-0.01-2.61-1.18-2.6-2.63l0.13-17.71c-0.06-0.85,0.29-1.71,1.01-2.27L15.36,86.24L15.36,86.24z M40.09,53.93c6.6-19.73,15.5-33.72,28.02-42.53C81.1,2.25,97.8-1.21,119.68,0.37c1.51,0.11,2.67,1.35,2.69,2.83 c2.12,23.69-2.48,40.49-12.28,53.22c-9.43,12.24-23.58,20.52-41.14,27.47v23.13c0,1.13-0.65,2.12-1.6,2.59l-17.88,11.05 c-1.36,0.84-3.14,0.42-3.98-0.94c-0.22-0.36-0.36-0.75-0.41-1.14l0,0c-3.96-30.26-8.17-31.71-32.91-40.27 c-2.96-1.02-6.15-2.13-8.31-2.89c-1.51-0.53-2.3-2.19-1.77-3.69c0.11-0.32,0.28-0.61,0.48-0.87l11.79-16.8 c0.59-0.84,1.55-1.28,2.5-1.23v0L40.09,53.93L40.09,53.93z M90.71,31.64c-1.6-1.6-3.8-2.58-6.24-2.58c-2.43,0-4.64,0.99-6.24,2.58 c-1.6,1.6-2.58,3.8-2.58,6.24c0,2.43,0.99,4.64,2.58,6.24c1.6,1.6,3.8,2.58,6.24,2.58c2.43,0,4.64-0.99,6.24-2.58 c1.6-1.6,2.58-3.8,2.58-6.24C93.29,35.44,92.3,33.24,90.71,31.64L90.71,31.64z"/></g></svg>',
    favorite:
      '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.5C11.59 5.01 13.26 4 15 4 17.5 4 19.5 6 19.5 8.5c0 3.78-3.4 6.86-8.05 11.54L12 21.35z" />',
    reblog:
      '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 95.395" enable-background="new 0 0 122.88 95.395" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M29.531,0L0,30.716l19.008,0.002V85.11h21.049v-0.002h14.305l0.413,0.002 l18.863-0.005L53.403,64.059l-13.346,0.002v-33.34l19.006-0.004L29.531,0L29.531,0z M93.347,95.395l29.533-30.717l-19.011-0.002 V36.645l0.002-0.533V10.284l-1.024-0.002H77.013l-23.396,0.002v3.293l17.071,17.754h5.795l0.535,0.002h5.803v33.34l-19.006,0.005 L93.347,95.395L93.347,95.395z"/></g></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/></svg>',
  };

  function createSVG(path, className = "icon") {
    return `<svg class="${className}" viewBox="0 0 24 24">${path}</svg>`;
  }

  function ensureLinksOpenInNewTab(container) {
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);

    if (diff < 60) return `vor ${diff} ${diff === 1 ? "Sekunde" : "Sekunden"}`;
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `vor ${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `vor ${hours} ${hours === 1 ? "Stunde" : "Stunden"}`;
    }
    const days = Math.floor(diff / 86400);
    return `vor ${days} ${days === 1 ? "Tag" : "Tagen"}`;
  }

  function fetchToots(initial = true) {
    const url = initial
      ? `${
          config.instanceUrl
        }/api/v1/accounts/lookup?acct=${config.user.replace("@", "")}`
      : nextUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (initial) {
          fetch(
            `${config.instanceUrl}/api/v1/accounts/${data.id}/statuses?limit=${config.maxToots}`
          )
            .then((res) => res.json())
            .then((toots) => {
              tootCache = toots;
              nextUrl = `${config.instanceUrl}/api/v1/accounts/${
                data.id
              }/statuses?limit=${config.maxToots}&max_id=${
                toots[toots.length - 1]?.id
              }`;
              renderToots(data);
            });
        } else {
          fetch(
            `${config.instanceUrl}/api/v1/accounts/${data.id}/statuses?limit=${
              config.maxToots
            }&max_id=${tootCache[tootCache.length - 1]?.id}`
          )
            .then((res) => res.json())
            .then((newToots) => {
              if (newToots.length > 0) {
                newToots.forEach((toot) => tootCache.push(toot));
                nextUrl = `${config.instanceUrl}/api/v1/accounts/${
                  data.id
                }/statuses?limit=${config.maxToots}&max_id=${
                  newToots[newToots.length - 1]?.id
                }`;
                renderToots(data);
              }
            });
        }
      });
  }

  function renderToots(userData) {
    const container = document.getElementById(config.elementId);

    if (!container) return;
    container.setAttribute("data-theme", config.theme);
    container.innerHTML = "";
    container.style.width = config.width || "100%";
    container.style.height = config.height || "100%";

    const wrapper = document.createElement("div");
    wrapper.className = "mastodon-wrapper";

    if (config.showHeader && tootCache.length > 0) {
      const u = tootCache[0].account;
      wrapper.innerHTML += `
        <div class="mastodon-header">
          ${
            config.showAvatars
              ? `<a href="${config.instanceUrl}/@${u.acct}" target="_blank" rel="noopener"><img src="${u.avatar}" class="avatar ${config.imageStyle}" /></a>`
              : ""
          }
          <div class="user-info">
            ${
              config.showUsernames
                ? `<a href="${config.instanceUrl}/@${u.acct}" target="_blank" rel="noopener"><strong>${u.display_name}</strong></a><br/>`
                : ""
            }
            <small>@${u.acct}</small>
          </div>
        </div>
      `;
    }

    const tootsContainer = document.createElement("div");
    tootsContainer.className = "mastodon-body";

    tootCache.forEach((toot) => {
      let origin = toot;
      let reblogged = false;
      let originalAuthor = null;

      if (toot.reblog) {
        origin = toot.reblog;
        reblogged = true;
        originalAuthor = toot.reblog.account;
      }

      const date = config.showRelativeTime
        ? formatRelativeTime(origin.created_at)
        : new Date(origin.created_at).toLocaleDateString();

      const content = config.showContent
        ? origin.content.replace(/#(\w+)/g, (match, tag) => {
            if (!config.showHashtags) return match; // Hashtags ausblenden, wenn showHashtags: false
            const link = document.createElement("a");
            link.href = `${config.instanceUrl}/tags/${tag}`;
            link.className = "hashtag";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = `#${tag}`;
            return link.outerHTML;
          })
        : "";

      let boostNote = "";
      if (reblogged && originalAuthor && config.showBoosts) {
        boostNote = `
          <div class="reblog-note">
            ${
              config.showAvatars
                ? `<a href="${config.instanceUrl}/@${originalAuthor.acct}" target="_blank" rel="noopener"><img src="${originalAuthor.avatar}" class="avatar large-avatar" /></a>`
                : ""
            }
            <a href="${config.instanceUrl}/@${
          toot.account.acct
        }" target="_blank" rel="noopener">
              <img src="${toot.account.avatar}" class="avatar small-avatar" />
            </a>
            <div class="reblog-info">
              ${
                config.showUsernames
                  ? `<a href="${config.instanceUrl}/@${originalAuthor.acct}" target="_blank" rel="noopener"><strong>${originalAuthor.display_name}</strong></a>`
                  : ""
              }
              ${
                config.showTimestamps
                  ? `<div class="toot-date">${date}</div>`
                  : ""
              }
            </div>
          </div>
        `;
      }

      const tootEl = `
        <div class="toot">
          ${boostNote}
          ${
            !reblogged
              ? `
            <div class="toot-header">
              ${
                config.showAvatars
                  ? `<a href="${config.instanceUrl}/@${origin.account.acct}" target="_blank" rel="noopener"><img src="${origin.account.avatar}" class="avatar ${config.imageStyle}" /></a>`
                  : ""
              }
              <div class="toot-info">
                ${
                  config.showUsernames
                    ? `<a href="${config.instanceUrl}/@${origin.account.acct}" target="_blank" rel="noopener"><strong>${origin.account.display_name}</strong></a>`
                    : ""
                }
                ${
                  config.showTimestamps
                    ? `<div class="toot-date">${date}</div>`
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }
          ${
            config.showContent
              ? `<a href="${origin.url}" target="_blank" rel="noopener noreferrer" class="toot-content-link"><div class="toot-content">${content}</div></a>`
              : ""
          }
          ${
            config.showMedia
              ? `<div class="toot-media">
            ${origin.media_attachments
              .map(
                (m) => `
              <a href="${m.url}" target="_blank" rel="noopener noreferrer">
                <img src="${m.preview_url}" alt="media" class="${
                  origin.sensitive ? "sensitive" : ""
                }" />
              </a>
            `
              )
              .join("")}
          </div>`
              : ""
          }
          <div class="toot-meta">
            ${
              config.showReplies
                ? `<span>${createSVG(icons.reply)} ${
                    origin.replies_count
                  }</span>`
                : ""
            }
            ${
              config.showBoosts
                ? `<span>${createSVG(icons.boost)} ${
                    origin.reblogs_count
                  }</span>`
                : ""
            }
            ${
              config.showFavourites
                ? `<span>${createSVG(icons.favorite)} ${
                    origin.favourites_count
                  }</span>`
                : ""
            }
          </div>
        </div>
      `;
      tootsContainer.innerHTML += tootEl;
    });

    wrapper.appendChild(tootsContainer);

    if (config.showFooter && userData) {
      const footer = document.createElement("div");
      footer.className = "mastodon-footer";

      const footerWrapper = document.createElement("div");
      footerWrapper.className = "footer-wrapper";

      const profileBtn = document.createElement("a");
      profileBtn.href = `${config.instanceUrl}/@${userData.acct}`;
      profileBtn.target = "_blank";
      profileBtn.rel = "noopener";
      profileBtn.className = "profile-button";
      profileBtn.textContent = "Profil anzeigen";

      if (config.showInfoButton) {
        const svgLink = document.createElement("a");
        svgLink.href = "https://github.com/RonDevHub";
        svgLink.target = "_blank";
        svgLink.innerHTML = createSVG(icons.info, "icon info-link");
        svgLink.className = "info-link";

        footerWrapper.appendChild(svgLink);
      }

      footerWrapper.appendChild(profileBtn);
      footer.appendChild(footerWrapper);
      wrapper.appendChild(footer);

    }

    container.appendChild(wrapper);
    ensureLinksOpenInNewTab(wrapper);
  }

  return {
    init: function (options) {
      config = {
        showAvatars: true,
        showUsernames: true,
        showTimestamps: true,
        showContent: true,
        showMedia: true,
        showBoosts: true,
        showFavourites: true,
        showReplies: true,
        showLinks: true,
        showMentions: true,
        showPolls: true,
        showSensitiveContent: true,
        showSensitiveMedia: true,
        showSensitiveText: true,
        showSensitiveWarning: true,
        showSensitiveWarningText: "Inhalt möglicherweise sensibel",
        showSensitiveWarningButton: "Inhalt anzeigen",
        ...options, // Benutzerdefinierte Optionen überschreiben Standardwerte
      };

      fetchToots(true);
      setInterval(() => fetchToots(true), config.interval * 1000 || 60000); // Sekunden in Millisekunden umrechnen
    },
  };
})();
