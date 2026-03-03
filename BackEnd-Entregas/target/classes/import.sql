-- Criando Funcionário para teste de Login
INSERT INTO usuario (nome, login, senha, perfil, apartamento, bloco) VALUES ('Marcos Oliveira', 'marcos', '123', 'FUNCIONARIO', null, null);

-- Criando Moradores para teste de Encomendas
INSERT INTO usuario (nome, login, senha, perfil, apartamento, bloco) VALUES ('Ana Souza', 'ana', '123', 'MORADOR', '102', 'A');
INSERT INTO usuario (nome, login, senha, perfil, apartamento, bloco) VALUES ('Bruno Alves', 'bruno', '123', 'MORADOR', '504', 'C');

-- Criando algumas encomendas que já estão na prateleira
INSERT INTO encomenda (morador, apartamento, bloco, descricao, data_chegada, entregue) VALUES ('Ana Souza', '102', 'A', 'Pacote Amazon', 'Hoje, 08:30', false);
INSERT INTO encomenda (morador, apartamento, bloco, descricao, data_chegada, entregue) VALUES ('Bruno Alves', '504', 'C', 'Mercado Livre', 'Hoje, 10:15', false);