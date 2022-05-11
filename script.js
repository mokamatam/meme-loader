const api_url = 'https://meme-api.herokuapp.com/gimme/';

let number = 1;

async function loadMeme(count) {
    let cur_url = api_url + count;
    let response = await fetch(cur_url);
    let data = await response.json();

//    rmv_old_elmts();
    for (let i = 0; i < count; i++) {
        const memes = document.getElementById("memes");

        const title = document.createElement('h3');
        const title_node = document.createTextNode((number).toString() + ". " + data.memes[i].title);
        title.appendChild(title_node);

        const img = document.createElement('img');
        img.src = data.memes[i].url;
        img.style.width = '80%';

        const line_brk = document.createElement('br');

        memes.appendChild(title);
        memes.appendChild(img);
        memes.appendChild(line_brk);

        number++;
    }
}

// function rmv_old_elmts() {
//     let memes = document.getElementById("memes");
// 	var last_elmt = memes.lastElementChild;
	
// 	while(last_elmt) {
// 		memes.removeChild(last_elmt);
// 		last_elmt = memes.lastElementChild;
// 	}
// }

let num_memes = document.getElementById("num-memes");
loadMeme(num_memes.value);

let top_btn = document.getElementById("top-btn");
// let btm_btn = document.getElementById("btm-btn");

top_btn.addEventListener('click', () => {
    loadMeme(num_memes.value);
});

// btm_btn.addEventListener('click', () => {
//     loadMeme(3);
// });

var lastMove = 0;
document.addEventListener('scroll', function() {
    // do nothing if last move was less than 40 ms ago
    if(Date.now() - lastMove > 500) {
        // Do stuff
        infiMemes();
        lastMove = Date.now();
    } 
});

let infiMemes = () => {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        if (windowRelativeBottom < document.documentElement.clientHeight + 100) {
            loadMeme(10);
        }
}

