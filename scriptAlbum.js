const asyncWait = async function (url, where) {
  try {
    let res = await fetch(
      ` https://striveschool-api.herokuapp.com/api/deezer/album/${url}`
    );
    if (res.ok) {
      function truncateString(str, num) {   if (str.length <= num) {     return str   }   return str.slice(0, num) + '...' }
      let data = await res.json();
      const array = Object.values(data);

      //let newfetch = array[27];
      //let res2 = await fetch(newfetch);
      //  let data2 = await res2.json();
      //const array2 = Object.values(data2);
      const jarray = Object.values(array[27]);
      console.log(array);
      //console.log(array2);
      const jarray2 = Object.values(jarray[0]);
      console.log(jarray2);
      let div = document.getElementById(where);

      if (where === "albumDiv") {
        let albumFirst = document.getElementById("albumFirst");
        albumFirst.innerHTML += `  <div class="card mb-3 mx-md-4 mt-5">
<div class="row g-0 justify-content-center pt-4 py-md-0">
  <div class="col-9 col-md-4 containerAlbum">
    <img
      src="${array[9]}"
      class="h-100 w-100"
      id="albumImg"
      alt="immagine canzone"
    />
  </div>
  <div class="row col-md-8 justify-content-center">
    <div
      class="card-body p-0 d-flex flex-column justify-content-end ms-md-3"
    >
      <p class="d-none d-md-block">Album</p>
      <h2 class="text-white" id="albumTitle">${array[1]}</h2>

      <div
        class="class=card-text fs-3 fw-normal d-flex align-items-center"
      >
        <img
          class="rounded-circle artistlikeImg me-2"
          src="${array[9]}"
          id="artistImg"
          alt="immagine artisti"
        />
        <p>${jarray2[0].artist.name}</p><p class="ms-2">${array[17]}</p>
      </div>
    </div>
  </div>
</div>
</div>`;

        for (let i = 0; i < jarray2.length; i++) {
          let titoloTroncato= truncateString(jarray2[i].title, 20)

          div.innerHTML += `      <div class="container d-flex position-relative my-3 col-12 px-3">
         <div class="d-flex align-items-center justify-content-center ">
        <div>
          <p class="text-white me-3">${i + 1}</p>
        </div>
        <div>
          <h3 class="fw-semibold"> ${titoloTroncato} </h3>
          <p class="numAscolti">${jarray2[i].artist.name}</p>
        </div>
      </div>
      <div>
    
        <p class="numAscolti position-absolute end-50 d-none d-md-flex ">${jarray2[i].rank}</p>
      

      <p class="numAscolti ms-5 position-absolute end-0 me-3 d-none d-md-flex">${
        jarray2[i].duration
      }
      </p> <i
        class="fa-solid fa-ellipsis-vertical d-block d-md-none position-absolute mt-3 me-5 end-0 fs-2"
      ></i>
      </div></div > 
      
       `;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

window.onload = () => {
  let params = new URLSearchParams(document.location.search);
  let search = params.get("search");
  asyncWait(search, "albumDiv");
};



/*const getAlbum = async () => {
  try {
    const res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062"
    );
    if (res.ok) {
      let data = await res.json();
      const array = Object.values(data);
      const jarray = Object.values(array[0]);
    }
  } catch (err) {
    console.log(err, "c'è un errore");
  }
};

getAlbum(); */
