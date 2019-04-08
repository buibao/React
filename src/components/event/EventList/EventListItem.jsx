import React, { Component } from 'react'
import { Segment,Item,List,Button,Icon } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee';
class EventListItem extends Component {
  render() {
   const {eventList,onEventOpen,deleteEvent} = this.props;
    return (
          <Segment.Group>
             <Segment>
               <Item.Group>
                 <Item>
                   <Item.Image size="tiny" circular src={eventList.hostPhotoURL} />
                   <Item.Content>
                     <Item.Header as="a">{eventList.title}</Item.Header>
                     <Item.Description>
                       Hosted by <a>{eventList.hostedBy}</a>
                     </Item.Description>
                   </Item.Content>
                 </Item>
               </Item.Group>
             </Segment>
             <Segment>
               <span>
                 <Icon name="clock" /> {eventList.date} |
                 <Icon name="marker" /> {eventList.venue}
               </span>
             </Segment>
             <Segment secondary>
               <List horizontal>
                   {eventList.attendees && 
                   (eventList.attendees.map((attendee)=>(
                    <EventListAttendee key={attendee.id} attendee={attendee}/>
                   )))}
                    
               </List>
             </Segment>
             <Segment clearing>
             <span>{eventList.description}</span>
               <Button onClick={deleteEvent(eventList.id)}  as="a" color="red" floated="right" content="Delete" />
               <Button onClick={onEventOpen(eventList)}  as="a" color="teal" floated="right" content="View" />
             </Segment>
           </Segment.Group>
    )
  }
}
export default EventListItem