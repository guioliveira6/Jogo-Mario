let engine = {
    "cores": ['green','purple','red','black','yellow','orange','grey'],
    "hexadecimais": {
        'green': '#02EF00',
        'purple': '#790093',
        'red': '#E90808',
        'yellow': '#E7D703',
        'black': '#141414',
        'orange': '#f16529',
        'grey': '#ebebeb',
    },
    "moedas": 0
}

const audioMoeda = new Audio('./audio/moeda.mp3')
const somErrou = new Audio('./audio/errou.mp3')


function sortearEAtualizarCor() {
    let indexCorSorteada = Math.floor(Math.random() * engine.cores.length)
    let corNaCaixa = document.getElementById('cor-na-caixa')
    let caixaCor = document.getElementById('cor-atual')

    corNaCaixa.innerText = engine.cores[indexCorSorteada].toUpperCase()
    caixaCor.style.backgroundColor = `${engine.hexadecimais[engine.cores[indexCorSorteada]]}` 
    caixaCor.style.backgroundImage = "url('./img/caixa-fechada.png')"
    caixaCor.style.backgroundSize = '100%'
}

function atualizarPontuacao(valor) {
    var pontuacao = document.getElementById('nmrMoedas')

    engine.moedas += valor

    if (valor < 0) {
        somErrou.play()
        sortearEAtualizarCor()
    } else{ 
        audioMoeda.play()
        sortearEAtualizarCor()
    }
    pontuacao.innerText = engine.moedas
}

sortearEAtualizarCor()


//api de reconhecimento de voz!!!!
var btnGravador = document.getElementById('btnResponder')
var transcricaoAudio = ""

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    var gravador = new SpeechAPI()

    gravador.continuos = false
    gravador.lang = "en-US"

    gravador.onstart = function() {
        btnGravador.innerText = "Estou ouvindo!"

        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black"
    }

    gravador.onend = function() {
        btnGravador.innerText = "RESPONDER"
        btnGravador.style.backgroundColor = "transparent"
        btnGravador.style.color = "white"
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase()
        corParaAdivinhar = document.getElementById('cor-na-caixa').innerText.toUpperCase()

        console.log(transcricaoAudio)
        console.log(corParaAdivinhar)

        if (transcricaoAudio === corParaAdivinhar) {
            atualizarPontuacao(1)
        } else {
            atualizarPontuacao(-1)
        }
    }

} else {
    alert('Navegador nao tem suporte.')
}


btnGravador.addEventListener('click', function(e) {
    gravador.start()
})