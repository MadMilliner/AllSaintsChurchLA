import {headerContent, signupContent, footerContent, underlineCurrentPage} from "./head-foot.js"

header = document.getElementById("header")
signup = document.getElementById("signup")
footer = document.getElementById("footer")

header.innerHTML = headerContent()
signup.innerHTML = signupContent()
footer.innerHTML = footerContent()

document.addEventListener("DOMContentLoaded", underlineCurrentPage);


eventsList = document.getElementById("eventsList")

const events = []
window.events = events
class Event {
    constructor(title, time, date, description, image) {
        this.title = title;
        this.time = time;
        const dateObj = new Date(date);
        this.date = dateObj.toLocaleDateString();
        this.description = description;
        this.image = image;
        this.id = crypto.randomUUID();
        this.addEvents();
    }
    addEvents() {
        events.push(this);
        events.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    }
}

// Add Events here
new Event("All Saints LA Service", "5pm", "2025-10-26 GMT-0700", "Join us for worship", "/img/Service & Congregation/Photo Sep 03 2023, 4 15 19 PM.jpg")
// new Event("title", "time", "date", "description", "image path")
// 

events.forEach((item) => {
    const eventBox = document.createElement("div");
    eventBox.setAttribute("id", `${item.id}-box`);
    eventBox.setAttribute("class", `eventBox`)
    eventBox.innerHTML = `
    <img src="${item.image}" alt="${item.title}">
    <div class="eventBoxRight">
    <p>${item.title}</p>
    <p>${item.date} at ${item.time}</p>
    <p>${item.description}</p>
    `
    eventsList.appendChild(eventBox);
})