
function SetupDeck()
{
	let deck = [];

	// create the deck
	for (let i in cards)
	{
		deck[i] = new Card(cards[i]);
	}
	// now shuffle it
	// grab a random card, check see if in shuffled deck already before adding, until all cards are in the shuffled deck
	for (let i; shuffledDeck.length < deck.length; i++)
	{
		let randomCard = Math.floor(Math.random() * deck.length);
		
		if (shuffledDeck.indexOf(deck[randomCard]) === -1)
		{
			shuffledDeck.push(deck[randomCard]);
		}
	}
	
}

function Card(card)
{
	this.name = card[0];
	this.cost = card[1];
	this.type = card[2];
	this.desc = card[3];
	this.column = card[4];
	this.row = card[5];
	this.owner = 0;
	this.image;
	this.Draw = function Draw(size, whereX, whereY)
	{
		// subtracting dimensions to start at 0 column and 0 row
		// (column*width)-width = actual column
		let column = (this.column - 1) * cardSizeWidth;
		let row = (this.row - 1) * cardSizeHeight;
		// assigning temp vals in case they get drawn somewhere on accident
		let tempSizeWidth = 10;
		let tempSizeHeight = 10;
		
		if (size == 'big')
		{
			tempSizeWidth = cardSizeWidth / 2.2;
			tempSizeHeight = cardSizeHeight / 2.2;
		}
		else if (size == 'small')
		{
			tempSizeWidth = cardSizeWidth / 7;
			tempSizeHeight = cardSizeHeight / 7;
		}
		
		// draw the card!
		ctx.drawImage(imageLoader.GetImage('cards'), column, row, cardSizeWidth, cardSizeHeight, whereX, whereY, tempSizeWidth, tempSizeHeight);
	};
}

function GetNewCard()
{
	var card = shuffledDeck[0];
	// take the front card off the deck after grabbing it
	shuffledDeck.shift();
	return card;
}

function ResetCardsOnTable(cardsToReset,playerWiped)
{
	let cardX = 200;

	for (let card = 0; card < cardsToReset.length; card++)
	{
		// card slot will be 1 for reset E.G. [0, 1, 0]
		if (cardsToReset[card] === 1)
		{
			// put reset card to bottom of deck and get a new one
			// undefined is during the initial setup
			if (cardsOnTable[card] !== undefined) {shuffledDeck.push(cardsOnTable[card])}
			cardsOnTable[card] = GetNewCard();
		}

		
		new Button(cardsOnTable[card].name, cardX, Math.round(stageHeight - (cardSizeHeight / 2.2)), 170, 265, function ()
			{
				cardsPreview = !cardsPreview;
			});
		cardX += 190;
	}
	
	// costs 2 energy to wipe
	if (playerWiped !== undefined)
	{
		players[currentPlayer].energy -= 2;
		UpdateStats();
	}
}



function PurchaseCard()
{
	// ask the player which card to purchase
	var cardToPurchase = prompt(`Which card do you want to purchase?\n
		(1, 2, or 3)`);
	// anticipate which cards to refresh
	var cardReset = [0,0,0];
	
	if (isNaN(cardToPurchase) || cardToPurchase > 3)
	{
		alert('Incorrect entry.');
		PurchaseCard();
	}
	
	switch (cardToPurchase)
	{
		case '1': cardReset = [1,0,0]; break;
		case '2': cardReset = [0,1,0]; break;
		case '3': cardReset = [0,0,1]; break;
		// don't ask again if not 1-3
		default: return;
	}
	// decrement for array's sake
	cardToPurchase -= 1;
	
	// ========================================================
	// insert logic for card cost reductions
	// alien metabolism, 
	
	if (players[currentPlayer].energy >= cardsOnTable[cardToPurchase].cost)
	{
		Ticker(`Player ${currentPlayer} bought ${cardsOnTable[cardToPurchase].name}!`);
		// deduct the cost
		players[currentPlayer].energy -= cardsOnTable[cardToPurchase].cost;
		UpdateStats();
		// stockpile Keep cards
		if (cardsOnTable[cardToPurchase].type == 'Keep')
		{
			// add cards to player collection and the current cards out
			players[currentPlayer].cards.push([cardsOnTable[cardToPurchase].name,cardsOnTable[cardToPurchase]]);
			cardsOut.push([cardsOnTable[cardToPurchase].name,cardsOnTable[cardToPurchase]]);
			cardsOnTable[cardToPurchase].owner = currentPlayer;
			ShowPlayerCards();
		}
		
		// play Discards right away
		PlayNow(cardsOnTable[cardToPurchase].name);
		
		// Dedicated News Team earns an extra point for buying a card
		if (players[currentPlayer].cards.indexOf('Dedicated News Team') > -1)
		{
			PlayKeep('Dedicated News Team');
		}
		
		// deal a new card for the one purchased
		ResetCards(cardReset);
	}
	else
	{
		alert(`You can't afford that card.\n
			Cost: ${cardsOnTable[cardToPurchase].cost}\n
			Your Energy: ${players[currentPlayer].energy}`);
	}
}



function ShowPlayerCards()
{
	var cardsX;
	var cardsY;
	
	
	for (var p = 1; p <= playerCount; p++)
	{
		if (players[p].cards.length > 0)
		{
			// set where the players hand should start
			switch(p)
			{
				case 1:
					cardsX = 10;
					cardsY = 150;
					break;
				case 2:
					cardsX = stageWidth - monsterHeadWidth;
					cardsY = 150;
					break;
				case 3:
					cardsX = 10;
					cardsY = stageHeight - 150;
					break;
				case 4:
					cardsX = stageWidth - monsterHeadWidth;
					cardsY = stageHeight - 150;
					break;
			}
		
			// draw the players hand
			for (var card = 0; card < players[p].cards.length; card++)
			{
				players[p].cards[card][1].Draw('small', cardsX, cardsY);
				cardsX += 15;
			}
		}
	}
}


// var diceRoll sequence is... health, 1, 2, 3, attack, energy

// ===============
// IMPORTANT
// ===============
// Remember to check for player.alive before affecting their attributes.
// function cardAction(card)
// {
// 	console.log('card action');
// 	// DISCARD cards and KEEP cards to play immediately
// 	playKeep(card);
// }
