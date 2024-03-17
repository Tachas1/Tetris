window.addEventListener("DOMContentLoaded", () => {

    let previous = document.querySelector("#previous");
    let play = document.querySelector("#play");
    let next = document.querySelector("#next");
    let volume = document.querySelector("#volume");
    let volume_up = document.querySelector(".volume-up>i");
    let title = document.querySelector(".title");
    let author = document.querySelector(".author");

    let index_no = 0;
    let playing_song = false;


    let Songs = [{
            name: "Crystal City",
            author: "Isidor",
            path: "./songs/song.mp3"
        },
        {
            name: "Adrenaline Burst",
            author: "Midnight Danger",
            path: "./songs/song2.mp3"
        },
        {
            name: "Rush!",
            author: "Turboslash",
            path: "./songs/song3.mp3",
        },
        {
            name: "Running in the night",
            author: "FM-84",
            path: "./songs/song4.mp3",
        },
        {
            name: "Stranger Love",
            author: "Ollie Wride & Sunglasses Kid",
            path: "./songs/song5.mp3",
        }
    ];

    let track = document.querySelector("#myAudio");
    let slider_position;
    track.muted = false;

    function load_track(index_no) {
        track.src = Songs[index_no].path;
        title.textContent = Songs[index_no].name;
        author.textContent = Songs[index_no].author;
        track.load();

        time = setInterval(range_slider, 1000);

    }
    load_track(index_no);



    function justplay() {
        if (playing_song == false)
            playsong();
        else
            pausesong();
    }

    function playsong() {
        track.play();
        playing_song = true;
        play.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pausesong() {
        track.pause();
        playing_song = false;
        play.innerHTML = '<i class="fas fa-play"></i>';
    }

    function nextsong() {
        if (index_no < Songs.length - 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        } else {
            index_no = 0;
            load_track(index_no);
            playsong();
        }
    }

    function previoussong() {
        console.log(index_no)
        if (index_no > 0) {
            index_no -= 1;
            load_track(index_no);
            playsong();
        } else {
            index_no = Songs.length - 1;
            load_track(index_no);
            playsong();
        }
    }


    function volumeChange() {
        track.volume = volume.value / 100;
    }


    let position = 0;

    function range_slider() {
        if (!isNaN(track.duration)) {
            if (track.currentTime === track.duration) {
                nextsong()
            }
        }
    }

    function songMute() {
        if (track.muted == false) {
            track.muted = true;
            volume_up.classList.remove("fa-volume-up");
            volume_up.classList.add("fa-volume-mute");
        } else {
            track.muted = false;
            volume_up.classList.remove("fa-volume-mute");
            volume_up.classList.add("fa-music");
        }
    }

    track.volume = 0.1;
    previous.addEventListener("click", previoussong);
    play.addEventListener("click", justplay);
    next.addEventListener("click", nextsong);
    volume.addEventListener("input", volumeChange);
    volume_up.addEventListener("click", songMute);

    console.log(track.currentTime);
});