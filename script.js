// ---------- STATE ----------
let currentUser = null; // { name, email, role }
let snippets = [];

// prepopulate with a few demo events
let events = [
  {
    title: "Afro-Soul Listening Session",
    date: new Date().toISOString(),
    theme: "Intimate preview of unreleased tracks",
    host: "Demo Artist"
  },
  {
    title: "Global Collab Writing Room",
    date: new Date(Date.now() + 86400000).toISOString(), // +1 day
    theme: "Co-writing across Lagos, Kigali & London",
    host: "Rehash Connect"
  }
];

// Dummy artists for Explore page
const artistsData = [
  {
    name: "Amahle Ndlovu",
    country: "South Africa",
    genre: "Afro-soul",
    bio: "Afro-soul vocalist blending Zulu roots with modern RnB."
  },
  {
    name: "Kwame Mensah",
    country: "Ghana",
    genre: "Afrobeat",
    bio: "Percussion-driven Afrobeat producer and live performer."
  },
  {
    name: "Layla Johnson",
    country: "UK",
    genre: "RnB",
    bio: "RnB singer collaborating with African producers."
  },
  {
    name: "Divine Irakoze",
    country: "Rwanda",
    genre: "Gospel",
    bio: "Gospel singer focused on intimate live worship sessions."
  }
];

// ---------- HELPERS ----------
function showSection(id) {
  document.querySelectorAll(".page-section").forEach((sec) => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

function renderSnippets() {
  const list = document.getElementById("snippetList");
  if (!list) return;

  list.innerHTML = "";
  if (!snippets.length) {
    list.innerHTML = "<li>No snippets yet. Add one below.</li>";
    return;
  }
  snippets.forEach((snip, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${snip}`;
    list.appendChild(li);
  });
}

function renderEvents() {
  const list = document.getElementById("eventList");
  if (list) {
    list.innerHTML = "";
    if (!events.length) {
      list.innerHTML = "<li>No events created yet.</li>";
    } else {
      events.forEach((event, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${event.title}</strong> – ${new Date(event.date).toLocaleString()}
          ${event.theme ? ` | Theme: ${event.theme}` : ""}
          <button class="secondary small" data-index="${index}" data-action="viewEvent">
            View
          </button>
        `;
        list.appendChild(li);
      });

      list.querySelectorAll("button[data-action='viewEvent']").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = btn.getAttribute("data-index");
          openEventView(events[idx]);
        });
      });
    }
  }

  // keep other event views in sync
  renderAllEvents();
  renderAudienceDashboard();
}

function renderAllEvents() {
  const allList = document.getElementById("allEventsList");
  if (!allList) return;

  allList.innerHTML = "";
  if (!events.length) {
    allList.innerHTML = "<li>No events yet. Artists can create from their dashboard.</li>";
    return;
  }

  events.forEach((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${event.title}</strong> – ${new Date(event.date).toLocaleString()}
      <br/><span style="color:#a0a3bc">Host: ${event.host} ${
      event.theme ? "| Theme: " + event.theme : ""
    }</span>
    `;
    allList.appendChild(li);
  });
}

function renderArtists(list) {
  const container = document.getElementById("artistCards");
  if (!container) return;

  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>No artists match your search yet.</p>";
    return;
  }

  list.forEach((artist) => {
    const card = document.createElement("div");
    card.className = "artist-card";
    card.innerHTML = `
      <h3>${artist.name}</h3>
      <p class="artist-meta">${artist.country} • ${artist.genre}</p>
      <p>${artist.bio}</p>
      <button class="secondary small">Request Collaboration</button>
    `;
    container.appendChild(card);
  });
}

function addChatMessage(containerId, sender, text) {
  if (!text.trim()) return;
  const box = document.getElementById(containerId);
  if (!box) return;
  const div = document.createElement("div");
  div.className = "chat-message";
  div.innerHTML = `<span>${sender}:</span> ${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// ---------- AUTH ----------
function initAuth() {
  const form = document.getElementById("authForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("authName").value.trim();
    const email = document.getElementById("authEmail").value.trim();
    const role = document.getElementById("authRole").value;

    if (!name || !email) return;

    currentUser = { name, email, role };

    if (role === "artist") {
      document.getElementById("artistWelcome").textContent =
        `Welcome, ${name}. This is your artist dashboard.`;
      document.getElementById("profileName").value = name;
      showSection("artist-dashboard-section");
    } else {
      const audienceWelcome = document.getElementById("audienceWelcome");
      if (audienceWelcome) {
        audienceWelcome.textContent = `Welcome, ${name}. Discover artists and intimate events curated for you.`;
      }
      renderAudienceDashboard();
      showSection("audience-dashboard-section");
    }
  });
}

// ---------- PROFILE & SNIPPETS ----------
function initProfileAndSnippets() {
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile saved (prototype).");
    });
  }

  const snippetForm = document.getElementById("snippetForm");
  if (snippetForm) {
    snippetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = document.getElementById("snippetTitle");
      const title = titleInput.value.trim();
      if (!title) return;
      snippets.push(title);
      titleInput.value = "";
      renderSnippets();
    });
  }

  renderSnippets();
}

