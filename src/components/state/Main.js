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
  DIAMONDS_STRING,
  MAX_VALID_VALUE
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
      
      split: false,
      blockDrawACard: false,
      showResults: false
    };
  }

  componentDidMount()  {
    this.initializeGame();
    const timer = setInterval(this.automatedProcesses, 1000);
  }

  automatedProcesses = () => {
    if (this.state.houseActive) {
      this.drawACard('houseCards');
    }
  }

  initializeGame = () => {

    const decks = this.createBlackJackDecks();

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
      this.setState({ userActive: true },
        () => this.drawACard('userCards')
      );
    }, 1850);
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

  drawACard = (entityCards='', manual=false) => {
    if (entityCards) {
      const card = JSON.parse(JSON.stringify(this.state.blackjackCards[0]));
      if (card) {
        this.setState({
          blockDrawACard: true
        }, () => {

          const blackjackCardsRemaining = JSON.parse(JSON.stringify(this.state.blackjackCards));
          blackjackCardsRemaining.shift();

          this.setState({
            blackjackCards: blackjackCardsRemaining,
            [entityCards]: [...this.state[entityCards], card],
          }, () => {
            this.setState({
              [`${
                entityCards === 'houseCards'
                ? 'houseHandValues'
                : entityCards === 'userCards'
                ? 'userHandValues'
                : entityCards === 'userCards2'
                ? 'userHandValues2'
                : 'unknownHandValues'
              }`]: this.getHandScores(this.state[entityCards])
            }, () => {
              this.stopHandAndGoNext();
            })
          })

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
      userHandValues: this.getHandScores([this.state.userCards[0]]),
      userHandValues2: this.getHandScores([this.state.userCards[1]])
    }, () => {
      setTimeout(() => {
        this.drawACard('userCards2');
      }, 700);
      setTimeout(() => {
        this.setState({ userActive2: true })
      }, 1500);
    })
  }

  stopHandAndGoNext = manual => {
    if (manual) {
      if (this.state.split) {
        if (this.state.userActive2) {
          this.setState({
            userActive: true,
            userActive2: false,
            blockDrawACard: false
          }, () => {
            setTimeout(() => {
              this.drawACard('userCards');
            }, 350);
          })
        } else if (this.state.userActive) {
          this.setState({
            userActive: false,
            houseActive: true,
            blockDrawACard: false
          })
        }
      } else {
        if (this.state.userActive) {
          this.setState({
            userActive: false,
            houseActive: true,
            blockDrawACard: false
          })
        } else {
          // show win / lose
        }
      }
    } else {
      console.log("automated cards checking ")
      if (this.state.split) {
        if (this.state.userActive2) {
          this.setState({
            userActive: false
          })
        } else if (this.state.userActive) {
  
        } else {
  
        }
      } else {
        if (this.state.userActive) {
          if (this.state.userHandValues[0] === MAX_VALID_VALUE || this.state.userHandValues[1] === MAX_VALID_VALUE) {
            this.setState({
              userActive: false,
              houseActive: true,
              blockDrawACard: false
            })
          } else if (this.state.userHandValues[0] > MAX_VALID_VALUE && this.state.userHandValues[1] > MAX_VALID_VALUE) {
            this.setState({ 
              showResults: true, 
              blockDrawACard: false 
            });
          } else {
            this.setState({ blockDrawACard: false });
          }

        } else if (this.state.houseActive) {
          console.log("HOUSE ACTIVE NO SPLIT ");
          console.log(`${this.state.houseHandValues[0]} >= 17 --> ${this.state.houseHandValues[0] >= 17}, ${this.state.houseHandValues[1]} >= 17 ---> ${this.state.houseHandValues[1] >= 17}`);
          if (
            (this.state.houseHandValues[0] >= MAX_VALID_VALUE && this.state.houseHandValues[1] >= MAX_VALID_VALUE) || 
            (this.state.houseHandValues[0] >= 17 && this.state.houseHandValues[0] <= MAX_VALID_VALUE) ||
            (this.state.houseHandValues[1] >= 17 && this.state.houseHandValues[1] <= MAX_VALID_VALUE)
          ) {
            this.setState({
              showResults: true,
              houseActive: false,
              blockDrawACard: false
            })
          }
        }
      }
    }
  }

  getHandScores = (cards=[]) => {
    // first position contains minimum and second maximum
    const total = [0, 0];
    let aceFound = false;
    for (const card of cards) {
      if (card.value === 1 && !aceFound) {
        total[0] = total[0] + 1;
        total[1] = total[1] + 11;
        aceFound = true;
      } else {
        total[0] = total[0] + card.value;
        total[1] = total[1] + card.value;
      }
    }

    return total;
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
                  stop={this.stopHandAndGoNext}
                  blockDrawACard={this.state.blockDrawACard}
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
              stop={this.stopHandAndGoNext}
              blockDrawACard={this.state.blockDrawACard}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default Main;