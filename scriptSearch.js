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
        for (let i = 0; i < 10; i++) {
          let element = jarray[i];
          div.innerHTML += `         
          <div class="col d-flex">
                        <div class="searchCard card d-flex align-items-center w-100 h-100 " >
                        <img src="${element.album.cover_xl}" class="searchImgCard card-img-top" alt="">
                        <div class="card-body d-flex flex-column">
                        <div class="textCardSearch" id="${element.artist.id}">${element.artist.name}</div>
                        <div class="card-title ">${element.title_short}</div>
                        <div class="textCardSearch2">${element.album.title}</div>
                        
                        </div>
                        </div>
                        </div>
                        </div> 

                        `;
        }
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
