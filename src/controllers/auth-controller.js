const users = require("../models/users")

module.exports = {
    // GET /
    index: (req, res) => {
        res.render('index')
    },

    // POST /auth/register
    register: (req, res) => {
        const { username, password } = req.body

        const userAlreadyExists = users.find(user => user.username === username)
        if (userAlreadyExists) return res.status(400).redirect('/')

        const newUser = { username, password, role: 'standard' }
        users.push(newUser)

        req.session.authenticated = true
        req.session.currentUser = newUser
        res.redirect('/dashboard')
    },

    // POST /auth/login
    login: (req, res) => {
        const { username, password } = req.body;
    
        // Verifica se o usuário existe
        const user = users.find(user => user.username === username);
    
        if (!user) {
            console.log('Usuário não encontrado');
            return res.redirect('/'); // Redireciona para a página inicial se o usuário não existir
        }
    
        // Verifica se a senha está correta
        if (user.password !== password) {
            console.log('Senha incorreta');
            return res.redirect('/'); // Redireciona para a página inicial se a senha estiver errada
        }

        req.session.authenticated = true
        req.session.currentUser = user
    
        console.log('Login bem-sucedido');
        res.redirect('/dashboard'); // Redireciona para o dashboard se o login for bem-sucedido
    },
    

    // GET /auth/logout
    logout: (req, res) => {
        req.session.authenticated = false
        req.session.currentUser = null
        res.redirect('/')
    }
}
