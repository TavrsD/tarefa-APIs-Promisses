const baseURL = 'http://localhost:3000/lobos';

document.getElementById('salvar').addEventListener('click', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const descricao = document.getElementById('descricao').value;
    const imagem = document.getElementById('foto-link').value;

    const novoLobinho = {
        nome: nome,
        idade: parseInt(idade),
        descricao: descricao,
        imagem: imagem,
        adotado: false,
        nomeDono: null,
        idadeDono: null,
        emailDono: null
    };

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoLobinho)
    })
    .then(response => response.json())
    .then(data => {
        alert('Lobinho adicionado com sucesso!');
        window.location.href = 'nossoslobinhos.html';
    })
    .catch(error => console.error('Erro ao adicionar o lobinho:', error));
});