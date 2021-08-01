import { Component } from "react";
import { ImSpades, ImHeart, ImClubs, ImDiamonds } from "react-icons/im/index";

const SPADES_SUIT_VALUE = 0;
const HEARTS_SUIT_VALUE = 1;
const CLUBS_SUIT_VALUE = 2;
const DIAMONDS_SUIT_VALUE = 3;

const SPADES_STRING = 'Spades';
const HEARTS_STRING = 'Hearts';
const CLUBS_STRING = 'Clubs';
const DIAMONDS_STRING = 'Diamonds';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blackjackCards: [],
      userCards: []
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

    this.setState({ blackjackCards: shuffledCards });
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

  getSuitIcon = value => {
    switch (value) {
      case SPADES_SUIT_VALUE:
        return <ImSpades/>;
      case HEARTS_SUIT_VALUE:
        return <ImHeart color="#DB0000" />;
      case CLUBS_SUIT_VALUE:
        return <ImClubs/>;
      case DIAMONDS_SUIT_VALUE:
        return <ImDiamonds color="#DB0000" />;
      default:
        return null;
    }
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

  drawACard = () => {
    const card = JSON.parse(JSON.stringify(this.state.blackjackCards[0]));
    if (card) {
      const blackjackCardsRemaining = JSON.parse(JSON.stringify(this.state.blackjackCards));
      blackjackCardsRemaining.shift();
  
      this.setState({
        blackjackCards: blackjackCardsRemaining,
        userCards: [...this.state.userCards, card]
      })
    }
  }

  render() { 
    return (
      <div className={'main'}>
        <div className={'blackjack-cards-wrapper'}>
          {
            this.state.blackjackCards.reverse().map((card, index) => 
              <>
                <div key={`${card.value}-${index}`} className={'card'} onClick={() => console.log(card)}>
                  <div className={'card-elements-wrapper'}>
                    <div className={'card-markup-left'}>
                      <label
                          className={card.suit === DIAMONDS_SUIT_VALUE || card.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}
                        >
                          {card.label}
                        </label>
                      <div className={'card-markup-suit-wrapper'}>{ this.getSuitIcon(card.suit) }</div>
                    </div>
                    <div className={'card-markup-right'}>
                      <label
                          className={card.suit === DIAMONDS_SUIT_VALUE || card.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}
                        >
                          {card.label}
                        </label>
                      <div className={'card-markup-suit-wrapper'}>{ this.getSuitIcon(card.suit) }</div>
                    </div>
                    <div className={'card-content'}>
                    </div>
                  </div>
                  {/* {
                    !this.state.blackjackCards[index+1] &&
                      <div>NEXT</div>
                  } */}
                </div>
              </>
            )
          }
        </div>
        <div onClick={() => this.drawACard()}>DRAW A CARD</div>
        <div className={'blackjack-cards-wrapper'}>
          {
            this.state.userCards.map((card, index) => 
              <>
                <div key={`${card.value}-${index}`} className={'card'} onClick={() => console.log(card)}>
                  <div className={'card-elements-wrapper'}>
                    {/* <div className="rectangle"></div>
                    <label
                      className={card.suit === DIAMONDS_SUIT_VALUE || card.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}
                    >
                      {card.label}
                    </label>
                    <div className={'icon-card-wrapper'}>{ this.getSuitIcon(card.suit) }</div> */}

                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    );
  }
}
 
export default Main;