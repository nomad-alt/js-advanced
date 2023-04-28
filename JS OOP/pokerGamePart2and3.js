class Card {
  constructor(suit, name, value) {
    this.suit = suit;
    this.name = name;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const names = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < names.length; j++) {
        let value = parseInt(names[j]);
        if (names[j] === "Ace") {
          value = 11;
        } else if (
          names[j] === "King" ||
          names[j] === "Queen" ||
          names[j] === "Jack"
        ) {
          value = 10;
        }
        const card = new Card(suits[i], names[j], value);
        this.cards.push(card);
      }
    }
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let temp, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temp = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }
  addCards(cards) {
    this.cards.push(...cards);
  }
  deal() {
    return this.cards.pop();
  }

  print() {
    const cardStrings = this.cards.map(
      (card) => `${card.name} of ${card.suit} (value: ${card.value})`
    );
    console.log(cardStrings);
  }
}

class Player {
  constructor(name, initialBalance) {
    this.name = name;
    this.hand = [];
    this.balance = initialBalance;
    this.bet = 0;
  }
  setBet(amount) {
    let bool = 1;
    if (amount > this.balance) {
      alert("Not enough balance to place bet");
      bool = 0;
    }
    while (bool != 1) {
      prompt("Place your bet again , becasue you have not insufficient money");
    }
    this.balance -= amount;
    this.bet = amount;
  }
  win(amount) {
    this.balance += amount;
    this.bet = 0;
  }

  lose() {
    this.bet = 0;
  }

  resetBet() {
    this.balance += this.bet;
    this.bet = 0;
  }

  takeCard(card) {
    this.hand.push(card);
  }
  getname() {
    return this.name;
  }

  print() {
    const cardStrings = this.hand.map(
      (card) => `${card.name} of ${card.suit} (value: ${card.value})`
    );
    console.log(`${this.name}: ${cardStrings}`);
  }

  getHandValue() {
    return this.hand.reduce((total, card) => total + card.value, 0);
  }
  throwCards(indexes) {
    const throwingCards = [];
    const hand = [...this.hand];
    //console.log(indexes);
    indexes.forEach((index) => {
      //console.log(this.hand.find(card => hand[index] === card));
      const card = this.hand.splice(
        this.hand.findIndex((card) => hand[index] === card),
        1
      );
      //console.log(card);
      throwingCards.push(...card);
    });
    return throwingCards;
  }
}
class DiscardPile {
  constructor() {
    this.cards = [];
  }

  addCards(cards) {
    this.cards.push(...cards);
  }

  transferAllCardsTo(deck) {
    deck.addCards(this.cards);
    this.cards = [];
  }
}
class Dealer {
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
  }

  dealCardsToPlayers(player1, player2, numCards) {
    for (let i = 0; i < numCards; i++) {
      player1.takeCard(this.deck.deal());
      player2.takeCard(this.deck.deal());
    }
  }
  dealCard() {
    return this.deck.cards.pop();
  }
  dealCards(no) {
    const cards = [];
    for (let i = 0; i < no; i++) {
      cards.push(this.deck.cards.pop());
    }
    return cards;
  }
}
function max(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }

  let maxVal = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].value > maxVal.value) {
      maxVal = arr[i];
    }
  }

  return maxVal;
}
function evaluateHandPartofReal(hand) {
  // Sort the hand by card value
  hand.sort((a, b) => a.value - b.value);

  // Check for three of a kind
  if (
    hand[0].value == hand[2].value ||
    hand[1].value == hand[3].value ||
    hand[2].value == hand[4].value
  ) {
    return "Three of a Kind";
  }

  // Check for two pairs
  if (
    (hand[0].value == hand[1].value && hand[2].value == hand[3].value) ||
    (hand[1].value == hand[2].value && hand[3].value == hand[4].value)
  ) {
    return "Two Pairs";
  }

  // Check for a pair
  for (let i = 0; i < 4; i++) {
    if (hand[i].value == hand[i + 1].value) {
      return "Pair";
    }
  }

  // If no pair, return high card
  return "High Card";
}
// Helper function to get the value of the highest card in a hand
function getHighestCardValue(hand) {
  return Math.max(...hand.map((card) => card.value));
}
class HandValidator {
  static evaluateHands(players) {
    const hands = players.map((player) => {
      return {
        value: player.getHandValue(),
        playerName: player.getname(),
      };
    });
    return max(hands);
  }

