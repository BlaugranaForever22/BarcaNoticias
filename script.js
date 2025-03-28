async function getScores() {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: { 'X-Auth-Token': '639e852a5ba3466ab307ccb759633990' }
        });
        if (!response.ok) {
            throw new Error('Problema con la API: ' + response.status);
        }
        const data = await response.json();
        
        const barcaGames = data.matches.filter(game => 
            game.homeTeam.name === "FC Barcelona" || game.awayTeam.name === "FC Barcelona"
        );
        
        const scores = document.getElementById('scores');
        if (barcaGames.length > 0) {
            scores.innerHTML = barcaGames.map(game => 
                game.homeTeam.name + " " + (game.score.fullTime.home || '-') + " - " + (game.score.fullTime.away || '-') + " " + game.awayTeam.name
            ).join('<br>');
        } else {
            scores.innerHTML = "El FC Barcelona no juega hoy. ¡Próximo partido el domingo 30 de marzo!";
        }
    } catch (error) {
        document.getElementById('scores').innerHTML = "Error: " + error.message;
    }
}

getScores();