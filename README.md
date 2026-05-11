# Sistema de Gestão Comercial para Pequenos Negócios

Projeto acadêmico desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas.

## Funcionalidades implementadas
- CRUD de clientes
- CRUD de produtos
- Registro de vendas
- Controle de estoque
- Relatório de vendas por período
- Relatório de vendas por cliente
- Painel administrativo Django
- Testes básicos

## Tecnologias utilizadas
- Python
- Django
- Django REST Framework
- SQLite

## Como executar o projeto

### 1. Ativar o ambiente virtual
```bash
source venv/bin/activate
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

### 3. Aplicar migrations
```bash
python3 manage.py migrate
```

### 4. Rodar o servidor
```bash
python3 manage.py runserver
```

### 5. Rodar os testes
```bash
python3 manage.py test
```

## Endpoints principais
- `/api/clientes/`
- `/api/produtos/`
- `/api/vendas/`
- `/api/vendas/relatorio-periodo/?data_inicial=2026-05-01&data_final=2026-05-31`
- `/api/vendas/relatorio-cliente/?cliente_id=1`

## Admin
- `/admin/`

## Integrantes
- Mateus
