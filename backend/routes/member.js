const express = require("express");
const Member = require("../models/member");
const Counter = require("../models/counter");
const authorizeUser = require("../middlewares/authorization");

const router = express.Router();

// Define variables that will get its info froum other routes handles
let memberId = null;
let age = null;
let fatherName = '';
let motherName = '';
let spouseName = '';


//test
router.post("/member/test", async (req, res) => {
  // No. of members
  // const count = await Member.countDocuments({});

  // get father's details
  // const fathersPhone = req.body.phone;
  // const member = await Member.findOne({ phone: fathersPhone });
  // if (!member) {
  //   res.json({ message: "Father's details not found" });
  // }
  // const father = `${member.firstName} ${member.lastName}`;
  res.json(father);

  //aggregation pipeline
  // try {
  //match
  // const mmf = await Member.aggregate([
  //     {$match : {deleted : false}}
  // ]);

  //   const mmf = await Member.findOne({deleted: true})
  //   console.log(mmf);
  // } catch (err) {
  //   res.status(500).json({ message: "Error finding the members", error : err.message });
  // }
});

//memberId
router.get('/member/memberId',async (req,res)=> {
  try{
    //user Counter model to increase sequence(seq) number
    const counterData = await Counter.findOneAndUpdate(
      { name: "counter name" },
      //$inc increases seq by 1
      { $inc: { seq: 1 } },
      //return a new document
      { new: true, upsert: true }
    );

    let seqId;
    //give it a name if it's empty
    if (counterData.name === null) {
      name: "counter name";
    }
    //assign 1 if it's empty and save it
    if (counterData.seq === null) {
      const newCounterSeq = new Counter({ name: "counter name", seq: 1 });

      await newCounterSeq.save();
      seqId = 1;
    } else {
      //extract seq no from the aboved saved document and mmake it 4 digits
      seqId = counterData.seq;
      paddedSeqId = seqId.toString().padStart(4, "0");
    }
    //the member id to have YYYY concatenated with seqId
    //Get the current full year
    const year = new Date().getFullYear();

    // concatenate year and padded seqId
    memberId = `${year}${paddedSeqId}`;
    res.json(memberId)
    console.log(`Member id inside try is ${memberId}`);
  }catch(err){
    console.error({message: "Could not access the memberId", Error: err})
    res.json({message: "No member Id", Error: err})
  }
  
});
// Spouse details
router.post('/member/spouse', async (req, res) => {
  try{
    //search for the spouse's details by phone no.
    const spouseDetails = await Member.findOne({ phone: req.body.spousePhone });
    if(!spouseDetails){
      res
      .status(400)
      .json({message: "Could not find spouse's details"});
    }    
    // use the phone number to search for spouse's name
    const spouseName = `${spouseDetails.firstName} ${spouseDetails.middleName} ${spouseDetails.surName}`;
    res.json(spouseName)
  }catch(err){
    console.error({message: "Server error trying to find spouse's phone number", error: err});
    // res.status(500).json({message: "Server error trying to find spouse's phone number"});
  }
});

//member's age
router.post("/member/age", (req,res) => {
  try{
    const dob = req.body.dob
    if (!dob) {
      res.json({ message: "Could not find Date of Birth" });
    }
    const currentYear = new Date().getFullYear();
    const yearOfBirth = new Date(dob).getFullYear();
  
    const age = currentYear - yearOfBirth;
    res.json(age);
    console.log(age);


  }catch(err){
    console.error(err);
    res.status(500).json({message: "Error getting the age!"})
  }
});

//Father's details
router.post('/member/father-details',async (req,res) => {
  try{
    const fathersPhone = req.body.fatherPhone;
    // if (!(fathersPhone)) {
    //       res.json({ message: "Please enter the father's phone number" });
    // }
    //search for the father's details by phone no.
    const fatherDetails = await Member.findOne({ phone: fathersPhone });
    // if(!fatherDetails){
    //   res.json({message: "Could not find father's details"});
    // }
    // use the phone number to search for father's name
    const fatherName = `${fatherDetails.firstName} ${fatherDetails.middleName} ${fatherDetails.surName}`;
    res.json(fatherName)
  }catch(err){
    console.error({message: "Server error trying to find father's phone number", error: err});
  }
});

//Mother's details
router.post('/member/mother-details',async (req,res) => {
  try{
    const mothersPhone = req.body.motherPhone;
    if (!(mothersPhone)) {
          res.json({ message: "Please enter the mother's phone number" });
    }

    //search for the mother's details by phone no.
    const motherDetails = await Member.findOne({ phone: mothersPhone });
    if(!motherDetails){
      res.json({message: "Could not find mother's details"});
    }

    // use the phone number to search for mother's name
    const motherName = `${motherDetails.firstName } ${motherDetails.middleName} ${motherDetails.surName}`;
    res.json(motherName)
  }catch(err){
    console.error({message: "Server error trying to find mother's phone number", error: err});
  }
});

//create a member record
router.post("/member/add", async (req, res) => {
  try {
    const regDate = Date.now().toLocaleString();

    const {
      memberId,
      firstName,
      middleName,
      surName,
      email,
      phone,//for spouse
      phoneNumber,
      physicalAddress,
      dob,
      age,
      fatherName,
      motherName,
      fatherPhone,
      motherPhone,
      spouseName,
      maritalStatus,
      spouseId,
      nationalId,
      gender,
      marriageType,
      occupation,
      savedStatus,
      baptisedStatus,
      otherChurchMembership,
      memberType,
      cellGroup,
      ministry,
      fellowship,
      deleted,
      notes,
    } = req.body;

    ///////////////////////////////////////////////////////
    const newMember = new Member({
      memberId,
      firstName,
      middleName,
      surName,
      email,
      phone,
      phoneNumber,
      physicalAddress,
      dob,
      nationalId,
      age,
      fatherPhone,
      motherPhone,
      fatherName,
      motherName,
      maritalStatus,
      spouseId,
      spouseName,
      gender,
      marriageType,
      occupation,
      savedStatus,
      baptisedStatus,
      otherChurchMembership,
      memberType,
      cellGroup,
      ministry,
      fellowship,
      deleted,
      notes,
    });

    const newRecord = await newMember.save();
    res
      .status(201)
      .json(newRecord);
  } catch (err) {
    const errorMessage = err.message || "An error while registering the member";
    res
      .status(500)
      .json({ message: "Error registering member", error: errorMessage });
  }
});

