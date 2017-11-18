//TODO: Dynamic canvas - the canvas should be in same ratio as original img.
//TODO: fix the dropdown menu for font, clikable and not hover.
//TODO: shadow button should be toggled on/off. i can now only turn it on.
//TOOD: nav-bar
//TODO: about us section
//TODO: upload a file.
//TODO: canvas area should be height zero and open only by chosing an img or upload a file. 



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

var gElImg;

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


function renderImg(elImg, idx) {
    // console.log('elImg', elImg);
    // console.log('idx', idx);

    // draw selcted img on canvas
    gElImg = elImg;
    var elCanvas = document.querySelector('#canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height);
}

function renderRow() {
    var elCanvas = document.querySelector('#canvas');
    var ctx = elCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gElImg, 0, 0, elCanvas.width, elCanvas.height);


    // global properties and upper text properties  
    ctx.lineWidth = 4;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    var elTopInput = document.querySelector('.input-top');
    // console.log('top text element', elTopText)
    var topText = elTopInput.value;
    // console.log('top text', topText);
    var x = elCanvas.width / 2;
    var y = 0;

    wrapText(ctx, topText, x, y, 300, 28, false);

    // bottom text properties
    ctx.textBaseline = 'bottom';
    var elBottomInput = document.querySelector('.input-bottom');
    // console.log('bottom text', elBottomText)
    var bottomText = elBottomInput.value;
    y = elCanvas.height;

    wrapText(ctx, bottomText, x, y, 300, 28, true);
}


function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

    var pushMethod = (fromBottom) ? 'unshift' : 'push';

    lineHeight = (fromBottom) ? -lineHeight : lineHeight;

    var lines = [];
    var y = y;
    var line = '';
    var words = text.split(' ');

    for (var n = 0; n < words.length; n++) {
        var testLine = line + ' ' + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines[pushMethod](line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines[pushMethod](line);

    for (var k in lines) {
        context.strokeText(lines[k], x, y + lineHeight * k);
        context.fillText(lines[k], x, y + lineHeight * k);
    }
}


function countWordApperances() {
    var countWordApperances = {};

    for (var i = 0; i < gImgs.length; i++) {
        var img = gImgs[i];
        for (var j = 0; j < img.keywords.length; j++) {
            if (!countWordApperances[img.keywords[j]]) {
                countWordApperances[img.keywords[j]] = 0;
            }
            countWordApperances[img.keywords[j]]++;
        }
    }
    return countWordApperances;
}

function tagCloud() {
    var elGallery = document.querySelector('.meme-gallery');
    var keyWords = countWordApperances();
    var strHtmls = '';    
    // console.log(keyWords)
    
    for (var word in keyWords) {
        // console.log(word, keyWords[word]);
        var strHtml = ' <p class="key-size' + keyWords[word] + 
            '" onclick="setSearch(\'' + word + '\')" > ' + word + ' </p>';
        strHtmls += strHtml;
    };
    elGallery.innerHTML = strHtmls;
}

function setSearch(word) {
    var elUserSearch = document.querySelector('#userSearch');
    elUserSearch.value = word;
    renderSearch();
}