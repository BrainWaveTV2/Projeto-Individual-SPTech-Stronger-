CREATE DATABASE IF NOT EXISTS progressao_carga;
USE progressao_carga;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    unidade CHAR(2) NOT NULL,
    agachamento FLOAT NOT NULL,
    supino FLOAT NOT NULL,
    overhead FLOAT NOT NULL,
    deadlift FLOAT NOT NULL,
    peso FLOAT NOT NULL,
    CONSTRAINT chkModelo CHECK (modelo IN ('Powerlifter')),
    CONSTRAINT chkNivel CHECK (nivel IN ('Iniciante', 'Intermediário', 'Avançado')),
    CONSTRAINT chkUnidade CHECK (unidade IN ('kg', 'lb'))
);

-- usuários de teste para o login
INSERT INTO usuario (nome, email, senha, modelo, nivel, unidade, agachamento, supino, overhead, deadlift, peso) VALUES
('Teste', 'teste@teste.com', '123456', 'Powerlifter', 'Intermediário', 'kg', 140, 100, 60, 180, 85),
('Ana', 'ana@teste.com', 'abc123', 'Powerlifter', 'Iniciante', 'lb', 185, 115, 75, 225, 140);

SELECT * FROM usuario;
