const { queryNovaTarefa, queryTarefas, queryTarefaEspecifica, queryBuscarTarefa, queryAtualizarTarefa, queryDeletarTarefa } = require("../database/querys/queryTarefas")

const criarTarefa = async (req,res) => {
    const { titulo, descricao, data_vencimento, prioridade, categoria, status, etiquetas} = req.body

    if (!titulo || !descricao || !prioridade || !data_vencimento) {
        return res.status(400).json({mensagem: 'Preencha pelo menos o titulo, a descrição e a prioridade'})
    }

    const {id} = req.usuario

    try {
        const novaTarefa = {
            titulo,
            descricao,
            data_vencimento,
            prioridade,
            categoria,
            status,
            etiquetas,
            user_id: id
        }

        await queryNovaTarefa(novaTarefa)

        return res.status(201).json({mensagem: "Nova tarefa criada com sucesso!"})
    } catch (error) {
        console.error("Ocorreu um erro ao cadastrar uma nova tarefa:", error)
    }
}

const listarTarefas = async (req,res) => {

    try {
        
        // LISTAR TAREFAS DO USUARIO LOGADO

        const {id} = req.usuario

        const tarefas = await queryTarefas(id)

        if (!tarefas) {
            return res.status(404).json({mensagem: 'Nenhuma tarefa encontrada'})
        }

        return res.status(200).json(tarefas)
    } catch (error) {
        console.error("Ocorreu um erro ao listar as tarefas:", error)
    }
}

const listarTarefaEspecifica = async (req,res) => {
    const {id} = req.params

    try {
        const tarefa = await queryTarefaEspecifica(id)

        if (!tarefa) {
            return res.status(404).json({mensagem: 'Nenhuma tarefa encontrada'})
        }

        return res.status(200).json(tarefa)
    } catch (error) {
        console.error("Ocorreu um erro ao listar a tarefa Especifica:", error)
    }
}

const atualizarTarefa = async (req,res) => {
    const {titulo, descricao, data_vencimento, prioridade, categoria, status, etiquetas} = req.body
    const {id} = req.params

    try {
        const tarefa = queryBuscarTarefa(id)

        if (!tarefa) {
            return res.status(404).json({mensagem: 'Nenhuma tarefa encontrada'})
        }

        const camposAtualizados = {
            titulo,
            descricao,
            data_vencimento,
            prioridade,
            categoria,
            status,
            etiquetas
        }

        const tarefaAtualizda = await queryAtualizarTarefa(camposAtualizados)

        return res.status(200).json({mensagem: 'Tarefa atualizada com sucesso.', tarefa: tarefaAtualizda})        
    } catch (error) {
        console.error("Ocorreu um erro ao atualizar a tarefa:", error)
    }
}

const deletarTarefa = async (req,res) => {
    const {id} = req.params

    try {
        const tarefa = await queryBuscarTarefa(id)

        if (!tarefa) {
            return res.status(404).json({mensagem: 'Nenhuma tarefa encontrad'})
        }

        await queryDeletarTarefa(id)

    } catch (error) {
       console.error("Ocorreu um erro ao deletar a tarefa:", error)
    }
}

module.exports = {
    criarTarefa,
    listarTarefas,
    listarTarefaEspecifica,
    atualizarTarefa,
    deletarTarefa
}
