function processTable(data) {

    let table = []

    data.feed.entry.forEach(e => {
        if (typeof table[parseInt(e.gs$cell.row)-1] != "object")
            table[parseInt(e.gs$cell.row)-1] = []
        table[parseInt(e.gs$cell.row)-1][parseInt(e.gs$cell.col)-1] = e.gs$cell.$t
    });

    table.shift()
    table.forEach(row => {
        if (row[1].substring(0,1).toLowerCase() == "t") {
            tel[row[1].substring(1).toLowerCase()] = {
                "line": row[7],
                "dev": {
                    "telefon": "phone",
                    "zadny neni": "empty",
                    "fax/telefon": "fax",
                    "-": "empty"
                }[row[5]]
            }
        } else {
            ether[row[1].toLowerCase()] = {
                "loc": [["", 0, 0, 0, 1, 1][parseInt(row[2])], (parseInt(row[2])%4)+1, parseInt(row[3])],
                "dev": {
                    "pocitac": "computer",
                    "poctac": "computer",
                    "switch": "switch",
                    "tiskarna": "printer",
                    "-": "empty",
                    undefined: "empty"
                }[row[5]],
                "old": row[8]
            }
            
            if (row[4] != "-" && row[4] != undefined)
                ether[row[1].toLowerCase()]["attrib"] = row[4]
        }
    });
}

let racks = ["Midgard", "Jotunehim", "Asgard"]
let ether = []
let tel = []
