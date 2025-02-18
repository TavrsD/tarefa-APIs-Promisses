const baseURL = "http://localhost:3000/lobos";

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function carregarLobo() {
  const id = getIdFromURL();
  if (!id) {
    alert("ID do lobinho não encontrado na URL.");
    return;
  }

  fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then(lobo => {
      const loboContainer = document.getElementById("lobo-container");
      loboContainer.innerHTML = `
        <div class="lobo-foto">
          <img src="${lobo.imagem}" alt="Foto do lobo">
        </div>
        <div class="lobo-info">
          <h1>${lobo.nome}</h1>
          <span>ID: ${lobo.id}</span>
        </div>
      `;
    })
    .catch(error => console.error("Erro ao carregar o lobinho:", error));
}

const adotarBtn = document.getElementById("botao_adota");

function adotarLobinho(event) {
  event.preventDefault();

  const id = getIdFromURL();
  if (!id) {
    alert("ID do lobinho não encontrado na URL.");
    return;
  }

  const formularioAdocao = {
    adotado: true,
    nomeDono: document.getElementById("nome").value,
    idadeDono: parseInt(document.getElementById("idade").value),
    emailDono: document.getElementById("email").value,
  };
  fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formularioAdocao),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Adotado");
      window.location.href = "home.html";
    })
    .catch((error) => console.error("Erro ao adotar o lobinho:", error));
}

document.addEventListener("DOMContentLoaded", carregarLobo);
adotarBtn.addEventListener("click", adotarLobinho);