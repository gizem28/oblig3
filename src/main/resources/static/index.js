// Tom array for billet liste
let billettListe = [];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('billettForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addBillett();

    });

    listBilletter();
});


// Funksjon for å legge til billetter
function addBillett() {
    if (checkInput()) {
        const billettData = {
            filmName: document.getElementById('filmNames').value,
            quantity: parseInt(document.getElementById('antall').value, 10),
            firstName: document.getElementById('fornavn').value,
            lastName: document.getElementById('etternavn').value,
            phoneNumber: document.getElementById('telefonnr').value,
            email: document.getElementById('epost').value
        };

        fetch('http://localhost:8080/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billettData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json(); // JSON olarak sunucu yanıtını al
            })
            .then(data => {
                console.log('Success:', data); // Başarı durumunda eylemler
                listBilletter(); // Ekranda biletleri listele
            })
            .catch((error) => {
                console.error('Error:', error); // Hata durumunda eylemler
            });


        // Add the ticket data to the 'billettList' array
        billettListe.push({
            id: billettListe.length + 1, // Assuming that the 'id' is an auto-incrementing integer
            filmName: billettData.filmName,
            quantity: billettData.quantity,
            firstName: billettData.firstName,
            lastName: billettData.lastName,
            phoneNumber: billettData.phoneNumber,
            email: billettData.email
        });

        // Call the 'listBilletter()' function to update the HTML content on the page
        listBilletter();

        resetForm();
    }
}

// Funksjon for å oppdatere og vise billettliste
function listBilletter(liste) {

    const alleBilletterDiv = document.getElementById('alleBilletter');
    alleBilletterDiv.innerHTML = '';

    liste.forEach(billet => {
        const ticketDiv = document.createElement('div');
        ticketDiv.innerHTML = `
            <p>Film: ${billet.filmName}</p>
            <p>Antall: ${billet.antall}</p>
            <p>Fornavn: ${billet.fornavn}</p>
            <p>Etternavn: ${billet.etternavn}</p>
            <p>Telefonnr: ${billet.telefonnr}</p>
            <p>Epost: ${billet.epost}</p>
        `;
        alleBilletterDiv.appendChild(ticketDiv);
    });
}

function checkInput() {
    let isValid = true;


    // validering for filmutvalg
    let film = document.getElementById("filmNames").value;
    let filmAdv = document.getElementById("filmAdv");
    if (film === "") {
        filmAdv.innerText = "Vennligst velg en film";
        filmAdv.style.display = "inline-block";
        isValid = false;
    } else {
        filmAdv.style.display = "none";
    }


    // Antall validation
    let antall = document.getElementById('antall').value;
    let antallAdv = document.getElementById("antallAdv");
    if (parseInt(antall) < 1 || isNaN(parseInt(antall))) {
        antallAdv.innerText = "Må skrive noe inn i antall";
        antallAdv.style.display = "inline-block"; // vis feilmelding
        isValid = false;
    } else {
        antallAdv.style.display = "none"; // skjul feilmelding
    }

    // Fornavn validation
    let fornavn = document.getElementById("fornavn").value;
    let fornavnAdv = document.getElementById("fornavnAdv");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(fornavn) || fornavn.length < 2) {
        fornavnAdv.innerText = "Dette feltet kan ikke stå tomt.";
        fornavnAdv.style.display = "inline-block";
        isValid = false;
    } else {
        fornavnAdv.style.display = "none";
    }

    // Etternavn validation
    let etternavn = document.getElementById("etternavn").value;
    let etternavnAdv = document.getElementById("etternavnAdv");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(etternavn) || etternavn.length < 2) {
        etternavnAdv.innerText = "Dette feltet kan ikke stå tomt.";
        etternavnAdv.style.display = "inline-block";
        isValid = false;
    } else {
        etternavnAdv.style.display = "none";
    }

    // Telefonnr validation
    let telefonnr = document.getElementById("telefonnr").value;
    let telAdv = document.getElementById("telAdv");

    if (!/^\d{8}$/.test(telefonnr)) {
        telAdv.innerText = "Vennligst skriv inn i gyldig telefonnummer med 8 siffer";  // Telefonnumre i Norge består av 8 sifre.

        telAdv.style.display = "inline-block"; // Vis feilmelding
        isValid = false;
    } else {
        telAdv.style.display = "none"; // Skjul feilmelding
    }


    // Epost validation
    let epost = document.getElementById("epost").value;
    let epostAdv = document.getElementById("epostAdv");
    // regex for e post validering
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(epost)) {
        epostAdv.innerText = "Vennligst skriv inn gyldig epost som feks.(bruker@gmail.no)";
        epostAdv.style.display = "inline-block"; // Vis feilmelding
        isValid = false;
    } else {
        epostAdv.style.display = "none"; // Skjul feilmelding
    }

    return isValid;

}


// Funksjon for tilbakestilling av skjema
function resetForm() {
    document.getElementById('billettForm').reset();
    // Skjul alle advarselsmeldinger
    let warnings = document.querySelectorAll('.validation-error');
    warnings.forEach(function(warning) {
        warning.style.display = 'none';
    });
}


// Funksjon for å slette alle billetter
function slettAlleBilletter() {
    billettListe = [];
    listBilletter(billettListe);
}

