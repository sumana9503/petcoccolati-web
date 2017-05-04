'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './service.events';

var ServiceSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ServiceSchema);
export default mongoose.model('Service', ServiceSchema);
