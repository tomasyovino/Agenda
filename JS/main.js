let events = [],
    arr = [];   // Upload data

const eventName = document.querySelector("#eventName"),
    eventDate = document.querySelector("#eventDate"),
    buttonAdd = document.querySelector("#bAdd"),
    eventsContainer = document.querySelector("#eventsContainer");

const json = load();
try {
    arr = JSON.parse(json);
} catch (error) {
    console.log("There was an error in the reading of products" + error);
}
events = arr ? [...arr] : [];

renderEvents();

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
});

function addEvent() {
    if(eventName.value === "" || eventDate.value === ""){
        return;
    } else if (dateDiff(eventDate.value) < 0){
        return;
    } else {
        const newEvent = {
            id: (Math.random() * 100).toString(36).slice(3),
            name: eventName.value,
            date: eventDate.value
        }

        events.push(newEvent);
        save(JSON.stringify(events));
        eventName.value = "";

        renderEvents();
    }
}

function dateDiff(d) {
    const targetDate = new Date(d),
        today = new Date(),
        difference = targetDate.getTime() - today.getTime(),
        days = Math.ceil(difference / (1000 * 3600 * 24));

    return days;
}

function renderEvents() {
    const eventsHTML = events.map((e) => {
        return `
            <div class="event">
                <div class="event-name">${e.name}</div>
                <div class="event-date">${e.date}</div>
                <div class="actions">
                    <div class="days">
                        <span class="days-number">${dateDiff(e.date)}</span>
                        <span class="days-text">days</span>
                    </div>
                    <button class="bDelete" data-id="${e.id}">Delete</button>
                </div>
            </div>
        `;
    });
    eventsContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll(".bDelete").forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            events = events.filter(event => event.id !== id);

            save(JSON.stringify(events));

            renderEvents();
        });
    });
}

function save(data) {
    localStorage.setItem("items", data);
}

function load() {
    return localStorage.getItem("items");
}