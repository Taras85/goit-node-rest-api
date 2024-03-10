// import { Schema, model } from "mongoose";
// import { handleMongooseError } from "../helpers/handleMongooseError.js";

// import Joi from "joi";

// const phoneRegexp = /^(\(\d{3}\))\s\d{3}-\d{4}$/;


// export const createContactSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required() ,
//     phone: Joi.string().pattern(phoneRegexp).required(),
//     favorite: Joi.boolean(),
    
  
// })

// export const updateContactSchema = Joi.object({
//     name: Joi.string(),
//     email: Joi.string() ,
//     phone: Joi.string(),
//     favorite: Joi.boolean(),
// })




// const contactShema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone:  {
//     type: String,
//     match: phoneRegexp,
//     required: true,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
//   //опис з значенням за замовченням
//   // favorite: {
//   //   type: Boolean,
//   //   default: false,
//   //   },

//   //опис з значенням зі списку з масиву
//   // genre: {
//   //   type: String,
//   //   enum: ['fantastic', 'love'],
//   //   required: true,
//   //   },

//   //опис з регулярним виразом
//   // date: {
//   //   type: String,
//   //   //дата в форматі 16-10-2009
//   //   match: /^\d{2}-\d{2}-\d{4}$/, 
//   //   //телефон в форматі (233) 738-2360
//   //   match: /^(\(\d{3}\))\s\d{3}-\d{4}$/,
//   //   required: true,
//   // },

// }, { versionKey: false, timestamps: true });

// contactShema.post('save', handleMongooseError);


// export const Contact = model("contact", contactShema);