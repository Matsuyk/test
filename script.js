document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const query = document.getElementById("query").value;
    const videoResults = document.getElementById("videoResults");

    // Limpa os resultados anteriores (mas não a barra de pesquisa)
    videoResults.innerHTML = "";

    // Exibe o carregamento, se necessário
    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Carregando resultados...";
    videoResults.appendChild(loadingMessage);

    // Busca os vídeos nas plataformas
    fetchYoutudocument.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Impede o envio do formulário

    const query = document.getElementById("query").value; // Pega o valor da pesquisa
    const videoResults = document.getElementById("videoResults");

    // Limpa os resultados anteriores
    videoResults.innerHTML = "";

    // Exibe o carregamento, se necessário
    const loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Carregando resultados...";
    videoResults.appendChild(loadingMessage);

    // Chama as funções para buscar os vídeos
    fetchYoutube(query);
    fetchVimeo(query);
    fetchDailymotion(query);
});

function fetchYoutube(query) {
    const apiKey = "SUA_YOUTUBE_API_KEY"; // Substitua com sua chave da API
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;

    fetch(youtubeUrl)
        .then(response => response.json())
        .then(data => {
            const videoResults = document.getElementById("videoResults");
            videoResults.innerHTML = ""; // Limpa a mensagem de carregamento

            data.items.forEach(item => {
                const videoItem = document.createElement("div");
                videoItem.classList.add("video-item");

                const videoLink = document.createElement("a");
                videoLink.href = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                videoLink.target = "_blank"; // Abre em uma nova aba

                const thumbnail = item.snippet.thumbnails.medium.url;
                const title = item.snippet.title;

                videoLink.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                `;

                videoItem.appendChild(videoLink);
                videoResults.appendChild(videoItem);
            });
        })
        .catch(error => console.error("Erro ao buscar no YouTube:", error));
}

function fetchVimeo(query) {
    const vimeoUrl = `https://api.vimeo.com/videos?query=${encodeURIComponent(query)}&per_page=5`;
    const token = "SUA_VIMEO_API_TOKEN"; // Substitua com seu token da API

    fetch(vimeoUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const videoResults = document.getElementById("videoResults");

        data.data.forEach(item => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");

            const videoLink = document.createElement("a");
            videoLink.href = `https://vimeo.com/${item.uri.split('/')[2]}`;
            videoLink.target = "_blank"; // Abre em uma nova aba

            const thumbnail = item.pictures.sizes[2].link;
            const title = item.name;

            videoLink.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
            `;

            videoItem.appendChild(videoLink);
            videoResults.appendChild(videoItem);
        });
    })
    .catch(error => console.error("Erro ao buscar no Vimeo:", error));
}

function fetchDailymotion(query) {
    const dailymotionUrl = `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&limit=5`;

    fetch(dailymotionUrl)
        .then(response => response.json())
        .then(data => {
            const videoResults = document.getElementById("videoResults");

            data.list.forEach(item => {
                const videoItem = document.createElement("div");
                videoItem.classList.add("video-item");

                const videoLink = document.createElement("a");
                videoLink.href = `https://www.dailymotion.com/video/${item.id}`;
                videoLink.target = "_blank"; // Abre em uma nova aba

                const thumbnail = item.thumbnail_url;
                const title = item.title;

                videoLink.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                `;

                videoItem.appendChild(videoLink);
                videoResults.appendChild(videoItem);
            });
        })
        .catch(error => console.error("Erro ao buscar no Dailymotion:", error));
}
