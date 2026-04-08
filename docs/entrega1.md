# Entrega 1 – Modelagem e Arquitetura

## 1. Descrição do sistema
O Sistema de Gestão Comercial para Pequenos Negócios será desenvolvido para auxiliar o controle de uma loja de informática, permitindo o gerenciamento de clientes, produtos, vendas, usuários e relatórios.

## 2. Objetivo
Desenvolver um sistema web com autenticação, cadastro de clientes e produtos, registro de vendas, controle de estoque e emissão de relatórios.

## 3. Requisitos funcionais
- Cadastro de clientes
- Cadastro de produtos
- Registro de vendas
- Controle de estoque
- Login de usuários
- Controle de acesso por perfil
- Relatórios de vendas por período
- Relatórios de vendas por cliente
- Gráfico anual de vendas

## 4. Requisitos não funcionais
- Arquitetura em camadas
- API REST com retorno em JSON
- Banco de dados relacional
- Segurança com JWT
- Interface web com Django
- Senhas criptografadas
- Versionamento no GitHub
- Código organizado e manutenível

## 5. Arquitetura proposta
O sistema será organizado em camadas:
- Apresentação
- API/Controllers
- Serviços
- Persistência
- Banco de Dados

## 6. Padrões de projeto
- MVC
- Repository
- Service Layer

## 7. Diagrama de classes
O diagrama de classes contempla as entidades Usuario, Cliente, Produto, Venda e ItemVenda.

## 8. Diagrama lógico do banco
O banco será composto pelas tabelas usuarios, clientes, produtos, vendas e itens_venda.

## 9. Script de criação do banco
O script SQL está disponível na pasta `/sql`.

## 10. Repositório GitHub
[Link do repositório.](https://github.com/MateusMDPalma/sgc-pequenos-negocios)
