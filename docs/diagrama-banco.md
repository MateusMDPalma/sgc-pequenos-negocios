# Diagrama Lógico do Banco

## usuarios
- id (PK)
- username
- senha
- perfil

## clientes
- id (PK)
- nome
- cpf (UNIQUE)
- email
- telefone
- endereco

## produtos
- id (PK)
- nome
- descricao
- preco
- quantidade_estoque
- estoque_minimo

## vendas
- id (PK)
- data
- valor_total
- cliente_id (FK -> clientes.id)
- usuario_id (FK -> usuarios.id)

## itens_venda
- id (PK)
- venda_id (FK -> vendas.id)
- produto_id (FK -> produtos.id)
- quantidade
- preco_unitario
- subtotal