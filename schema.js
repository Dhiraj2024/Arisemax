const Joi = require("joi");

// 1️⃣ Afr Schema
const afrSchema = Joi.object({
  afr: Joi.object({
    title: Joi.string().required(),
  }).required(),
});

// 2️⃣ Daily Schema
const dailySchema = Joi.object({
  daily: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("", null),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).optional(),
  }).required(),
});

// 3️⃣ Expo Schema
const expoSchema = Joi.object({
  expo: Joi.object({
    title: Joi.string().required(),
    eligibility: Joi.string().required(),
    details: Joi.string().required(),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).optional(),
  }).required(),
});

// 4️⃣ Go Schema
const goSchema = Joi.object({
  go: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("", null),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).optional(),
  }).required(),
});

// 5 idolSchema
const idolSchema = Joi.object({
  idol: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("", null),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).optional(),
  }).required(),
});

//6 mortgage
const mortSchema = Joi.object({
  mort: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow("", null),
    image: Joi.object({
      filename: Joi.string().allow("", null),
      url: Joi.string().uri().allow("", null),
    }).optional(),
  }).required(),
});


//6 mortgage
const userSchema = Joi.object({
  user: Joi.object({
    email:{
        type:String,
      required: true,
    },
})
});
module.exports = { afrSchema, dailySchema, expoSchema, goSchema ,idolSchema ,mortSchema,userSchema};
