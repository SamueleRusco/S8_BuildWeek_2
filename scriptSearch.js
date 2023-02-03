asyncWait = async function () {
  let inputValue = document.getElementById("inputSearch").value;
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputValue}`
    );
    if (res.ok) {
      try {
        let data = await res.json();

        const array = Object.values(data);
        const jarray = Object.values(array[0]);

        let div = document.getElementById("cardContainerSearch");
        div.innerHTML = ``;
        for (let i = 0; i < 12; i++) {
          let element = jarray[i];
          div.innerHTML += `         
            <div class="col d-flex">
                          <div class="searchCard card d-flex align-items-center w-100 h-100 " >
                          <img src="${element.album.cover_xl}" class="searchImgCard card-img-top playerClick" alt="" id="${i}">
                          <div class="card-body d-flex flex-column">element.preview
                          <div class="textCardSearch" id="${element.artist.id}">${element.artist.name}</div>
                          <div class="card-title ">${element.title_short}</div>
                          <div class="textCardSearch2">${element.album.title}</div>
                          
                          </div>
                          </div>
                          </div>
                          </div> 
  
                          `;
        }

        function songPlayer(event) {
          let i = event.target.id;
          let footer = document.getElementById("footerPlay");
          footer.innerHTML = `<div class="music-player row d-none d-md-flex">
    <audio class="d-none" id="myAudio">
      <source src="${jarray[i].preview}" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
    
    <div class="song-bar col-3">
      <div class="song-infos">
        <div class="image">
          <img src="${jarray[i].album.cover_xl}" alt="" />
        </div>
        <div class="song-description">
          <p class="title">${jarray[i].title}</p>
          <p class="artist">${jarray[i].artist.name}</p>
        </div>
      </div>
    
      <div class="icons">
        <i class="far fa-heart"></i>
        <i class="fas fa-compress"></i>
      </div>
    </div>
    
    <div class="col-7 progress-controller">
      <div class="control-buttons">
        <i class="fas fa-random"></i>
        <i class="fas fa-step-backward"></i>
        <i class="play-pause fas fa-play" id="playStart"></i>
        <i class="fas fa-step-forward"></i>
        <i class="fas fa-undo-alt"></i>
      </div>
    
      <div class="progress-container">
        <span id="current"></span>
        <div class="progress-bar" id="progressContainer">
          <div class="progress" id="progress"></div>
        </div>
        <span id="fine">0.30</span>
      </div>
    </div>
    
    <div class="col-2 other-features">
      <i class="fas fa-list-ul"></i>
      <i class="fas fa-desktop"></i>
      <div class="volume-bar">
        <i class="fas fa-volume-down"></i>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
      </div>
    </div>
    </div>`;

          let playButtonPlayer = document.getElementById("playStart");
          function playpauseMusic() {
            let audio = document.getElementById("myAudio");

            console.log("button pressed");

            if (!audio.paused) {
              audio.pause();
            } else {
              audio.play();
            }
          }

          playButtonPlayer.addEventListener("click", playpauseMusic);

          let audio = document.getElementById("myAudio");
          let progressContainer = document.getElementById("progressContainer");

          let progress = document.getElementById("progress");

          setInterval(function () {
            var rect = progressContainer.getBoundingClientRect();
            var percentage = audio.currentTime / audio.duration;
            progress.style.width = percentage * rect.width + "px";
            let fine = document.getElementById("fine");
            let currentTime = document.getElementById("current");
            if (!audio.paused) {
              currentTime.innerHTML = Math.trunc(audio.currentTime) / 100;
            }
          }, 100);
        }

        let songs = document.querySelectorAll(".playerClick");

        songs.forEach((element) => {
          element.addEventListener("click", songPlayer);
        });
      } catch (err) {
        let div = document.getElementById("cardContainerSearch");
        div.innerHTML = `<div> RICERCA FALLITA, RIPROVA PIU TARDI :( </div>`;
        console.log(err);
      }
    } else {
      throw new Error("input vuoto :(");
    }
  } catch (err) {
    let div = document.getElementById("cardContainerSearch");
    div.innerHTML = `<div> RICERCA FALLITA, RIPROVA PIU TARDI :( </div>`;
    console.log(err);
  }
};

function inputKeyPress(e) {
  if (e.key === "Enter") {
    this.asyncWait();
  }
}
// window.onload = () => {
//   asyncWait("pink floyd", "buonasera");
// };
