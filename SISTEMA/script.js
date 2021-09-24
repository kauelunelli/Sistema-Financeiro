let dateState = "automatic";
let transactions = []
let contador = -1

function id(item) {
    return document.getElementById(item)
}
function indexGenerator() {
    contador += 1
    return contador
}
function defineTransactions() {
    for (child of (id("form-list")).children){
        child.remove();
    }
    for ( n = transactions.length - 1; n > -1 ; n-= 1){
            id("form-list").innerHTML += transactions[n];
    })
    }
}
function atualizarSaldo(){
    let receitas = document.querySelector("#money-plus").textContent
    let despesas = document.querySelector("#money-minus").textContent
    receitas = parseFloat(receitas)
    despesas = parseFloat(despesas)
    let total = receitas - despesas
    let balance = document.querySelector("#balance")
    if (total < 0) {
        balance.innerHTML = `R$ ${total.toFixed(2)}`
        document.getElementById("balance").style.color = "#bd3838"   
    }
    else{
        balance.innerHTML = `R$ ${total.toFixed(2)}`
        document.getElementById("balance").style.color = "rgb(28, 151, 28)"
    }
}
//Sistema de datas

function activeDate() {
    id("input-date").style.display = "initial";
}
function disableDate() {
    id("input-date").style.display = "none";
}

id("date-manual").onchange = function() {
    if (document.getElementById("date-manual").checked) {
        activeDate()
        dateState = "manual"
    }
}
id("date-automatic").onchange = function() {
    if (id("date-automatic").checked){
        disableDate()
        dateState = "automatic"
    }
}
function takeDayMonth() {
    let currentDate = new Date()
    let localDate = currentDate.toLocaleDateString()
    let localDayMonth = ''
    for (n=0; n < localDate.length - 5; n+=1) {
        localDayMonth += `${localDate[n]}`
    }
    return localDayMonth
}
function manualDayMonth() {
    let date = id("input-date").value
    let finalDate = ""
    for (n=5;n < date.length ; n += 1){
            finalDate += date[n]
        }
    return finalDate
}
function returnDateManual() {
    let finalDate = manualDayMonth()
    let day = `${finalDate[3]}${finalDate[4]}`
    let month = `${finalDate[0]}${finalDate[1]}`
    let date = day + "/" + month
    return date
}

//Sistema de transação

function tipoDespesaTroca() {
    let tipo = id("icon-transaction").getAttribute("type")
    if ( tipo == "income") {
        id("icon-plus").setAttribute("style","display: none;")
        id("icon-expense").setAttribute("style","display: initial;")
        id("icon-transaction").setAttribute("type","expense")
        id("amount-value").setAttribute("placeholder","Valor da Despesa")
    }
    else if ( tipo == "expense") {
        id("icon-expense").setAttribute("style","display: none;")
        id("icon-plus").setAttribute("style","display: initial;")
        id("icon-transaction").setAttribute("type","income")
        id("amount-value").setAttribute("placeholder","Valor da Receita")
    }
}
id("icon-transaction").onclick = function() {tipoDespesaTroca()}

function adicionarTransacao(){
    let transacaoNome = id("input-name").value
    let transacaoValor = id("amount-value").value
    let dayMonth= ""
    let manual = ""
    if (transacaoValor <= "0") {
        alert("Informe um valor válido")
        id("amount-value").value = ''
        return false
    }
    if (( dateState == "manual") && (id("input-date").value == "")) {
        alert("Informe uma data")
        return false
    }
    if (transacaoNome == "") {
        alert("Informe um nome")
        return false
    }
    if (dateState == "automatic") {
        dayMonth = takeDayMonth()
    }
    else {
        dayMonth = returnDateManual()
    }
    if (( transacaoValor != '') && (transacaoNome != '')) {
        let tipo = id("icon-transaction").getAttribute("type")
        let despesa = id("money-minus").textContent
        let receita = id("money-plus").textContent
        let valorTipo = ""
        let transacaoTipo = ""
        despesa = parseFloat(despesa)
        receita = parseFloat(receita)
        
        if (tipo == "expense"){
            valorTipo = "expense-value"
            transacaoTipo = "tipo-despesa"
            // id("form-list").innerHTML += transacaoCompleta 
            transacaoValor = parseFloat(transacaoValor)
            let total = despesa + transacaoValor
            total = total.toFixed(2)
            id("money-minus").innerHTML = total
        }
        else if (tipo == "income") {
            valorTipo = "income-value"
            transacaoTipo = "tipo-receita"
            // id("form-list").innerHTML += transacaoCompleta
            transacaoValor = parseFloat(transacaoValor)
            let total = receita + transacaoValor
            total = total.toFixed(2)
            id("money-plus").innerHTML = total
        }
        let iden = indexGenerator()
        let transacaoCompleta = `<div class="transaction"><svg id="${iden}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg><p class="date-transaction">${dayMonth}</p><p class="name-transaction">${transacaoNome}</p><p class="value-transaction ${valorTipo}">${transacaoValor}</p><div class="type-transaction ${transacaoTipo}"></div>`
        transactions.push(transacaoCompleta)
        atualizarSaldo()
        defineTransactions()
        id("input-name").value = ''
        id("amount-value").value = ''
        id("input-date").value = ''
    }
}
id("button").onclick = function() {adicionarTransacao()}