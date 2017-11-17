'use strict'

var gImgs = [
    {
        id: 1,
        // url: 'img/1.jpg',
        keywords: ['master chef', 'eyal shani', 'success', 'mistake']
    },
    {
        id: 2,
        // url: 'img/2.jpg',
        keywords: ['sound of music', 'give no fuck', 'i don\'t care']
    },
    {
        id: 3,
        // url: 'img/3.jpg',
        keywords: ['no time', 'time']
    },
    {
        id: 4,
        // url: 'img/4.jpg',
        keywords: ['cat', 'grumpy', 'no']
    },
    {
        id: 5,
        // url: 'img/5.jpg',
        keywords: ['success', 'kid']
    },
    {
        id: 6,
        // url: 'img/6.jpg',
        keywords: ['kid', 'katorza']
    },
];

var gMeme = {
    selectedImgId: '',
    txts: [{
        line: '',
        size: 20,
        align: 'center',
        color: 'white'
    }]
};


function initPage() {
    renderGallery(gImgs);
}



function renderGallery(imgs) {
    var elGallery = document.querySelector('.meme-gallery');
    var strHtmls = imgs.map(function (img, idx) {
        return `
            <div class="gallery-item">
            <img class="img-thumb" src="img/${img.id}.jpg" onclick="renderImg(this, ${(idx)})" />
            </div>
            `;
        });
        // <a class="meme-link" onclick="renderMeme(${(idx)})" href="#">
    elGallery.innerHTML = strHtmls.join('');
}


function renderSearch() {
    var elUserSearch = document.querySelector('#userSearch');
    var filter = elUserSearch.value.toLowerCase();
    var filteredImgs = [];
    var isAdded = false;
    // loop through all imgs in array.
    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        isAdded = false;
        // loop throgh all keywords per img and push only match to search query.
        // a condition isAdded is to prevent an image to be pushed more then once.
        for (var j = 0; j < img.keywords.length && isAdded === false; j++) {
            var word = img.keywords[j];
            if (word.includes(filter)) {
                filteredImgs.push(img)
                isAdded = true;
            }
        }
    }
    // render the filtered array. if the input in searchbox was deleted render the gImgs.
    if (filter) renderGallery(filteredImgs)
    else renderGallery(gImgs)
}


//TODO: fetch the idx and render it on canvas.
function renderImg(elImg, idx) {
    console.log ('render img', elImg);
    
    gMeme = gImgs.slice(idx, 1);
    console.log ('gMeme', gMeme);
    
    var elCanvas = document.querySelector('#canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height);
}



function renderFirstRow() {
    var elFirstRowInput = document.querySelector(".input-first-row");
    // console.log('first row input', elFirstRowInput);
    var text = elFirstRowInput.value;
    console.log('text', text);

    var elCanvas = document.querySelector('#canvas');
    var ctx = elCanvas.getContext("2d");
    ctx.font = "30px Arial";
    // ctx.fillText(text,10,50);
    ctx.fillRect(0, 130, canvas.width, 70);
}



// function renderGallery(imgs) {
//     for (var i = 0; i < imgs.length; i++) {
//         var strHtml = '';
//         strHtml += ` 
//             <div class="gallery-item">
//             <a class="meme-link" data-toggle="modal" onclick="renderMeme${(i)}" href="#meme-modal">
//             <div class="portfolio-hover">
//             <div class="portfolio-hover-content">
//             <i class="fa fa-plus fa-3x"></i>
//             </div>
//             </div>
//             <img class="img-thumb" src="img/${i + 1}.jpg" >
//             </a>
//             </div>
//             `;
//         var elGallery = document.querySelector('.meme-gallery');
//         elGallery.innerHTML += strHtml;
//     }
// }
