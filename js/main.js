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
        keywords: ['sound', 'music', 'give', 'no', 'fuck', 'care']
    },
    {
        id: 3,
        // url: 'img/3.jpg',
        keywords: ['no', 'time']
    },
    {
        id: 4,
        // url: 'img/4.jpg',
        keywords: ['cat', 'grumpy', 'no']
    },
    {
        id: 5,
        // url: 'img/5.jpg',
        keywords: ['success', 'kid', 'baby']
    },
    {
        id: 6,
        // url: 'img/6.jpg',
        keywords: ['kid', 'katorza']
    },
    {
        id: 7,
        // url: 'img/7.jpg',
        keywords: ['dog', 'happy', 'exciting']
    },
    {
        id: 8,
        // url: 'img/8.jpg',
        keywords: ['condescending', 'wonka']
    },
    {
        id: 9,
        // url: 'img/9.jpg',
        keywords: ['baby', 'evil', 'toddler']
    },
    {
        id: 10,
        // url: 'img/10.jpg',
        keywords: ['cat', 'shrek', 'begging']
    },
    {
        id: 11,
        // url: 'img/11.jpg',
        keywords: ['koala', 'suprised', 'begging']
    },
    {
        id: 12,
        // url: 'img/12.jpg',
        keywords: ['haim hecht', 'what', 'were', 'you', 'doing']
    },
];

var gMeme = {
    selectedImgId: '',
    elImg: '',
    txts: [{
        line: '',
        font: 'sans-serif',
        size: 40,
        align: 'center',
        color: 'white',
        x: '',
        y: '',
        shadow: 0,
    },
    {
        line: '',
        font: 'sans-serif',
        size: 40,
        align: 'center',
        color: 'white',
        x: '',
        y: '',
        shadow: 0,
    }]
};

var gElCanvas;
var gCtx;

// variable for load image from user computer.
var imageLoader = document.querySelector('#imageLoader');
imageLoader.addEventListener('change', handleImage, false);

// variable for toggle menu, open menu and close menu in mobile mode.
var menuOpen = false;

// variable for open / close tag cloud.
var tagView = false;


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
    tagView = false;
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

//CR: You can use naturalheight and width instead of playing with classes.
function selectImg(elImg, idx) {
    var elSection = document.querySelector('.meme-section');
    elSection.classList.remove('hide-meme-section')
    elImg.classList.remove('img-thumb');
    gElCanvas.width  = elImg.width;
    gElCanvas.height = elImg.height;
    
    // draw selcted img on canvas
    gMeme.selectedImgId = idx;
    gMeme.elImg = elImg;
    setGMeme();
    renderImg();
    elImg.classList.add('img-thumb');
    var elTopInput = document.querySelector('.input-top');
    elTopInput.value = '';
    var elBottomInput = document.querySelector('.input-bottom');
    elBottomInput.value = '';
    gElCanvas.scrollIntoView();    
}

