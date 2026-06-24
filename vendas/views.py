from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Venda
from .serializers import VendaSerializer


class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=False, methods=['get'], url_path='relatorio-periodo')
    def relatorio_periodo(self, request):
        data_inicial = request.query_params.get('data_inicial')
        data_final = request.query_params.get('data_final')

        vendas = Venda.objects.all()

        if data_inicial and data_final:
            vendas = vendas.filter(data__date__range=[data_inicial, data_final])

        serializer = self.get_serializer(vendas, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='relatorio-cliente')
    def relatorio_cliente(self, request):
        cliente_id = request.query_params.get('cliente_id')

        vendas = Venda.objects.all()

        if cliente_id:
            vendas = vendas.filter(cliente_id=cliente_id)

        serializer = self.get_serializer(vendas, many=True)
        return Response(serializer.data)