const cards = [
    ['Spade', 'A'],
    ['Diamond', 'J'],
    ['Club', '3'],
    ['Heart', '6'],
    ['Spade', 'K'],
    ['Club', '2'],
    ['Heart', 'Q'],
    ['Spade', '6'],
    ['Heart', 'J'],
    ['Spade', '10'],
    ['Club', '4'],
    ['Diamond', 'Q'],
    ['Diamond', '3'],
    ['Heart', '4'],
    ['Club', '7']
];

function compareCard(cardA, cardB) {
                
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const suits = ["Diamond", "Club", "Heart", "Spade"];

    const [suitA, rankA] = cardA; //['Club', '7']
    const [suitB, rankB] = cardB;

    const ranksDiff = ranks.indexOf(rankA) - ranks.indexOf(rankB);
    if (ranksDiff !== 0) {
        return ranksDiff;
    } else {
        return suits.indexOf(suitA) - suits.indexOf(suitB);
    }
}
                                    
// ['Club', '7']
const spadeCount = cards.reduce((acc, card) => {
    if(card[0] === "Spade") {
        return acc + 1;
    } else {
        return acc;
    }
}, 0)

// console.log(spadeCount);

const spadeCountV2 = cards.filter(card => card[0] === "Spade").length;

// console.log(spadeCountV2);

// Remove all the card that is smaller than ["Club", "3"].
const filteredCardSet = cards.filter(card => {
    return compareCard(card, ["Club", "3"]) >= 0;
})

console.log(filteredCardSet);

// Count the number of card which is of suit Diamond or Heart and with the rank larger than or equal to J.
const filteredCardSetV2 = cards.filter(card => {
    if((card[0] === "Diamond" || card[0] === "Heart") && compareCard(card, ["", "J"]) >= 0) {
        return true;
    } else {
        return false;
    }
})

console.log("filteredCardSetV2 length", filteredCardSetV2.length);

// Replace all of the cards with suit Club to suit Diamond, keeping the same rank.

const clubToDiamond = cards.map((card) => {
    if(card[0] === "Club") {
        return ["Diamond", card[1]] //card
    } else {
        return card;
    }
})

console.log("clubToDiamond", clubToDiamond);

// Replace all of the cards with rank A to rank 2. Keeping the same suit.

const ATo2 = cards.map((card) => {
    if(card[1] === "A") {
        return [card[0], "2"] //card
    } else {
        return card;
    }
})

console.log("ATo2", ATo2);