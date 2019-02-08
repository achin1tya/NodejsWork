const ObjectId = mongoose.Schema.Types.ObjectId,
  Mixed = mongoose.Schema.Types.Mixed
const bookSchema = mongoose.Schema({
  name: String,
  created_at: Date,
  updated_at: {type: Date, default: Date.now},
  published: Boolean,
  authorId : { type: ObjectId, required: true },
    description: { type: String, default: null },
    active: {type: Boolean, default: false},
    keywords: { type: [ String ], default: [] },
    description: {
      body: String,
      image: Buffer
  },
  version: {type: Number, default: function() {return 1;}},
  notes: Mixed,
  contributors: [ObjectId]
})
