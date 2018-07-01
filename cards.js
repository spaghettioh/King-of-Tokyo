/****************************************
cards.js
Created by Eric Mofield
http://www.spaghettioh.com
King of Tokyo Copyright Richard Garfield and Iello Games
****************************************/

var cardSizeWidth = 300;
var cardSizeHeight = 415;

var cards = [
// ==================
// Name, Cost, Type (discard/keep), Description, img pos X (col), img pos Y (row)
// ==================

['Acid Attack', 6, 'Keep', 'Deal 1 damage each turn even if you don\'t attack.', 2, 1], 
['Alien Metabolism', 3, 'Keep', 'Buying cards costs 1 less Energy.', 3, 1], 
['Alpha Monster', 5, 'Keep', '+1 point when you attack.', 4, 1], 
['Apartment Building', 5, 'Discard', '+3 points', 5, 1], 
// ['Armor Plating', 4, 'Keep', 'Ignore damage of 1.', 6, 1], 
['Background Dweller', 4, 'Keep', 'You can always reroll any [3] you have.', 7, 1], 
// ['Burrowing', 5, 'Keep', 'Deal 1 extra damage on Tokyo. Deal 1 damage when yielding Tokyo to the monster taking it.', 8, 1], 
// ['Camouflage', 3, 'Keep', 'If you take damage roll a die for each damage point. On a [Heart] you do not take that damage point.', 2, 1], 
['Commuter Train', 4, 'Discard', '+2 points', 2, 2], 
['Complete Destruction', 3, 'Keep', '+9 extra points if you roll [1][2][3][Heart][Attack][Energy].', 3, 2], 
['Corner Store', 3, 'Discard', '+1 point', 4, 2], 
['Death from Above', 5, 'Discard', '+2 points and take control of Tokyo if you don\'t already control it.', 5, 2], 
['Dedicated News Team', 3, 'Keep', '+1 point whenever you buy a card.', 6, 2], 
// ['Eater of the Dead', 4, 'Keep', '+3 points every time a monster's [Heart] goes to 0.', 7, 2], 
['Energize', 8, 'Discard', '+9 Energy', 8, 2], 
// ['Energy Hoarder', 3, 'Keep', 'You gain 1 point for every 6[Energy] you have at the end of your turn.', 1, 3], 
['Evacuation Orders', 7, 'Discard', 'All other monsters lose 5 points.', 2, 3], // two of this card
['Evacuation Orders', 7, 'Discard', 'All other monsters lose 5 points.', 2, 3], 
['Even Bigger', 4, 'Keep', 'Max health +2. Heal 2 when you get this card.', 3, 3], 
['Extra Head', 7, 'Keep', '1 extra die.', 4, 3], // two of this card
['Extra Head', 7, 'Keep', '1 extra die.', 4, 3], 
['Fire Blast', 3, 'Discard', 'Deal 2 damage to all other monsters.', 5, 3], 
// ['Fire Breathing', 4, 'Keep', 'Your neighbors take 1 extra damage when you deal damage', 6, 3], 
// ['Freeze Time', 5, 'Keep', 'On a turn where you score [1][1][1],  you can take another turn with one less die.', 7, 3], 
['Frenzy', 7, 'Discard', 'Take another turn after this one.', 8, 3], 
['Friend of Children', 3, 'Keep', '+1 Energy when you gain any Energy.', 1, 4], 
['Gas Refinery', 6, 'Discard', '+2 points and deal 3 damage to all other monsters.', 2, 4], 
['Giant Brain', 5, 'Keep', 'One extra reroll each turn.', 3, 4], 
['Gourmet', 4, 'Keep', '+2 points when scoring [1][1][1].', 4, 4], 
['Heal', 3, 'Discard', 'Heal 2 damage.', 5, 4], 
// ['Healing Ray', 4, 'Keep', 'You can heal other monsters with your [Heart] results. They must pay you 2[Energy] for each damage you heal (or their remaining [Energy] if they haven't got enough.', 6, 4], 
// ['Herbivore', 5, 'Keep', '+1 point if you don't damage anyone.', 7, 4], 
// ['Herd Culler', 3, 'Keep', 'You can change one of your dice to a [1] each turn.', 8, 4], 
['High Altitude Bombing', 4, 'Discard', 'All monsters including you take 3 damage.', 1, 5], 
// ['It Has a Child', 7, 'Keep', 'If you are eliminated discard all your cards and lose all your  points,  Heal to 10[Heart] and start again.', 2, 5], 
['Jet Fighters', 5, 'Discard', '+5 points and take 4 damage', 3, 5], 
['Jets', 5, 'Keep', 'You suffer no damage when yielding Tokyo.', 4, 5], 
// ['Made in a Lab', 2, 'Keep', 'When purchasing cards you can peek at and purchase the top card of the deck.', 5, 5], 
// ['Metamorph', 3, 'Keep', 'At the end of your turn you can discard any keep cards you have to receive the [Energy] they were purchased for.', 6, 5], 
// ['Mimic', 8, 'Keep', 'Choose a card any monster has in play and put a mimic counter on it. This card counts as a duplicate of that card as if it just had been bought. Spend 1[Energy] at the start of your turn to change the power you are mimicking.', 7, 5], 
// ['Monster Batteries', 2, 'Keep', 'When you purchase this put as many [Energy] as you want on it from your reserve. Match this from the bank. At the start of each turn take 2[Energy] off and add them to your reserve. When there are no [Energy] left discard this card.', 8, 5], 
['National Guard', 3, 'Discard', '+2 points and take 2 damage.', 1, 6], 
['Nova Breath', 7, 'Keep', 'Attacks damage all other monsters.', 2, 6], 
['Nuclear Power Plant', 6, 'Discard', '+2 points and heal 3 damage.', 3, 6], 
['Omnivore', 4, 'Keep', '+2 extra points if you score [1][2][3].', 4, 6], 
// ['Opportunist', 3, 'Keep', 'Whenever a new card is revealed you have the option of purchasing it as soon as it is revealed.', 5, 6], 
// ['Parasitic Tentacles', 4, 'Keep', 'You can purchase cards from other monsters. Pay them the [Energy] cost.', 6, 6], 
// ['Plot Twist', 3, 'Keep', 'Change one die to any result. Discard when used.', 7, 6], 
['Poison Quills', 3, 'Keep', 'Deal 2 damage when you score [2][2][2].', 8, 6], 
// ['Poison Spit', 4, 'Keep', 'When you deal damage to monsters give them a poison counter. Monsters take 1 damage for each poison counter they have at the end of their turn. You can get rid of a poison counter with a [Heart] (that [Heart] doesn't heal a damage also).', 1, 7], 
// ['Psychic Probe', 3, 'Keep', 'You can reroll a die of each other monster once each turn. If the reroll is [Heart] discard this card.', 2, 7], 
// ['Rapid Healing', 3, 'Keep', 'Spend 2[Energy] at any time to heal 1 damage.', 3, 7], 
['Regeneration', 4, 'Keep', 'Heal 1 extra damage when you heal.', 4, 7], 
// ['Rooting for the Underdog', 3, 'Keep', 'At the end of a turn when you have the fewest  points gain 1  points.', 5, 7], 
// ['Shrink Ray', 6, 'Keep', 'When you deal damage to monsters give them a shrink counter. A monster rolls one less die for each shrink counter. You can get rid of a shrink counter with a [Heart] (that [Heart] doesn't heal a damage also).', 6, 7], 
['Skyscraper', 6, 'Discard', '+4 points', 7, 7], 
// ['Smoke Cloud', 4, 'Keep', 'This card starts with 3 charges. Spend a charge for an extra reroll. Discard this card when all charges are spent.', 8, 7], 
// ['Solar Powered', 2, 'Keep', 'At the end of your turn gain 1[Energy] if you have no [Energy].', 1, 8], 
['Spiked Tail', 5, 'Keep', 'Deal 1 extra damage when you attack.', 2, 8], 
// ['Stretchy', 3, 'Keep', 'You can spend 2[Energy] to change one of your dice to any result.', 3, 8], 
['Tanks', 4, 'Discard', '+4 points and take 3 damage.', 4, 8], 
// ['Telepath', 4, 'Keep', 'Spend 1[Energy] to get 1 extra reroll.', 5, 8], 
// ['Urbavore', 4, 'Keep', 'Gain 1 extra  points when beginning the turn in Tokyo. Deal 1 extra damage when dealing any damage from Tokyo.', 6, 8], 
// ['We're Only Making It Stronger', 3, 'Keep', 'When you lose 2[Heart] or more gain 1[Energy].', 7, 8], 
// ['Wings', 6, 'Keep', 'Spend 2[Energy] to negate damage to you for a turn.', 8, 8], 
['Vast Storm', 6, 'Discard', '+2 points and all other monsters lose 1 Energy for every 2 they have.', 1, 9]
];

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
	this.image = 
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
	for (var card = 0; card < cardsToReset.length; card++)
	{
		// card slot will be 1 for reset [0, 1, 0]
		if (cardsToReset[card] == 1)
		{
			// put reset card to bottom of deck and get a new one
			// undefined is during the initial setup
			if (cardsOnTable[card] != undefined) {shuffledDeck.push(cardsOnTable[card])}
			cardsOnTable[card] = GetNewCard();
		}
	}
	
	// costs 2 energy to wipe
	if (playerWiped != undefined)
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

