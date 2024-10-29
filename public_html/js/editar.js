const baseURL = 'https://67201504e7a5792f053066df.mockapi.io/users';

// Função para preencher o formulário com os dados do usuário a ser editado
function preencherFormulario() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (userId) {
        fetch(`${baseURL}/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.querySelector('#user-id').value = user.id;
            document.querySelector('#name-input').value = user.nome;
            document.querySelector('#email-input').value = user.email;
        })
        .catch(error => console.error('Erro ao buscar usuário:', error));
    }
}

// Função para editar um usuário
function editarUsuario(event) {
    event.preventDefault();
    const userId = document.querySelector('#user-id').value;
    const nome = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;
    
    fetch(`${baseURL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then(() => {
        console.log('Usuário editado com sucesso');
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Erro ao editar usuário:', error));
}

preencherFormulario();
