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
    elImg: '',
    txts: [{
        line: '',
        font: 'sans-serif',
        size: 20,
        align: 'center',
        color: 'white',
        x: '',
        y: '',
        shadow: 0,
    },
    {
        line: '',
        font: 'sans-serif',
        size: 20,
        align: 'center',
        color: 'white',
        x: '',
        y: '',
        shadow: 0,
    }]
};

var gElCanvas;
var gCtx;


function initPage() {
    renderGallery(gImgs);
    gElCanvas = document.querySelector('#canvas');  
    gCtx = gElCanvas.getContext('2d'); 
}


function renderGallery(imgs) {
    var elGallery = document.querySelector('.meme-gallery');
    var strHtmls = imgs.map(function (img, idx) {
        return `
            <div class="gallery-item">
            <img class="img-thumb" src="img/${img.id}.jpg" onclick="selectImg(this, ${(idx)})" />
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


function selectImg(elImg, idx) {
    // console.log('elImg', elImg);
    // console.log('idx', idx);

    // draw selcted img on canvas
    gMeme.selectedImgId = idx;
    gMeme.elImg = elImg;
    setGMeme();
    renderImg();
}


function renderImg() {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    gCtx.drawImage(gMeme.elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function setGMeme() {
    gMeme.txts[0].x = gElCanvas.width / 2;
    gMeme.txts[0].y = 0;
    gMeme.txts[1].x = gElCanvas.width / 2;
    gMeme.txts[1].y = gElCanvas.height;
}


// function 
function renderRow() {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    gCtx.drawImage(gMeme.elImg, 0, 0, gElCanvas.width, gElCanvas.height);


    // global properties and upper text properties  
    gCtx.lineWidth = 4;
    // ctx.font = '20pt sans-serif';
    gCtx.font = gMeme.txts[0].size + 'pt ' + gMeme.txts[0].font;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gMeme.txts[0].color;
    gCtx.textAlign = gMeme.txts[0].align;
    gCtx.textBaseline = 'top';
    gCtx.shadowColor = 'black';
    gCtx.shadowBlur = gMeme.txts[0].shadow;

    var elTopInput = document.querySelector('.input-top');
    // console.log('top text element', elTopText)
    var topText = elTopInput.value;
    gMeme.txts[0].line = topText;
    // console.log('top text', topText);

    wrapText(gCtx, gMeme.txts[0].line, gMeme.txts[0].x, gMeme.txts[0].y, 300, 28, false);

    // bottom text properties
    gCtx.font = gMeme.txts[1].size + 'pt ' + gMeme.txts[1].font;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gMeme.txts[1].color;
    gCtx.textAlign = gMeme.txts[1].align;
    gCtx.textBaseline = 'bottom';
    gCtx.shadowColor = 'black';
    gCtx.shadowBlur = gMeme.txts[1].shadow;    


    var elBottomInput = document.querySelector('.input-bottom');
    // console.log('bottom text', elBottomText)
    var bottomText = elBottomInput.value;
    gMeme.txts[1].line = bottomText;    

    // wrapText(ctx, bottomText, x, y, 300, 28, true);
    wrapText(gCtx, gMeme.txts[1].line, gMeme.txts[1].x, gMeme.txts[1].y, 300, 28, true);
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


function alignText(alignment, rowIdx) {
    gMeme.txts[rowIdx].align = alignment;
    switch (alignment) {
        case 'right':
            gMeme.txts[rowIdx].x = gElCanvas.width;
            break;
        case 'left':
            gMeme.txts[rowIdx].x = 0;
            break;
        case 'center':
            gMeme.txts[rowIdx].x = gElCanvas.width / 2;
            break;
    }
    renderRow();
}

function changeFontSize(change, rowIdx) {
    if (change === 'inc') {
        // console.log('inc font size');
        gMeme.txts[rowIdx].size++;
    } else {
        // console.log('dec font size');
        gMeme.txts[rowIdx].size--;
    }
    renderRow();
}

function changeColor(value, rowIdx) {
    console.log('change color row:', rowIdx, 'color:', value);
    gMeme.txts[rowIdx].color = value;
    renderRow();
}

function dismissRow(rowIdx) {
    console.log('dismiss row:', rowIdx);
    var txt = {
        line: '',
        font: 'sans-serif',
        size: 20,
        align: 'center',
        color: 'white',
        x: '',
        y: '',
        }
    gMeme.txts.splice(rowIdx, 1, txt);
    alignText('center', rowIdx);
    var elColor;
    var elInput;
    if (rowIdx === 0) {
        elColor = document.querySelector('.top-color');
        elInput = document.querySelector('.input-top');
    } else if (rowIdx === 1) {
        elColor = document.querySelector('.bottom-color');
        elInput = document.querySelector('.input-bottom');
    }
    elColor.value="#ffffff";
    elInput.value="";
    renderRow();
}

//TOFIX: HOW TO TOGGLE THIS???
function shadowEffect(rowIdx) {
    gMeme.txts[rowIdx].shadow = 20;
    renderRow();
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