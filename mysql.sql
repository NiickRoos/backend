DROP SCHEMA IF EXISTS `Bancojuridico`;

CREATE SCHEMA IF NOT EXISTS `Bancojuridico` DEFAULT CHARACTER SET utf8;
USE `Bancojuridico`;

CREATE TABLE IF NOT EXISTS `Clientes` (
  `idClientes` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(140) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `documentos` VARCHAR(48) NOT NULL,
  `tipo_de_documento` ENUM('CPF', 'CNPJ') NOT NULL,
  `endereco` VARCHAR(200) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idClientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `Advogados` (
  `idAdvogados` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `oab` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefone` VARCHAR(30) NOT NULL,
  `especialidade` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idAdvogados`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE IF NOT EXISTS `Processos` (
  `idprocessos` INT(11) NOT NULL AUTO_INCREMENT,
  `numero_processo` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `status` ENUM('Em andamento', 'Finalizado', 'Arquivado') NOT NULL,
  `data_abertura` DATE NOT NULL,
  `data_encerramento` DATE NULL DEFAULT NULL,
  `area` ENUM('Direito Civil', 'Direito Penal', 'Direito Trabalhista', 'Direito Empresarial') NOT NULL,
  `Clientes_idClientes` INT(11) NOT NULL,
  `Advogados_idAdvogados` INT(11) NOT NULL,
  PRIMARY KEY (`idprocessos`),
  INDEX `fk_processos_Clientes_idx` (`Clientes_idClientes` ASC),
  INDEX `fk_processos_Advogados1_idx` (`Advogados_idAdvogados` ASC),
  CONSTRAINT `fk_processos_Clientes`
    FOREIGN KEY (`Clientes_idClientes`) REFERENCES `Clientes` (`idClientes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_processos_Advogados1`
    FOREIGN KEY (`Advogados_idAdvogados`) REFERENCES `Advogados` (`idAdvogados`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




INSERT INTO Clientes (
  nome,
  email,
  telefone,
  tipo_de_documento,
  documentos,
  endereco,
  estado
) VALUES
('João da Silva', 'joao@email.com', '11999990000', 'CPF', '123.456.789-00', 'Rua A, 123', 'SP'),
('Empresa XPTO Ltda', 'contato@xpto.com', '1133445566', 'CNPJ', '12.345.678/0001-99', 'Av. Empresarial, 1000', 'RJ'),
('Maria Oliveira', 'maria.oliveira@email.com', '11988887777', 'CPF', '987.654.321-00', 'Rua B, 456', 'MG'),
('Construtora Alfa Ltda', 'contato@alfa.com', '1133557799', 'CNPJ', '22.333.444/0001-55', 'Av. Construção, 234', 'RS'),
('Pedro Gomes', 'pedro.gomes@mail.com', '11955554444', 'CPF', '321.654.987-12', 'Rua das Laranjeiras, 89', 'SP'),
('Tech Solutions Ltda', 'contato@techsolutions.com', '1133221100', 'CNPJ', '55.666.777/0001-88', 'Rua da Tecnologia, 500', 'SC'),
('Ana Paula Souza', 'ana.souza@email.com', '11944443333', 'CPF', '741.852.963-00', 'Av. Central, 101', 'BA'),
('Farmácia Vida', 'contato@farmaciavida.com', '1133667788', 'CNPJ', '33.444.555/0001-22', 'Rua Saúde, 777', 'PE');

INSERT INTO Advogados (
  nome,
  oab,
  email,
  telefone,
  especialidade
) VALUES
('Carlos Eduardo Silva', '12345', 'carlos.silva@adv.com', '11987654321', 'Direito Civil'),
('Mariana Oliveira', '67890', 'mariana.oliveira@adv.com', '11998765432', 'Direito Penal'),
('Paulo Santos', '54321', 'paulo.santos@adv.com', '11977776666', 'Direito Trabalhista'),
('Ana Paula', '98765', 'ana.paula@adv.com', '11966665555', 'Direito Empresarial'),
('Lucas Fernandes', '11223', 'lucas.fernandes@adv.com', '11955557777', 'Direito Tributário'),
('Fernanda Lima', '33445', 'fernanda.lima@adv.com', '11944446666', 'Direito Ambiental'),
('Ricardo Matos', '55667', 'ricardo.matos@adv.com', '11933335555', 'Direito Penal'),
('Beatriz Costa', '77889', 'beatriz.costa@adv.com', '11922224444', 'Direito Civil');

INSERT INTO Processos (
  numero_processo,
  descricao,
  status,
  data_abertura,
  data_encerramento,
  area,
  Clientes_idClientes,
  Advogados_idAdvogados
) VALUES
('2025-CIV-001', 'Ação de indenização por danos morais movida por João da Silva.', 'Em andamento', '2025-07-01', NULL, 'Direito Civil', 1, 1),
('2025-PEN-002', 'Defesa criminal de Maria Oliveira por crime de trânsito.', 'Finalizado', '2025-05-15', '2025-06-20', 'Direito Penal', 3, 2),
('2025-TRAB-003', 'Processo trabalhista contra Construtora Alfa Ltda.', 'Arquivado', '2024-11-30', '2025-01-15', 'Direito Trabalhista', 4, 3),
('2025-EMP-004', 'Consultoria para contrato empresarial da Empresa XPTO Ltda.', 'Em andamento', '2025-03-10', NULL, 'Direito Empresarial', 2, 4),

('2025-EMP-005', 'Revisão tributária para Tech Solutions Ltda.', 'Em andamento', '2025-06-20', NULL, 'Direito Empresarial', 6, 5), 
('2025-EMP-006', 'Ação ambiental movida por Ana Paula Souza.', 'Finalizado', '2025-04-01', '2025-05-30', 'Direito Empresarial', 7, 6), 

('2025-CIV-007', 'Cobrança judicial contra Farmácia Vida.', 'Em andamento', '2025-07-05', NULL, 'Direito Civil', 8, 8),
('2025-PEN-008', 'Defesa criminal para Pedro Gomes.', 'Arquivado', '2024-12-15', '2025-02-10', 'Direito Penal', 5, 7);


