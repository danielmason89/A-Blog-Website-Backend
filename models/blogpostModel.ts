import mongoose from "mongoose";
import validator from "validator";
import slugify from "slugify";

const blogpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: 20,
      validate: {
        validator: (v: string) => !validator.isEmpty(validator.stripLow(v, true)),
        message: "Body cannot be empty or only HTML tags",
      },
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_, doc) => {
        delete doc.__v;
        return doc;
      },
    },
  }
);

// Text index for search
blogpostSchema.index({ title: "text", body: "text" });

// Virtual: estimated reading time (≈200 wpm)
blogpostSchema.virtual("readingTime").get(function () {
  const words = this.body?.split(/\s+/).length || 0;
  return Math.ceil(words / 200);
});

// Pre‑validate: generate slug
blogpostSchema.pre("validate", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify.default(this.title, { lower: true, strict: true });
  }
  next();
});

// Ensure validators also run on findOneAndUpdate
blogpostSchema.pre("findOneAndUpdate", function () {
  this.setOptions({ runValidators: true });
});

export default mongoose.model("Blogpost", blogpostSchema);
