document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const query = document.getElementById("query").value;
    const videoResults = document.getElementById("videoResults");

    // Limpa os resultados anteriores
    videoResults.innerHTML = "";

    // Busca no YouTube
    fetchYoutube(query);
    // Busca no Vimeo
    fetchVimeo(query);
    // Busca no Dailymotion
    fetchDailymotion(query);
});

function fetchYoutube(query) {
    const apiKey = "SUA_YOUTUBE_API_KEY"; // Substitua com sua chave da API
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
    
    fetch(youtubeUrl)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoItem = document.createElement("div");
                videoItem.classList.add("video-item");
                videoItem.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                        <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                        <h3>${item.snippet.title}</h3>
                    </a>
                `;
                document.getElementById("videoResults").appendChild(videoItem);
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
        data.data.forEach(item => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item");
            videoItem.innerHTML = `
                <a href="https://vimeo.com/${item.uri.split('/')[2]}" target="_blank">
                    <img src="${item.pictures.sizes[2].link}" alt="${item.name}">
                    <h3>${item.name}</h3>
                </a>
            `;
            document.getElementById("videoResults").appendChild(videoItem);
        });
    })
    .catch(error => console.error("Erro ao buscar no Vimeo:", error));
}

function fetchDailymotion(query) {
    const dailymotionUrl = `https://api.dailymotion.com/videos?search=${encodeURIComponent(query)}&limit=5`;

    fetch(dailymotionUrl)
        .then(response => response.json())
        .then(data => {
            data.list.forEach(item => {
                const videoItem = document.createElement("div");
                videoItem.classList.add("video-item");
                videoItem.innerHTML = `
                    <a href="https://www.dailymotion.com/video/${item.id}" target="_blank">
                        <img src="${item.thumbnail_url}" alt="${item.title}">
                        <h3>${item.title}</h3>
                    </a>
                `;
                document.getElementById("videoResults").appendChild(videoItem);
            });
        })
        .catch(error => console.error("Erro ao buscar no Dailymotion:", error));
}
