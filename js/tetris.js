const BACKGROUND_BLOCKS = 200
const BOARD_WIDTH = 10
const NEXT_BOARD_WIDTH = 4

const L_Shape = [
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, 2],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 2],
    [BOARD_WIDTH * 2, 1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1],
    [BOARD_WIDTH, BOARD_WIDTH * 2, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 2 + 2]
]
const S_Shape = [
    [BOARD_WIDTH, BOARD_WIDTH + 1, 1, 2],
    [0, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1],
    [BOARD_WIDTH, BOARD_WIDTH + 1, 1, 2],
    [0, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1]
]
const T_Shape = [
    [1, BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH + 2],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH * 2 + 1],
    [BOARD_WIDTH, 1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1]
]
const O_Shape = [
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1],
    [0, 1, BOARD_WIDTH, BOARD_WIDTH + 1]
]
const I_Shape = [
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 3 + 1],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH + 3],
    [1, BOARD_WIDTH + 1, BOARD_WIDTH * 2 + 1, BOARD_WIDTH * 3 + 1],
    [BOARD_WIDTH, BOARD_WIDTH + 1, BOARD_WIDTH + 2, BOARD_WIDTH + 3]
]

const Next_All_Shapes = [
    [1, NEXT_BOARD_WIDTH + 1, NEXT_BOARD_WIDTH * 2 + 1, 2],
    [NEXT_BOARD_WIDTH, NEXT_BOARD_WIDTH + 1, 1, 2],
    [1, NEXT_BOARD_WIDTH, NEXT_BOARD_WIDTH + 1, NEXT_BOARD_WIDTH + 2],
    [0, 1, NEXT_BOARD_WIDTH, NEXT_BOARD_WIDTH + 1],
    [1, NEXT_BOARD_WIDTH + 1, NEXT_BOARD_WIDTH * 2 + 1, NEXT_BOARD_WIDTH * 3 + 1]
]
const All_Shapes = [L_Shape, S_Shape, T_Shape, O_Shape, I_Shape]
let x = 0
let timer
let score = 0

