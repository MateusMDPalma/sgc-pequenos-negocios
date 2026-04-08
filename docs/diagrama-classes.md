# Diagrama de Classes

## Classes principais

### Usuario
- id
- username
- senha
- perfil

### Cliente
- id
- nome
- cpf
- email
- telefone
- endereco

### Produto
- id
- nome
- descricao
- preco
- quantidade_estoque
- estoque_minimo

### Venda
- id
- data
- valor_total
- cliente
- usuario_responsavel

### ItemVenda
- id
- venda
- produto
- quantidade
- preco_unitario
- subtotal

## Relacionamentos
- Um cliente pode possuir várias vendas
- Um usuário pode registrar várias vendas
- Uma venda possui vários itens
- Um produto pode estar em vários itens de venda