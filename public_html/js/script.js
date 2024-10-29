const baseURL = 'https://67201504e7a5792f053066df.mockapi.io/users';

// Função para listar todos os usuários
function listarUsuarios() {
    fetch(baseURL)
    .then(response => response.json())
    .then(data => {
        const userList = document.createElement('table');
        userList.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
        `;
        data.forEach(user => {
            userList.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>
                        <a href="editar.html?id=${user.id}">Editar</a>
                        <a href="#" onclick="confirmarExclusao(${user.id})">Excluir</a>
                    </td>
                </tr>
            `;
        });
        const mainContent = document.querySelector('#main-content');
        mainContent.innerHTML = '';
        mainContent.appendChild(userList);
    })
    .catch(error => console.error('Erro ao listar usuários:', error));
}

// Função para confirmar a exclusão de um usuário
function confirmarExclusao(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmacao) {
        excluirUsuario(id);
    }
}

// Função para excluir um usuário pelo ID
function excluirUsuario(id) {
    fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log('Usuário excluído com sucesso');
        listarUsuarios();
    })
    .catch(error => console.error('Erro ao excluir usuário:', error));
}

// Função para buscar usuário por ID ou Nome
function buscarUsuario() {
    const searchTerm = document.querySelector('#search-input').value.trim();
    if (searchTerm === '') {
        alert('Por favor, insira um termo de busca.');
        return;
    }

    fetch(`${baseURL}?search=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            document.querySelector('#search-result').innerHTML = 'Nenhum usuário encontrado.';
        } else {
            let resultHTML = '<ul>';
            data.forEach(user => {
                resultHTML += `<li>ID: ${user.id}, Nome: ${user.nome}, Email: ${user.email}</li>`;
            });
            resultHTML += '</ul>';
            document.querySelector('#search-result').innerHTML = resultHTML;
        }
    })
    .catch(error => console.error('Erro ao buscar usuário:', error));
}

// Função para cadastrar um novo usuário
function cadastrarUsuario(event) {
    event.preventDefault();
    const nome = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;

    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário cadastrado com sucesso:', data);
        document.querySelector('#user-form').reset();
        listarUsuarios();
    })
    .catch(error => console.error('Erro ao cadastrar usuário:', error));
}
