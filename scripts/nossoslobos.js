let lobinhos = [];
let currentPage = 1;
const itemsPerPage = 4;
const baseURL = 'http://localhost:3000/lobos';
const searchInput = document.getElementById('search');
const adoptionCheckbox = document.getElementById('filter-adoption');

fetch(baseURL)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados carregados:', data);
    lobinhos = data;
    displayLobinhos();
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

searchInput.addEventListener('input', function() {
  currentPage = 1;
  displayLobinhos();
});

adoptionCheckbox.addEventListener('change', function() {
  currentPage = 1;
  displayLobinhos();
});

function displayLobinhos() {
  const searchQuery = searchInput.value.toLowerCase();
  const showOnlyAdopted = adoptionCheckbox.checked;

  let filteredLobinhos = lobinhos.filter(lobinho => 
    lobinho.nome.toLowerCase().includes(searchQuery) ||
    lobinho.descricao.toLowerCase().includes(searchQuery)
  );

  if (showOnlyAdopted) {
    filteredLobinhos = filteredLobinhos.filter(lobinho => lobinho.adotado === true);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const lobinhosToDisplay = filteredLobinhos.slice(startIndex, endIndex);

  const lobinhosContainer = document.getElementById('lobinhos');
  lobinhosContainer.innerHTML = '';

  lobinhosToDisplay.forEach(lobinho => {
    const adoteButton = lobinho.adotado ? `<button disabled class="adotado-button">adotado</button>` : `<button class="adotar-button" onclick="adoteLobinho(${lobinho.id})">Adote</button>`;
    const tutor = lobinho.adotado ? `<span><strong>Adotado por: ${lobinho.nomeDono}</strong></span>` : ``;
    const lobinhoHTML = `
      <div class="lobinho">
        <div class="foto-container">
          <div class="foto-background"></div>
          <img src="${lobinho.imagem}" alt="Imagem de ${lobinho.nome}">
        </div>
        <div class="info-container">
          <div class="name-age-button">
            <div id="info-tite">
              <h2>${lobinho.nome}</h2>
              <span>Idade: ${lobinho.idade}</span>
            </div>
            ${adoteButton}
          </div>
          <p>${lobinho.descricao}</p>
          ${tutor}
        </div>
      </div>
    `;
    lobinhosContainer.innerHTML += lobinhoHTML;
  });

  displayPagination(filteredLobinhos.length);
}

function adoteLobinho(id) {
  window.location.href = `showlobinho.html?id=${id}`;
}

function displayPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (totalPages <= 1) return;

  const createButton = (text, page, disabled = false) => {
    const button = document.createElement('button');
    button.textContent = text;
    if (disabled) {
      button.classList.add('disabled');
      button.disabled = true;
    } else {
      button.addEventListener('click', () => {
        currentPage = page;
        displayLobinhos();
      });
    }
    return button;
  };

  paginationContainer.appendChild(createButton('←', currentPage - 1, currentPage === 1));

  if (currentPage > 3) {
    paginationContainer.appendChild(createButton(1, 1));
    if (currentPage > 4) {
      paginationContainer.appendChild(document.createTextNode('...'));
    }
  }

  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    paginationContainer.appendChild(createButton(i, i, i === currentPage));
  }

  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      paginationContainer.appendChild(document.createTextNode('...'));
    }
    paginationContainer.appendChild(createButton(totalPages, totalPages));
  }

  paginationContainer.appendChild(createButton('→', currentPage + 1, currentPage === totalPages));
}
