const getAlbum = async () => {
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

getAlbum();
