import { Component } from "react";
import { ImSpades, ImHeart, ImClubs, ImDiamonds } from "react-icons/im/index";

import { 
  SPADES_SUIT_VALUE,
  HEARTS_SUIT_VALUE,
  CLUBS_SUIT_VALUE,
  DIAMONDS_SUIT_VALUE,
} from "../../constants";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      value: props.value,
      suit: props.suit,
      suitLabel: props.suitLabel
    }
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

  render() { 
    return ( 
      <div className={'card'} onClick={() => console.log(this.state)}>
        <div className={'card-elements-wrapper'}>
          <div className={'card-markup-left'}>
            <label
                className={this.state.suit === DIAMONDS_SUIT_VALUE || this.state.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}
              >
                {this.state.label}
              </label>
            <div className={'card-markup-suit-wrapper'}>{ this.getSuitIcon(this.state.suit) }</div>
          </div>
          <div className={'card-markup-right'}>
            <label
                className={this.state.suit === DIAMONDS_SUIT_VALUE || this.state.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}
              >
                {this.state.label}
              </label>
            <div className={'card-markup-suit-wrapper'}>{ this.getSuitIcon(this.state.suit) }</div>
          </div>
          <div className={'card-content'}>
          </div>
        </div>
        {/* {
          !this.state.blackjackCards[index+1] &&
            <div>NEXT</div>
        } */}
      </div>
    );
  }
}
 
export default Card;