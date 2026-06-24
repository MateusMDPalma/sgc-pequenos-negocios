const API = "http://127.0.0.1:8000/api";
let token = localStorage.getItem("token");

let carrinho = [];

function auth(){
    return {
        "Content-Type":"application/json",
        "Authorization":"Bearer " + token
    };
}

//////////////// CLIENTES //////////////////

async function carregarClientes(){

    const res = await fetch(API+"/clientes/",{headers:auth()});
    const data = await res.json();

    listaClientes.innerHTML="";
    clienteSelect.innerHTML="";

    data.forEach(c=>{
        listaClientes.innerHTML += `
        <li>${c.nome}</li>`;

        clienteSelect.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });
}

//////////////// 🔥 CLIENTE MELHORADO //////////////////

async function criarCliente(){

    const res = await fetch(API+"/clientes/",{
        method:"POST",
        headers:auth(),
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            email: document.getElementById("email").value
        })
    });

    if(res.ok){
        document.getElementById("nome").value="";
        document.getElementById("cpf").value="";
        document.getElementById("email").value="";
        carregarClientes();
    }else{
        alert("Erro ao criar cliente");
    }
}

//////////////// PRODUTOS //////////////////

async function carregarProdutos(){

    const res = await fetch(API+"/produtos/",{headers:auth()});
    const data = await res.json();

    listaProdutos.innerHTML="";
    produtoSelect.innerHTML="";

    data.forEach(p=>{
        listaProdutos.innerHTML += `
        <li>${p.nome} (Estoque: ${p.quantidade_estoque})</li>`;

        produtoSelect.innerHTML += `<option value="${p.id}">${p.nome}</option>`;
    });
}

//////////////// 🔥 PRODUTO MELHORADO //////////////////

async function criarProduto(){

    const res = await fetch(API+"/produtos/",{
        method:"POST",
        headers:auth(),
        body: JSON.stringify({
            nome: document.getElementById("nomeProduto").value,
            preco: parseFloat(document.getElementById("preco").value),
            quantidade_estoque: parseInt(document.getElementById("estoque").value)
        })
    });

    if(res.ok){
        document.getElementById("nomeProduto").value="";
        document.getElementById("preco").value="";
        document.getElementById("estoque").value="";
        carregarProdutos();
    }else{
        alert("Erro ao criar produto");
    }
}

//////////////// 🛒 CARRINHO //////////////////

function adicionarItem(){

    const produto = parseInt(produtoSelect.value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if(isNaN(quantidade) || quantidade <= 0){
        alert("Quantidade inválida");
        return;
    }

    carrinho.push({produto, quantidade});
    atualizarCarrinho();
}

function atualizarCarrinho(){

    const carrinhoEl = document.getElementById("carrinho");

    carrinhoEl.innerHTML = "";

    carrinho.forEach((item,index)=>{
        carrinhoEl.innerHTML += `
        <li>
            Produto ${item.produto} - Qtd: ${item.quantidade}
            <button onclick="removerItem(${index})">X</button>
        </li>`;
    });
}

function removerItem(index){
    carrinho.splice(index,1);
    atualizarCarrinho();
}

//////////////// VENDAS //////////////////

async function criarVenda(){

    if(carrinho.length === 0){
        alert("Adicione itens");
        return;
    }

    const res = await fetch(API+"/vendas/",{
        method:"POST",
        headers:auth(),
        body: JSON.stringify({
            cliente: parseInt(clienteSelect.value),
            itens: carrinho
        })
    });

    if(res.ok){
        alert("Venda registrada");
        carrinho = [];
        atualizarCarrinho();
        carregarVendas();
    }else{
        alert("Erro na venda");
    }
}

//////////////// HISTÓRICO //////////////////

async function carregarVendas(){

    const [vendasRes, clientesRes, produtosRes] = await Promise.all([
        fetch(API+"/vendas/",{headers:auth()}),
        fetch(API+"/clientes/",{headers:auth()}),
        fetch(API+"/produtos/",{headers:auth()})
    ]);

    const vendas = await vendasRes.json();
    const clientes = await clientesRes.json();
    const produtos = await produtosRes.json();

    listaVendas.innerHTML = "";

    vendas.forEach(v => {

        const cliente = clientes.find(c => c.id === v.cliente);

        let itensHTML = "";
        let total = 0;

        v.itens.forEach(i => {

            const produto = produtos.find(p => p.id === i.produto);
            const nomeProduto = produto ? produto.nome : "Produto";

            const preco = produto ? produto.preco : 0;
            const subtotal = preco * i.quantidade;

            total += subtotal;

            itensHTML += `
            ${nomeProduto} - Qtd: ${i.quantidade} - R$ ${subtotal.toFixed(2)}<br>`;
        });

        listaVendas.innerHTML += `
        <li style="margin-bottom:20px;">
            <b>Venda ${v.id}</b><br>
            Cliente: ${cliente ? cliente.nome : "?"}<br>
            ${itensHTML}
            <b>Total: R$ ${total.toFixed(2)}</b>
        </li>`;
    });
}

//////////////// NAVEGAÇÃO //////////////////

function mostrar(secao){

    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.getElementById(secao).style.display="block";

    if(secao==="clientes") carregarClientes();
    if(secao==="produtos") carregarProdutos();
    if(secao==="vendas"){
        carregarClientes();
        carregarProdutos();
        carregarVendas();
    }
}

//////////////// INIT //////////////////

window.onload = function(){
    mostrar("clientes");
};