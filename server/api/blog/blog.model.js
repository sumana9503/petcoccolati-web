'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './blog.events';

var BlogSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(BlogSchema);
export default mongoose.model('Blog', BlogSchema);
