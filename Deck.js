function SetupDeck()
{
	let deck = [];

	// create the deck
	for (let i in cards)
	{
		deck[i] = new Card(cards[i]);
	}
	// now shuffle it
	for (let i; shuffledDeck.length < deck.length; i++)
	{
		// grab a random card, check see if in shuffled deck already before adding, until all cards are in the shuffled deck
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
	this.owner = 0;
	this.image = imageLoader.GetImage('cards');
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.colW = 300;
	this.rowH = 415;
	this.col = (card[4] - 1) * this.colW;
	this.row = (card[5] - 1) * this.rowH;
	this.state = 'in deck'; // vs on "on table"
	this.purchase;
	this.Draw = function(x)
	{
		this.x = x;

		if (this.state = 'on table')
		{
			if (cardsPreview)
			{
				this.y = stageHeight - this.rowH;
				this.w = this.colW;
				this.h = this.rowH;
			}
			else
			{
				this.y = stageHeight * .9;
				this.w = Math.round(this.colW * .4);
				this.h = this.rowH * .4;
			}
		}
		ctx.drawImage(this.image, this.col, this.row, this.colW, this.rowH, this.x, this.y, this.w, this.h);
		// draw the card!
		// image, sprite x, sprite y, sprite width, sprite height, where x, where y, width, height 
	};
}

function GetNewCard()
{
	var card = shuffledDeck[0];
	// take the front card off the deck after grabbing it
	shuffledDeck.shift();
	return card;
}

function DealCards(arrayWhich, playerWiped)
{
	let cardX = 200;

	// swap the cards on the table for new cards from the shuffled deck
	for (let card = 0; card < arrayWhich.length; card++)
	{
		// card to reset will be 1 for reset E.G. [0, 1, 0]
		if (arrayWhich[card] === true)
		{
			cardsOnTable[card] = GetNewCard();
			cardsOnTable[card].state = 'on table';
			console.log(cardsOnTable[card]);
			
			// put swapped card to bottom of deck and get a new one
			// if (cardsOnTable[card] === undefined) 
			// {
			// 	shuffledDeck.push(cardsOnTable[card])
			// }
			// 
			// new Button(
			// 	cardsOnTable[card].name,
			// 	cardsOnTable[card].x,
			// 	Math.round(stageHeight - (cardsOnTable[card].h / 2.2)),
			// 	170,
			// 	265,
			// 	function ()
			// 	{
			// 		cardsPreview = !cardsPreview;
			// 	}
			// );
			//cardsOnTable[card].state = 'on table';
		}

		cardX += 190;
	}
	
	// costs 2 energy to wipe
	if (playerWiped)
	{
		players[currentPlayer].energy -= 2;
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
				players[p].cards[card][1].Draw();
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
