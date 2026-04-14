// ==UserScript==
// @name         Vinted country filter
// @namespace    http://tampermonkey.net/
// @version      2026-04-13
// @description  remove foreign results from vinted
// @author       gustav
// @match        https://www.vinted.se/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/8/86/Polandball.PNG
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const polishChars = /[ąćęłńóśźż]/;
    // Polish clothing-related keywords
    const polishWords = [
        "nowa", "nowy", "nowe",
        "stan", "idealny",
        "spodnie", "bluza", "koszulka",
        "sukienka", "kurtka", "buty",
        "rozmiar", "damska", "meska",
        "męskie", "adidasy", "trampki",
        "wysylka", "gratis", "sneakersky",
        "sneakersy",
        "uzywana", "używana",
        "sweter", "plaszczyk", "płaszcz",
        "odziez", "odzież",
        "sprzedam", "tanio" , "Białe"
    ];

    const finnishWords = [
        "kengät", "helsinki",
        "miesten", "lenkkarit"
        ]

    const swedishSizes = [
        "storlek","stl","strl",
        "passar","passform",
        "oversize","figursydd",
        "small","medium","large",
        "xs","s","m","l","xl","xxl",
        "36","38","40","42","44","46",
        "barn","dam","herr",
        "damer","herrar"
    ];

    const swedishCondition = [
        "skick","mycket bra skick",
        "bra skick","fint skick",
        "nyskick","nästan ny",
        "oanvänd","oanvänt",
        "använd","använt",
        "lite använd",
        "perfekt skick",
        "som ny",
        "helt ny",
        "ny med lapp",
        "ny utan lapp"
    ];

    const swedishSelling = [
        "säljer","säljes",
        "köpt","inköpt",
        "använd få gånger",
        "inte använd",
        "fint","fin","fina",
        "superfin",
        "populär",
        "trendig",
        "snygg",
        "klassisk"
    ];
    const swedishShipping = [
        "frakt","frakten",
        "skickas","skickar",
        "spårbart",
        "postnord",
        "paket",
        "leverans"
    ];

    const swedishColors = [
        "svart","vit","vita","svarta",
        "grå","gråa","grått",
        "beige","brun","bruna",
        "blå","blått","blåa",
        "marinblå","ljusblå","mörkblå",
        "grön","gröna","grönt",
        "röd","röda","rött",
        "rosa","lila","gul","gula",
        "orange","turkos",
        "randig","randigt","randiga",
        "mönstrad","mönster","prickig"
    ];

    const swedishClothing = [
        "tröja","tshirt","t-shirt","linne","hoodie","huvtröja",
        "blus","skjorta","kofta","cardigan","sweatshirt",
        "jacka","kappa","rock","väst",
        "jeans","byxor","shorts","kjol",
        "klänning","jumpsuit","overall",
        "kostym","blazer","kavaj",
        "underkläder","bh","trosor","boxers",
        "strumpor","strumpa","sockor",
        "skor","sneakers","stövlar","boots",
        "sandaler","tofflor","klackar",
        "mössa","keps","hatt",
        "handskar","vantar",
        "scarf","halsduk"
    ];


    const swedishWords = [
        ...swedishClothing,
        ...swedishColors,
        ...swedishSizes,
        ...swedishCondition,
        ...swedishSelling,
        ...swedishShipping
    ];

    function containsWholeWord(text, wordlist){
        return wordlist.some(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(text);
        });
    }

    function hidePolishListings() {
        const items = document.querySelectorAll('[data-testid="grid-item"]');

        items.forEach(item => {

            const link = item.querySelector('a[title]');
            if(!link) return;

            const text = link.title.toLowerCase();
            const onlyTitle = text.split(", varumärke")[0];

            const hasPolishChars = polishChars.test(text);

            const hasPolishWords = polishWords.some(word => text.includes(word));

            const hasFinnishWords = finnishWords.some(word => text.includes(word));

            const hasSwedishWords = containsWholeWord(onlyTitle, swedishWords);

            if(hasPolishWords || hasPolishChars || hasFinnishWords){
                item.style.display = "none";
            }
            else if(!hasSwedishWords){
                //item.style.display = "none";
                console.log(onlyTitle);
            }
        });

    }

    function hideForeignCurrency() {
        const items = document.querySelectorAll('[data-testid="grid-item"]');

        items.forEach(item => {
            const div = item.querySelector(".title-content")
            if (!div) return;

            const price = parseFloat(div.textContent.replace(',', '.'));
            if (!price) return;

            if (Number.isInteger(price)) return;

            item.style.display = "none";
        });
    }

    // Choose what to hide
    hideForeignCurrency();

    // Run again when scrolling / new items load
    const observer = new MutationObserver(() => {
        hideForeignCurrency(); //<<=== you'll have to add it here too!
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
