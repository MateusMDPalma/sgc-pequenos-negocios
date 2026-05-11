from django.db import models
from clientes.models import Cliente
from produtos.models import Produto
from django.contrib.auth.models import User


class Venda(models.Model):
    data = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, related_name='vendas')
    usuario = models.ForeignKey(User, on_delete=models.PROTECT)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"Venda {self.id}"


class ItemVenda(models.Model):
    venda = models.ForeignKey(Venda, on_delete=models.CASCADE, related_name='itens')
    produto = models.ForeignKey(Produto, on_delete=models.PROTECT)
    quantidade = models.IntegerField()
    preco_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Item {self.id} - Venda {self.venda.id}"
