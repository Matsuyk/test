document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const query = document.getElementById("query").value;
    const platform = document.getElementById("platform").value;
    let searchUrl = "";

    switch(platform) {
        case "youtube":
            searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            break;
        case "vimeo":
            searchUrl = `https://vimeo.com/search?q=${encodeURIComponent(query)}`;
            break;
        case "dailymotion":
            searchUrl = `https://www.dailymotion.com/search/${encodeURIComponent(query)}`;
            break;
    }

    // Redireciona para a plataforma de vídeo escolhida
    window.open(searchUrl, "_blank");
});
