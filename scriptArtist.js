const asyncWait = async function (url, where) {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${url}`
    );
    if (res.ok) {
      function truncateString(str, num) {
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + "...";
      }

      let data = await res.json();
      const array = Object.values(data);
      const jarray = Object.values(array[0]);

      console.log(jarray);
      let newfetch = array[12];
      let res2 = await fetch(newfetch);
      let data2 = await res2.json();
      const array2 = Object.values(data2);
      console.log(array);

      console.log(array2);
      const jarray2 = Object.values(array2[0]);
      let div = document.getElementById(where);
      if (where === "artistDiv") {
        let div2 = document.getElementById("artistDiv2");
        let divCopertina = document.createElement("div");
        divCopertina.innerHTML = `<div
    class="d-flex flex-column justify-content-end px-3 pb-3" style="  width: 100%;
    height: 300px;
    background-image: url(${array[8]});
    background-size: cover;"
  >
    <h5 class="d-none d-md-block">Artista verificato</h5>
    <h1 class="text-white">${array[1]}</h1>
    <h5 class="d-none d-md-block">3.433.158 ascoltatori mensili</h5>
  </div>`;
        div.prepend(divCopertina);

        for (let i = 0; i < jarray2.length; i++) {
          divSongs = document.createElement("div");
          let titoloTroncato = truncateString(jarray2[i].title, 20);

          div2.innerHTML += `   
          <div class="d-flex row my-1 ">
          
          <div class="d-flex  position-relative col-12 >
<div class="d-flex ">
      <div class="text-white mt-4 mt-md-0">${i + 1}</div>
      <img
        class="polaroid  imgArtist mx-3"
        src="${jarray2[i].album.cover_xl}"
      />
      
      <div class="d-flex flex-column flex-md-row ">
        <h3 class="mt-2 playerClick" id="${i}">${titoloTroncato}</h3>
       
        <div class="d-flex d-block d-md-none end-0">
        <div class="numAscolti fw-semibold  ">
          276.616.912
        </div>
        </div>

        <div class="numAscolti fw-semibold  d-none d-md-block position-absolute end-0 me-5 mt-2">
        276.616.912
      </div>
        <div class="numAscolti fw-semibold  ms-3 d-none d-md-block position-absolute end-0 mt-2">
          3:18
        </div></div>

 <i
        class="fa-solid fa-ellipsis-vertical d-block d-md-none position-absolute mt-3 me-5 end-0 fs-2"
      ></i>

      </div>
     
    </div> </div></div></div>


  `;
          div2.append(divSongs);
        }
        let songLike = document.getElementById("songLike");
        let songlikeDiv = document.createElement("div");
        songLike.innerHTML += `<div class="d-flex align-items-center mt-4">
        <img
          class="rounded-circle artistlikeImg"
          src="${jarray2[0].album.cover}"
          style="width: 40px; height: 40px"
        />
        <div class="d-flex flex-column ms-2">
          <h4 class="like">Hai messo mi piace a ${jarray2.length} brani</h4>
          <h6 class="artistLike">Di ${jarray2[0].artist.name}</h6>
        </div>
      </div>`;
        songLike.append(songlikeDiv);
      }

      function songPlayer(event) {
        let i = event.target.id;
        let footer = document.getElementById("footerPlay");
        footer.innerHTML = `<div class="music-player row d-none d-md-flex">
<audio class="d-none" id="myAudio">
  <source src="${jarray2[i].preview}" type="audio/mpeg" />
  Your browser does not support the audio tag.
</audio>

<div class="song-bar col-3">
  <div class="song-infos">
    <div class="image">
      <img src="${jarray2[i].album.cover_xl}" alt="" />
    </div>
    <div class="song-description">
      <p class="title">${jarray2[i].title}</p>
      <p class="artist">${jarray2[i].artist.name}</p>
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
    }
  } catch (err) {
    console.log(err);
  }
};

window.onload = () => {
  let params = new URLSearchParams(document.location.search);
  let search = params.get("search");
  asyncWait(search, "artistDiv");
};
