// Version: 1.2.0
const MastodonWidget = (function () {
  let config = {};
  let tootCache = [];
  let nextUrl = null;

  const icons = {
    reply:
      '<path d="M216 160c-13.3 0-24-10.7-24-24l0-8 0-16 0-48L32 208 192 352l0-48 0-16 0-8c0-13.3 10.7-24 24-24l8 0 96 0c70.7 0 128 57.3 128 128c0 8.3-.7 16.1-2 23.2c18.2-23.4 34-57.1 34-103.2c0-79.5-64.5-144-144-144l-112 0-8 0zm8 144l0 16 0 32c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4s19 16.6 19 29.2l0 32 0 16 0 16 32 0 80 0c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96l-64 0-32 0 0 16z"/>',
    boost:
      '<path d="M219.3 292.7c-10-10-21.4-18.1-33.8-24.1C215.6 146.3 269 86.7 321.1 58.1c53.5-29.4 111.4-29.4 154.6-21.8c7.6 43.2 7.7 101.1-21.8 154.6C425.3 243 365.7 296.4 243.4 326.5c-6-12.4-14.1-23.9-24.1-33.8zM256 381.3c0-8.2-.8-16.3-2.4-24.3c37.8-9.5 70.4-21.3 98.4-34.7l0 80.1c0 12.1-6.8 23.2-17.7 28.6L256 470.1l0-88.9zm128 21.1l0-97.4C515.7 225.1 520.5 102.5 506.7 28.1c-2.2-11.6-11.2-20.7-22.8-22.8C409.5-8.5 286.9-3.7 207 128l-97.4 0c-24.2 0-46.4 13.7-57.2 35.4L1.7 264.8c-2.5 5-2.2 10.9 .7 15.6s8.1 7.6 13.6 7.6l114.7 0c24.7 0 48.5 9.8 65.9 27.3s27.3 41.2 27.3 65.9L224 496c0 5.5 2.9 10.7 7.6 13.6s10.6 3.2 15.6 .7l101.5-50.7c21.7-10.8 35.4-33 35.4-57.2zm-229-144c-7.9-1.6-16.1-2.4-24.3-2.4l-88.9 0L81 177.7c5.4-10.8 16.5-17.7 28.6-17.7l80.1 0c-13.5 28-25.2 60.5-34.7 98.4zm-11.2 189c-11 11-29.4 19.4-52.6 24.9c-20.6 4.9-42.1 6.8-59 7.4c.6-17 2.5-38.4 7.4-59c5.5-23.2 13.9-41.6 24.9-52.6c21.9-21.9 57.4-21.9 79.3 0s21.9 57.4 0 79.3zM166.5 470c34.4-34.4 34.4-90.1 0-124.5s-90.1-34.4-124.5 0C7.7 379.7 1 446 .1 483.7c-.4 16 12.2 28.6 28.2 28.2C66 511 132.3 504.3 166.5 470zM392 144a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM368 88a56 56 0 1 0 0 112 56 56 0 1 0 0-112z"/>',
    favorite:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M226.5 168.8L287.9 42.3l61.4 126.5c4.6 9.5 13.6 16.1 24.1 17.7l137.4 20.3-99.8 98.8c-7.4 7.3-10.8 17.8-9 28.1l23.5 139.5L303 407.7c-9.4-5-20.7-5-30.2 0L150.2 473.2l23.5-139.5c1.7-10.3-1.6-20.7-9-28.1L65 206.8l137.4-20.3c10.5-1.5 19.5-8.2 24.1-17.7zM424.9 509.1c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2z"/></svg>',
    reblog:
      '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 95.395" enable-background="new 0 0 122.88 95.395" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M29.531,0L0,30.716l19.008,0.002V85.11h21.049v-0.002h14.305l0.413,0.002 l18.863-0.005L53.403,64.059l-13.346,0.002v-33.34l19.006-0.004L29.531,0L29.531,0z M93.347,95.395l29.533-30.717l-19.011-0.002 V36.645l0.002-0.533V10.284l-1.024-0.002H77.013l-23.396,0.002v3.293l17.071,17.754h5.795l0.535,0.002h5.803v33.34l-19.006,0.005 L93.347,95.395L93.347,95.395z"/></g></svg>',
    loader:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.41 0.22 747.62 801.4499999999999"><path d="M729.94 479.5c-10.96 56.4-98.17 118.12-198.34 130.08-52.23 6.23-103.66 11.96-158.49 9.44-89.68-4.1-160.45-21.4-160.45-21.4 0 8.73.54 17.04 1.62 24.81 11.66 88.52 87.76 93.82 159.84 96.29 72.76 2.49 137.55-17.94 137.55-17.94l2.99 65.79s-50.89 27.32-141.55 32.35c-50 2.75-112.07-1.26-184.37-20.39C31.94 737.02 4.97 569.86.85 400.26-.41 349.9.37 302.42.37 262.7.37 89.27 113.99 38.44 113.99 38.44 171.28 12.12 269.59 1.06 371.79.22h2.52c102.19.84 200.57 11.9 257.86 38.22 0 0 113.62 50.83 113.62 224.26 0 0 1.42 127.96-15.85 216.8" fill="#3088d4"/><path d="M611.77 276.16v209.99h-83.2V282.33c0-42.97-18.07-64.77-54.23-64.77-39.98 0-60.01 25.86-60.01 77.02v111.57h-82.71V294.58c0-51.16-20.04-77.02-60.01-77.02-36.16 0-54.24 21.8-54.24 64.77v203.82h-83.19V276.16c0-42.92 10.93-77.03 32.88-102.26 22.63-25.23 52.27-38.17 89.07-38.17 42.57 0 74.81 16.37 96.12 49.1l20.72 34.74 20.73-34.74c21.31-32.73 53.55-49.1 96.12-49.1 36.79 0 66.44 12.94 89.07 38.17 21.95 25.23 32.88 59.34 32.88 102.26z" fill="#fff"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/></svg>',
  };

  function createSVG(path, className = "icon") {
    return `<svg class="${className}" viewBox="0 0 512 512">${path}</svg>`;
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

  function showLoader() {
    const container = document.getElementById(config.elementId);
    if (!container) return;
    container.setAttribute("data-theme", config.theme);
    container.style.width = config.width || "100%";
    container.style.height = config.height || "100%";
    container.innerHTML = `
      <div class="mastodon-loader-wrapper">
        <div class="mastodon-loader">${icons.loader}</div>
      </div>
    `;
  }

  function hideLoader() {
    const container = document.getElementById(config.elementId);
    if (!container) return;
    // Loader wird entfernt, eigentliche Inhalte werden später gesetzt
    container.innerHTML = "";
  }

  function fetchToots(initial = true) {
    if (config.showLoader && initial) showLoader();
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
              if (config.showLoader) hideLoader();
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
                if (config.showLoader) hideLoader();
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
            if (!config.showHashtags) return match;
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
        svgLink.href = "https://github.com/RonDevHub/masto-timeline";
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
        showLoader: true,
        ...options,
      };

      if (config.showLoader) showLoader();
      fetchToots(true);
      setInterval(() => fetchToots(true), config.interval * 1000 || 60000);
    },
  };
})();
