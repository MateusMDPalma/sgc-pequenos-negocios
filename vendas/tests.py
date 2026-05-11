from django.test import TestCase
from django.contrib.auth.models import User
from clientes.models import Cliente
from produtos.models import Produto
from .models import Venda, ItemVenda

class VendaModelTest(TestCase):
    def setUp(self):
        self.usuario = User.objects.create_user(username='teste', password='123456')
        self.cliente = Cliente.objects.create(
            nome="Maria",
            cpf="11122233344",
            email="maria@email.com"
        )
        self.produto = Produto.objects.create(
            nome="Teclado",
            descricao="Teclado USB",
            preco=200.00,
            quantidade_estoque=5,
            estoque_minimo=1
        )

    def test_criar_venda(self):
        venda = Venda.objects.create(
            cliente=self.cliente,
            usuario=self.usuario,
            valor_total=400.00
        )

        item = ItemVenda.objects.create(
            venda=venda,
            produto=self.produto,
            quantidade=2,
            preco_unitario=200.00,
            subtotal=400.00
        )

        self.assertEqual(venda.valor_total, 400.00)
        self.assertEqual(item.quantidade, 2)
