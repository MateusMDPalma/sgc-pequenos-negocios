from django.test import TestCase
from .models import Produto

class ProdutoModelTest(TestCase):
    def test_criar_produto(self):
        produto = Produto.objects.create(
            nome="Mouse Gamer",
            descricao="Mouse com fio",
            preco=100.00,
            quantidade_estoque=10,
            estoque_minimo=2
        )
        self.assertEqual(produto.nome, "Mouse Gamer")
