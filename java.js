// Lista eventi salvata in memoria
let eventi = [];
let eventoSelezionato = null;

// Funzione per aggiungere un nuovo evento
function aggiungiEvento() {
    let nome = document.getElementById("nome").value.trim();
    let data = document.getElementById("data").value;
    let ora = document.getElementById("ora").value;
    let descrizione = document.getElementById("descrizione").value.trim();

    if (nome === "" || data === "" || ora === "") {
        alert("Compila tutti i campi obbligatori!");
        return;
    }

    let nuovoEvento = {
        id: Date.now(),
        nome: nome,
        data: data,
        ora: ora,
        descrizione: descrizione
    };

    eventi.push(nuovoEvento);
    aggiornaListaEventi();
    pulisciCampi();
}

// Funzione per aggiornare la lista eventi
function aggiornaListaEventi() {
    let lista = document.getElementById("lista-eventi");
    lista.innerHTML = "";

    eventi.forEach(evento => {
        let div = document.createElement("div");
        div.classList.add("task");
        div.innerHTML = `<strong>${evento.nome}</strong> - ${evento.data} ${evento.ora}`;
        div.onclick = () => apriModale(evento);
        lista.appendChild(div);
    });
}

// Funzione per pulire i campi del form
function pulisciCampi() {
    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
    document.getElementById("ora").value = "";
    document.getElementById("descrizione").value = "";
}

// Funzione per cercare eventi
function cercaEvento() {
    let filtro = document.getElementById("search").value.toLowerCase();
    let lista = document.getElementById("lista-eventi").children;

    for (let i = 0; i < lista.length; i++) {
        let testo = lista[i].innerText.toLowerCase();
        lista[i].style.display = testo.includes(filtro) ? "" : "none";
    }
}

// Funzione per aprire la modale di modifica
function apriModale(evento) {
    eventoSelezionato = evento;
    document.getElementById("edit-nome").value = evento.nome;
    document.getElementById("edit-data").value = evento.data;
    document.getElementById("edit-ora").value = evento.ora;
    document.getElementById("edit-descrizione").value = evento.descrizione;

    document.getElementById("modal-bg").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

// Funzione per chiudere la modale
function chiudiModale() {
    document.getElementById("modal-bg").style.display = "none";
    document.getElementById("modal").style.display = "none";
}

// Funzione per salvare le modifiche
function salvaModifiche() {
    if (!eventoSelezionato) return;

    eventoSelezionato.nome = document.getElementById("edit-nome").value;
    eventoSelezionato.data = document.getElementById("edit-data").value;
    eventoSelezionato.ora = document.getElementById("edit-ora").value;
    eventoSelezionato.descrizione = document.getElementById("edit-descrizione").value;

    aggiornaListaEventi();
    chiudiModale();
}

// Funzione per eliminare un evento
function eliminaEvento() {
    if (!eventoSelezionato) return;

    eventi = eventi.filter(e => e.id !== eventoSelezionato.id);
    aggiornaListaEventi();
    chiudiModale();
}