//Search all members
router.get("/member/find/all", async (req, res) => {
  try {
    const allMembers = await Member.find({ deleted: false });
    res
      .status(200)
      .json(allMembers);
  } catch (err) {
    const errorMessage = err.message || "Error getting members";
    res
      .status(500)
      .json({ message: "Could not restrieve members.", error: errorMessage });
  }
});

//Search a member record
router.post("/member/find", async (req, res) => {
  try {
    const memberID = req.body.memberId
    const member = await Member.find({ memberId: memberID });
    
    if(member.deleted === true){
      res.json("Member record nolonger exists")
    }
    res
    .status(200)
    .json(member);
  } catch (err) {
    const errorMessage = err.message || "Error getting the member";
    res.status(500).json({
      message: "Could not restrieve the member.",
      error: errorMessage,
    });
  }
});

//Update a member record
router.post("/member/update/:id", async (req, res) => {
  try {
    //filter(search by id)
    const id = req.params.id;
    if(!id){
      res.json({message: "Could not find the ID"})
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      physicalAddress,
      dob,
      nationalId,
      maritalStatus,
      spouseId,
      gender,
      marriageType,
      occupation,
      savedStatus,
      baptisedStatus,
      otherChurchMembership,
      cellGroup,
      ministry,
      deleted,
      notes,
    } = req.body;

    //options
    const options = { new: true };


    // the update
    const newUpdate = await Member.findByIdAndUpdate(
      id,
      { firstName,
        lastName,
        email,
        phone,
        physicalAddress,
        dob,
        nationalId,
        maritalStatus,
        spouseId,
        gender,
        marriageType,
        occupation,
        savedStatus,
        baptisedStatus,
        otherChurchMembership,
        cellGroup,
        ministry,
        deleted,
        notes
      },
      options
    );
    res.status(200).json({ message: "Record successfully updated", newUpdate });
  } catch (err) {
    const errorMessage = err.message || "Error updating the record";
    res.status(500).json({
      message: "Could not update the member's record.",
      error: errorMessage,
    });
  }
});

//delete a member record
router.post("/member/delete", async (req, res) => {
  try {
    const memberId = req.body.id;
    
    const record = await Member.findOne( {_id: memberId});
    const id = record.id;
    //the update to be implemented on the filter
    const deleted = { $set: { deleted: true } };
    //options
    const options = { new: true };

    // //perform the delete
    const deletedMember = await Member.findByIdAndUpdate(id, deleted, options);
    res
      .status(200)
      .json(deletedMember);

  } catch (err) {
    const errorMessage = err.message || "Error deleting the record";
    res.status(500).json({
      message: "Could not delete the member's record.",
      error: errorMessage,
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Reports
// Find All MMF
router.get("/reports/men-fellowship", async (req, res) => {
  try{
    const mmf = await Member.aggregate([{ $match: { fellowship: "mmf" } }]);
    if (mmf.length === 0) {
      res.json("Men Fellowship report not found");
    }
    res.json(mmf);
  }catch(err){
    console.error({message: "No MMF report found", error: err});
    res
    .status(404)
    .json({message: "No MMF report found", error: err})
  }
});

// Find All MWF
router.get("/reports/women-fellowship", async (req, res) => {
  const mwf = await Member.aggregate([{ $match: { fellowship: "mwf" } }]);
  if (mwf.length === 0) {
    res.json("Women fellowship report not found");
  }
  res.json(mwf);
});

// Find the youth
router.get("/reports/youth-fellowship", async (req, res) => {
  const myf = await Member.aggregate([{ $match: { fellowship: "youth" } }]);
  if (myf.length === 0) {
    res.json("Youth report not found");
  }
  res.json(myf);
});

// Find JSS
router.get("/reports/jss", async (req, res) => {
  try {
    const jss = await Member.aggregate([{ $match: { fellowship: "jss" } }]);
    if (jss.length === 0) {
      res.json("JSS report not found");
    }
    res.json(jss);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error generating the report!", error: err.message });
  }
});


// Find All active members
router.get("/reports/active", async (req, res) => {
  const activeMembers = await Member.aggregate([
    { $match: { isActive: true } },
  ]);

  res.json(activeMembers);
});
// Find All dormant members
router.get("/reports/dormant-members", async (req, res) => {
  const dormantMembers = await Member.aggregate([
    { $match: { isActive: false } },
  ]);

  res.json(dormantMembers);
});

// Find All full members
router.get("/reports/full-members", async (req, res) => {
  const fullMembers = await Member.aggregate([
    { $match: { memberType: "full" } },
  ]);

  const fullMembersCount = fullMembers.length;
  if(fullMembers.length === 0){
    res.json("No full members");
  }
  res.json({fullMembers: fullMembers, fullCount: fullMembersCount});
});

// Find All associate members
router.get("/reports/associate-members", async (req, res) => {
  const associateMembers = await Member.aggregate([
    { $match: { memberType: "associate" } },
  ]);
  const associateCount = associateMembers.length;

  res.json({assoMembers: associateMembers, assoCount : associateCount});
});

module.exports = router;
