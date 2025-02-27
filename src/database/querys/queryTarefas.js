const knex = require('../conexao')

const queryNovaTarefa = async (novaTarefa) => {
    return await knex('tarefas').insert(novaTarefa)
}

const queryTarefas = async (id) => {
   return await knex('tarefas')
   .where({user_id: id})
}

const queryTarefaEspecifica = async (id) => {
    return await knex('tarefas').where({id})
}

const queryBuscarTarefa = async (id) => {
    return await knex('tarefas').where({id})
}

const queryAtualizarTarefa = async (camposAtualizados) => {
    return await knex('tarefas')
    .where({id})
    .update({camposAtualizados})
}

const queryDeletarTarefa = async (id) => {
    return await knex('tarefas')
    .where({id})
    .first()
    .delete()
}

module.exports = {
    queryNovaTarefa,
    queryTarefas,
    queryTarefaEspecifica,
    queryBuscarTarefa,
    queryAtualizarTarefa,
    queryDeletarTarefa
}