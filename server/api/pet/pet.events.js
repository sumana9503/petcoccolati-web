/**
 * Pet model events
 */

'use strict';

import {EventEmitter} from 'events';
var PetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PetEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Pet) {
  for(var e in events) {
    let event = events[e];
    Pet.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PetEvents.emit(event + ':' + doc._id, doc);
    PetEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PetEvents;
