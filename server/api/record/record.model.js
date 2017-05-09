'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './record.events';

var RecordSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(RecordSchema);
export default mongoose.model('Record', RecordSchema);