function PlayCardNow(card)
{
	// setup loop vars to save some text
	var p = 0;
	var enemy = 0;
	
	switch(card)
	{
		case 'Apartment Building':  // Discard - + 3 points
			players[currentPlayer].score += 3;
			Ticker('Gained 3 Victory Points!');
			break;
		case 'Commuter Train':  // Discard - + 2 points
			players[currentPlayer].score += 2;
			Ticker('Gained 2 Victory Points!');
			break;
		case 'Corner Store':  // Discard - + 1 point
			players[currentPlayer].score += 1;
			Ticker('Gained 1 Victory Point!');
			break;
		case 'Drop from High Altitude':  // Discard - + 2 points and take control of Tokyo if you don't already control it.
			if (players[currentPlayer].isInTokyo == false)
			{
				for (enemy = 1; enemy <= playerCount; e++)
				{
					if (enemy != currentPlayer && players[enemy].isInTokyo == true)
					{
						players[enemy].isInTokyo = false;
						players[currentPlayer].isInTokyo = true;
						players[currentPlayer].score +=3;
						Ticker(`Player ${currentPlayer} kicks player ${enemy} out of Tokyo\n
							and gains 2 (+1) Victory Points!`);
						break;
					}
				}
			}
			else
			{
				players[currentPlayer].score += 2;
				Ticker('Gained 2 Victory Points!');
			}
			break;
		case 'Energize':  // Discard - + 9Energy
			players[currentPlayer].energy += 9;
			Ticker('You spent 8 Energy to gain 9 Energy!');
			break;
		case 'Evacuation Orders':  // Discard - All other monsters lose 5 points.
			for (var enemy = 1; enemy <= playerCount; enemy++)
			{
				if (enemy != currentPlayer && players[enemy].alive == true)
				{
					players[enemy].score -= 5;
				}
			}
			Ticker('All other players lose 5 Victory Points!');
			break;
		case 'Even Bigger':  // Keep - Your maximum health is increased by 2. Gain 2Heart when you get this card.
			players[currentPlayer].healthMax = 12;
			players[currentPlayer].health += 2;
			Ticker(`Player ${currentPlayer}'s max health goes up 2 and heals 2!`);
			break;
		case 'Extra Head':  // Keep - You get 1 extra die.
			players[currentPlayer].diceCount += 1;
			Ticker(`Player ${currentPlayer} gets an extra die!`);
			break;
		case 'Fire Blast':  // Discard - Deal 2 damage to all other monsters.
			for (var enemy = 1; enemy <= playerCount; enemy++)
			{
				if (enemy != currentPlayer && players[enemy].alive == true)
				{
					players[enemy].health -= 2;
				}
			}
			Ticker('All other players lose 2 health!');
			break;
		case 'Frenzy':  // Discard - When you purchase this card Take another turn immediately after this one.
			Ticker(`Player ${currentPlayer} takes another turn!`);
			currentPlayer--;
			break;
		case 'Gas Refinery':  // Discard - + 2 points and deal 3 damage to all other monsters.
			players[currentPlayer].score += 2;
			for (var enemy = 1; enemy <= playerCount; enemy++)
			{
				if (enemy != currentPlayer && players[enemy].alive == true)
				{
					players[enemy].health -= 3;
				}
			}
			Ticker(`Player ${currentPlayer} gains 2 Victory Points and all other players lose 3 health!`);
			break;
		case 'Giant Brain':  // Keep - You have one extra reroll each turn.
			players[currentPlayer].rollCount += 1;
			Ticker(`Player ${currentPlayer} gains an extra reroll each turn!`);
			break;
		case 'Heal':  // Discard - Heal 2 damage.
			players[currentPlayer].health += 2;
			Ticker(`Player ${currentPlayer} gains 2 health!`);
			break;
		case 'High Altitude Bombing':  // Discard - All monsters (including you) take 3 damage.
			for (var player = 1; player <= playerCount; player++)
			{
				if (players[player].alive == true)
				{
					players[player].health -= 3;
				}
			}
			Ticker('All players lose 3 health!');
			break;
		case 'Jet Fighters':  // Discard - + 5 points and take 4 damage
			players[currentPlayer].score += 5;
			players[currentPlayer].health -= 4;
			Ticker(`Player ${currentPlayer} gains 5 Victory Points and loses 4 health!`);
			break;
		case 'National Guard':  // Discard - + 2 points and take 2 damage.
			players[currentPlayer].score += 2;
			players[currentPlayer].health -= 2;
			Ticker(`Player ${currentPlayer} gains 2 Victory Points and loses 2 health!`);
			break;
		case 'Nuclear Power Plant':  // Discard - + 2 points and heal 3 damage.
			players[currentPlayer].score += 2;
			players[currentPlayer].health += 3;
			Ticker(`Player ${currentPlayer} gains 2 Victory Points and heals 3 health!`);
			break;
		case 'Skyscraper':  // Discard - + 4 points
			players[currentPlayer].score += 4;
			Ticker(`Player ${currentPlayer} gains 4 Victory Points!`);
			break;
		case 'Tanks':  // Discard - + 4 points and take 3 damage.
			players[currentPlayer].score += 4;
			players[currentPlayer].health +- 3;
			Ticker(`Player ${currentPlayer} gains 4 Victory Points and loses 3 health!`);
			break;
		case 'Vast Storm':  // Discard - + 2 points. All other monsters lose 1Energy for every 2Energy they have.
			players[currentPlayer].score += 2;
			for (var enemy = 1; enemy <= playerCount; enemy++)
			{
				if (enemy != currentPlayer && players[enemy].alive == true)
				{
					players[enemy].energy = Math.ceil(players[enemy].energy / 2);
				}
			}
			Ticker(`Player ${currentPlayer} gains 2 Victory Points and all other players lose 1 Energy for every 2 Energy they have!`);
			break;
	}
	
	UpdateStats();
}



