from rest_framework import serializers
from .models import Venda, ItemVenda

class ItemVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenda
        fields = ['produto', 'quantidade', 'preco_unitario', 'subtotal']


class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True)

    class Meta:
        model = Venda
        fields = ['id', 'data', 'cliente', 'usuario', 'valor_total', 'itens']
        read_only_fields = ['valor_total', 'data']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')

        if not itens_data:
            raise serializers.ValidationError("A venda deve ter pelo menos um item.")

        venda = Venda.objects.create(**validated_data, valor_total=0)

        valor_total = 0

        for item_data in itens_data:
            produto = item_data['produto']
            quantidade = item_data['quantidade']

            if quantidade <= 0:
                raise serializers.ValidationError("A quantidade do item deve ser maior que zero.")

            if produto.quantidade_estoque < quantidade:
                raise serializers.ValidationError(
                    f"Estoque insuficiente para o produto {produto.nome}."
                )

            preco_unitario = produto.preco
            subtotal = preco_unitario * quantidade

            ItemVenda.objects.create(
                venda=venda,
                produto=produto,
                quantidade=quantidade,
                preco_unitario=preco_unitario,
                subtotal=subtotal
            )

            produto.quantidade_estoque -= quantidade
            produto.save()

            valor_total += subtotal

        venda.valor_total = valor_total
        venda.save()

        return venda