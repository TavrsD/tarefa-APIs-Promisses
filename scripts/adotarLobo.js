const { json } = require("body-parser");

const baseURL = 'http://localhost:3000/lobos';
const adotarBtn = document.getElementById('botao_adota');

function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function adotarLobinho() {
    const id = getIdFromURL();
    const formularioAdocao = {
        adotado: true,
        nomeDono: document.getElementById('nome'),
        idadeDono:document.getElementById('idade'),
        emailDono:document.getElementById('email'),
    };
    fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formularioAdocao)
    })
    .then(response => response.json())
    .then(() => {
        alert('Adotado');
        window.location.href = './html/home.html';
    })
    .catch(error => console.error('Erro ao adotar o lobinho:', error));
}

adotarBtn.addEventListener('click', console.log('clicou')
);
