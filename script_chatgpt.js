

console.log("lets start javascript");

let audio = null;
let currentIndex = 0;
let songs = [];

// Function to fetch songs
async function getSongs() {
    try {
        let response = await fetch(`http://127.0.0.1:3000/songs/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let text = await response.text();
        let div = document.createElement("div");
        div.innerHTML = text;
        let links = div.getElementsByTagName("a");

        songs = [];
        for (let link of links) {
            if (link.href.endsWith(".mp3")) {
                songs.push(link.href);
            }
        }
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
}

// Function to play a specific song
function playSong(index) {
    if (audio) {
        audio.pause();
    }

    audio = new Audio(songs[index]);
    audio.play().catch(error => console.error('Playback failed:', error));
    currentIndex = index;

    audio.addEventListener("loadeddata", () => {
        updateSeekBar();
        updateSongInfo();
    });

    audio.addEventListener("timeupdate", updateSeekBar);

    audio.addEventListener('ended', nextSong); // Automatically go to next song when current ends
}

// Update the seek bar
function updateSeekBar() {
    const seekBar = document.querySelector('.seekbar input[type="range"]');
    if (audio && seekBar) {
        seekBar.max = audio.duration;
        seekBar.value = audio.currentTime;
    }
}

// Seek to a specific time
function seek() {
    const seekBar = document.querySelector('.seekbar input[type="range"]');
    if (audio) {
        audio.currentTime = seekBar.value;
    }
}

// Play or pause the audio
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Go to the next song
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
}

// Go to the previous song
function previousSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
}

// Adjust the volume
function adjustVolume() {
    const volumeControl = document.querySelector('.volume input[type="range"]');
    if (audio) {
        audio.volume = volumeControl.value;
    }
}

// Update song information
function updateSongInfo() {
    const songInfo = document.querySelector('.songinfo');
    if (songInfo) {
        songInfo.innerHTML = `<strong>${songs[currentIndex].split('/').pop()}</strong>`; // Display song name
    }
}

async function main() {
    // Get the list of all the songs
    await getSongs();

    let songList = document.querySelector(".songlist ul");
    if (!songList) {
        console.error('No song list found');
        return;
    }

    songList.innerHTML = songs.map((song, index) => `
        <li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div>${song.split('/').pop().replaceAll("%20", " ")}</div>
                <div>Artist Name</div>
            </div>
            <div class="playnow" data-index="${index}">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>
    `).join('');

    // Attach click events to each play button
    const playButtons = document.querySelectorAll('.playnow span');
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            playSong(index);
        });
    });

    // Event listeners for controls
    document.getElementById('play').addEventListener('click', playPause);
    document.getElementById('next').addEventListener('click', nextSong);
    document.getElementById('previous').addEventListener('click', previousSong);
    document.querySelector('.seekbar input[type="range"]').addEventListener('input', seek);
    document.querySelector('.volume input[type="range"]').addEventListener('input', adjustVolume);
}

main();


// console.log("lets start javascript");

// let audio = null;
// let currentIndex = 0;
// let songs = [];

// // Function to fetch songs
// async function getSongs() {
//     try {
//         let response = await fetch(`http://127.0.0.1:3000/songs/`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         let text = await response.text();
//         let div = document.createElement("div");
//         div.innerHTML = text;
//         let links = div.getElementsByTagName("a");

//         songs = [];
//         for (let link of links) {
//             if (link.href.endsWith(".mp3")) {
//                 songs.push(link.href);
//             }
//         }
//         return songs;
//     } catch (error) {
//         console.error('Error fetching songs:', error);
//         return [];
//     }
// }

// // Function to play a specific song
// function playSong(index) {
//     if (audio) {
//         audio.pause();
//     }

//     audio = new Audio(songs[index]);
//     audio.play().catch(error => console.error('Playback failed:', error));
//     currentIndex = index;

//     audio.addEventListener("loadeddata", () => {
//         updateSeekBar();
//         updateSongInfo();
//     });

//     audio.addEventListener("timeupdate", updateSeekBar);
//     audio.addEventListener('ended', nextSong); // Automatically go to next song when current ends
// }

// // Update the seek bar
// function updateSeekBar() {
//     const seekBar = document.querySelector('.seekbar input[type="range"]');
//     if (audio && seekBar) {
//         seekBar.max = audio.duration;
//         seekBar.value = audio.currentTime;
//     }
// }

// // Seek to a specific time
// function seek() {
//     const seekBar = document.querySelector('.seekbar input[type="range"]');
//     if (audio) {
//         audio.currentTime = seekBar.value;
//     }
// }

// // Play or pause the audio
// function playPause() {
//     if (audio.paused) {
//         audio.play();
//     } else {
//         audio.pause();
//     }
// }

// // Go to the next song
// function nextSong() {
//     currentIndex = (currentIndex + 1) % songs.length;
//     playSong(currentIndex);
// }

// // Go to the previous song
// function previousSong() {
//     currentIndex = (currentIndex - 1 + songs.length) % songs.length;
//     playSong(currentIndex);
// }

// // Adjust the volume
// function adjustVolume() {
//     const volumeControl = document.querySelector('.volume input[type="range"]');
//     if (audio) {
//         audio.volume = volumeControl.value;
//     }
// }

// // Update song information
// function updateSongInfo() {
//     const songInfo = document.querySelector('.songinfo');
//     if (songInfo) {
//         songInfo.innerHTML = `<strong>${songs[currentIndex].split('/').pop()}</strong>`;
//     }
// }

// async function main() {
//     await getSongs();

//     let songList = document.querySelector(".songlist ul");
//     if (!songList) {
//         console.error('No song list found');
//         return;
//     }

//     songList.innerHTML = songs.map((song, index) => `
//         <li>
//             <img class="invert" src="music.svg" alt="">
//             <div class="info">
//                 <div>${song.split('/').pop().replaceAll("%20", " ")}</div>
//                 <div>Artist Name</div>
//             </div>
//             <div class="playnow">
//                 <span>Play Now</span>
//                 <img class="invert" src="play.svg" alt="">
//             </div>
//         </li>
//     `).join('');

//     // Attach click events to each play button
//     const playButtons = document.querySelectorAll('.playnow span');
//     playButtons.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             playSong(index);
//         });
//     });

//     // Event listeners for controls
//     document.getElementById('play').addEventListener('click', playPause);
//     document.getElementById('next').addEventListener('click', nextSong);
//     document.getElementById('previous').addEventListener('click', previousSong);
//     document.querySelector('.seekbar input[type="range"]').addEventListener('input', seek);
//     document.querySelector('.volume input[type="range"]').addEventListener('input', adjustVolume);
    
//     // Event listeners for hamburger and close buttons
//     document.querySelector('.hamburgerr').addEventListener('click', () => {
//         document.querySelector('.library').style.display = 'block'; // Show library
//     });

//     document.querySelector('.close img').addEventListener('click', () => {
//         document.querySelector('.library').style.display = 'none'; // Hide library
//     });
// }

// main();
