// Google Sheets'ten CSV çekme linki
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAseP5FecfDEb7TE2Z3cSNT0Lvj9HYYF8erNeC_38iSCEFsnPHWfhmeqYegxmfOCTcz8Bk2Hbef72J/pub?output=csv";

// CSV'yi çek ve tabloya ekle
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
                    td.innerHTML = `<a href="${cell}" target="_blank" class="btn btn-success btn-sm"><i class="fas fa-download"></i> İndir</a>`;
                } else {
                    td.textContent = cell;
                }
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    })
    .catch(error => console.error("CSV yüklenirken hata:", error));
