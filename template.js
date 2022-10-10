let git = document.getElementById('git');
let attrGit = git.attributes;

let card = `<div class='card'></div>`;

// Create the number of card wanted
for (let i = 0; i < attrGit.number.value; i++) {
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
                         'background-color: #fff;'+
                         'min-width: 280px;';
});

// add style to the git container
git.style.cssText = `width: ${attrGit.width.value};`+
                    ` height: ${attrGit.height.value};`+
                    'display: flex;'+
                    'flex-direction: row;'+
                    'flex-wrap: nowrap;'+
                    'justify-content: space-around;'+
                    'align-items: center;'+
                    'align-content: stretch;'+
                    'padding: 30px;'+
                    'background: #f00;';