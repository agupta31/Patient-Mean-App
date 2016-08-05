var express=require('express'),
    app=express(),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    mongoose.connect('mongodb://localhost/patient512');

    var patientSchema=new mongoose.Schema({
             id:String,
             lastName:String,
             firstName:String,
             town:String,
             Medications:[{medname:String,dose:String,startDate:String,stopDate:String},
                 {medname:String,dose:String,startDate:String,stopDate:String},
                  {medname:String,dose:String,startDate:String,stopDate:String}
             ],
              temperature:String,
               pulse:String

    });
     var patient21=mongoose.model('patient923',patientSchema);
//
//      patient21.create([
//     {   "id": "Fred",
//         "lastName": "Smith",
//         "firstName": "Fred",
//         "town": "Arlington",
//         "Medications": [
//             {
//                 "medname": "morphine",
//                 "dose": "10mg",
//                 "startDate": "10/10/15"
//             },
//             {
//                 "medname": "acetaminophen",
//                 "dose": "325mg",
//                 "startDate": "10/10/15",
//                 "stopDate": "10/14/15"
//             },
//             {
//
//                 "medname": "furosemide",
//                 "dose": "20mg",
//                 "startDate": "10/31/15"
//             },
//
//         ],
//          "temperature":"35",
//              "pulse":"100 beats/min"
//
//     },
//
//     {
//         "id": "Sally",
//         "lastName": "Jones",
//         "firstName": "Sally",
//         "town": "Milford",
//         "Medications": [
//             {
//                 "medname": "morphine",
//                 "dose": "15mg",
//                 "startDate": "10/11/15"
//             },
//             {
//                 "medname": "coumadin",
//                 "dose": "5mg",
//                 "startDate": "10/15/15"
//             },
//             {
//                 "medname": "lovenox",
//                 "dose": "100mg/mL",
//                 "startDate": "10/31/15",
//                 "stopDate": "11/2/15"
//             },
//
//         ],
//              "temperature":"35",
//              "pulse":"100 beats/min"
//
//     }
// ],function(err,data){
//      if(err){
//         console.log(err);
//      }
//      else{
//        console.log(data);
//      }
// });

     app.get('/patientList',function(req,res){
           patient21.find({},function(err,data){
                 if(err){
                    console.log(err);
                 }
                 else{
                   res.json(data);
                 }
           });
     });

     app.get('/patientList/:id',function(req,res){
          patient21.findById(req.params.id,function(err,data){
               if(err){
                  console.log(err);
               }
               else{
                 res.json(data);
               }
          });
     });
     app.put('/patientList/:id',function(req,res){
           console.log(req.body);
          console.log(req.params.id);
           console.log("hello");
           patient21.findByIdAndUpdate(req.params.id,req.body,function(err,data){
                 if(err){
                   console.log(err);
                 }
                 else{
                   console.log(data);
                 }
           });
     })
    app.listen(2000,function(){
      console.log("server started");
   });
