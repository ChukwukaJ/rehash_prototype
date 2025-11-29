# Rehash Connect – Prototype

Rehash Connect is a prototype platform that creates a safe space for collaborations between African and global creatives. It focuses on intimate live and virtual music experiences instead of only big, loud concerts, and gives B- and C-list creatives and upcoming artists more visibility and access to global collaboration.

This prototype was built as part of the **Introduction to Software Engineering** summative at ALU and is based on the Rehash SRS document.

---

## System Overview

Rehash Connect, in its full vision, is a web platform that allows:

- Artists to create profiles, share small snippets, and host intimate sessions or events.
- Audiences to discover new artists, follow events, and interact during live or virtual sessions.
- Both African and global creatives to connect in smaller, meaningful settings rather than only stadium-style shows.

This prototype focuses on the **frontend only**. All interactions are simulated in the browser with HTML, CSS and JavaScript (no backend, database, or real authentication).

---

## Problem Statement

Many African creatives, especially B- and C-list artists and emerging talents, struggle to access fair collaboration opportunities and global stages. A small group of A-list stars often dominates international platforms.

At the same time, most performances are built around big, loud concerts where the connection between artists and audiences becomes shallow. There are very few digital spaces designed to support:

- Small, intimate shows,
- Cross-border collaboration,
- And fair visibility for lesser-known but talented creatives.

Rehash Connect addresses this by providing a space for curated, intimate sessions between African and global creatives, with features that support collaboration and direct engagement.

---

## Mission and Hypothesis

**Mission**  
To create a safe, technology-enabled space where African and global creatives can collaborate and host intimate, community-driven music experiences that promote unity and reduce segregation in the entertainment space.

**Hypothesis**  
If we provide a platform that makes it easier for African and global artists to discover each other, create events, and host small, interactive sessions, then:

- More B- and C-list creatives will participate in meaningful collaborations;
- Audiences will feel more connected to the artists;
- And the barrier between “global” and “African” stages will begin to reduce over time.

---

## Main Prototype Features

The prototype reflects the main functional requirements from the SRS.

### 1. Simulated Login / Role Selection

- A simple Login / Sign Up section collects:
  - Name
  - Email
  - Role: **Artist** or **Audience**
- There is no real authentication. The form just decides which dashboard to show.
- This covers the basic onboarding and role-based views.

### 2. Artist Dashboard

When logged in as **Artist**, the user sees:

- **Profile form**  
  Stage name, location, genre and short bio. Saving is simulated in the browser for the current session.

- **Snippets list**  
  The artist can add “snippets” (e.g. demo ideas, mini-sets). They are listed during the session to represent media or content attached to the profile.

- **Event creation**  
  Artists can create events by providing:
  - Event title  
  - Date and time  
  - Optional theme  
  These events appear under “My Events”, on the Events page, and in the audience view.

- **Collaboration room access**  
  A button opens the Collaboration Room section for that artist.

### 3. Audience Dashboard

When logged in as **Audience**, the user sees:

- A simple welcome message using their name.
- A **Recommended Artists** list (from a demo catalog).
- A **Upcoming Events** list, populated from the same events the artists create in the prototype.

This demonstrates how audiences can discover artists and upcoming sessions.

### 4. Explore Artists

- A catalog of demo artists is shown with:
  - Name
  - Country
  - Genre
  - Short bio
- Search by name / country / genre using a text box.
- Filter by genre using a dropdown.
- This covers meaningful interaction with data (search and filter), based on the SRS.

### 5. Collaboration Room (Demo)

- Shows session information and room status (Live / Offline).
- Allows toggling status to simulate a live/offline session.
- Provides a simple chat box where the current user can send messages.
- Illustrates how intimate collaboration sessions could look, even though it is all simulated in the browser.

### 6. Event View and Chat (Audience Side)

- The user can open a specific event from the list.
- The view shows:
  - Event title
  - Date and time
  - Host
  - Theme
- “Join Event” is simulated with a simple action.
- A separate chat box allows audience messages during the event.

### 7. Events Page

- Shows a list of all events created in the current session.
- Helps both markers and users see that event creation flows through the prototype.

---

## How to Run the Project Locally

### Option 1 – Directly in the browser

1. Download or clone the repository.
2. Open the folder on your computer.
3. Double-click `index.html` to open it in your browser.

No backend or special tools are required. Everything runs in the browser.

### Option 2 – Using Git

```bash
git clone https://github.com/ChukwukaJ/rehash_prototype.git
cd rehash_prototype
# then open index.html in your browser
