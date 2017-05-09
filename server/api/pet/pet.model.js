'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './pet.events';

var PetSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PetSchema);
export default mongoose.model('Pet', PetSchema);
