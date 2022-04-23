const seatSchema = new mongoose.Schema({
    seatNumber: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
      required: true,
    },
    seatClass: {
      type: String,
      required: false,
    },
    charge: {
      type: Number,
      required: false,
    },
  })