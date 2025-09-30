const headerContent = () => `
            <a href="index.html" id="headerLogoA"><img src="img/AllSaintsLogo_Pride_KO_Horizontal-01.webp" alt="Home - All Saints Church LA Logo" id="headerlogo"></a>
            <div id="navbar">
                <a href="about.html">About</a>
                <a href="webelieve.html">We Believe</a>
                <a href="events.html">Events</a>
                <a href="give.html">Give</a>
                <a href="contact.html">Contact</a>
                <a href="jobs.html">Jobs</a>
            </div>
        `
const signupContent = () => `
                <div class="signup">
                <p>Sign up with your email address to receive our monthly newsletter.</p>
                <p><input type="email" autocomplete="email" placeholder="E-mail address">
                <button type="submit">Sign-Up</button></p>
                </div>
        `
const footerContent = () => `
                <div>All Saints Los Angeles</div>
                <div><a href="https://www.instagram.com/allsaintschurchla/" target="_blank"><img src="img/instagram logo_icon.png" alt=""></a></div>
                <div><a href="https://chat.whatsapp.com/KKgRO6k60Us7ofspO42nbq" target="_blank"><img src="img/whatsapp logo_icon.png" alt=""></a></div>
                <div><a href="https://open.spotify.com/show/73BmDDi6yqUY6CptdBgDLD?si=38b2ba9631ef49b4" target="_blank"><img src="img/icons8-spotify-50.png" alt=""></a></div>
                <div><a href="mailto:admin@allsaintsla.church">admin@allsaintsla.church</a></div>
        `        
function underlineCurrentPage() {
    const links = document.querySelectorAll("#navbar a");
    const currentPage = window.location.pathname.split("/").pop(); // e.g. "about.html"
    
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.style.textDecoration = "underline";  // direct inline style
            // OR add a class:
            // link.classList.add("active");
        }
    });
}       


    const header = document.getElementById("nav-header")
    const signup = document.getElementById("signup")
    const footer = document.getElementById("footer")

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
    new Event("Fall Community Groups", "7pm-9pm", "2025-10-15T00:00:00", "We will be reading and discussing Inspired: Slaying Giants", "img/events/fall2025groups.jpg")
    new Event("Fall Community Groups", "7pm-9pm", "2025-10-22T00:00:00", "We will be reading and discussing Inspired: Slaying Giants", "img/events/fall2025groups.jpg")
    new Event("All Saints LA Service", "5pm", "2025-10-26T00:00:00", "Join us for worship", "img/events/servicePhoto.jpg")
    new Event("Fall Community Groups", "7pm-9pm", "2025-10-29T00:00:00", "We will be reading and discussing Inspired: Slaying Giants", "img/events/fall2025groups.jpg")
    // new Event("title", "time", "date", "description", "image path")
    // 

    const calendarEl = document.getElementById("calendar");

    let currentDate = new Date();

    function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const monthName = date.toLocaleString("default", { month: "long" });

    let html = `
        <div class="calendar-header">
        <button id="prevMonth">&lt;</button>
        <span>${monthName} ${year}</span>
        <button id="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
    `;

    // Padding before first day
    for (let i = 0; i < firstDay; i++) {
        html += `<div></div>`;
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayDate = new Date(year, month, day).toLocaleDateString();
        const today = new Date().toLocaleDateString() === dayDate;

        // Find events on this day
        const dayEvents = events.filter(ev => ev.date === dayDate);

        if (dayEvents.length > 0) {
        // If multiple events, link to the first one
        const targetId = `${dayEvents[0].id}-box`;
        html += `<div class="day event ${today ? "today" : ""}">
                    <a href="#" data-event-id="${targetId}">${day}</a>
                </div>`;
        } else {
        html += `<div class="day ${today ? "today" : ""}">${day}</div>`;
        }
    }

    html += `</div>`;
    calendarEl.innerHTML = html;

    // Navigation
    document.getElementById("prevMonth").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    };
    document.getElementById("nextMonth").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    };

    // Scroll-to-event behavior
    calendarEl.querySelectorAll("a[data-event-id]").forEach(link => {
        link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.eventId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            target.classList.add("highlight");
            setTimeout(() => target.classList.remove("highlight"), 1500);
        }
        });
    });
    }

    // Initial render
    renderCalendar(currentDate);

    // Render event list

    function renderEvents() {
    eventsList.innerHTML = ''; // Clear previous events
    events.forEach(item => {
        const eventBox = document.createElement("div");
        eventBox.setAttribute("id", `${item.id}-box`);
        eventBox.classList.add("eventBox");
        eventBox.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div>
            <p><strong>${item.title}</strong></p>
            <p>${item.date} at ${item.time}</p>
            <p>${item.description}</p>
        </div>
        `;
        eventsList.appendChild(eventBox);
    });
    }

    // Call renderEvents after adding events
    renderEvents();