function PlayCardResolve(card)
{
	// setup loop vars to save some text
	var p = 0;
	var enemy = 0;
	
	switch(card)
	{
		case 'Acid Attack':  // Keep - Deal 1 extra damage each turn (even when you don't otherwise attack).
			if (players[currentPlayer].isInTokyo == true)
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					// avoid affecting dead players
					if (currentPlayer != enemy && players[enemy].alive == true)
					{
						players[enemy].health--;
					}
				}
			}
			// otherwise attack tokyo
			else
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					if (currentPlayer != enemy && players[enemy].isInTokyo == true)
					{
						players[enemy].health--;
					}
				}
			}
			Ticker('You dealt 1 extra damage Acid Attack!');
			break;
		case 'Alpha Monster':  // Keep - Gain 1 point when you attack.
			if (diceRoll[4].length > 0)
			{
				players[currentPlayer].score++;
				Ticker('You gained a point with Alpha Monster!');
			}
			break;
		case 'Complete Destruction':  // Keep - If you roll 123HeartAttackEnergy gain 9 points in addition to the regular results.
			if (diceRoll[0].length >= 1 && diceRoll[1].length >= 1 && diceRoll[2].length >= 1 && 
			diceRoll[3].length >= 1 && diceRoll[4].length >= 1 && diceRoll[5].length >= 1)
			{
				players[currentPlayer].score += 9;
				Ticker('Gained 9 points for rolling one of everything! Nice!');
			}
			break;
		case 'Fire Breathing':  // Keep - Your neighbors take 1 extra damage when you deal damage
			if (diceRoll[4].length > 0)
			{
				var nextPlayer = currentPlayer + 1;
				var prevPlayer = currentPlayer - 1;
				
				if (nextPlayer > playerCount) {nextPlayer = 1}
				if (prevPlayer <= 0) {prevPlayer = playerCount}
				console.log(`next player: ${nextPlayer} prev player: ${prevPlayer}`);
				
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					if ((enemy == nextPlayer || enemy == prevPlayer) && players[enemy].alive == true)
					{
						players[enemy].health--;
					}
				}
				Ticker(`Player ${currentPlayer}'s neighbors took damage from Fire Breathing!`);
			}
			break;
		case 'Gourmet':  // Keep - When scoring 111 gain 2 extra  points.
			if (diceRoll[1].length >= 3)
			{
				players[currentPlayer].score += 2;
				Ticker(`Gained an extra 2 points for rolling three or more 1's!`);
			}
			break;
		case 'Nova Breath':  // Keep - Your attacks damage all other monsters.
			if (diceRoll[4].length > 0)
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					if (currentPlayer != enemy && players[enemy].alive == true) {players[enemy].health -= diceRoll[4].length}
				}
				Ticker('Your attacks damaged all other players!');
			}
			break;
		case 'Omnivore':  // Keep - Once each turn you can score 123 for 2 points. You can use these dice in other combinations.
			if (diceRoll[1].length >= 1 && diceRoll[2].length >= 1 && diceRoll[3].length >= 1)
			{
				players[currentPlayer].score += 2;
				Ticker('Scored an extra two points for rolling one or more of 1, 2, & 3!');
			}
			break;
		case 'Poison Quills':  // Keep - When you score 222 also deal 2 damage.
			if (diceRoll[2].length >= 3)
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					// when in Tokyo attack others
					if (players[currentPlayer].isInTokyo)
					{
						if (currentPlayer != enemy && players[enemy].alive == true)
						{
							players[enemy].health -= 2;
						}
					}
					// otherwise attack Tokyo
					else
					{
						if (currentPlayer != enemy && players[enemy].alive == true && players[enemy].isInTokyo == true)
						{
							players[enemy].health -= 2;
						}
					}
				}
				Ticker(`Dealt 2 damage for rolling three 2's!`);
			}
			break;
		case 'Regeneration':  // Keep - When you heal, heal 1 extra damage.
			if (diceRoll[0].length > 0)
			{
				players[currentPlayer].health++;
				Ticker('Healed 1 extra with Regeneration!');
			}
			break;
		case 'Spiked Tail':  // Keep - When you attack deal 1 extra damage.
			if (diceRoll[4].length > 0)
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					if (players[currentPlayer].isInTokyo)
					{
						if (currentPlayer != enemy && players[enemy].alive == true)
						{
							players[enemy].health--;
						}
					}
					else
					{
						if (currentPlayer != enemy && players[enemy].alive == true && players[enemy].isInTokyo == true)
						{
							players[enemy].health--;
						}
					}
				}
				Ticker('Dealt 1 extra damage with that Spiked Tail!');
			}
			break;
	}
}

