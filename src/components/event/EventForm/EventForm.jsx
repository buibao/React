import React, { Component } from 'react'
import { Form,Button,Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as ACTIONS from './../../../store//actions/actions';
import cuid from 'cuid';
import {reduxForm, Field} from 'redux-form'
class EventForm extends Component {
  state={
    event: Object.assign({}, this.props.emptyEvent)
  }

  onFormSubmit =(evt) =>{
    evt.preventDefault();
    if(this.state.event.id){
        this.props.update(this.state.event)
        this.props.history.goBack();
    }else{
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL:'https://randomuser.me/api/portraits/men/22.jpg',

      }
      this.props.create(newEvent)
      this.props.history.push('/events')
    }
    
  }
  onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value
    this.setState({
      event: newEvent
      // [evt.target.name] = evt.target.value
    })
  }
  render() {
    // const {handleCancel} = this.props;
    const {event} = this.state;
    return (
          <Segment>
            <Form onSubmit={this.onFormSubmit}>
                <Field name='title' type='text' component='input' placeholder="Event Title"/>
              <Form.Field>
                <label>Event Date</label>
                <input name='date' type='date' onChange={this.onInputChange} value={event.date} placeholder="Event Date" />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
              </Form.Field>
              <Form.Field>
                <label>Venue</label>
                <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
              </Form.Field>
              <Form.Field>
                <label>Hosted By</label>
                <input name='hostedBy' onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
              </Form.Field>
              <Button positive type="submit">
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
            </Form>
          </Segment>
    )
  }
}

function mapStateToProps(state, ownProps){
  const eventId = ownProps.match.params.id;
  let emptyEvent ={
    title:'',
    date:'',
    city:'',
    venue:'',
    hostedBy:''
  }
      if(eventId && state.eventsReducer.length > 0){
              emptyEvent = state.eventsReducer.filter(event=>event.id === eventId)[0]
        }
  return {emptyEvent};
  }
  function mapDispatchToProps(dispatch){
    return{
        update: (updateevent)=>dispatch(ACTIONS.updateEvent(updateevent)),
        create: (createevent)=>dispatch(ACTIONS.createEvent(createevent)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({formReducer: 'eventForm'})(EventForm));