  static evaluateHandsReal(players) {
    const hands = players.map((player) => player.hand);
    const results = [];
    // Define the ranking of hands, from highest to lowest
    // I deal with 4 ranks
    const handRanks = ["Three of a Kind", "Two Pairs", "Pair", "High Card"];

    // Evaluate each hand and store the result
    for (let i = 0; i < hands.length; i++) {
      const hand = hands[i];
      const result = evaluateHandPartofReal(hand);
      results.push({ hand, result });
    }

    // Sort the results by hand ranking
    results.sort(
      (a, b) => handRanks.indexOf(a.result) - handRanks.indexOf(b.result)
    );

    // Find the winning hand(s)
    const winners = [results[0]];
    for (let i = 1; i < results.length; i++) {
      if (
        handRanks.indexOf(results[i].result) !==
        handRanks.indexOf(results[0].result)
      ) {
        break;
      }
      winners.push(results[i]);
    }

    // If there is only one winner, return their hand
    if (winners.length === 1) {
      return winners[0].hand;
    }

    // If there are multiple winners, compare their hands to find the ultimate winner
    for (let i = 0; i < handRanks.length; i++) {
      const rank = handRanks[i];
      const rankWinners = winners.filter((winner) => winner.result === rank);
      if (rankWinners.length === 1) {
        return rankWinners[0].hand;
      } else if (rankWinners.length > 1) {
        // Check for tiebreaker based on highest card
        const highestCardValue = Math.max(
          ...rankWinners.map((winner) => getHighestCardValue(winner.hand))
        );
        const highestCardWinners = rankWinners.filter(
          (winner) => getHighestCardValue(winner.hand) === highestCardValue
        );
        if (highestCardWinners.length === 1) {
          return highestCardWinners[0].hand;
        }
        // Continue to next rank if there is still a tie
      }
    }

    // If we made it this far, there is an error in the input
    throw new Error("Invalid input: no winner found");
  }
}

class Game {
  constructor() {
    this.players = [];
    this.dealer = new Dealer();
    this.handValidator = new HandValidator();
    this.throwPile = new DiscardPile();
  }

  addPlayers() {
    let numPlayers = parseInt(prompt("Enter number of players (at least 2): "));
    while (numPlayers < 2) {
      numPlayers = parseInt(prompt("Enter number of players (at least 2): "));
    }

    for (let i = 0; i < numPlayers; i++) {
      let playerName = prompt(`Enter name of player ${i + 1}: `);
      let playerbal = prompt(`Enter initial balance of player ${i + 1}: `);
      this.players.push(new Player(playerName, playerbal));
    }
  }

  startGame() {
    console.log("Starting a new game of Poker...");

    this.addPlayers();

    let numRounds = parseInt(prompt("Enter number of rounds: "));
    while (numRounds <= 0) {
      numRounds = parseInt(prompt("Enter number of rounds: "));
    }

    for (let round = 1; round <= numRounds; round++) {
      console.log(`\nStarting round ${round}...\n`);

      for (let player of this.players) {
        let betAmount = parseInt(prompt(`${player.name}, place your bet: `));
        player.setBet(betAmount);
      }

      // Deal new hands to players
      for (let player of this.players) {
        let newCards = this.dealer.dealCards(5);
        newCards.forEach((card) => player.takeCard(card));

        console.log(
          `${player.name} now has hand: ${player.hand
            .map((card) => card.name)
            .join(",")}`
        );
      }

      //Allow players to choose cards to throw away and receive new ones
      for (let player of this.players) {
        console.log(`${player.name}, choose cards to throw away: `);
        let throwawayIndices = prompt(
          `Enter comma-separated indices (0-4) of cards to throw away: `
        ).split(",");
        throwawayIndices = throwawayIndices.map((index) =>
          parseInt(index.trim())
        );
        this.throwPile.addCards(player.throwCards(throwawayIndices));
        let newCards = this.dealer.dealCards(throwawayIndices.length);
        newCards.forEach((card) => player.takeCard(card));
        console.log(
          `${player.name} now has hand: ${player.hand
            .map((card) => card.name)
            .join(",")}`
        );
      }

      // Determine winner of round
      let roundResults = HandValidator.evaluateHands(this.players);
      let realisticResults = HandValidator.evaluateHandsReal(this.players);
      console.log("\nRound results Based On numerical values:", roundResults);

      let winningIndex = realisticResults.findIndex(
        (result) => result.result === realisticResults[0].result
      );

      let winningPlayer = this.players[winningIndex];
      console.log("Real Results Based on Ranks, ");
      console.log(`The winner is ${winningPlayer.getname()}`);

      // Distribute winnings to winner and reset bets
      this.players.forEach((player) => {
        if (player === winningPlayer) {
          player.win();
        } else {
          player.lose();
        }
        player.resetBet();
      });

      this.throwPile.transferAllCardsTo(this.dealer.deck);
      this.players.forEach((player) => {
        this.dealer.deck.addCards(player.hand);
        player.hand = [];
      });
    }

    console.log("Game over!");
  }
}

let game = new Game();
game.startGame();
