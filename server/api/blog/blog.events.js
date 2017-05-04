/**
 * Blog model events
 */

'use strict';

import {EventEmitter} from 'events';
var BlogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BlogEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Blog) {
  for(var e in events) {
    let event = events[e];
    Blog.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    BlogEvents.emit(event + ':' + doc._id, doc);
    BlogEvents.emit(event, doc);
  };
}

export {registerEvents};
export default BlogEvents;
