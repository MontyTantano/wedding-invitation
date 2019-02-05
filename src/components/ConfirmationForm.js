import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConfirmationFormStyleIgnored from './ConfirmationForm.scss';

class ConfirmationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmite = this.handleSubmite.bind(this);
  }

  handleSubmite() {
    const { submite } = this.props;
    console.log('submite', submite);
  }

  render() {
    return (
      <div className="confirmation-form">
        <button type="button" onClick={this.handleSubmite} />
      </div>
    );
  }
}

ConfirmationForm.propTypes = {
  submite: PropTypes.func.isRequired
};

export default ConfirmationForm;