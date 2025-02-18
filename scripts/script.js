async function carregarLobosDoJSON() {
  try {
    console.log("Iniciando o carregamento dos lobos do JSON...");
    const response = await fetch("../lobinhos.json"); // Caminho ajustado
    if (!response.ok) {
      throw new Error(`Erro ao buscar lobinhos.json: ${response.statusText}`);
    }
    const data = await response.json();
    const lobos = data.lobos; // Acessa a propriedade 'lobos' do JSON
    console.log("Lobos carregados com sucesso:", lobos);
    iniciarRotacaoDeLobos(lobos);
  } catch (error) {
    console.error("Erro ao carregar lobos do JSON:", error);
  }
}

// Função que carrega os lobos do JSON e renderiza na tela
function iniciarRotacaoDeLobos(lobos) {
  let startIndex = 0;
  renderizarLobos(lobos, startIndex);

  setInterval(() => {
    startIndex = (startIndex + 2) % lobos.length;
    renderizarLobos(lobos, startIndex);
  }, 30000); // 30 segundos
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
        <div id="card-direita" class="lobo-info">
          <h2>${lobo.nome}</h2>
          <p>Idade: ${lobo.idade} anos</p>
          <p>${lobo.descricao}</p>
        </div>
        <div class="lobo-imagem">
          <div id="imagem-direita" class="background-image"></div>
          <img src="${lobo.imagem}" alt="Lobo ${lobo.nome}" />
        </div>
      </div>
    `;

    container.appendChild(card);
  }
}

// Carregar os lobos assim que a página carregar
window.onload = carregarLobosDoJSON;
