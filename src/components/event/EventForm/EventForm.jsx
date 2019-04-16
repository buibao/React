import React, { Component } from 'react'
import { Form,Button,Segment, Grid, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as ACTIONS from './../../../store//actions/actions';
import cuid from 'cuid';
import moment from 'moment'
import {composeValidators,combineValidators,isRequired, hasLengthGreaterThan} from 'revalidate'
import {reduxForm, Field} from 'redux-form'
import TextInput from '../../../utils/Form/TextInput'
import TextArea from '../../../utils/Form/TextArea'
import SelectInput from '../../../utils/Form/SelectInput'
import DateInput from '../../../utils/Form/DateInput'


const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'The event title is required'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 character'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')

})
class EventForm extends Component {
  onFormSubmit = values =>{
    values.date = moment(values.date).format()
    if(this.props.initialValues.id){
        this.props.update(values)
        this.props.history.goBack();
    }else{
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL:'https://randomuser.me/api/portraits/men/22.jpg',
        hostedBy: 'Bob'
      }
      this.props.create(newEvent)
      this.props.history.push('/events')
    }
    
  }
  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
      <Grid>
          <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Detailes'/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field name='title' type='text' component={TextInput} placeholder="Give your event a name"/>
                <Field 
                name='category' 
                type='text' 
                options={category}
             //   multiple={true}
                component={SelectInput} 
                placeholder="What is your event about"/>
                <Field 
                name='description' 
                type='text' 
                rows={3}
                component={TextArea} 
                placeholder="Tell us about your event"/>
                <Header sub color='teal' content='Event Location Details'/>
                <Field name='city' type='text' component={TextInput} placeholder="Event City"/>
                <Field name='venue' type='text' component={TextInput} placeholder="Event Venue"/>
                <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat='YYYY-MM-DD HH:mm'
                timeFormat='HH:mm'
                showTimeSelect
                placeholder="Date and time of event"/>            <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
          </Segment>
          </Grid.Column>
      </Grid>
         
    )
  }
}

function mapStateToProps(state, ownProps){
  const eventId = ownProps.match.params.id;
  let emptyEvent ={}
      if(eventId && state.eventsReducer.length > 0){
              emptyEvent = state.eventsReducer.filter(event=>event.id === eventId)[0]
        }
  return {
    initialValues: emptyEvent
  };
  }
  function mapDispatchToProps(dispatch){
    return{
        update: (updateevent)=>dispatch(ACTIONS.updateEvent(updateevent)),
        create: (createevent)=>dispatch(ACTIONS.createEvent(createevent)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({form: 'eventForm', enableReinitialize: true,validate})(EventForm));