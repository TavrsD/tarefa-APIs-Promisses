const baseURL = "http://localhost:3000/lobos";

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
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

adotarBtn.addEventListener("click", adotarLobinho);