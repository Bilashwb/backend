const { add, update, find, findall, remove } = require("./leave.services");
const {servererror,invalidrequest,updatemessge,datanotfound,deletemsg,imageerror,alreadyused,passerror,invaliddata,invalid}=require('../../locale/en');

const Add_ = (request, response) => {
  let {type,from_date,to_date,total_days}=request.body;
  if(type==undefined||from_date==undefined|| to_date==undefined||total_days==undefined)
  response.status(404).json({ message: invalidrequest });
  else{
  add(request.body,(err,result)=>{
    if (err) 
   {
    console.log(err)
    response.status(500).json({ message: servererror });
   }
    else
    response.status(200).json(result);
   });
} 
};


////,,,,,

const Update_ = (request, response) => {
  if (isNaN(request.params.id))
    response.status(400).json({ message: invalidrequest });
  else {
    find(request.params.id, (err, result) => {
      if (err) 
      response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: invalidrequest });
      else {
        let newData=request.body;
        let oldData=result;

        if(newData.type!=undefined && newData.type!=oldData.type)
        oldData={...oldData,type:newData.type};

        if(newData.from_date!=undefined && newData.from_date!=oldData.from_date)
        oldData={...oldData,from_date:newData.from_date};


        if(newData.to_date!=undefined && newData.to_date!=oldData.to_date)
        oldData={...oldData,to_date:newData.to_date};


        if(newData.total_days!=undefined && newData.total_days!=oldData.total_days)
        oldData={...oldData,total_days:newData.total_days};

        if(newData.remarks!=undefined && newData.remarks!=oldData.remarks)
        oldData={...oldData,remarks:newData.remarks};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};

        update(oldData,(err, result) => {
          if (err)
            response.status(500).json({ message: servererror });
          else if (result.affectedRows == 0)
            response.status(406).json({ message: datanotfound });
          else
            response.status(200).json({ message: updatemessge });
        });
      }
    });
  }
};









const Find_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    find(_id, (err, result) => {
      if (err) response.status(500).json({ message: servererror });
      else if (!result)
        response.status(404).json({ message: datanotfound });
      else response.status(200).json(result);
    });
  }
};





const FindAll_ = (request, response) => {
  findall(null, (err, result) => {
    if (err) response.status(500).json({ message: servererror });
    else if (result.length == 0)
      response.status(404).json({ message: datanotfound});
    else response.status(200).json(result);
  });
};




const Remove_ = (request, response) => {
  let _id = request.params.id;
  if (isNaN(_id)) response.status(400).json({ message: invalidrequest });
  else {
    remove(_id, (err, result) => {
      if (err) {response.status(500).json({ message: servererror });}
      else if (result.affectedRows == 0)
        response.status(406).json({ message: datanotfound });
      else response.status(200).json({ message: updatemessge });
    });
  }
};


module.exports = { Find_, FindAll_, Add_, Update_, Remove_ };