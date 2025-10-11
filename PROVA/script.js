    let tbody = document.getElementById("tbody");
    let totalEl = document.getElementById("total");
    let inpDesc = document.getElementById("descricao");
    let inpValor = document.getElementById("valor");
    let selCat = document.getElementById("categoria");
    let btnAdd = document.getElementById("adicionar");

    let total =0;

    btnAdd.addEventListener("click", function (){
        let desc = inpDesc.value
        let valStr = inpValor.value
        let cat = selCat.value

        if(!desc || valStr ==="" || isNaN(parseFloat(valStr))){
            alert("Preencha descrição e valor.")
            return;
        }
        let valor = parseFloat(valStr);

        let tr = document.createElement("tr")
        tr.dataset.valor = String(valor);

        let td1 =document.createElement("td")
        td1.textContent= desc;
        let td2 = document.createElement("td")
        td2.textContent=cat;
        let td3 = document.createElement("td")
        td3.textContent=valor.toFixed(2)
        let td4 = document.createElement("td")
        let rm =  document.createElement("button")
        rm.textContent = "Remover";
        rm.addEventListener("click", function(){
            total -= parseFloat(tr.dataset.valor || "0")
            tbody.removeChild(tr);
            atualiza();
        });
        td4.appendChild(rm);
        tr.appendChild(td1); 
        tr.appendChild(td2); 
        tr.appendChild(td3); 
        tr.appendChild(td4);
        tbody.appendChild(tr);

        total += valor;
        atualizar();

        inpDesc.value = "";
        inpValor.value = "";
        selCat.selectedIndex =0;
    });