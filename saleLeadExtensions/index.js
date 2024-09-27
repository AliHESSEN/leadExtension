let userLeads = []; /* defineres som et tomt array */

// Hent leads fra localStorage hvis det finnes noen
const leadsFromStorage = JSON.parse(localStorage.getItem("userLeads"));
if (leadsFromStorage) {
    userLeads = leadsFromStorage;
}

const userInput = document.getElementById("userInput");
const inputButton = document.getElementById("inputButton");
const showButton = document.getElementById("showButton"); // Hent showButton
const ulElementList = document.getElementById("ulElement");

// saveLead function
function saveLead() {
    console.log("Button is clicked from saveLead function");

    // Hent verdi fra inputfeltet
    const inputValue = userInput.value;

    // Sørg for at URLen starter med http:// eller https://
    let formattedURL = inputValue;
    if (!formattedURL.startsWith('http://') && !formattedURL.startsWith('https://')) {
        formattedURL = 'http://' + formattedURL;
    }

    // Putt en lead i userLeads array fra inputfeltet
    userLeads.push(formattedURL);
    userInput.value = ''; // Tøm inputfeltet etter lagring

    // Lagre leads i localStorage
    localStorage.setItem("userLeads", JSON.stringify(userLeads));
}

// Funksjon for å vise leads når knappen klikkes
function showLeads() {
    let listItems = ""; // Starte som en tom streng

    // Loop gjennom array og skriv dem ut
    for (let i = 0; i < userLeads.length; i++) {
        listItems += `<li><a target='_blank' href='${userLeads[i]}'>${userLeads[i]}</a></li>`;
    }

    // Render listen inne i ul-elementet
    ulElementList.innerHTML = listItems;
}

/* Event Listeners */

// Lytt til klikk på inputButton for å lagre leads
inputButton.addEventListener("click", saveLead);

// Lytt til klikk på showButton for å vise leads
showButton.addEventListener("click", showLeads);

// Lytt til 'Enter' key press for å lagre leads når enter trykkes
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        saveLead(); // Kall saveLead-funksjonen når Enter trykkes
        event.preventDefault(); // Hindre standard handling (f.eks. form innsending)
    }
});
