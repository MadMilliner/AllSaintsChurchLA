import {headerContent, footerContent} from "./head-foot.js"

header = document.getElementById("header")
footer = document.getElementById("footer")

header.innerHTML = headerContent()
footer.innerHTML = footerContent()