const asyncWait = async function (url, where) {
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${url}`
    );
    if (res.ok) {
      let data = await res.json();
      const array = Object.values(data);
      const jarray = Object.values(array[0]);
      let div = document.getElementById(where);
      if (where === "cardDiv") {
        for (let i = 0; i < 10; i++) {
          div.innerHTML += `


        <div class="col d-flex my-2">
        <div class="card mycardpiace">
          <img
            src="${jarray[i].album.cover_xl}"
            class="card-img-top p-2 rounded-4"
            alt="..."
          />
          <div class="card-body">
            <h6 class="card-title fw-bolder" role='button' >${jarray[i].title}</h6>
            <p class="card-text fw-light " role='button'>${jarray[i].album.title}</p>
            <p class="card-text fst-italic artistText" role='button'>${jarray[i].artist.name}</p>

          </div>
        </div>
      </div>
        `;
        }
      } else if (where === "buonasera") {
        for (let i = 0; i < 6; i++) {
          div.innerHTML += `
    
    
          <div class="col">
          <div class="card mycardsmall mb-3">
           
              
              
                <div class="card-body justify-content-between d-flex align-items-center p-0 pe-2"> 
                <img
                  src=" ${jarray[i].album.cover_xl}"
                  class="rounded-start img-fluid "
                  style="width:80px; height:80px;"

                  alt="..."
                />
                  <h6 class="card-title fs-6 fs-md-3 mb-0 " role='button'>${jarray[i].artist.name}</h6><i id="playhover" class="fa-sharp fa-solid fa-circle-play "></i>
                </div>
            
          </div>
        </div>`;
        }
      } else if (where === "first") {
        div.innerHTML += `
      
            <div class="">
            <img
              style="width: 200px"
              src="${jarray[0].album.cover_xl}"
              class="card-img-top mx-3"
              alt="..."
            />
            </div>
            <div class="col-3 mycardText text-white mb-4">
            <p class="card-text titleLeft mt-2">Album</p>
            <h6 class="card-title pBold fs-1 mt-4 mb-3 " role='button'>${jarray[0].title}</h6>
            <p class="card-text mb-3 " role='button' id="artistClick">${jarray[0].artist.name}</p>
            <p class="card-text mb-3 " role='button'>${jarray[0].album.title}</p>
            
            <div class="d-flex flex-row">
              <a
                href="#"
                class="btn fs-6 rounded-pill me-3 buttonSpotify px-4 py-2"
                >Play</a
              >
              <a
                href="#"
                class="btn fs-6 btn-outline-light rounded-pill px-4 py-2"
                >Salva</a
              >
            </div>
            </div>
            <button
            class="mybutton btn text-uppercase rounded-pill buttonAnnunci position-absolute top-0 end-0 me-4 mt-3"
            >
            nascondi annunci</button
            ><!-- -->`;
      } else if (where === "containerMobile") {
        for (let i = 0; i < 6; i++) {
          div.innerHTML += `
          <div class="card mycard d-block d-md-none my-3">
          <div class="d-flex flex-row">
            <div class="col-6 col-md-3 h-100">
              <img
                class="background h-100 w-100 p-3"
                src="${jarray[0].album.cover_xl}"
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="col-6 mycardText mt-2">
              <h6 class="card-text mt-2 ">${jarray[0].artist.name}</h6>
              
              <p class="card-text fs-5 mb-3 fst-italic fs-6">${jarray[0].album.title}</p>
              <p class="card-text fs-5 mb-3 fw-bold fs-2">${jarray[0].title}</p>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-b mx-3 my-2">
            <div class="d-flex">
              <i class="fa-solid fa-heart text-white me-4"></i>
              <i class="fa-solid fa-bookmark text-white me-2"></i>
            </div>
            <div class="d-flex">
              <i class="fa-solid fa-heart text-white me-2 ms-4"></i>
            </div>
          </div>
        </div>
    
          `;
        }
      }

      // funzione di prova non fa nulla!
      function clicked(event) {
        console.log(event.target.innerHTML);
      }

      let artist = document.getElementById("artistClick");
      artist.addEventListener("click", clicked);
      console.log(jarray);
    }
  } catch (err) {
    console.log(err);
  }
};

asyncWait("hello", "cardDiv");

asyncWait("pink floyd", "buonasera");
asyncWait("rem", "first");
asyncWait("ac/dc", "containerMobile");
