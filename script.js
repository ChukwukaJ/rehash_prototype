//-----------------------------------------------------
// GLOBAL STATE
//-----------------------------------------------------
let currentUser = null;

let snippets = [];

let events = [
  {
    title: "Afro-Soul Listening Session",
    date: new Date().toISOString(),
    theme: "Intimate preview of unreleased tracks",
    host: "Demo Artist"
  },
  {
    title: "Global Collab Writing Room",
    date: new Date(Date.now() + 86400000).toISOString(),
    theme: "Co-writing across Lagos, Kigali & London",
    host: "Rehash"
  }
];

//-----------------------------------------------------
// CREATIVES DATA (extended with creativeType)
//-----------------------------------------------------
const artistsData = [
  {
    name: "Amahle Ndlovu",
    country: "South Africa",
    genre: "Afro-soul",
    creativeType: "Singer",
    bio: "Afro-soul vocalist blending Zulu roots with modern RnB."
  },
  {
    name: "Kwame Mensah",
    country: "Ghana",
    genre: "Afrobeat",
    creativeType: "Producer",
    bio: "Percussion-driven Afrobeat producer and live performer."
  },
  {
    name: "Layla Johnson",
    country: "UK",
    genre: "RnB",
    creativeType: "Singer",
    bio: "RnB singer collaborating with African producers."
  },
  {
    name: "Divine Irakoze",
    country: "Rwanda",
    genre: "Gospel",
    creativeType: "Spoken Word Artist",
    bio: "Gospel singer and spoken word performer."
  }
];

//-----------------------------------------------------
// SECTION SWITCH
//-----------------------------------------------------
function showSection(id) {
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

//-----------------------------------------------------
// SNIPPETS
//-----------------------------------------------------
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

//-----------------------------------------------------
// EVENTS
//-----------------------------------------------------
function renderEvents() {
  const list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = "";

  if (!events.length) {
    list.innerHTML = "<li>No events created yet.</li>";
  } else {
    events.forEach((event, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${event.title}</strong> – ${new Date(event.date).toLocaleString()}
        ${event.theme ? ` | Theme: ${event.theme}` : ""}
        <button class="secondary small" data-index="${index}" data-action="viewEvent">View</button>
      `;
      list.appendChild(li);
    });

    list.querySelectorAll("button[data-action='viewEvent']").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.getAttribute("data-index");
        openEventView(events[idx]);
      });
    });
  }

  renderAllEvents();
  renderAudienceDashboard();
}

function renderAllEvents() {
  const allList = document.getElementById("allEventsList");
  if (!allList) return;

  allList.innerHTML = "";

  if (!events.length) {
    allList.innerHTML = "<li>No events yet.</li>";
    return;
  }

  events.forEach(event => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${event.title}</strong> – ${new Date(event.date).toLocaleString()}
      <br><span style="color:#a0a3bc">Host: ${event.host} ${event.theme ? "| Theme: " + event.theme : ""}</span>
    `;
    allList.appendChild(li);
  });
}

//-----------------------------------------------------
// EVENT VIEW
//-----------------------------------------------------
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

//-----------------------------------------------------
// EXPLORE CREATIVES (Supports Creative Type)
//-----------------------------------------------------
function renderArtists(list) {
  const container = document.getElementById("artistCards");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = "<p>No creatives match your search.</p>";
    return;
  }

  list.forEach(artist => {
    const card = document.createElement("div");
    card.className = "artist-card";
    card.innerHTML = `
      <h3>${artist.name}</h3>
      <p class="artist-meta">${artist.creativeType} • ${artist.country}</p>
      <p class="artist-meta">Genre: ${artist.genre}</p>
      <p>${artist.bio}</p>
      <button class="secondary small">Request Collaboration</button>
    `;
    container.appendChild(card);
  });
}

function initExplore() {
  renderArtists(artistsData);

  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");
  const creativeFilter = document.getElementById("creativeFilter");

  function applyFilters() {
    const search = searchInput.value.toLowerCase();
    const genre = genreFilter.value;
    const creative = creativeFilter.value;

    const filtered = artistsData.filter(a => {
      const matchesText =
        a.name.toLowerCase().includes(search) ||
        a.country.toLowerCase().includes(search) ||
        a.genre.toLowerCase().includes(search) ||
        a.creativeType.toLowerCase().includes(search);

      const matchesGenre = genre ? a.genre === genre : true;
      const matchesCreative = creative ? a.creativeType === creative : true;

      return matchesText && matchesGenre && matchesCreative;
    });

    renderArtists(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  genreFilter.addEventListener("change", applyFilters);
  creativeFilter.addEventListener("change", applyFilters);
}

//-----------------------------------------------------
// AUTH + CREATIVE TYPE CAPTURE
//-----------------------------------------------------
function initAuth() {
  const form = document.getElementById("authForm");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("authName").value.trim();
    const email = document.getElementById("authEmail").value.trim();
    const role = document.getElementById("authRole").value;
    const creativeType = document.getElementById("creativeType").value;

    if (!name || !email) return;

    currentUser = { name, email, role, creativeType };

    if (role === "artist") {
      document.getElementById("artistWelcome").textContent =
        `Welcome, ${name}.`;

      document.getElementById("profileName").value = name;
      document.getElementById("profileCreativeType").value = creativeType;

      showSection("artist-dashboard-section");
    } else {
      document.getElementById("audienceWelcome").textContent =
        `Welcome, ${name}.`;
      renderAudienceDashboard();
      showSection("audience-dashboard-section");
    }
  });
}

//-----------------------------------------------------
// PROFILE + SNIPPETS
//-----------------------------------------------------
function initProfileAndSnippets() {
  const profileForm = document.getElementById("profileForm");
  profileForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Profile saved (prototype).");
  });

  const snippetForm = document.getElementById("snippetForm");
  snippetForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("snippetTitle").value.trim();
    if (!title) return;

    snippets.push(title);
    document.getElementById("snippetTitle").value = "";
    renderSnippets();
  });

  renderSnippets();
}

