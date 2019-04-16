/*global google*/
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
import PlaceInput from '../../../utils/Form/PlaceInput'
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

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
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });
  
  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  };
  onFormSubmit = values =>{
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng;
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
         <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMFeSw9ED2eOKpVp13MKhh99F-I2w88gw&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
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
                <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded &&
              <Field
                name="venue"
                type="text"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder="Event venue"
                onSelect={this.handleVenueSelect}
              />}
                <Field
                name="date"
                type="date"
                component={TextInput}
                // dateFormat='YYYY-MM-DD HH:mm'
                // timeFormat='HH:mm'
                // showTimeSelect
                placeholder="Date and time of event"/>           
               <Button disabled={invalid || submitting || pristine} positive type="submit">
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


export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({form: 'eventForm', enableReinitialize: true,validate})(EventForm));