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

export {headerContent, signupContent, footerContent, underlineCurrentPage}