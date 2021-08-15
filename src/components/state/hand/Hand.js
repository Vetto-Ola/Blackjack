import Card from "../card/Card";
import "./Hand.css";
import { Component } from "react";
import { MAX_VALID_VALUE } from "../../../constants";


// CSS card width
let BASE_WIDTH = 6; 
// left markup width
const OFFSET = 6 / 4;

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      values: []
    };
  }

  getHandWrapperWidth = () => {

    let extraWidth = 0;

    if (this.props.cards?.length) {
      extraWidth = (this.props.cards.length - 1) * OFFSET;
    }

    return BASE_WIDTH + extraWidth;

  }

  getHandScores = (cards=[]) => {
    // first position contains minimum and second maximum
    const total = [0, 0];
    for (const card of cards) {
      let aceFound = false;
      if (card.value === 1 && !aceFound) {
        total[0] = total[0] + 1;
        total[1] = total[1] + 11;
        aceFound = true;
      } else {
        total[0] = total[0] + card.value;
        total[1] = total[1] + card.value;
      }
    }

    if (this.props.retrieveHandValues) {
      this.props.retrieveHandValues(total);
    }


    if (total[0] !== this.state.values[0] && total[1] !== this.state.values[0]) {
      this.setState({
        values: total
      })
    }

    return total;
  }

  getHandScoreHtmlElement = () => {

    const values = this.getHandScores(this.props.cards);

    if (this.props.cards?.length) {
      return (
        <div className={`hand-score hand-score-${this.props.handScoreBottom ? 'bottom' : this.props.handScoreTop ? 'top' : '' }`}>
          { 
            ((values[0] === MAX_VALID_VALUE) || (values[1] === MAX_VALID_VALUE))
            ? `${MAX_VALID_VALUE}`
            : ((values[0] !== values[1]) && (values[0] <= MAX_VALID_VALUE) && (values[1] <= MAX_VALID_VALUE))
            ? this.props.cards.length === 2 && values[1] === MAX_VALID_VALUE
            ? values[1]
            :`${values[0]} / ${values[1]}`
            : values[0]
          }
        </div>
      );
    }

    return null;

  }

  render() { 
    return ( 
      <div className={'hand-container'} 
        style={{
          borderColor: 
          (this.state.values[0] === MAX_VALID_VALUE || this.state.values[1] === MAX_VALID_VALUE) && this.props.cards?.length === 2
          ? 'limegreen'
          : this.state.values[0] > MAX_VALID_VALUE && this.state.values[1] > MAX_VALID_VALUE && this.props.active
          ? 'red' 
          : this.props.active
          ? 'yellow'
          : 'silver'
        }}
      >
        { this.getHandScoreHtmlElement() }
        {
          this.props.active && this.props.showControls &&
            <div className={'hand-controls'}>
              {
                typeof this.props.doSplit === 'function' && this.props.cards?.length === 2 && this.props.cards[0].value === this.props.cards[1].value &&
                  <div onClick={() => this.props.doSplit()}>
                    SPLIT
                  </div>
              }
              {
                (this.state.values[0] < MAX_VALID_VALUE && this.state.values[1] !== MAX_VALID_VALUE) &&
                  <>
                    <div onClick={() => this.props.drawACard(this.props.cardsField)}>
                      DRAW
                    </div>
                    <div onClick={() => this.props.stop(true)}>
                      STOP
                    </div>
                  </>
              }
            </div>
        }
        <div className={'hand-wrapper'} style={{ width: `${this.getHandWrapperWidth()}rem` }}>
          {
            !!this.props.cards?.length &&
              this.props.cards.map((card, index) => (
                <div className={'hand-card-wrapper'} key={index} style={{ position: 'absolute', top: 0, left: `${index * OFFSET}rem`}}>
                  <Card value={card.value} label={card.label} suit={card.suit} suitLabel={card.suitLabel} />
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}
 
export default Hand;