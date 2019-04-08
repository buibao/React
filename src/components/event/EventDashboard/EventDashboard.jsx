import React, { Component } from 'react'
import { Grid,Button } from 'semantic-ui-react'
import EventList from './../EventList/EventList';
import EventForm from './../EventForm/EventForm';
import {connect} from 'react-redux';
import * as ACTIONS from './../../../store//actions/actions';
import cuid from 'cuid';

  class EventDashboard extends Component {
  
    state ={
        isOpen:false,
        selectedEvent:null
      };
     
    
    handleFormOpen = () => {
      this.setState({
        selectedEvent:null,
        isOpen: true
      });
    }
    handleFormCancel = () => {
      this.setState({
        isOpen: false
      });
    }
handleUpdateEvent = (updateEvent) =>{
  this.props.update(updateEvent);
  this.setState({
    isOpen: false,
    selectedEvent:null
  })
}

handleDeleteEvent = eventID => () =>{
  this.props.delete(eventID);
}
    handleOpenEvent =(eventToOpen) =>() => {
      this.setState({
        selectedEvent:eventToOpen,
        isOpen:true
      })
    }
    handleCreateEvent =(newEvent) =>{
      newEvent.id = cuid();
      newEvent.hostPhotoURL ='https://randomuser.me/api/portraits/men/22.jpg';
      this.props.create(newEvent);
      this.setState({
      isOpen:false
    })
    }
  render() {
    const{selectedEvent} = this.state;
    const {eventsDashBoard} = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
       <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} eventsDashBoard={eventsDashBoard}/>
        </Grid.Column>
        <Grid.Column width={6}>
        <Button onClick={this.handleFormOpen} positive content="Create Event"></Button>
        {this.state.isOpen && 
           (<EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleFormCancel}/> )}
        
        </Grid.Column>
      </Grid>
    )
  }
}
function mapStateToProps(state){
  return {
    eventsDashBoard: state.eventsReducer,
  }
  }
  function mapDispatchToProps(dispatch){
    return{
        delete: (eventId)=>dispatch(ACTIONS.deleteEvent(eventId)),
        update: (updateevent)=>dispatch(ACTIONS.updateEvent(updateevent)),
        create: (createevent)=>dispatch(ACTIONS.createEvent(createevent)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventDashboard)