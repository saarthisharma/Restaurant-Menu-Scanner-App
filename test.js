// mongoose data types
// Types: {
//     String: [Function],
//     Number: [Function],
//     Boolean: [Function],
//     DocumentArray: [Function],
//     Subdocument: [Function],
//     Array: [Function],
//     Buffer: [Function],
//     Date: [Function],
//     ObjectId: [Function],
//     Mixed: [Function],
//     Decimal: [Function],
//     Decimal128: [Function],
//     Map: [Function],
//     Oid: [Function],
//     Object: [Function],
//     Bool: [Function],
//     ObjectID: [Function]
//   },



// const listRestaurant = async(req,res) => {
//     try {
//         let data = await Restaurant.aggregate(
//             [
//                 {
//                   '$unwind': {
//                     'path': '$cuisines'
//                   }
//                 }, {
//                   '$project': {
//                     '_id': 1, 
//                     'cuisines': cuisines['$cuisines']
//                   }
//                 }
//               ]
//         )
        
//         if(!data){
//             return responseHandler.handler(res,false, message.customMessages.NoDataFound, [], 500)    
//         }

//         console.log("data:",data)
        
//         // console.log("data is " , data);
//        // res.send("working")
//         // for(let item of data){
//         //     if(item && item.cuisines){
//         //         item.cuisines.map(function(element , index){
//         //             item.cuisines[index] = cuisines[element]
//         //         })
//         //     }    
//         // }
        
//          return responseHandler.handler(res,true,message.customMessages.restaurantList , data , 201)
        
       
//     } catch (error) {
//         console.log('error :', error);
//         return responseHandler.handler(res,false, message.customMessages.error, [], 500)
//     }
// }
