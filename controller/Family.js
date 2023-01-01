const Family = require("../models/Family");

//create family
exports.createFamily = (req, res) => {
  const { gender, person } = req.body;
  const image = req.file.filename;

  const _familyObj = {
    gender,
    person,
    image,
  };

  if (req.body.name) {
    _familyObj.name = req.body.name;
  } else {
    _familyObj.parentId = req.body.parentId;
  }

  const family = new Family(_familyObj);

  family.save((error, data) => {
    if (error) return res.status(400).json({ error: "SOMETHING_WRONG" });
    res.status(200).json({ msg: "DATA_SAVED" });
  });
};

function refatorFamilyData(data, parentId = null) {
  let familyData = [];
  let family;
  if (parentId == null) {
    family = data.filter((familyMember) => familyMember.parentId == undefined);
  } else {
    family = data.filter((familyMember) => familyMember.parentId == parentId);
  }
  single=null
  for (let fam of family) {
    familyData.push({
      _id: fam._id,
      name: fam.name,
      person: fam.person,
      gender: fam.gender,
      image: fam.image,
      children: refatorFamilyData(data, fam._id),
    });
  }

  return familyData;
}

//fetch family tree data
exports.fetchFamily = (req, res) => {
  const {id} = req.params
  Family.find().exec((error, data) => {
    if (error) return res.status(400).json({ error });
 let familyData;
    if (data) {
         familyData = refatorFamilyData(data);

         if(id){
          familyData = familyData.filter((familyMember) => familyMember._id == id)
         }
      
      res.status(200).json(familyData);
    }
  });
};

//fetch single family data
exports.fetchSingleFamily = (req, res) => {
  Family.find({ name: { $exists: true } }).exec((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      res.status(200).json(data);
    }
  });
};
