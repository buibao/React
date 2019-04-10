import React, { Component } from 'react'
import EventListItem from './EventListItem'
class EventList extends Component {
  render() {
    const {eventsDashBoard,deleteEvent} = this.props;
    return (
      <div>
        {eventsDashBoard.map((event)=>(
          <EventListItem 
          key={event.id} 
          eventList={event} 
          deleteEvent={deleteEvent}/>
        ))}
      </div>
    )
  }
}
export default EventList