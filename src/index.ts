const button = document.getElementById("increase");
if (button) {
    button.onclick = () => {
        const log = document.getElementById("log");
        if (log) {
            const h = document.createElement("h3");
            h.innerText = "test";
            log.append(h);
        }
    }
}

if ((module as any).hot) {
    (module as any).hot.accept();
}