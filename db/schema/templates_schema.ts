import mongoose, { model, models, Schema, SchemaType } from "mongoose";
import { ITemplate } from "../../interface/interface";

const templates = new Schema<ITemplate>({
  name: { required: true, type: String, unique: true },
  autor: { required: true, type: mongoose.Types.ObjectId },
  type: { required: true, type: String },
  star: { required: true, type: Number },
  downloads: { required: true, type: Number },
  created: { required: true, type: Date },
  modified: { required: true, type: Date },
});

const TemplatesSchema =
  models.Templates || model("Templates", templates, "templates");

export default TemplatesSchema;
