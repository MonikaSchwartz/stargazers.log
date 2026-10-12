const list = document.querySelector("#starred-list");

async function loadEvents() {
  if (!list) {
    console.error("Starred list element was not found.");
    return;
  }

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }

    const events = await response.json();
    renderEvents(events);
  } catch (error) {
    list.innerHTML = `<li class="error-message">${error.message}</li>`;
  }
}

function renderEvents(events) {
  list.innerHTML = events
    .map(
      (event) => `
        <li class="starred-item">
          <strong>${event.name}</strong>
          <span> — starred ${event.starred}</span>
        </li>
      `
    )
    .join("");
}

loadEvents();

