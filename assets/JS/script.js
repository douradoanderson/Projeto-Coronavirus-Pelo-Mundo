var elemento_pai = document.querySelector('select#paises');
var titulo = " ", texto = " ";

var P = document.querySelector("#resultP")
var NC = document.getElementById("#resultNC")
var CA = document.querySelector("#resultCA")
var CC = document.querySelector("#resultCC")
var CR = document.querySelector("#resultCR")
var TC = document.querySelector("#resultTC")
var NM = document.querySelector("#resultNM")
var TM = document.querySelector("#resultTM")

let buscas = []
var ultimaBusca = document.querySelector("#ultima-busca")

function mostrarAmzLocal(){
    localStorage.setItem('País e continente', buscas)
    ultimaBusca.innerHTML = buscas[buscas.length -1];
}

$("#limpar").click(function(event) {
    $("#paises").empty();
});

function verDados(){
fetch("https://covid-193.p.rapidapi.com/statistics", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "8e95a9ef0dmsh0ea0003b87891f3p109739jsn2ac19ca67290"
	}
})
.then(function(response) {
    return response.json();
})

.then(function(dados) {
    console.log(dados)
    let select = document.getElementById('language');
    let valor = select.options[select.selectedIndex].value;
    for(let y = 0; y <= 227; y++){
        if(dados.response[y].continent == valor){
        titulo = document.createElement('option');
        texto = document.createTextNode(dados.response[y].country);
        titulo.appendChild(texto);
        elemento_pai.appendChild(titulo);
        }
    }
});
}

function verResultado(){
    fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "8e95a9ef0dmsh0ea0003b87891f3p109739jsn2ac19ca67290"
        }
    })
    .then(function(response) {
        return response.json();
    })
    
    .then(function(dados) {
        console.log(dados)
        for(let y = 0; y <= 227; y++){
            let select = document.getElementById('paises');
            let valor = select.options[select.selectedIndex].value;
            if(dados.response[y].country == valor){
                let continenteDoPais = dados.response[y].continent
                let paisEscolhido = dados.response[y].country
                let populacao = JSON.stringify(dados.response[y].population)
                let casosAtivos = JSON.stringify(dados.response[y].cases.active)
                let casosCriticos = JSON.stringify(dados.response[y].cases.critical)
                let casosRecuperados = JSON.stringify(dados.response[y].cases.recovered)
                let totalDeCasos = JSON.stringify(dados.response[y].cases.total)
                let totalDeMortes = JSON.stringify(dados.response[y].deaths.total)
                resultP.innerHTML =  populacao;
                resultCA.innerHTML = casosAtivos;
                resultCC.innerHTML = casosCriticos;
                resultCR.innerHTML = casosRecuperados;
                resultTC.innerHTML = totalDeCasos;
                resultTM.innerHTML = totalDeMortes;
                buscas.push("→" + ". País: " + paisEscolhido + "-  Continente: " + continenteDoPais)

                console.log(buscas)
            }
        }
    });
}
