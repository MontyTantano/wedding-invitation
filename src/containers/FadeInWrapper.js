import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FadeInWrapperStyleIgnored from './FadeInWrapper.scss';

const baseClassName = 'fade-in-wrapper';

class FadeInWrapper extends Component {
  constructor(props) {
    super(props);
    this.scrollPositionBottom = Infinity;
    this.visible = false;
    this.selfRef = React.createRef();
  }

  componentDidMount() {
    if (
      !this.selfRef ||
      !this.selfRef.current ||
      typeof this.selfRef.current.getBoundingClientRect !== 'function'
    ) {
      return;
    }
    const rect = this.selfRef.current.getBoundingClientRect();
    this.scrollPositionBottom = rect.top + rect.height / 10;
  }

  render() {
    const { scrollPositionBottom, children } = this.props;
    if (!this.visible) {
      this.visible = scrollPositionBottom > this.scrollPositionBottom;
    }

    const className = [
      baseClassName,
      this.visible ? `${baseClassName}_visible` : `${baseClassName}_hiden`
    ].join(' ');

    return (
      <div className={className} ref={this.selfRef}>
        {children}
      </div>
    );
  }
}

FadeInWrapper.defaultProps = {
  scrollPositionBottom: 0,
  children: null
};

FadeInWrapper.propTypes = {
  scrollPositionBottom: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default FadeInWrapper;
