import React, { Component } from 'react'
import EventListItem from './EventListItem'
class EventList extends Component {
  render() {
    const {eventsDashBoard,onEventOpen,deleteEvent} = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {eventsDashBoard.map((event)=>(
          <EventListItem 
          key={event.id} 
          eventList={event} 
          onEventOpen={onEventOpen} 
          deleteEvent={deleteEvent}/>
        ))}
      </div>
    )
  }
}
export default EventList