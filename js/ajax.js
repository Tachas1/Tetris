window.addEventListener("DOMContentLoaded", () => {
    let ajax = new XMLHttpRequest()
    let method = "GET"
    let url = "./js/query.php"
    let async = true

    ajax.open(method, url, async)

    ajax.send()

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            console.log(data)

            let player_name
            let player_score
            let cell_name, cell_score
            for (let i = 0; i < data.length; i++) {
                player_name = data[i].player_name
                player_score = data[i].player_score

                cell_name = document.createElement('DIV')
                cell_name.textContent = player_name
                cell_score = document.createElement('DIV')
                cell_score.textContent = player_score
                cell_name.classList.add('high-cell')
                cell_score.classList.add('high-cell')
                document.querySelector('.score-container').appendChild(cell_name)
                document.querySelector('.score-container').appendChild(cell_score)
                console.log(player_name)
            }
        }
    }

    document.querySelector('#send').addEventListener('submit', event => {
        setTimeout(() => {
            event.preventDefault()

            ajax.open(method, url, async)

            ajax.send()

            ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let player_name
                    let player_score
                    let cell_name = document.querySelectorAll('.high-cell')
                    for (let i = 0; i < cell_name.length; i++) {
                        cell_name[i].remove()
                        console.log('usuwam');
                    }

                    let data = JSON.parse(this.responseText)
                    console.log(data)

                    for (let i = 0; i < data.length; i++) {
                        player_name = data[i].player_name
                        player_score = data[i].player_score

                        cell_name = document.createElement('DIV')
                        cell_name.textContent = player_name
                        cell_score = document.createElement('DIV')
                        cell_score.textContent = player_score
                        cell_name.classList.add('high-cell')
                        cell_score.classList.add('high-cell')
                        document.querySelector('.score-container').appendChild(cell_name)
                        document.querySelector('.score-container').appendChild(cell_score)
                        console.log(player_name)
                    }
                }
            }
        }, 30)
    })
})