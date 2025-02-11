let eventi = JSON.parse(localStorage.getItem("eventi")) || [];
let eventoCorrente = null;

document.addEventListener("DOMContentLoaded", aggiornaLista);

function aggiungiEvento() {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const ora = document.getElementById("ora").value;
    const descrizione = document.getElementById("descrizione").value;

    if (!nome || !data || !ora || !descrizione) {
        alert("Compila tutti i campi!");
        return;
    }

    const evento = { id: Date.now(), nome, data, ora, descrizione };
    eventi.push(evento);
    aggiornaLista();
    pulisciForm();
}

function aggiornaLista() {
    const lista = document.getElementById("eventi-lista");
    lista.innerHTML = "";
    eventi.forEach(evento => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `<strong>${evento.nome}</strong> - ${evento.data} ${evento.ora}`;
        div.onclick = () => apriModale(evento.id);
        lista.appendChild(div);
    });
    salvaSuLocalStorage();
}

function apriModale(id) {
    eventoCorrente = eventi.find(evento => evento.id === id);
    if (!eventoCorrente) return;

    document.getElementById("edit-nome").value = eventoCorrente.nome;
    document.getElementById("edit-data").value = eventoCorrente.data;
    document.getElementById("edit-ora").value = eventoCorrente.ora;
    document.getElementById("edit-descrizione").value = eventoCorrente.descrizione;

    document.getElementById("modal-bg").style.display = "block";
    document.getElementById("modal").style.display = "block";
}

function chiudiModale() {
    document.getElementById("modal-bg").style.display = "none";
    document.getElementById("modal").style.display = "none";
}

function salvaModifiche() {
    if (!eventoCorrente) return;

    eventoCorrente.nome = document.getElementById("edit-nome").value;
    eventoCorrente.data = document.getElementById("edit-data").value;
    eventoCorrente.ora = document.getElementById("edit-ora").value;
    eventoCorrente.descrizione = document.getElementById("edit-descrizione").value;

    aggiornaLista();
    chiudiModale();
}

function eliminaEvento() {
    eventi = eventi.filter(evento => evento.id !== eventoCorrente.id);
    aggiornaLista();
    chiudiModale();
}

function pulisciForm() {
    document.getElementById("nome").value = "";
    document.getElementById("data").value = "";
    document.getElementById("ora").value = "";
    document.getElementById("descrizione").value = "";
}

function salvaSuLocalStorage() {
    localStorage.setItem("eventi", JSON.stringify(eventi));
}

function filtraEventi() {
    const filtro = document.getElementById("search").value.toLowerCase();
    const lista = document.getElementById("eventi-lista");
    lista.innerHTML = "";

    eventi.filter(evento => evento.nome.toLowerCase().includes(filtro))
        .forEach(evento => {
            const div = document.createElement("div");
            div.className = "task";
            div.innerHTML = `<strong>${evento.nome}</strong> - ${evento.data} ${evento.ora}`;
            div.onclick = () => apriModale(evento.id);
            lista.appendChild(div);
        });
}