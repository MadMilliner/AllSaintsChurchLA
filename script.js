import {headerContent, signupContent, footerContent, underlineCurrentPage} from "./head-foot.js"

header = document.getElementById("header")
signup = document.getElementById("signup")
footer = document.getElementById("footer")

header.innerHTML = headerContent()
signup.innerHTML = signupContent()
footer.innerHTML = footerContent()

document.addEventListener("DOMContentLoaded", underlineCurrentPage);
