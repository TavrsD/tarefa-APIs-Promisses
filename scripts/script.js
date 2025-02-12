async function inicializarLocalStorage() {
  try {
    const response = await fetch("../lobinhos.json"); // Caminho ajustado
    if (!response.ok) {
      throw new Error(`Erro ao buscar lobinho.json: ${response.statusText}`);
    }
    const lobos = await response.json();
    localStorage.setItem("lobos", JSON.stringify(lobos));
    console.log("Lobos inicializados no localStorage");
  } catch (error) {
    console.error("Erro ao inicializar o localStorage:", error);
  } finally {
    console.log("Tentativa de inicialização do localStorage concluída");
  }
}

if (!localStorage.getItem("lobos")) {
  inicializarLocalStorage()
    .then(() => {
      console.log("Inicialização do localStorage concluída");
      carregarLobosDoLocalStorage(); // Carregar os lobos após inicializar o localStorage
    })
    .catch((error) => {
      console.error("Erro durante a inicialização do localStorage:", error);
    });
} else {
  carregarLobosDoLocalStorage(); // Carregar os lobos se já estiverem no localStorage
}

// Função que carrega os lobos do localStorage e renderiza na tela
function carregarLobosDoLocalStorage() {
  const lobosJSON = localStorage.getItem("lobos");

  if (lobosJSON) {
    const lobos = JSON.parse(lobosJSON);
    iniciarRotacaoDeLobos(lobos);
  } else {
    console.error("Nenhum dado encontrado no localStorage.");
  }
}

function renderizarLobos(lobos, startIndex) {
  const container = document.getElementById("lobos-container");
  container.innerHTML = ""; // Limpa antes de adicionar novos cards

  const endIndex = Math.min(startIndex + 1, lobos.length); // Ajustado para carregar dois cards
  for (let i = startIndex; i < endIndex; i++) {
    const lobo = lobos[i];
    const card = document.createElement("div");
    card.classList.add("card-lobo");

    card.innerHTML = `
      <div class="lobo-card" id="lobo-card">
        <div class="lobo-imagem">
          <div class="background-image"></div>
          <img src="${lobo.imagem}" alt="Lobo ${lobo.nome}" />
        </div>
        <div class="lobo-info">
          <h2>${lobo.nome}</h2>
          <p>Idade: ${lobo.idade} anos</p>
          <p>${lobo.descricao}</p>
        </div>
      </div>
    `;

    container.appendChild(card);
  }

  // Adiciona o próximo card se houver
  if (startIndex + 1 < lobos.length) {
    const lobo = lobos[startIndex + 1];
    const card = document.createElement("div");
    card.classList.add("card-lobo");

    card.innerHTML = `
      <div class="lobo-card" id="lobo-card">
        <div class="lobo-info">
          <h2>${lobo.nome}</h2>
          <p>Idade: ${lobo.idade} anos</p>
          <p>${lobo.descricao}</p>
        </div>
        <div class="lobo-imagem">
          <div class="background-image"></div>
          <img src="${lobo.imagem}" alt="Lobo ${lobo.nome}" />
        </div>
      </div>
    `;

    container.appendChild(card);
  }
}

function iniciarRotacaoDeLobos(lobos) {
  let startIndex = 0;
  renderizarLobos(lobos, startIndex);

  setInterval(() => {
    startIndex = (startIndex + 2) % lobos.length;
    renderizarLobos(lobos, startIndex);
  }, 30000); // 30 segundos
}

// Carregar os lobos assim que a página carregar
window.onload = carregarLobosDoLocalStorage;
