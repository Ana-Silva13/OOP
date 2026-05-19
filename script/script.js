class Foto{
    constructor(url, legenda, lat, lon){
        this.url = url;
        this.legenda = legenda;
        this.localizacao = { lat, lon };
        this.dataCriacao = new Date();
    }

    obterCoordenadas(){
        const lat = isNaN(this.localizacao.lat) ? '—' : this.localizacao.lat.toFixed(2);
        const lon = isNaN(this.localizacao.lon) ? '—' : this.localizacao.lon.toFixed(2);
        return { lat, lon };
    }

    get resumo(){
        return `${this.legenda} - Capturada em: ${this.dataCriacao.toLocaleString()}`;
    }
}

const btn = document.querySelector("#btn-adicionar");
const galeria = document.querySelector("#galeria");

btn.addEventListener('click', ()=>{
    const url = document.querySelector("#ipt-url").value.trim();
    const legenda = document.querySelector("#ipt-legenda").value.trim();
    const latInput = document.querySelector("#ipt-lat").value.trim();
    const lonInput = document.querySelector("#ipt-lng").value.trim();

    const lat = latInput === '' ? NaN : parseFloat(latInput);
    const lon = lonInput === '' ? NaN : parseFloat(lonInput);

    if(!url || !legenda) {
        return alert("Por favor, insira a URL e a legenda.");
    }

    if(!url.startsWith('http://') && !url.startsWith('https://')) {
        return alert("URL inválida. Use http:// ou https://");
    }

    const novaFoto = new Foto(url, legenda, lat, lon);
    const coordenadas = novaFoto.obterCoordenadas();

    const card = document.createElement("div");
    card.className = 'card-foto';

    card.innerHTML = `
        <img src="${novaFoto.url}" 
            alt="${novaFoto.legenda}" 
            onerror="this.src='https://via.placeholder.com/280x200?text=Imagem+nao+encontrada'" />

        <div class="card-info">
            <h3>${novaFoto.legenda}</h3>
            <p>${novaFoto.resumo}</p>
        </div>

        <div class="card-footer">
            <div class="coord-item">Lat: ${coordenadas.lat}</div>
            <div class="coord-item">Lon: ${coordenadas.lon}</div>
        </div>
    `;

    galeria.prepend(card);

    document.querySelectorAll('.form-card input').forEach(i=> i.value = "");
});

const btnLocalizacao = document.querySelector("#btn-localizacao");

if (btnLocalizacao) {
    btnLocalizacao.addEventListener("click", () => {
        if (!navigator.geolocation) {
            return alert("Geolocalização não é suportada pelo seu navegador.");
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            document.querySelector("#ipt-lat").value = pos.coords.latitude;
            document.querySelector("#ipt-lng").value = pos.coords.longitude;
        }, () => {
            alert("Não foi possível obter localização");
        });
    });
}


