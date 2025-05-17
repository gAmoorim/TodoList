const express = require('express')
const { login } = require('./controladores/controllerLogin')
const { listarTarefas, criarTarefa, listarTarefaEspecifica, atualizarTarefa, deletarTarefa } = require('./controladores/controllerTarefas')
const { cadastrarUsuario, obterUsuario, atualizarUsuario, deletarUsuario, exibirUsuarios } = require('./controladores/controllerUsuarios')
const auth = require('./utils/auth')
const rotas = express()


rotas.post('/cadastro', cadastrarUsuario)
rotas.get('/usuarios', exibirUsuarios)

rotas.post('/login', login)

rotas.use(auth)

rotas.get('/usuario', obterUsuario)
rotas.put('/usuario', atualizarUsuario)

rotas.delete('/usuario', deletarUsuario)
rotas.post('/tarefas', criarTarefa)
rotas.get('/tarefas', listarTarefas)

//continuar DAQUI

rotas.get('/tarefas/:id', listarTarefaEspecifica)
rotas.put('/tarefas/:id', atualizarTarefa)
rotas.delete('/tarefas/:id', deletarTarefa)

module.exports = rotas
