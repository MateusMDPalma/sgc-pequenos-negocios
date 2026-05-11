from django.test import TestCase
from .models import Cliente

class ClienteModelTest(TestCase):
    def test_criar_cliente(self):
        cliente = Cliente.objects.create(
            nome="João Silva",
            cpf="12345678900",
            email="joao@email.com",
            telefone="61999999999",
            endereco="Rua A, 123"
        )
        self.assertEqual(cliente.nome, "João Silva")
