var gCurrLang = 'he';
var gTrans = {
    he : {
        SITE_TITLE : 'מחולל ממים',
        SITE_SUBTITLE: 'שים את זה מאחור',
        SURE : 'סגור על זה נשמה?',
        DELETE: 'השמד',
        MUKI: ''
    },
    en : {
        SITE_TITLE : 'Deleting Stuff',
        SITE_SUBTITLE: 'Put the past behind',
        SURE : 'Are you sure?',
        DELETE: 'Delete Now',
        COPY: 'Copy This'
    },
};

function getTrans(transKey) {
    return gTrans[gCurrLang][transKey];
}

function initLang() {
    var langParam = getParamFromURL('lang');
    if (langParam) {
        setLang(langParam);

        // Set the correct value of the languages drop down
        var elSelectLang = document.querySelector('.selectLang');
        elSelectLang.value = langParam;
    }

    translatePage();
}

function translatePage() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i=0; i<els.length; i++) {
        var el = els[i];

        var transKey = el.getAttribute('data-trans');
        el.innerText = getTrans(transKey);

    }  
}

function setLang(lang) {
    gCurrLang= lang;
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    translatePage();
}


function getParamFromURL(name) {
    var url = window.location.href;
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    var paramVal = results[2];
    return paramVal;
}

