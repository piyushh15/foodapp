const mongoose = require('mongoose');
const mongourl="mongodb+srv://gofood:food@cluster1.oei3o3g.mongodb.net/gofoodmern?retryWrites=true&w=majority"

const mongoDB = async () => {
    try {
      await mongoose.connect(mongourl,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
      console.log('Connected!');
      let fetched_data = mongoose.connection.db.collection("food_item");
      let data=await fetched_data.find({}).toArray();
      global.food_item=data;


      let fetched_data2= mongoose.connection.db.collection("food_category");
      let catdata=await fetched_data2.find({}).toArray();
      global.food_category=catdata;
     
      // console.log(global.food_item);
      // console.log(global.food_category);

    } catch (error) {
      console.log('err: ', error);
    }
  };


module.exports=mongoDB;