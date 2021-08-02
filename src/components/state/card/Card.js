import { Component } from "react";
import { ImSpades, ImHeart, ImClubs, ImDiamonds } from "react-icons/im/index";
import './Card.css';

import { 
  SPADES_SUIT_VALUE,
  HEARTS_SUIT_VALUE,
  CLUBS_SUIT_VALUE,
  DIAMONDS_SUIT_VALUE,
} from "../../../constants";

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

  getSuitIcon = () => {
    switch (this.state.suit) {
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

  getCardContent = () => {
    if (this.state.value === 1) {
      return (
        <div className={'ace-content'}>
          <div className={'column'}>
            { this.getSuitIcon() }
          </div>
        </div>
      );
    } else if (this.state.value === 2) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 3) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 4) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 5) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 6) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 7) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 8) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 9) {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else if (this.state.value === 10 && this.state.label === '10') {
      return (
        <div className={'card-content-columns-container'}>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
          <div className={'column'}>
            <div>{ this.getSuitIcon() }</div>
            <div>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
            <div className={'suit-reverse'}>{ this.getSuitIcon() }</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={'figure-content'}>
          <div className={`column ${this.state.suit === DIAMONDS_SUIT_VALUE || this.state.suit === HEARTS_SUIT_VALUE ? 'red-suit-font-color' : ''}`}>
            { this.state.label }
          </div>
        </div>
      );
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
            { this.getCardContent() }
          </div>
        </div>
      </div>
    );
  }
}
 
export default Card;