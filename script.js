// Google Sheets'ten CSV çekme linki
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHTJ1234XYZ/pub?output=csv";

// CSV'yi fetch ile alıp tabloya ekleme
fetch(csvUrl)
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const tableBody = document.querySelector("#docsTable tbody");

        rows.slice(1).forEach(row => {
            const tr = document.createElement("tr");
            row.forEach((cell, index) => {
                const td = document.createElement("td");
                if (index === 5 && cell.startsWith("http")) {
                    td.innerHTML = `<a href="${cell}" target="_blank">İndir</a>`;
                } else {
                    td.textContent = cell;
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error("CSV yüklenirken hata:", error));
