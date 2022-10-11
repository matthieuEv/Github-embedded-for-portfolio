let git = document.getElementById('git');
let attrGit = git.attributes;

let card = `<div class='card'></div>`;

// Create the number of card wanted
let numberCard = !attrGit.number.value ? 3 : attrGit.number.value;

for (let i = 0; i < numberCard; i++) {
    git.innerHTML += card;
}

// add style to the card
document.querySelectorAll('.card').forEach((card) => {
    card.style.cssText = 'display: block;'+
                         'flex-grow: 0;'+
                         'flex-shrink: 1;'+
                         'flex-basis: auto;'+
                         'align-self: auto;'+
                         'order: 0;'+
                         'width: 100%;'+
                         'height: 100%;'+
                         'margin: 20px;'+
                         'margin-top: 50px;'+
                         'margin-bottom: 50px;'+
                         'background-color: #fff;';
});

// add style to the git container
let gitWidth;
let gitHeight;

typeof attrGit.width == 'undefined' ? gitWidth = '100%' : gitWidth = attrGit.width.value;
typeof attrGit.height == 'undefined' ? gitHeight = '500px' : gitHeight = attrGit.height.value;

git.style.cssText = `width: ${gitWidth};`+
                    ` height: ${gitHeight};`+
                    'display: flex;'+
                    'flex-direction: row;'+
                    'flex-wrap: nowrap;'+
                    'justify-content: space-around;'+
                    'align-items: center;'+
                    'align-content: stretch;'+
                    'padding: 60px;';                    