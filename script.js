function search(val) {
    beforeSearch()
    if (val.length > 4) notFound();

    if (val.length == 3 && !isNaN(val.substring(0,1))) {
        if (val.toLowerCase() in ether) {
            displayEther(val);
        } else {notFound()}
    } else if (val.length == 2 && !isNaN(val)) {
        let port = Object.keys(tel).find(key => tel[key].line === val)
        if (port) {
            displayTel(port)
        } else {notFound()}
    } else if (val.length == 4) {
        if (val.substring(0,1).toLowerCase() == 't') {
            let line = val.substring(1).toLowerCase()
            if (line in tel) {
                displayTel(line)
            } else {notFound()}
        } else {notFound()}
    }
}

function displayTel(port) {
    el('tel-floor').innerText = port.substring(0,1);
    el('tel-room').innerText = "" + port.substring(0,1) + ('0' + (port.charCodeAt(1)-96)).slice(-2);
    el('tel-port').innerText = port.charCodeAt(2)-96;

    el('tel-line').innerText = tel[port].line

    el('tel-' + tel[port].dev).style.display = "block";
    el('tel').style.display = "flex";
    window.scrollTo({
        top: el('tel').getBoundingClientRect().top,
        behavior: "smooth"
    });
}

function displayEther(port) {
    el('ether-floor').innerText = port.substring(0,1);
    el('ether-room').innerText = "" + port.substring(0,1) + ('0' + (port.charCodeAt(1)-96)).slice(-2);
    el('ether-port').innerText = port.charCodeAt(2)-96;
    if (ether[port].attrib)
        el(ether[port].dev).getElementsByClassName('attrib')[0].innerText = ether[port].attrib;

    el('rack-room').innerText = racks[ether[port].loc[0]];
    el('rack-patch').innerText = ether[port].loc[1];
    el('rack-port').innerText = ether[port].loc[2];

    el(ether[port].dev).style.display = "block";
    el('ether').style.display = "flex";
    window.scrollTo({
        top: el('ether').getBoundingClientRect().top,
        behavior: "smooth"
    });
}

function beforeSearch() {
    [
        'notFound',
        'ether', 'printer', 'computer', 'ap', 'server', 'switch', 
        'tel', 'tel-phone', 'tel-empty'
    ].forEach(e => {
        el(e).removeAttribute('style');
    });
}

function notFound() {
    el('notFound').style.display = "block";
}

function el(elm) {
    return document.getElementById(elm)
}

el('search').addEventListener("input", e => {search(e.target.value)})
