// import mongoose from "mongoose";

// export const connectDB = async() =>{
//     (await mongoose.connect('mongodb+srv://food-del-app:jaadu26102023@cluster0.wdphp.mongodb.net/food-del')).then(()=>console.log("DB Connected"));
// }


import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect('mongodb+srv://food-del-app:jaadu26102023@cluster0.wdphp.mongodb.net/food-del', {
        ssl: true,
        tlsInsecure: true // Only for testing environments
    })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("DB Connection Error: ", err);
    });
};