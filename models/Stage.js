const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const stageSchema = new Schema({
  stageName: {
    type: String,
  },
  dateChanged: {
    type: Date
  }
});


stageSchema.set('timestamps', true);

const Stage = mongoose.model('Stage', stageSchema);


module.exports = Stage;