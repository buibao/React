import React, { Component } from 'react'
import { Grid,Button } from 'semantic-ui-react'
import EventList from './../EventList/EventList';
import EventForm from './../EventForm/EventForm';
import cuid from 'cuid';
const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]
  class EventDashboard extends Component {
  
    state ={
        eventsDashBoard:events,
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
  this.setState({
    eventsDashBoard: this.state.eventsDashBoard.map(event => {
      if(event.id === updateEvent.id){
        return Object.assign({},updateEvent)
      }else{
        return event
      }
    }),
    isOpen: false,
    selectedEvent:null
  })
}

handleDeleteEvent = (eventID) => () =>{
  const updateEvents = this.state.eventsDashBoard.filter(e=>e.id !== eventID);
  this.setState({
    eventsDashBoard: updateEvents
  })
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
      const updateEvents = [...this.state.eventsDashBoard,newEvent]
      this.setState({
      eventsDashBoard: updateEvents,
      isOpen:false
    })
    }
  render() {
    const{selectedEvent} = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
       <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} eventsDashBoard={this.state.eventsDashBoard}/>
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
export default EventDashboard