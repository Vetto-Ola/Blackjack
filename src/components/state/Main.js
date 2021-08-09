import { Component } from "react";
// import Card from "./card/Card";
import Hand from "./hand/Hand";

import { 
  SPADES_SUIT_VALUE,
  HEARTS_SUIT_VALUE,
  CLUBS_SUIT_VALUE,
  DIAMONDS_SUIT_VALUE,
  SPADES_STRING,
  HEARTS_STRING,
  CLUBS_STRING,
  DIAMONDS_STRING
} from "../../constants";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackjackCards: [],

      houseActive: false,
      houseCards: [],
      houseHandValues: [0, 0],

      userActive: false,
      userCards: [],
      userHandValues: [0, 0],
      stoppedAskingCards: false,

      userActive2: false,
      userCards2: [],
      userHandValues2: [0, 0],
      stoppedAskingCards2: false,
      
      split: false
    };
  }

  componentDidMount()  {
    const decks = this.createBlackJackDecks();

    console.log(decks);
    let allCards = [];

    for (let index = 0; index < decks.length; index++) {

      allCards = [...allCards, ...decks[index]];

    }

    const shuffledCards = this.shuffleDeck(allCards);

    this.setState({
      blackjackCards: shuffledCards
    }, () => {
      this.getInitialHands();
    });
  }

  getInitialHands = () => {
    setTimeout(() => {
      this.drawACard('userCards');
    }, 350);
    setTimeout(() => {
      this.drawACard('houseCards');
    }, 1200);
    setTimeout(() => {
      this.drawACard('userCards');
    }, 1850);
    setTimeout(() => {
      this.setState({ userActive: true });
    }, 2500);
  }

  createBlackJackDecks = () => {
    const newDecks = [];
    
    for (let deckIndex = 0; deckIndex < 6; deckIndex++) {

      const newDeck = [];

      for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
        for (let cardIndex = 1; cardIndex < 14; cardIndex++) {

          let newCard = {
            label: '',
            value: null,
            suit: null,
            suitLabel: ''
          };
          
          switch (suitIndex) {
            case SPADES_SUIT_VALUE:
                newCard.suit = SPADES_SUIT_VALUE;
                newCard.suitLabel = SPADES_STRING;
              break;
            case HEARTS_SUIT_VALUE:
                newCard.suit = HEARTS_SUIT_VALUE;
                newCard.suitLabel = HEARTS_STRING;
              break;
            case CLUBS_SUIT_VALUE:
                newCard.suit = CLUBS_SUIT_VALUE;
                newCard.suitLabel = CLUBS_STRING;
              break;
            case DIAMONDS_SUIT_VALUE:
                newCard.suit = DIAMONDS_SUIT_VALUE;
                newCard.suitLabel = DIAMONDS_STRING;
              break;
          
            default:
              break;
          }

          if (cardIndex === 1) {
            newCard.value = cardIndex;
            newCard.label = 'A';
          } else if (cardIndex >= 2 && cardIndex <= 10) {
            newCard.value = cardIndex;
            newCard.label = `${cardIndex}`;
          } else if (cardIndex === 11) {
            newCard.value = 10;
            newCard.label = `J`;
          } else if (cardIndex === 12) {
            newCard.value = 10;
            newCard.label = `Q`;
          } else if (cardIndex === 13) {
            newCard.value = 10;
            newCard.label = `K`;
          }

          newDeck.push(newCard);
        }
        
      }

      newDecks.push(newDeck);

    }

    return newDecks;

  }

  shuffleDeck = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  drawACard = (entityCards='') => {
    if (entityCards) {
      const card = JSON.parse(JSON.stringify(this.state.blackjackCards[0]));
      if (card) {
        const blackjackCardsRemaining = JSON.parse(JSON.stringify(this.state.blackjackCards));
        blackjackCardsRemaining.shift();
    
        this.setState({
          blackjackCards: blackjackCardsRemaining,
          [entityCards]: [...this.state[entityCards], card]
        })
      }
    }
  }

  doSplit = () => {
    this.setState({
      split: true,
      userActive: false,
      userCards: [this.state.userCards[0]],
      userCards2: [this.state.userCards[1]],
    }, () => {
      setTimeout(() => {
        this.drawACard('userCards2');
      }, 700);
      setTimeout(() => {
        this.drawACard('userCards');
      }, 1500);
      setTimeout(() => {
        this.setState({ userActive2: true })
      }, 2000);
    })
  }

  retrieveHandValues = () => {
    
  }

  render() { 
    return (
      <div className={'main available'}>
        <div className={'main-overlay'}></div>
        <div className={'hand-block'}>
          <div className={'hand-cards'}>
            <Hand
              active={this.state.houseActive}
              handScoreBottom
              cards={this.state.houseCards}
              drawACard={this.drawACard}
              cardsField={'houseCards'}
              stop
            />
          </div>
        </div>
        <div className={'hand-block'}>
          {
            this.state.split &&
              <div className={'hand-cards user-hand-block'}>
                <Hand
                  active={this.state.userActive2}
                  handScoreTop
                  cards={this.state.userCards2}
                  drawACard={this.drawACard}
                  cardsField={'userCards2'}
                  showControls
                  stop
                />
              </div>
          }
          <div className={'hand-cards user-hand-block'}>
            <Hand
              active={this.state.userActive}
              handScoreTop
              cards={this.state.userCards}
              drawACard={this.drawACard}
              cardsField={'userCards'}
              valuesField={'userHandValues'}
              showControls
              doSplit={ !this.state.split ? this.doSplit : undefined }
              retrieveHandValues={this.retrieveHandValues}
              stop
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default Main;