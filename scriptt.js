console.log("lets start javascript")


async function getSongs(){

let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index ++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    } 

    return songs
}

async function main() {
    //get the list of all the songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
         songUL.innerHTML = songUL.innerHTML + 

                        `<li> <img class="invert" src="music.svg" alt="">
                        <div class="info">
                            <div> ${song.replaceAll("%20", " ")}</div>
                            <div>Somya</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="play.svg" alt="">
                        </div>
                    </li>`;

    } 

    //play the first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata" , () =>{
        console.log (audio.duration,audio.currentSrc, audio.currentTime);
        

    });
}

main()
 