(() => {
  const body = document.body;
  const root = document.documentElement;

  if (!body) {
    return;
  }

  root.classList.add("js-enabled");
  body.classList.add("js-enabled");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-site-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const isMobileQuery = window.matchMedia("(max-width: 920px)");

  const normalizePath = (value) => value.replace(/\/+$/, "") || "/";
  const currentPath = normalizePath(window.location.pathname || "/");

  function initHeader() {
    if (!header) {
      return;
    }

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMenu() {
    if (!header || !menuToggle || !nav) {
      return;
    }

    const setExpanded = (expanded) => {
      menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      menuToggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
      header.classList.toggle("is-menu-open", expanded);
      body.classList.toggle("menu-open", expanded);
      if (isMobileQuery.matches) {
        if (expanded) {
          nav.removeAttribute("hidden");
        } else {
          nav.setAttribute("hidden", "");
        }
      } else {
        nav.removeAttribute("hidden");
      }
    };

    const closeMenu = () => setExpanded(false);

    const syncMenu = () => {
      header.classList.add("menu-enhanced");
      if (isMobileQuery.matches) {
        closeMenu();
      } else {
        nav.removeAttribute("hidden");
        header.classList.remove("is-menu-open");
        body.classList.remove("menu-open");
      }
    };

    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMobileQuery.matches) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!isMobileQuery.matches || menuToggle.getAttribute("aria-expanded") !== "true") {
        return;
      }
      if (!(event.target instanceof Node) || header.contains(event.target)) {
        return;
      }
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });

    if (typeof isMobileQuery.addEventListener === "function") {
      isMobileQuery.addEventListener("change", syncMenu);
    } else if (typeof isMobileQuery.addListener === "function") {
      isMobileQuery.addListener(syncMenu);
    }

    syncMenu();
  }

  function initCurrentNavMarker() {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) {
        link.classList.remove("is-current");
        return;
      }

      try {
        const parsed = new URL(href, window.location.origin);
        const linkPath = normalizePath(parsed.pathname);
        if (!parsed.hash && linkPath === currentPath) {
          link.classList.add("is-current");
        } else {
          link.classList.remove("is-current");
        }
      } catch (_error) {
        link.classList.remove("is-current");
      }
    });
  }

  function initReveal() {
    if (!revealItems.length) {
      return;
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function initPostFilters() {
    const searchInput = document.querySelector("[data-post-search]");
    const countNode = document.querySelector("[data-post-count]");
    const cards = Array.from(document.querySelectorAll("[data-post-card]"));
    const tagButtons = Array.from(document.querySelectorAll("[data-tag-filter]"));

    if (!cards.length || (!searchInput && !tagButtons.length)) {
      return;
    }

    let activeTag = "";

    const applyFilter = () => {
      const query = searchInput ? (searchInput.value || "").trim().toLowerCase() : "";
      let visibleCount = 0;

      cards.forEach((card) => {
        const searchHaystack = (card.getAttribute("data-search") || "").toLowerCase();
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();
        const matchesQuery = !query || searchHaystack.includes(query);
        const matchesTag = !activeTag || tags.split("|").includes(activeTag);
        const visible = matchesQuery && matchesTag;

        card.toggleAttribute("data-card-hidden", !visible);
        if (visible) {
          visibleCount += 1;
        }
      });

      if (countNode) {
        countNode.textContent = `${visibleCount} article${visibleCount === 1 ? "" : "s"}`;
      }

      tagButtons.forEach((button) => {
        button.classList.toggle("is-active", button.getAttribute("data-tag-filter") === activeTag);
      });
    };

    if (searchInput) {
      searchInput.addEventListener("input", applyFilter);
    }

    tagButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tag = button.getAttribute("data-tag-filter") || "";
        activeTag = activeTag === tag ? "" : tag;
        applyFilter();
      });
    });

    applyFilter();
  }

  initHeader();
  initMenu();
  initCurrentNavMarker();
  initReveal();
  initPostFilters();
})();