let colors = [
    'linear-gradient(158deg, rgba(42, 250, 223, 1) 0%, rgba(76, 131, 255, 1) 100%)',
    'linear-gradient(158deg, rgba(255, 247, 32, 1) 0%, rgba(60, 213, 0, 1) 100%)',
    'linear-gradient(158deg, rgba(255, 211, 165, 1) 0%, rgba(253, 101, 133, 1) 100%)',
    'linear-gradient(158deg, rgba(255, 170, 133, 1) 0%, rgba(179, 49, 95, 1) 100%)',
    'linear-gradient(158deg, rgba(250, 178, 255, 1) 0%, rgba(25, 4, 229, 1) 100%)'
]

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.player-query').setAttribute('style', 'visibility: hidden')


    for (let i = 0; i < 200; i++) {
        let cell = document.createElement('DIV')
        cell.classList.add('cell')
        document.querySelector('.board').appendChild(cell)
    }
    for (let i = 0; i < 10; i++) {
        let cell = document.createElement('DIV')
        cell.classList.add('bottom')
        document.querySelector('.board').appendChild(cell)
    }
    for (let i = 0; i < 16; i++) {
        let cell = document.createElement('DIV')
        cell.classList.add('next')
        document.querySelector('.next-shape').appendChild(cell)
    }

    let blocks = Array.from(document.querySelectorAll('.board>div'))
    let next_block = Array.from(document.querySelectorAll('.next-shape>div'))
    const score_display = document.querySelector('#score_display')
    const btn = document.querySelector('.btn-start')
    const settings = document.querySelector('.settings')
    const close_settings = document.querySelector('.close-config>i')
    let end_game = false

    let track_sounds = document.querySelector("#myAudio-blocks")
    let volume_sounds = document.querySelector("#volume-sounds")
    let volume_up_sounds = document.querySelector(".volume-up-sounds>i")
    track_sounds.muted = false
    track_sounds.volume = 1
    track_sounds.src = "./songs/sounds/hit.mp3"
    track_sounds.load()

    let currentPosition = 3
    let currentRotation = 0

    let randomizer = Math.floor(Math.random() * All_Shapes.length)
    let next_randomizer = 0
    let currentShape = All_Shapes[randomizer][currentRotation]

    function draw() {
        currentShape.forEach(index => {
            blocks[currentPosition + index].classList.add('block')
            blocks[currentPosition + index].style.background = colors[randomizer]
        })
    }

    function undraw() {
        currentShape.forEach(index => {
            blocks[currentPosition + index].classList.remove('block')
            blocks[currentPosition + index].style.background = ''

        })
    }

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    function moveDown() {
        undraw()
        currentPosition += BOARD_WIDTH
        draw()
        freeze()
    }

    function freeze() {
        if (currentShape.some(index => blocks[currentPosition + index + BOARD_WIDTH].classList.contains('bottom'))) {
            currentShape.forEach(index => {
                blocks[currentPosition + index].classList.add('bottom')
                track_sounds.src = "./songs/sounds/hit.mp3"
                track_sounds.play()
            })
            randomizer = next_randomizer
            next_randomizer = Math.floor(Math.random() * All_Shapes.length)
            currentShape = All_Shapes[randomizer][currentRotation]
            currentPosition = 4
            draw()
            nextDisplay()
            add_score()
            game_over()
        }
    }

    function moveLeft() {
        undraw()
        const isAtLeftEdge = currentShape.some(index => (currentPosition + index) % BOARD_WIDTH === 0)
        if (!isAtLeftEdge) currentPosition -= 1
        if (currentShape.some(index => blocks[currentPosition + index].classList.contains('bottom'))) {
            currentPosition += 1
        }
        draw()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = currentShape.some(index => (currentPosition + index) % BOARD_WIDTH === BOARD_WIDTH - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (currentShape.some(index => blocks[currentPosition + index].classList.contains('bottom'))) {
            currentPosition -= 1
        }
        draw()
    }

    function isAtRight() {
        return currentShape.some(index => (currentPosition + index + 1) % BOARD_WIDTH === 0)
    }

    function isAtLeft() {
        return currentShape.some(index => (currentPosition + index) % BOARD_WIDTH === 0)
    }

    function checkRotatedPosition(arg) {
        arg = arg || currentPosition
        if ((arg + 1) % BOARD_WIDTH < 4) {
            if (isAtRight()) {
                currentPosition += 1
                checkRotatedPosition(arg)
            }
        } else if (arg % BOARD_WIDTH > 5) {
            if (isAtLeft()) {
                currentPosition -= 1
                checkRotatedPosition(arg)
            }
        }
    }

    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === currentShape.length) {
            currentRotation = 0
        }
        currentShape = All_Shapes[randomizer][currentRotation]
        checkRotatedPosition()
        track_sounds.src = "./songs/sounds/rotate.mp3"
        track_sounds.play()
        draw()
    }

    function nextDisplay() {
        next_block.forEach(arg => {
            arg.classList.remove('block')
            arg.style.background = ''
        })
        Next_All_Shapes[next_randomizer].forEach(arg => {
            next_block[arg].classList.add('block')
            next_block[arg].style.background = colors[next_randomizer]
        })
    }

    function add_score() {
        for (let i = 0; i < 199; i += BOARD_WIDTH) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(arg => blocks[arg].classList.contains('bottom'))) {
                score += 10
                score_display.textContent = score

                row.forEach(arg => {
                    blocks[arg].classList.remove('bottom')
                    blocks[arg].classList.remove('block')
                    blocks[arg].style.background = ''
                })
                const blocks_removed = blocks.splice(i, BOARD_WIDTH)
                blocks = blocks_removed.concat(blocks)
                blocks.forEach(block => {
                    document.querySelector('.board').appendChild(block)
                })
            }
        }
    }

    function game_over() {
        if (currentShape.some(arg => blocks[currentPosition + arg].classList.contains('bottom'))) {
            clearInterval(timer)
            document.removeEventListener('keyup', control)
            timer = null
            document.querySelector('.game-over').setAttribute('style', 'visibility: visible')
            end_game = true
            document.querySelector('.player-query').removeAttribute('style', 'display: none')
            track_sounds.src = "./songs/sounds/gameover.mp3"
            track_sounds.play()

        }
    }

    function volumeChangeSounds() {
        track_sounds.volume = volume_sounds.value / 100;
    }

    function songMuteSounds() {
        if (track_sounds.muted == false) {
            track_sounds.muted = true;
            volume_up_sounds.classList.remove("fa-volume-up");
            volume_up_sounds.classList.add("fa-volume-mute");
        } else {
            track_sounds.muted = false;
            volume_up_sounds.classList.remove("fa-volume-mute");
            volume_up_sounds.classList.add("fa-volume-up");
        }
    }

    let paused = true
    const pause_text = document.querySelector('#pause-text')

    document.querySelector('.game-over').setAttribute('style', 'visibility: hidden')
    btn.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer)
            document.removeEventListener('keyup', control)
            timer = null
            if (paused == true) {
                pause_text.setAttribute('style', 'visibility: visible')
                track_sounds.src = "./songs/sounds/pause.mp3"
                track_sounds.play()
                paused = false
            }
        } else {
            if (end_game == true) {
                blocks.forEach((arg, i) => {
                    if (i < 200) {
                        arg.classList.remove('block', 'bottom')
                        arg.style.background = ''
                    }
                })
                end_game = false
                score_display.textContent = 0
                next_randomizer = Math.floor(Math.random() * All_Shapes.length)
            }
            paused = true
            score = 0
            pause_text.setAttribute('style', 'visibility: hidden')
            document.querySelector('.game-over').setAttribute('style', 'visibility: hidden')
            document.addEventListener('keyup', control)
            draw()
            timer = setInterval(moveDown, 1000)
            nextDisplay()
        }
    })

    volume_sounds.addEventListener("input", volumeChangeSounds);

    volume_up_sounds.addEventListener("click", songMuteSounds);

    settings.addEventListener('click', () => {
        document.querySelector('.configs').setAttribute('style', 'visibility: visible')
    })

    close_settings.addEventListener('click', () => {
        document.querySelector('.configs').removeAttribute('style')
    })

    let candy = document.querySelector('.theme-candy')
    let retro = document.querySelector('.theme-retro')

    candy.addEventListener('click', () => {
        document.querySelector('link').setAttribute('href', './css/style.css')
        colors = [
            'linear-gradient(158deg, rgba(42, 250, 223, 1) 0%, rgba(76, 131, 255, 1) 100%)',
            'linear-gradient(158deg, rgba(255, 247, 32, 1) 0%, rgba(60, 213, 0, 1) 100%)',
            'linear-gradient(158deg, rgba(255, 211, 165, 1) 0%, rgba(253, 101, 133, 1) 100%)',
            'linear-gradient(158deg, rgba(255, 170, 133, 1) 0%, rgba(179, 49, 95, 1) 100%)',
            'linear-gradient(158deg, rgba(250, 178, 255, 1) 0%, rgba(25, 4, 229, 1) 100%)'
        ]
    })
    retro.addEventListener('click', () => {
        document.querySelector('link').setAttribute('href', './css/style2.css')
        colors = [
            '#00bbf9',
            '#00f5d4',
            '#fee440',
            '#f15bb5',
            '#9b5de5'
        ]
    })
})