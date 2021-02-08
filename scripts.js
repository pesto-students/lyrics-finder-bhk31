getSelectedElement("song").addEventListener("keypress", checkKey, false);

let form = document.getElementById("lyrics-form");

form.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();
}

function checkKey(evt) {
  let charCode = evt.charCode;
  if (charCode === 13) {
    let song = getInputElementFromForm("lyrics-form", "song");
    searchArtist(song);
  }
}
function getInputElementFromForm(form, input) {
  let formData = new FormData(getSelectedElement(form));
  return formData.get(input);
}

function getSelectedElement(element) {
  return document.getElementById(element);
}

// Example POST method implementation:
async function fetchExternalData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

getSelectedElement("search").onclick = function () {
  let song = getInputElementFromForm("lyrics-form", "song")
  searchArtist(song);
};

function getNextAndPrev(url) {
  searchTerm = url.split("q=")[1];
  searchArtist(searchTerm);
}

function searchArtist(artist) {
  artist = artist.replace(/["']/g, "");
  searchResult = getSuggestions(artist);
  
  searchResult.then((response) => {
    console.log(response);
    listContainerHtml = buildListContainer(response);
    getSelectedElement("list-container").innerHTML = listContainerHtml;
  });
}

function buildSongCard(songs) {
  let songCard = "";
  for (song of songs) {
    let title = song.album.title.replace(/["']/g, "");
    let artistName = song.artist.name.replace(/["']/g, "");

    songCard += `<div class="item" >
        <img src="${song.album.cover}" alt="">
        <div style="display: flex; flex-direction: column; margin: 1%;">
          <p class="title"><b>Title:</b><span>${title}</p>
          <p class="artist-name"><b>Artist:</b>${artistName}</p>
          <div display:flex;>
          <a href="${song.preview}" target="_blank">Listen</a>
          <a href="#" class="view-lyrics" data-artist=${artistName} data-title=${title} onclick="getLyrics('${artistName}','${title}')">View Lyrics</a>
        </div>  
        </div>
        <img src="${song.artist.picture}" alt="">
      </div>`;
  }

  return songCard;
}

function getSuggestions(searchTerm) {
  return fetchExternalData("https://api.lyrics.ovh/suggest/" + searchTerm);
}

function buildNavigationButtons(next, prev) {
  let navigationButtons = "";
  if (next || prev) {
    if (next && prev) {
      navigationButtons = `<div style="display:flex;justify-content:center; width:100%"><button class='btn' onClick="getNextAndPrev('${prev}');">Prev</button><button class='btn' onClick="getNextAndPrev('${next}');">Next</button></div>`;
    } else if (next) {
      navigationButtons = `<div style="display:flex;justify-content:center; width:100%"><button class='btn' onClick="getNextAndPrev('${next}');">Next</button></div>`;
    } else {
      navigationButtons = `<div style="display:flex;justify-content:center; width:100%"><button class='btn' onClick="getNextAndPrev('${prev}');">Prev</button></div>`;
    }
  }

  return navigationButtons;
}

function buildListContainer(response) {
  let listContainerHtml = "";
  if (0 === response.data.length) {
    listContainerHtml = "<h3>Sorry, unable to process your request!!</h3>";
  } else {
    const songCards = buildSongCard(response.data);
    const navigationButtons = buildNavigationButtons(
      response.next,
      response.prev
    );
    listContainerHtml = songCards + navigationButtons;
  }

  return listContainerHtml;
}

function getLyrics(artist, title) {
  let url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  let modal = getSelectedElement("myModal");
  let lyricsPromise = fetchExternalData(url);
  lyricsPromise.then((data) => {
    modal.style.display = "block";
    let lyrics = getSelectedElement("lyrics");
    let heading = getSelectedElement("heading");
    heading.innerHTML = `<h2>${title}</h2>`;
    if (data.lyrics) {
      lyrics.innerText = data.lyrics;
    } else {
      lyrics.innerText = "Lyrics not found!!";
    }
  });
}

getSelectedElement("close").onclick = function () {
  let modal = getSelectedElement("myModal");
  modal.style.display = "none";
};

window.onclick = function (event) {
  let modal = getSelectedElement("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
