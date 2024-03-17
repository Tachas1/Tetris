window.addEventListener("DOMContentLoaded", () => {
    const player_name = document.querySelector('#question')
    let score
    const user_query = document.querySelector('.player-query')

    document.querySelector('#send').addEventListener('submit', event => {
        score = parseInt(document.querySelector('#score_display').textContent)
        event.preventDefault()

        const error = validate()

        if (error === '') {
            sendByAjax()
        } else {
            // document.querySelector('.res').textContent = `${error}`
        }
        setTimeout(user_query.setAttribute('style', 'display: none'), 60)
    })

    function validate() {
        let err = ''
        if (player_name.value.length <= 3) {
            err = 'Nickname is too short!'
        }
        if (player_name.value.length === 0) {
            err = 'Nickname connot be empty!'
        }
        return err
    }

    function sendByAjax() {
        const xhr = new XMLHttpRequest()
        xhr.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                // document.querySelector('.res').textContent = `${this.responseText}`
            }
        }
        xhr.open('POST', './js/query-user.php', true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send('player_name=' + player_name.value + '&player_score=' + score)
    }
})