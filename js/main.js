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
        keywords: ['sounds of music', 'give no fuck', 'i don\'t care']
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

function renderGallery() {
    for (var i = 0; i < gImgs.length; i++) {
        var strHtml = '';
        strHtml += ` 
            <div class="gallery-item">
            <a class="meme-link" data-toggle="modal" onclick="renderMeme${i}" href="#meme-modal">
            <div class="portfolio-hover">
            <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
            </div>
            </div>
            <img class="img-thumb" src="img/${i}.id.jpg" >
            </a>
            </div>
            `;
        var elGallery = document.querySelector('.meme-galllery');
        elGallery.innerHTML += strHtml;
    }
}


function getMeme() {
    gMeme = gImgs.slice(this, 1);
}