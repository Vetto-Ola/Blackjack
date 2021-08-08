import Card from "../card/Card";
import "./Hand.css";
import { Component } from "react";

// CSS card width
let BASE_WIDTH = 6; 
// left markup width
const OFFSET = 6 / 4;

class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getHandWrapperWidth = () => {

    let extraWidth = 0;

    if (this.props.cards?.length) {
      extraWidth = (this.props.cards.length - 1) * OFFSET;
    }

    return BASE_WIDTH + extraWidth;

  }

  getCardOffset = () => {

  }

  render() { 
    return ( 
      <div className={'hand-wrapper'} style={{ position: 'relative', border: '2px solid white', width: `${this.getHandWrapperWidth()}rem`, height: '9rem' }}>
        {
          this.props.cards?.length &&
            this.props.cards.map((card, index) => (
              <div key={index} style={{ position: 'absolute', top: 0, left: `${index * OFFSET}rem`}}>
                <Card value={card.value} label={card.label} suit={card.suit} suitLabel={card.suitLabel} />
              </div>
            ))
        }
      </div>
    );
  }
}
 
export default Hand;