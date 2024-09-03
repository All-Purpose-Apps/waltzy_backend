import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tenantSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    dbURI: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  },
  {
    // toJSON: {
    //   virtuals: true
    // },
    // toObject: {
    //   virtuals: true
    // },
    timestamps: true,
  }
);

tenantSchema.index({
  tenantId: 1,
});

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;
