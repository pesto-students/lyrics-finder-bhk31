// Example POST method implementation:
async function postData(url = '',) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


// let modal = document.getElementById("myModal");

document.getElementById('search').onclick = function () {
  let song = getInputElementFromForm('lyrics-form', 'song');
  getSuggestions(song);
}

// const getLyrics = (artist, title) => {
//   console.log(artist);
//   console.log(title);

//   let url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//   let lyricsPromise = postData(url)
//   lyricsPromise.then(data => {
//     let modal = document.getElementById("myModal");
//     let content = document.getElementById("content");
//     modal.style.display = "flex";
//     content.innerText = data.lyrics;
//   });
// }

function getInputElementFromForm(form, input) {
  let formData = new FormData(getSelectedElement(form));
  return formData.get(input);
}

function getSelectedElement(element) {
  return document.getElementById(element);
}

function getSuggestions(song) {
  let searchResult = postData('https://api.lyrics.ovh/suggest/' + song);
  searchResult.then(data => {
    // console.log(data.data, data.total); // JSON data parsed by `data.json()` call
    let itemElement = '';
    for (el of data.data) {
      itemElement += `<div class="item" >
          <img src="${el.album.cover}" alt="">
          <div style="display: flex; flex-direction: column; margin: 1%;">
            <p class="title"><b>Title:</b><span>${el.album.title}</p>
            <p class="artist-name"><b>Artist:</b>${el.artist.name}</p>
            <div display:flex;>
            <a href="${el.preview}" target="_blank">Listen</a>
            <a href="#" class="view-lyrics" data-artist="${el.artist.name}" data-title="${el.album.title}" onclick="getLyrics('${el.artist.name}','${el.album.title}')">View Lyrics</a>
          </div>  
          </div>
          
          
          <img src="${el.artist.picture}" alt="">
        </div>`
    }

    getSelectedElement('list-container').innerHTML = itemElement;
  });
}

function searchArtist(artist) {
  getSuggestions(artist);
}