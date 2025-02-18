document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const baseURL = 'http://localhost:3000/lobos';
  
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        const lobinho = data.find(l => l.id == id);
        if (lobinho) {
          document.getElementById('nome').textContent = lobinho.nome;
          document.getElementById('imagem').src = lobinho.imagem;
          document.getElementById('imagem').alt = `Imagem de ${lobinho.nome}`;
          document.getElementById('idade').textContent = `Idade: ${lobinho.idade}`;
          document.getElementById('descricao').textContent = lobinho.descricao;
  
          document.getElementById('adotar').addEventListener('click', () => {
            window.location.href = `adotarLobo.html?id=${lobinho.id}`;
          });
  
          document.getElementById('excluir').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir este lobinho?')) {
              fetch(`${baseURL}/${lobinho.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(response => response.json())
              .then(data => {
                alert('Lobinho excluído com sucesso!');
                window.location.href = 'nossoslobinhos.html';
              })
              .catch(error => {
                console.error('Erro ao excluir o lobinho:', error);
              });
            }
          });
        } else {
          document.getElementById('nome').textContent = 'Lobinho não encontrado';
        }
      })
      .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
  });