function PlayKeep(card)
{
	// setup loop vars to save some text
	var p = 0;
	var enemy = 0;
	
	switch(card)
	{
		case 'Alien Metabolism':  // Keep - Buying cards costs you 1 less Energy.
			Ticker('Cards cost you one less energy!');
			players[currentPlayer].energy++;
			purchaseCard();
			players[currentPlayer].energy--;
			break;
		case 'Armor Plating':  // Keep - Ignore damage of 1.
			if (diceRoll[4].length > 0)
			{
				console.log('ignore 1 damage');
			}
			break;
		case 'Background Dweller':  // Keep - You can always reroll any 3 you have.
			var reroll3 = prompt('Wanna reroll a 3? (Y / N)');
			var threes = [];
			if (reroll3.toLowerCase() == 'y')
			{
				for (var d in rolledDice)
				{
					if (rolledDice[d] == '3')
					{
						threes.push(Number(d) + 1);
					}
				}
				reroll3 = prompt(`Which 3? (${threes})`);
// 				var ypos = 40;
	
// //				for (var i = 0; i <= players[currentPlayer].diceCount; i++)
// //				{
// //					if (keptDice[i] == false || keptDice[i] == undefined)
// //					{
// 						rolledDice[reroll] = new setupDice().sides[Math.floor(Math.random()*6)];
// 			
// 						ctx.clearRect(220, ypos + (20 * reroll3) -10, 80, 20);
// 						// number the dice
// 						ctx.fillText((reroll3 + 1) + ':    ' + rolledDice[reroll3],220,ypos + (20 * reroll3));
// 					}
// 		
// 					// move down 20px
// 					ypos += 20;
// 				}
// 	
// 				tumble--;
// 	
// 				// keep tumbling
// 				if (tumble > 1)
// 				{
// 					ctx.clearRect(0,170,100,20);
// 					ctx.fillText('Rolling...',10,180);
// 					canRoll = false;
// 					setTimeout(function(){rollDice(tumble)},500/tumble);
// 				}
// 				else
// 				{
// 					ctx.clearRect(0,170,100,20);
// 					currentRoll++;
// 					canRoll = true;
// 		
// 					if (currentRoll == players[currentPlayer].rollCount)
// 					{
// 						resolveDice();
// 						canRoll = false;
// 					}
// 				}
			}
			break;
		case 'Burrowing':  // Keep - Deal 1 extra damage on Tokyo. Deal 1 damage when yielding Tokyo to the monster taking it.
			if (diceRoll[4].length > 0)
			{
				console.log('Deal 1 extra damage in Tokyo');
			}
			break;
		case 'Camouflage':  // Keep - If you take damage roll a die for each damage point. On a Heart you do not take that damage point.
			if (diceRoll[4].length > 0)
			{
				console.log('Roll hearts to heal damage');
			}
			break;
		case 'Dedicated News Team':  // Keep - Gain 1 point whenever you buy a card.
			Ticker('Your Dedicated News Team earned you a point for buying a card!');
			players[currentPlayer].score++;
			UpdateStats();
			break;
		case 'Eater of the Dead':  // Keep - Gain 3 points every time a monster's Heart goes to 0.
			
			break;
		case 'Energy Hoarder':  // Keep - You gain 1 point for every 6Energy you have at the end of your turn.
			
			break;
		case 'Freeze Time':  // Keep - On a turn where you score 111, you can take another turn with one less die.
			
			break;
		case 'Friend of Children':  // Keep - When you gain any Energy gain 1 extra Energy.
			if (diceRoll[5].length > 0)
			{
				players[currentPlayer].energy++;
				Ticker(`Gained 1 extra energy for being a friend of children! D'aww.`);
			}
			break;
		case 'Healing Ray':  // Keep - You can heal other monsters with your Heart results. They must pay you 2Energy for each damage you heal (or their remaining Energy if they haven't got enough.
			
			break;
		case 'Herbivore':  // Keep - Gain 1 point on your turn if you don't damage anyone.
			if (diceRoll[4].length == 0)
			{
				players[currentPlayer].score++;
				Ticker('Earned a point for being a pacifist.');
			}
			break;
		case 'Herd Culler':  // Keep - You can change one of your dice to a 1 each turn.
			
			break;
		case 'It Has a Child':  // Keep - If you are eliminated discard all your cards and lose all your points, Heal to 10[Heart] and start again.
			
			break;
		case 'Jets':  // Keep - You suffer no damage when yielding Tokyo.
			Ticker('Player used Jets and took no damage!');
			break;
		case 'Made in a Lab':  // Keep - When purchasing cards you can peek at and purchase the top card of the deck.
			
			break;
		case 'Metamorph':  // Keep - At the end of your turn you can discard any keep cards you have to receive the Energy they were purchased for.
			
			break;
		case 'Mimic':  // Keep - Choose a card any monster has in play and put a mimic counter on it. This card counts as a duplicate of that card as if it just had been bought. Spend 1Energy at the start of your turn to change the power you are mimicking.
			
			break;
		case 'Monster Batteries':  // Keep - When you purchase this put as many Energy as you want on it from your reserve. Match this from the bank. At the start of each turn take 2Energy off and add them to your reserve. When there are no Energy left discard this card.
			
			break;
		case 'Opportunist':  // Keep - Whenever a new card is revealed you have the option of purchasing it as soon as it is revealed.
			
			break;
		case 'Parasitic Tentacles':  // Keep - You can purchase cards from other monsters. Pay them the Energy cost.
			
			break;
		case 'Plot Twist':  // Keep - Change one die to any result. Discard when used.
			
			break;
		case 'Poison Spit':  // Keep - When you deal damage to monsters give them a poison counter. Monsters take 1 damage for each poison counter they have at the end of their turn. You can get rid of a poison counter with a Heart (that Heart doesn't heal a damage also).
			if (diceRoll[4].length > 0)
			{
				for (enemy = 1; enemy <= playerCount; enemy++)
				{
					if (currentPlayer != enemy && players[enemy].alive == true && players[enemy].isInTokyo == true)
					{
						players[enemy].isPoisoned = true;
					}
				}
				Ticker(`Poisoned your enemies!\n
					(Roll a heart to heal)`);
			}
			break;
		case 'Psychic Probe':  // Keep - You can reroll a die of each other monster once each turn. If the reroll is Heart discard this card.
			
			break;
		case 'Rapid Healing':  // Keep - Spend 2Energy at any time to heal 1 damage.
			
			break;
		case 'Rooting for the Underdog':  // Keep - At the end of a turn when you have the fewest  points gain 1  points.
			
			break;
		case 'Shrink Ray':  // Keep - When you deal damage to monsters give them a shrink counter. A monster rolls one less die for each shrink counter. You can get rid of a shrink counter with a Heart (that Heart doesn't heal a damage also).
			
			break;
		case 'Smoke Cloud':  // Keep - This card starts with 3 charges. Spend a charge for an extra reroll. Discard this card when all charges are spent.
			
			break;
		case 'Solar Powered':  // Keep - At the end of your turn gain 1Energy if you have no Energy.
			
			break;
		case 'Stretchy':  // Keep - You can spend 2Energy to change one of your dice to any result.
			
			break;
		case 'Telepath':  // Keep - Spend 1Energy to get 1 extra reroll.
			
			break;
		case 'Urbavore':  // Keep - Gain 1 extra points when beginning the turn in Tokyo. Deal 1 extra damage when dealing any damage from Tokyo.
			
			break;
		case 'We\'re Only Making It Stronger':  // Keep - When you lose 2Heart or more gain 1Energy.
			
			break;
		case 'Wings':  // Keep - Spend 2Energy to negate damage to you for a turn.
			
			break;
	}
}