//-----------------------------------------------------
// EVENTS LOGIC
//-----------------------------------------------------
function initEvents() {
  const eventForm = document.getElementById("eventForm");
  eventForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("eventTitle").value.trim();
    const date = document.getElementById("eventDate").value;
    const theme = document.getElementById("eventTheme").value.trim();

    if (!title || !date) return;

    events.push({
      title,
      date,
      theme,
      host: currentUser?.name || "Artist"
    });

    document.getElementById("eventTitle").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTheme").value = "";

    renderEvents();
  });

  renderEvents();
}

//-----------------------------------------------------
// COLLAB ROOM
//-----------------------------------------------------
function initCollabRoom() {
  const openBtn = document.getElementById("openCollabRoomBtn");
  openBtn.addEventListener("click", () => {
    showSection("collab-room-section");
  });

  const statusSpan = document.getElementById("roomStatus");
  document.getElementById("toggleRoomStatusBtn").addEventListener("click", () => {
    statusSpan.textContent = statusSpan.textContent === "Live" ? "Offline" : "Live";
  });

  document.getElementById("chatForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    addChatMessage("chatMessages", currentUser?.name || "You", input.value);
    input.value = "";
  });
}

//-----------------------------------------------------
// EVENT CHAT
//-----------------------------------------------------
function initEventChat() {
  const form = document.getElementById("eventChatForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("eventChatInput");
    addChatMessage("eventChatMessages", currentUser?.name || "Guest", input.value);
    input.value = "";
  });

  document.getElementById("joinEventBtn").addEventListener("click", () => {
    alert("Joined event (prototype).");
  });
}

//-----------------------------------------------------
// CHAT HELPER
//-----------------------------------------------------
function addChatMessage(containerId, sender, text) {
  if (!text.trim()) return;

  const box = document.getElementById(containerId);
  const div = document.createElement("div");
  div.className = "chat-message";
  div.innerHTML = `<span>${sender}:</span> ${text}`;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

//-----------------------------------------------------
// AUDIENCE DASHBOARD
//-----------------------------------------------------
function renderAudienceDashboard() {
  const recList = document.getElementById("recommendedArtists");
  const upcomingList = document.getElementById("upcomingEventsSummary");

  recList.innerHTML = "";
  artistsData.slice(0, 3).forEach(a => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${a.name}</strong> – ${a.creativeType}, ${a.country}`;
    recList.appendChild(li);
  });

  upcomingList.innerHTML = "";
  events.slice(0, 4).forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${e.title}</strong><br><span style="color:#a0a3bc">${new Date(
      e.date
    ).toLocaleString()} • Host: ${e.host}</span>`;
    upcomingList.appendChild(li);
  });
}

//-----------------------------------------------------
// NAVIGATION
//-----------------------------------------------------
function initNavigation() {
  document.querySelectorAll("[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
      showSection(btn.getAttribute("data-target"));
    });
  });
}

//-----------------------------------------------------
// DOM LOAD
//-----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAuth();
  initProfileAndSnippets();
  initEvents();
  initExplore();
  initCollabRoom();
  initEventChat();
  renderAudienceDashboard();
});
