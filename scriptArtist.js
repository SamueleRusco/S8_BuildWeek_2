const asyncWait = async function (url, where) {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/artist/${url}`
    );
    if (res.ok) {
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
        <h3 class="mt-2">${jarray2[i].title}</h3>
       
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
