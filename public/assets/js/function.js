let checkmark = document.getElementsByClassName("checkmark")[0];
let check = document.getElementById("a");

try{
    checkmark.addEventListener("click", () => {
        if(checkmark.classList.contains("clicado")){
            checkmark.classList.remove("clicado");
            check.checked = false;
        }
        else{
            checkmark.classList.add("clicado");
            check.checked = true;
        }
    });
} catch(e){

}

try{
    let tabs = document.getElementsByClassName("nav-link");
    let panels = document.getElementsByClassName("tab-pane");
    
    for(let i = 0; i < tabs.length; i++){
        tabs[i].addEventListener("click", () => {
            let tabActive = document.getElementsByClassName("nav-link active")[0];
            let panelActive = document.getElementsByClassName("tab-pane active")[0];
    
            let tabSelect = tabs[i];
            let panelSelect = panels[i];
    
            tabActive.classList.remove("active");
            panelActive.classList.remove("show");
            panelActive.classList.remove("active");
    
            tabSelect.classList.add("active");
            panelSelect.classList.add("show");
            panelSelect.classList.add("active");
        });
    }

    let menuToggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    menuToggle.onclick = function(){
      menuToggle.classList.toggle('active');
      navigation.classList.toggle('active');
    }
}catch(e){

}

function preencherTabela(colunas, tabela, dados){
    var tbody = document.getElementById(tabela);
    dados.forEach(dado => {
        var tr = tbody.querySelector("tr[data-gs-"+tabela+"-id='"+dado.id+"']") ?? document.createElement("tr");
        tr.dataset.gsTabelaId = dado.id;
    
        for(let i = 0; i < colunas.length; i++){
            let td = tr.querySelector("td[data-gs-id="+colunas[i]+"]") ?? document.createElement("td");
            td.dataset.gsId = colunas[i];
            td.textContent = dado[colunas[i]];

            if(dado[colunas[i]] instanceof Object) {
                let td = tr.querySelector("td[data-gs-id="+colunas[i]+"]") ?? document.createElement("td");
                td.dataset.gsId = colunas[i];

                let span = document.createElement("span");
                span.classList.add("badge");
                span.style.backgroundColor = dado["status"].cor+"80";
                span.style.color = "black";
                span.textContent = dado["status"].descricao;

                td.appendChild(span);

                tr.appendChild(td);
                continue;
            }
            
            tr.appendChild(td);
        }
    
        tr.appendChild(createActionButtons(tr, tabela));

        tbody.appendChild(tr);
    });
}

function preencherSelect(select, dados){
    select = document.getElementById(select);
    for(var i = 0; i < dados.length; i++) {
        var option = document.createElement("option");
        option.value = dados[i].id;
        option.textContent = dados[i].descricao;

        select.append(option);
    }
}

function createActionButtons(tr, tabela){
    var tdAcoes = tr.querySelector("td[data-gs-acoes]") ?? document.createElement("td");
    tdAcoes.dataset.gsId = "acoes";

    var editButton = document.createElement("a");
    editButton.classList.add("btn", "btn-warning", "btn-sm");
    editButton.dataset.toggle = "tooltip";
    editButton.title = "Editar";
    editButton.href = "javascript:void(0)";
    editButton.dataset.type = "crud-edit";
    editButton.dataset.href = ""; //Aqui tem que ficar a url para editar
    editButton.addEventListener("click", () => {
        $(document.querySelector("#modal-"+tabela.replace(/_/gi, "-"))).modal("show");
    });

    var lapis = document.createElement("i");
    lapis.classList.add("bi", "bi-pen");
    editButton.appendChild(lapis);

    var deleteButton = document.createElement("a");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.dataset.toggle = "tooltip";
    deleteButton.title = "Excluir";
    deleteButton.href = "javascript:void(0)";
    deleteButton.dataset.type = "crud-delete";
    deleteButton.dataset.href = ""; //Aqui tem que ficar a url do delete
    deleteButton.addEventListener("click", (event) => {
        $(document.querySelector("#modal-delete")).modal("show");
    });

    var lixo = document.createElement("i");
    lixo.classList.add("bi", "bi-trash");
    deleteButton.appendChild(lixo);

    tdAcoes.innerHTML = "";
    tdAcoes.appendChild(editButton);
    tdAcoes.appendChild(deleteButton);

    return tdAcoes;
}

document.querySelectorAll("button[data-dismiss]").forEach(button => {
    button.addEventListener("click", () => {
        $(document.querySelector("#modal-delete")).modal("hide");
        $(document.querySelector("#modal-tipos-status")).modal("hide");
        $(document.querySelector("#modal-novo-tipo-status")).modal("hide");
        $(document.querySelector("#modal-novo-status")).modal("hide");
        $(document.querySelector("#modal-status-list")).modal("hide");
        $(document.querySelector("#modal-ambientes-list")).modal("hide");
        $(document.querySelector("#modal-novo-ambiente")).modal("hide");
    });
});

document.getElementById("novo-tipo-status").addEventListener("click", () => {
    $(document.querySelector("#modal-novo-tipo-status")).modal("show");
});

document.getElementById("novo-status").addEventListener("click", () => {
    $(document.querySelector("#modal-novo-status")).modal("show");
});

document.getElementById("novo-ambiente").addEventListener("click", () => {
    $(document.querySelector("#modal-novo-ambiente")).modal("show");
});