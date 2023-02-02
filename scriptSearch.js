asyncWait = async function () {
  let inputValue = document.getElementById("inputSearch").value;
  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputValue}`
    );
    if (res.ok) {
      let data = await res.json();
      console.log(data);
      const array = Object.values(data);
      const jarray = Object.values(array[0]);

      let div = document.getElementById("cardContainerSearch");
      div.innerHTML = ``;
      for (let i = 0; i < 10; i++) {
        let element = jarray[i];
        div.innerHTML += `         
                        <div class="searchCard card d-flex align-items-center m-1" style="max-width: 15rem;">
                        <img src="${element.album.cover_xl}" class="searchImgCard card-img-top" alt="">
                        <div class="card-body">
                        <div class="textCardSearch" id="${element.artist.id}">${element.artist.name}</div>
                        <div class="card-title">${element.title_short}</div>
                        <div class="textCardSearch2">${element.album.title}</div>
                        
                        </div>
                        </div>
                        </div>                        
                        `;
      }

      // funzione di prova non fa nulla!
    }
  } catch (err) {
    console.log(err);
  }
};

// window.onload = () => {
//   asyncWait("pink floyd", "buonasera");
// };
