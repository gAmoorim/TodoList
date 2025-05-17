create database listade_tarefas;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table tarefas (
  id serial primary key,
  titulo VARCHAR(255),
  descricao TEXT,
  data_vencimento TIMESTAMP,
  prioridade VARCHAR(200),   --('baixa', 'média', 'alta')
  categoria VARCHAR(100),
  status VARCHAR(100),  --('pendente', 'concluída')
  etiquetas JSON,
  user_id INT REFERENCES usuarios(id) ON DELETE CASCADE
);
