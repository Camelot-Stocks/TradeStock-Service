/* eslint-disable no-lonely-if */
/* eslint-disable operator-linebreak */
import React from 'react';
import InputWrapper from './styles/inputWrapper/inputWrapper';
import OptionWrapper from './styles/Option/optionWrapper';
import MainWrapper from './styles/mainWrapper/wrapper';


class TrailingStopOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trailType: 'Percentage',
      trail: 0,
      shares: 0,
      expires: 'Good for Day',
      showOptions: false,
      showTrails: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.trailsClickHandler = this.trailsClickHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  changeHandler(e) {
    let value;
    if (this.props.type === 'Buy') {
      if (e.target.name === 'shares') {
        if (this.state.trailType === 'Percentage') {
          value = ((this.state.trail / 100) * this.props.price) +
                  (this.props.price * e.target.value);
        } else {
          value = Number(this.state.trail) + (this.props.price * e.target.value);
        }
        this.props.estimateHandler(value.toFixed(2));
      } else {
        if (this.state.shares !== 0 && this.state.shares !== '') {
          if (this.state.trailType === 'Percentage') {
            value = ((e.target.value / 100) * this.props.price) +
                    (this.props.price * this.state.shares);
          } else {
            value = Number(e.target.value) + (this.props.price * this.state.shares);
          }
          this.props.estimateHandler(value.toFixed(2));
        }
      }
    } else {
      if (e.target.name === 'shares') {
        if (this.state.trailType === 'Percentage') {
          value = (this.props.price * e.target.value) -
          ((this.state.trail / 100) * this.props.price);
        } else {
          value = (this.props.price * e.target.value) - Number(this.state.trail);
        }
        this.props.estimateHandler(value.toFixed(2));
      } else {
        if (this.state.shares !== 0 && this.state.shares !== '') {
          if (this.state.trailType === 'Percentage') {
            value = (this.props.price * this.state.shares) -
                    ((e.target.value / 100) * this.props.price);
          } else {
            value = (this.props.price * this.state.shares) - Number(e.target.value);
          }
          this.props.estimateHandler(value.toFixed(2));
        }
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  clickHandler(e) {
    this.setState({
      showOptions: !this.state.showOptions,
      expires: e.target.id,
    });
  }

  toggleOptions() {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  }

  toggle() {
    this.setState({
      showTrails: !this.state.showTrails,
    });
  }

  trailsClickHandler(e) {
    this.setState({
      showTrails: !this.state.showTrails,
      trailType: e.target.id,
      trail: 0,
      shares: 0,
    });

    this.props.estimateHandler(0);
  }

  render() {
    return (
      <>
        <InputWrapper>
          <InputWrapper.Label>Trail Type</InputWrapper.Label>
            <OptionWrapper.Main onClick={this.toggle}>
              <OptionWrapper.Text id={this.state.expires}>
                {this.state.trailType}
              </OptionWrapper.Text>
              <MainWrapper.Arrow src="./arrows.png"/>
            </OptionWrapper.Main>
            {this.state.showTrails &&
            <OptionWrapper>
              <OptionWrapper.Option onClick={this.trailsClickHandler} id={'Percentage'}
              expires={this.state.trailType}>
                Percentage
              </OptionWrapper.Option>
              <OptionWrapper.Option onClick={this.trailsClickHandler} id={'Amount'}
              expires={this.state.trailType}>
                Amount
              </OptionWrapper.Option>
            </OptionWrapper> }
        </InputWrapper>
        <InputWrapper>
          <InputWrapper.Label>Trail ({this.state.trailType === 'Percentage' ?
            '%' : '$'})</InputWrapper.Label>
          <InputWrapper.Dollar type="number" name="trail"
          step=".01" onChange={this.changeHandler} value={this.state.trail}></InputWrapper.Dollar>
        </InputWrapper>
        <InputWrapper>
            <InputWrapper.Label>Shares</InputWrapper.Label>
            <InputWrapper.Dollar type="number" placeholder="0" name="shares"
            onChange={this.changeHandler} value={this.state.shares}>
            </InputWrapper.Dollar>
        </InputWrapper>
        <InputWrapper>
          <InputWrapper.Label>Expires</InputWrapper.Label>
            <OptionWrapper.Main onClick={this.toggleOptions}>
              <OptionWrapper.Text>
                {this.state.expires === 'Good for Day' ? 'Good for Day' : 'Good till Can...'}
              </OptionWrapper.Text>
              <MainWrapper.Arrow src="./arrows.png"/>
            </OptionWrapper.Main>
            {this.state.showOptions &&
            <OptionWrapper>
              <OptionWrapper.Option onClick={this.clickHandler} id={'Good for Day'}
              expires={this.state.expires}>
                Good for Day
              </OptionWrapper.Option>
              <OptionWrapper.Option onClick={this.clickHandler} id={'Good till Canceled'}
              expires={this.state.expires}>
                Good till Canceled
              </OptionWrapper.Option>
            </OptionWrapper> }
        </InputWrapper>
      </>
    );
  }
}

export default TrailingStopOrder;