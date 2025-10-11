let lista = document.getElementById("lista");
let totalSpan = document.getElementById("total");

// ADICIONAR ITEM (não calcula aqui)
document.getElementById("adicionar").addEventListener("click", function () {
  let nome = document.getElementById("nome").value;
  let quantidade = parseInt(document.getElementById("quantidade").value);
  let preco = parseFloat(document.getElementById("preco").value);

  if (!nome || isNaN(quantidade) || isNaN(preco)) {
    alert("Preencha todos os campos");
    return;
  }

  let subtotal = quantidade * preco;
  let li = document.createElement("li");
  li.innerText = `${quantidade} x ${preco.toFixed(2)} = R$${subtotal.toFixed(2)}`;
  li.style.color = "green";

  // clique no item remove da lista (não recalcula automaticamente)
  li.addEventListener("click", function () {
    lista.removeChild(li);
  });

  lista.appendChild(li);

  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("preco").value = "";
});

// CALCULAR (só soma quando clicar aqui)
document.getElementById("calcular").addEventListener("click", function () {
  let itens = lista.getElementsByTagName("li");
  let total = 0;

  for (let i = 0; i < itens.length; i++) {
    // espera formato "... = R$<valor>"
    let valorTexto = itens[i].innerText.split("= R$")[1];
    total += parseFloat(valorTexto);
  }

  totalSpan.innerText = `Total: R$${total.toFixed(2)}`;
});

// LIMPAR (apaga lista e zera total)
document.getElementById("limpar").addEventListener("click", function () {
  lista.innerHTML = "";
  totalSpan.innerText = "Total: R$0.00";
});
