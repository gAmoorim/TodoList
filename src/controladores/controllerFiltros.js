const knex = require('../database/conexao')

const filtros = async (req,res) => {
    const {status, categoria, data_vencimento, search} = req.query

    try {
        let query = knex('tarefas').select('*')

        if (status) {
            query.where("status", status)
        }

        if (categoria) {
            query.where('categoria', categoria)
        }

        if (data_vencimento) {
            query.where('data_vencimento', data_vencimento)
        }

        if (search) {
            query.where(function () {
                this.where("title", "ilike", `%${search}%`)
                    .orWhere("description", "ilike", `%${search}%`);
            })
        }

        const tasks = await query;
        res.json(tasks);

    } catch (error) {
        console.error("Ocorreu um erro ao cadastrar uma nova tarefa:", error)
    }
}

module.exports = {
    filtros
}