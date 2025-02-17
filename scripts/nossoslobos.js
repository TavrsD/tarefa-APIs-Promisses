let lobinhos = [];
let currentPage = 1;
const itemsPerPage = 4;
const baseURL = 'http://localhost:3000/lobos';

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

document.getElementById('search').addEventListener('input', function() {
  currentPage = 1;
  displayLobinhos();
});

function displayLobinhos() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredLobinhos = lobinhos.filter(lobinho => 
    lobinho.nome.toLowerCase().includes(searchQuery) ||
    lobinho.descricao.toLowerCase().includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const lobinhosToDisplay = filteredLobinhos.slice(startIndex, endIndex);

  const lobinhosContainer = document.getElementById('lobinhos');
  lobinhosContainer.innerHTML = '';

  lobinhosToDisplay.forEach(lobinho => {
    const adoteButton = lobinho.adotado ? `<button disabled>Adotado</button>` : `<button onclick="adoteLobinho(${lobinho.id})">Adote</button>`;
    const lobinhoHTML = `
      <div class="lobinho">
        <div class="foto-container">
          <div class="foto-background"></div>
          <img src="${lobinho.imagem}" alt="Imagem de ${lobinho.nome}">
        </div>
        <div>
          <div>
            <h2>${lobinho.nome}</h2>
            <p>Idade: ${lobinho.idade}</p>
          </div>
          ${adoteButton}
          <p>${lobinho.descricao}</p>
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

  // Previous button
  paginationContainer.appendChild(createButton('←', currentPage - 1, currentPage === 1));

  // Page numbers
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

  // Next button
  paginationContainer.appendChild(createButton('→', currentPage + 1, currentPage === totalPages));
}