function renderImg() {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    gCtx.drawImage(gMeme.elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function setGMeme() {
    gMeme.txts[0].x = gElCanvas.width / 2;
    gMeme.txts[0].y = 0 + 10;                   // padding-top top row
    gMeme.txts[1].x = gElCanvas.width / 2;
    gMeme.txts[1].y = gElCanvas.height - 10;    // padding-bottom bottom row
}

// CR: better in loop,
function renderRow() {
    gCtx.clearRect(0, 0, canvas.width, canvas.height);
    gCtx.drawImage(gMeme.elImg, 0, 0, gElCanvas.width, gElCanvas.height);

    var elTopInput = document.querySelector('.input-top');
    var topText = elTopInput.value;
    var elBottomInput = document.querySelector('.input-bottom');
    var bottomText = elBottomInput.value;

    for (var i = 0; i < gMeme.txts.length; i++) {
        gCtx.lineWidth = 4;
        gCtx.font = gMeme.txts[i].size + 'pt ' + gMeme.txts[i].font;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = gMeme.txts[i].color;
        gCtx.textAlign = gMeme.txts[i].align;
        gCtx.shadowColor = 'black';
        gCtx.shadowBlur = gMeme.txts[i].shadow;
        if (i === 0) {
            gCtx.textBaseline = 'top';
            gMeme.txts[i].line = topText
            var fromBottom = false;
        }
        else if (i === 1) {
            gCtx.textBaseline = 'bottom';
            gMeme.txts[i].line = bottomText;
            var fromBottom = true;
        }
        wrapText(gCtx, gMeme.txts[i].line, gMeme.txts[i].x, gMeme.txts[i].y, gMeme.width, 28, fromBottom);
    }

//     // global properties and upper text properties  
//     gCtx.lineWidth = 4;
//     gCtx.font = gMeme.txts[0].size + 'pt ' + gMeme.txts[0].font;
//     gCtx.strokeStyle = 'black';
//     gCtx.fillStyle = gMeme.txts[0].color;
//     gCtx.textAlign = gMeme.txts[0].align;
//     gCtx.shadowColor = 'black';
//     gCtx.shadowBlur = gMeme.txts[0].shadow;
//     gCtx.textBaseline = 'top';

//     var elTopInput = document.querySelector('.input-top');
//     var topText = elTopInput.value;
//     gMeme.txts[0].line = topText;

//     wrapText(gCtx, gMeme.txts[0].line, gMeme.txts[0].x, gMeme.txts[0].y, gMeme.width, 28, false);

//     // bottom text properties
//     gCtx.font = gMeme.txts[1].size + 'pt ' + gMeme.txts[1].font;
//     gCtx.strokeStyle = 'black';
//     gCtx.fillStyle = gMeme.txts[1].color;
//     gCtx.textAlign = gMeme.txts[1].align;
//     gCtx.textBaseline = 'bottom';
//     gCtx.shadowColor = 'black';
//     gCtx.shadowBlur = gMeme.txts[1].shadow;    


//     var elBottomInput = document.querySelector('.input-bottom');
//     var bottomText = elBottomInput.value;
//     gMeme.txts[1].line = bottomText;    

//     wrapText(gCtx, gMeme.txts[1].line, gMeme.txts[1].x, gMeme.txts[1].y, gMeme.width, 28, true);
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
            gMeme.txts[rowIdx].x = gElCanvas.width - 5;
            break;
        case 'left':
            gMeme.txts[rowIdx].x = 0 + 5;
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
        gMeme.txts[rowIdx].size += 5;
    } else {
        // console.log('dec font size');
        gMeme.txts[rowIdx].size -= 5;
    }
    renderRow();
}

function changeColor(value, rowIdx) {
    console.log('change color row:', rowIdx, 'color:', value);
    gMeme.txts[rowIdx].color = value;
    renderRow();
}

function dismissRow(rowIdx) {
    // console.log('dismiss row:', rowIdx);
    var txt = {
        line: '',
        font: 'sans-serif',
        size: 40,
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

function shadowEffect(rowIdx) {
    if (gMeme.txts[rowIdx].shadow === 0) {
        gMeme.txts[rowIdx].shadow = 20; 
    } else gMeme.txts[rowIdx].shadow = 0;
    renderRow();
}

function moveText(direction, rowIdx) {
    switch (direction) {
        case 'left':
            if (gMeme.txts[rowIdx].x > 0)                       gMeme.txts[rowIdx].x -= 5;
            break;
        case 'right':
        if (gMeme.txts[rowIdx].x < gElCanvas.width)             gMeme.txts[rowIdx].x += 5;
            break;
        case 'up':
            if (gMeme.txts[rowIdx].y > 0)                       gMeme.txts[rowIdx].y -= 5;
            break;
        case 'down':
            if (gMeme.txts[rowIdx].y < gElCanvas.height)        gMeme.txts[rowIdx].y += 5;
            break;
    }
    renderRow();
}

function textDirection() {
    if (gElCanvas.classList.value === 'canvas-rtl') {
        gElCanvas.classList.add('canvas-ltr');
        gElCanvas.classList.remove('canvas-rtl');
        
        var elInputText = document.querySelector('.input-top');
        elInputText.placeholder = 'Enter text';
        elInputText.classList.add('input-ltr')
        elInputText.classList.remove('input-rtl')
        
        var elInputText = document.querySelector('.input-bottom');
        elInputText.placeholder = 'Enter text';
        elInputText.classList.add('input-ltr')
        elInputText.classList.remove('input-rtl')

    } else if (gElCanvas.classList.value === 'canvas-ltr') {
        gElCanvas.classList.add('canvas-rtl');
        gElCanvas.classList.remove('canvas-ltr');
        
        var elInputText = document.querySelector('.input-top');
        elInputText.placeholder = 'הכנס טקסט כאן'; 
        elInputText.classList.add('input-rtl')
        elInputText.classList.remove('input-ltr')

        var elInputText = document.querySelector('.input-bottom');
        elInputText.placeholder = 'הכנס טקסט כאן';
        elInputText.classList.add('input-rtl')
        elInputText.classList.remove('input-ltr')
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
    if (!tagView) {
        var elGallery = document.querySelector('.meme-gallery');
        var keyWords = countWordApperances();
        var strHtmls = '';    
        // console.log(keyWords)
        
        for (var word in keyWords) {
            // console.log(word, keyWords[word]);
            var strHtml = ' <p class="key-size' + keyWords[word] + 
                '" onclick="setSearch(\'' + word + '\')" > ' + word + ' </p>';
            strHtmls += strHtml;
        }
        elGallery.innerHTML = strHtmls;
        tagView = true;
    } else {
        renderGallery(gImgs);
        tagView = false;
    }
}

function setSearch(word) {
    var elUserSearch = document.querySelector('#userSearch');
    elUserSearch.value = word;
    renderSearch();
}

function downloadImg(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'myMeme.jpg';
}

function showDropdown(buttonPosition) {
    var elButton = document.querySelector(buttonPosition)
    elButton.style.display = 'block';
}

function setFont(fontFamily, rowIdx, buttonPosition) {
    gMeme.txts[rowIdx].font = fontFamily;
    var elButton = document.querySelector(buttonPosition);
    elButton.style.display = 'none';
    renderRow();
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.src = event.target.result;
        img.onload = function(){
            gElCanvas.width = img.width;
            gElCanvas.height = img.height;
            gCtx.drawImage(img,0,0);
            setGMeme();
            gMeme.elImg = img;
        }
    }
    reader.readAsDataURL(e.target.files[0]);
    var elSection = document.querySelector('.meme-section');
    elSection.classList.remove('hide-meme-section')
    gElCanvas.scrollIntoView();
}

function toggleMenu() {
    if (window.innerWidth < 520) {
        menuOpen = !menuOpen;
        if (menuOpen) {
            console.log('menu open')
            openMenu();
        } else {
            console.log('menu close')
            closeMenu();
        }
    }
}

function closeMenu() {
    if (window.innerWidth < 520) {
        menuOpen = false;     
        document.querySelector('.mobile-menu').style.transform = 'scaleX(0)';
    }
}

function openMenu() {
    if (window.innerWidth < 520) {    
        menuOpen = true;    
        document.querySelector('.mobile-menu').style.transform = 'scaleX(1)';
    }
}