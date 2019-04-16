import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import {
  SelectField,
  TextField,
  DatePicker,
  TimePicker
} from 'redux-form-material-ui';

const selector = formValueSelector('myPantry');

let ServiceGroup = ({ service, index, fields, isAppointment, serviceDate }) =>
  <div className="service-type-group" key={index}>
    <h4>Service</h4>
    <button
      type="button"
      className="remove-button"
      onClick={() => fields.remove(index)}>Remove
    </button>
    <div className="field-group third">
      <Field
        name={`${service}.day`}
        component={SelectField}
        floatingLabelText="Day of week"
        className="textfield">
          <MenuItem value={1} primaryText="Monday" />
          <MenuItem value={2} primaryText="Tuesday" />
      </Field>
      <Field
        name={`${service}.from_time`}
        component={TimePicker}
        value={null}
        floatingLabelText="From"
        className="textfield"
      />
      <Field
        name={`${service}.until_time`}
        component={TimePicker}
        value={null}
        floatingLabelText="To"
        className="textfield"
      />
    </div>
    <div className="field-group half">
      <Field
        name={`${service}.service_type`}
        component={SelectField}
        floatingLabelText="Service type"
        className="textfield">
        <MenuItem value={1} primaryText="First-come first-served" />
        <MenuItem value={2} primaryText="Appointment" />
      </Field>
    </div>
    {isAppointment &&
      <div className="field-group sentence-inline">
        <Field
          name={`${service}.max_people`}
          type="number"
          component={TextField}
          label="Number of people per timeslot"
          className="textfield"
        />
      </div>
    }
  </div>;

ServiceGroup = connect(
  (state, props) => ({
    isAppointment: selector(state, `${props.service}.service_type`) == 2,
    serviceDate: selector(state, `${props.service}.from_time`)
  })
)(ServiceGroup);

class MyPantry extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  renderGroups = ({ fields, meta: { touched, error } }) => {
    return (
      <div>
        {fields.map((service, index) =>
          <ServiceGroup service={service} fields={fields} index={index} key={index} />
        )}
        <button
          type="button"
          className="action-button"
          onClick={() => fields.push({})}>Add Service
        </button>
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="section general">
          <Field
            name="name"
            type="text"
            component={TextField}
            label="Pantry name"
            floatingLabelText="Pantry name"
            className="textfield full"
          />
          <div className="field-group half">
            <Field
              name="address_street_1"
              type="text"
              component={TextField}
              label="Address"
              floatingLabelText="Address"
              className="textfield"
            />
            <Field
              name="address_street_2"
              type="text"
              component={TextField}
              label="Apartment, suite, etc."
              floatingLabelText="Apartment, suite, etc."
              className="textfield"
            />
          </div>
        </div>
        <h3 className="section-title">Service Setup</h3>
        <div className="section service">
          <FieldArray name="service_options" component={this.renderGroups} />
        </div>
        <div>
          <button type="submit" className="action-button">Save Pantry Details</button>
        </div>
      </form>
    );
  }

}

MyPantry = reduxForm({
  form: 'myPantry'
})(MyPantry);

MyPantry = connect(
  state => ({
    initialValues: state.pantry.data
  })
)(MyPantry);

export default MyPantry;