// ---------- EVENTS ----------
function initEvents() {
  const eventForm = document.getElementById("eventForm");
  if (eventForm) {
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("eventTitle").value.trim();
      const date = document.getElementById("eventDate").value;
      const theme = document.getElementById("eventTheme").value.trim();

      if (!title || !date) return;

      events.push({
        title,
        date,
        theme,
        host: currentUser?.name || "Demo Artist"
      });

      document.getElementById("eventTitle").value = "";
      document.getElementById("eventDate").value = "";
      document.getElementById("eventTheme").value = "";
      renderEvents();
    });
  }

  renderEvents();
}

function openEventView(eventObj) {
  if (!eventObj) return;
  document.getElementById("viewEventTitle").textContent = eventObj.title;
  document.getElementById("viewEventDate").textContent =
    new Date(eventObj.date).toLocaleString();
  document.getElementById("viewEventHost").textContent = eventObj.host;
  document.getElementById("viewEventTheme").textContent = eventObj.theme || "N/A";

  document.getElementById("eventChatMessages").innerHTML = "";
  showSection("event-view-section");
}

// ---------- EXPLORE ----------
function initExplore() {
  renderArtists(artistsData);

  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");

  function applyFilters() {
    const search = (searchInput.value || "").toLowerCase();
    const genre = genreFilter.value;

    const filtered = artistsData.filter((artist) => {
      const matchesText =
        artist.name.toLowerCase().includes(search) ||
        artist.country.toLowerCase().includes(search) ||
        artist.genre.toLowerCase().includes(search);
      const matchesGenre = genre ? artist.genre === genre : true;
      return matchesText && matchesGenre;
    });

    renderArtists(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (genreFilter) genreFilter.addEventListener("change", applyFilters);
}

// ---------- COLLAB ROOM ----------
function initCollabRoom() {
  const openBtn = document.getElementById("openCollabRoomBtn");
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      showSection("collab-room-section");
    });
  }

  const toggleBtn = document.getElementById("toggleRoomStatusBtn");
  const statusSpan = document.getElementById("roomStatus");
  if (toggleBtn && statusSpan) {
    toggleBtn.addEventListener("click", () => {
      statusSpan.textContent = statusSpan.textContent === "Live" ? "Offline" : "Live";
    });
  }

  const chatForm = document.getElementById("chatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("chatInput");
      addChatMessage("chatMessages", currentUser?.name || "You", input.value);
      input.value = "";
    });
  }
}

// ---------- EVENT CHAT ----------
function initEventChat() {
  const form = document.getElementById("eventChatForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("eventChatInput");
      addChatMessage("eventChatMessages", currentUser?.name || "Guest", input.value);
      input.value = "";
    });
  }

  const joinBtn = document.getElementById("joinEventBtn");
  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      alert("Joined event (prototype).");
    });
  }
}

// ---------- AUDIENCE DASHBOARD ----------
function renderAudienceDashboard() {
  const recommendedList = document.getElementById("recommendedArtists");
  const upcomingSummary = document.getElementById("upcomingEventsSummary");

  if (!recommendedList || !upcomingSummary) return;

  // Recommended artists (top 3 for now)
  recommendedList.innerHTML = "";
  artistsData.slice(0, 3).forEach((artist) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${artist.name}</strong> – ${artist.country} (${artist.genre})`;
    recommendedList.appendChild(li);
  });

  // Upcoming events (from events array)
  upcomingSummary.innerHTML = "";
  if (!events.length) {
    upcomingSummary.innerHTML = "<li>No upcoming events yet.</li>";
  } else {
    events.slice(0, 4).forEach((event) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${event.title}</strong><br/>
        <span style="color:#a0a3bc">${new Date(
          event.date
        ).toLocaleString()} • Host: ${event.host}</span>
      `;
      upcomingSummary.appendChild(li);
    });
  }
}

function initAudienceDashboard() {
  renderAudienceDashboard();
}

// ---------- NAV ----------
function initNavigation() {
  document.querySelectorAll("[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      showSection(target);
    });
  });
}

// ---------- DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAuth();
  initProfileAndSnippets();
  initEvents();
  initExplore();
  initCollabRoom();
  initEventChat();
  initAudienceDashboard();
});
