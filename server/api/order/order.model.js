'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './order.events';

var OrderSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(OrderSchema);
export default mongoose.model('Order', OrderSchema);
