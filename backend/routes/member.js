const express = require("express");
const Member = require("../models/member");
const Counter = require("../models/counter");
const User = require("../models/user");
const authorizeUser = require("../middlewares/authorization");
const generatePassword = require("generate-password");
const {
  MaritalStatus,
  Fellowship,
  Ministry,
  MarriageType,
  Gender,
  ChurchCellGroup,
  Roles,
  SavedStatus,
  OtherChurchMembership,
  BaptisedStatus,
  MemberType,
} = require("../models/options");

const router = express.Router();

//test
router.post("/backend/member/test", async (req, res) => {
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

router.get("/backend/", (req, res) => {
  res.send("Welcome To The Church Members Management System!");
});
// Spouse details
router.post("/backend/member/spouse", async (req, res) => {
  try {
    //search for the spouse's details by phone no.
    const spouseDetails = await Member.findOne({ phone: req.body.spousePhone });
    if (!spouseDetails) {
      res.status(400).json({ message: "Could not find spouse's details" });
    }
    // use the phone number to search for spouse's name
    const spouseName = `${spouseDetails.firstName} ${spouseDetails.middleName} ${spouseDetails.surName}`;
    res.json(spouseName);
  } catch (err) {
    console.error({
      message: "Server error trying to find spouse's phone number",
      error: err,
    });
    // res.status(500).json({message: "Server error trying to find spouse's phone number"});
  }
});

//member's age
router.post("/backend/member/age", (req, res) => {
  try {
    const dob = req.body.dob;
    if (!dob) {
      res.json({ message: "Could not find Date of Birth" });
    }
    const currentYear = new Date().getFullYear();
    const yearOfBirth = new Date(dob).getFullYear();

    let age = currentYear - yearOfBirth;
    res.json(age);
    console.log(age);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting the age!" });
  }
});

//Father's details
router.post("/backend/member/father-details", async (req, res) => {
  try {
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
    res.json(fatherName);
  } catch (err) {
    console.error({
      message: "Server error trying to find father's phone number",
      error: err,
    });
  }
});

//Mother's details
router.post("/backend/member/mother-details", async (req, res) => {
  try {
    const mothersPhone = req.body.motherPhone;
    if (!mothersPhone) {
      res.json({ message: "Please enter the mother's phone number" });
    }

    //search for the mother's details by phone no.
    const motherDetails = await Member.findOne({ phone: mothersPhone });
    if (!motherDetails) {
      res.json({ message: "Could not find mother's details" });
    }

    // use the phone number to search for mother's name
    const motherName = `${motherDetails.firstName} ${motherDetails.middleName} ${motherDetails.surName}`;
    res.json(motherName);
  } catch (err) {
    console.error({
      message: "Server error trying to find mother's phone number",
      error: err,
    });
  }
});

// utility function to generate random password
const generateUniquePassword = async () => {
  let isUnique = false;
  let newPassword = "";

  while (!isUnique) {
    newPassword = generatePassword.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });

    const existingUser = await User.findOne({ password: newPassword });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return newPassword;
};

//create a member record
router.post("/backend/member/add", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      surName,
      email,
      phone,
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
      leadershipRole,
      deleted,
      notes,
    } = req.body;

    console.log(req.body)

    if (!nationalId) {
      return res.status(400).json({ message: "National ID is required." });
    }
    if (!firstName || !middleName) {
      return res
        .status(400)
        .json({ message: "First and Last name is required." });
    }

    if (!leadershipRole) {
      return res.status(400).json({ message: "The member role is required." });
    }

    const query = { nationalId };
    if (phone) query.phone = phone;
    if (email) query.email = email;

    const existingMember = await Member.findOne(query);
    if (existingMember) {
      return res.status(400).json({
        message: "A member with the same National ID or phone already exists.",
      });
    }

    const counterData = await Counter.findOneAndUpdate(
      { name: "memberCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    let seqId = counterData.seq.toString().padStart(4, "0");
    const memberId = `MCKE${seqId}`;
    const regDate = new Date().toLocaleString();

    // Generate a unique password for the user
    const generatedPassword = await generateUniquePassword();

    const userRegistrationData = {
      firstname: firstName,
      lastname: surName,
      userName: email ? email : `${firstName}${surName}`,
      email: email || "",
      password: generatedPassword,
      role: leadershipRole || "Member",
    };

    const userResponse = await fetch(`http://localhost:5500/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegistrationData),
    });

    // Check if user registration was successful
    if (!userResponse.ok) {
      const errorResponse = await userResponse.json();
      throw new Error(errorResponse.message || "User registration failed.");
    }

    // Create the member only if user creation is successful
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
      leadershipRole,
      notes,
      regDate,
    });

    const newRecord = await newMember.save();

    res.status(201).json({
      message: "Member and User account created successfully!",
      member: newRecord,
      user: await userResponse.json(),
      generatedPassword,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Error registering member and user account",
      error: err.message || "An error occurred",
    });
  }
});

router.get("/backend/member/find/all", async (req, res) => {
  try {
    const allMembers = await Member.find({ deleted: false });
    res.status(200).json(allMembers);
  } catch (err) {
    console.error("Error in /member/find/all:", err);
    res
      .status(500)
      .json({ message: "Could not retrieve members.", error: err.message });
  }
});

// Search a member record by ID
router.get("/backend/member/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    if (member.deleted) {
      return res.json("Member record no longer exists");
    }
    res.status(200).json(member);
  } catch (err) {
    console.error("Error in /member/:id:", err);
    res
      .status(500)
      .json({ message: "Error retrieving member.", error: err.message });
  }
});

// Update a member record
router.post("/backend/member/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Could not find the ID" });
    }
    const options = { new: true, upsert: true };
    const newUpdate = await Member.findByIdAndUpdate(id, req.body, options);
    res.status(200).json(newUpdate);
  } catch (err) {
    console.error("Error in /member/update/:id:", err);
    res.status(500).json({
      message: "Could not update the member's record.",
      error: err.message,
    });
  }
});

// Delete a member record
router.post("/backend/member/delete", async (req, res) => {
  try {
    const memberId = req.body.memberId;
    const record = await Member.findOne({ memberId });
    if (!record) {
      return res.status(404).json({ message: "Member not found" });
    }
    const id = record._id;
    const deleted = { $set: { deleted: true } };
    const options = { new: true };
    const deletedMember = await Member.findByIdAndUpdate(id, deleted, options);
    res.status(200).json(deletedMember);
  } catch (err) {
    console.error("Error in /member/delete:", err);
    res.status(500).json({
      message: "Could not delete the member's record.",
      error: err.message,
    });
  }
});

// Reports - Men Fellowship
router.get("/backend/reports/men-fellowship", async (req, res) => {
  try {
    const mmf = await Member.aggregate([{ $match: { fellowship: "Men" } }]);
    if (mmf.length === 0) {
      return res.json({
        message: "No members found for Men Fellowship. Please add members.",
      });
    }
    res.json(mmf);
  } catch (err) {
    console.error("Error in /reports/men-fellowship:", err);
    res
      .status(500)
      .json({
        message: "Error generating Men Fellowship report.",
        error: err.message,
      });
  }
});

// Reports - Women Fellowship
router.get("/backend/reports/women-fellowship", async (req, res) => {
  try {
    const wmf = await Member.aggregate([{ $match: { fellowship: "Women" } }]);
    if (wmf.length === 0) {
      return res.json({
        message: "No members found for Women Fellowship. Please add members.",
      });
    }
    res.json(wmf);
  } catch (err) {
    console.error("Error in /reports/women-fellowship:", err);
    res
      .status(500)
      .json({
        message: "Error generating Women Fellowship report.",
        error: err.message,
      });
  }
});

// Reports - Youth Fellowship
router.get("/backend/reports/youth-fellowship", async (req, res) => {
  try {
    const ymf = await Member.aggregate([{ $match: { fellowship: "Youth" } }]);
    if (ymf.length === 0) {
      return res.json({
        message: "No members found for Youth Fellowship. Please add members.",
      });
    }
    res.json(ymf);
  } catch (err) {
    console.error("Error in /reports/youth-fellowship:", err);
    res
      .status(500)
      .json({
        message: "Error generating Youth Fellowship report.",
        error: err.message,
      });
  }
});

// Reports - JSS Fellowship
router.get("/backend/reports/jss", async (req, res) => {
  try {
    const jss = await Member.aggregate([{ $match: { fellowship: "JSS" } }]);
    if (jss.length === 0) {
      return res.json({
        message: "No members found for JSS Fellowship. Please add members.",
      });
    }
    res.json(jss);
  } catch (err) {
    console.error("Error in /reports/jss-fellowship:", err);
    res
      .status(500)
      .json({
        message: "Error generating JSS Fellowship report.",
        error: err.message,
      });
  }
});

// Find All those under age 18
router.get("/backend/reports/under-18", async (req, res) => {
  const members = await Member.find();
  // console.log(members);
  let underEighteen = [];
  for (x = 0; x < members.length; x++) {
    if (members[x].age <= 18) {
      underEighteen.push(members[x]);
    }
  }
  res.json(underEighteen);
});

//
// Find All married members
router.get("/backend/reports/married", async (req, res) => {
  const members = await Member.find();
  let married = [];
  for (x = 0; x < members.length; x++) {
    if (members[x].maritalStatus == "married") {
      married.push(members[x]);
    }
  }
  res.json(married);
});

// Find All active members
router.get("/backend/reports/active", async (req, res) => {
  const activeMembers = await Member.aggregate([
    { $match: { isActive: true } },
  ]);

  res.json(activeMembers);
});

// Find All full members
router.get("/backend/reports/full-members", async (req, res) => {
  const fullMembers = await Member.aggregate([
    { $match: { memberType: "full" } },
  ]);

  const fullMembersCount = fullMembers.length;
  if (fullMembers.length === 0) {
    res.json("No full members");
  }
  res.json(fullMembers);
});

// Find All associate members
router.get("/backend/reports/associate-members", async (req, res) => {
  const associateMembers = await Member.aggregate([
    { $match: { memberType: "associate" } },
  ]);

  res.json(associateMembers);
});

/////////////////////////////////////////////////////////////////////////////
// ministries
// choir
router.get("/backend/ministry/choir", async (req, res) => {
  const choir = await Member.aggregate([{ $match: { ministry: "choir" } }]);
  res.json(choir);
});

// praise&Worship
router.get("/backend/ministry/praise&Worship", async (req, res) => {
  const praisenWorship = await Member.aggregate([
    { $match: { ministry: "praise&Worship" } },
  ]);
  res.json(praisenWorship);
});

// AwesomeMelodies
router.get("/backend/ministry/AwesomeMelodies", async (req, res) => {
  const AwesomeMelodies = await Member.aggregate([
    { $match: { ministry: "AwesomeMelodies" } },
  ]);
  res.json(AwesomeMelodies);
});

// Hospitality
router.get("/backend/ministry/Hospitality", async (req, res) => {
  const Hospitality = await Member.aggregate([
    { $match: { ministry: "Hospitality" } },
  ]);
  res.json(Hospitality);
});

// ushering
router.get("/backend/ministry/ushering", async (req, res) => {
  const ushering = await Member.aggregate([
    { $match: { ministry: "ushering" } },
  ]);
  res.json(ushering);
});

// SacramentStewards
router.get("/backend/ministry/SacramentStewards", async (req, res) => {
  const SacramentStewards = await Member.aggregate([
    { $match: { ministry: "SacramentStewards" } },
  ]);
  res.json(SacramentStewards);
});

// Csr
router.get("/backend/ministry/Csr", async (req, res) => {
  const Csr = await Member.aggregate([{ $match: { ministry: "Csr" } }]);
  res.json(Csr);
});

// missions&Evangelism
router.get("/backend/ministry/missions&Evangelism", async (req, res) => {
  const missionsnEvangelism = await Member.aggregate([
    { $match: { ministry: "missions&Evangelism" } },
  ]);
  res.json(missionsnEvangelism);
});

// Leader
router.get("/backend/ministry/Leader", async (req, res) => {
  const Leader = await Member.aggregate([{ $match: { ministry: "Leader" } }]);
  res.json(Leader);
});

/////////////////////////////////////////////////////////
// Baptism
router.get("/backend/baptism/baptised", async (req, res) => {
  const baptised = await Member.aggregate([
    { $match: { baptisedStatus: "baptised" } },
  ]);
  res.json(baptised);
});

// Not Baptised
router.get("/backend/baptism/not-baptised", async (req, res) => {
  const notBaptised = await Member.aggregate([
    { $match: { baptisedStatus: "notBaptised" } },
  ]);
  res.json(notBaptised);
});
////////////////////////////
// active status
// active
router.get("/backend/activity/active", async (req, res) => {
  const active = await Member.aggregate([{ $match: { isActive: "true" } }]);
  res.json(active);
});

// Find All dormant members
router.get("/backend/reports/dormant-members", async (req, res) => {
  const dormant = await Member.aggregate([{ $match: { isActive: false } }]);

  res.json(dormant);
});

/////////////////////////////////////////////
// Cell Groups
// week2
router.get("/backend/cell-group/week2", async (req, res) => {
  const weekTwo = await Member.aggregate([{ $match: { cellGroup: "week2" } }]);
  res.json(weekTwo);
});

// week3
router.get("/backend/cell-group/week3", async (req, res) => {
  const weekThree = await Member.aggregate([
    { $match: { cellGroup: "week3" } },
  ]);
  res.json(weekThree);
});

// week4
router.get("/backend/cell-group/week4", async (req, res) => {
  const weekFour = await Member.aggregate([{ $match: { cellGroup: "week4" } }]);
  res.json(weekFour);
});

// diaspora
router.get("/backend/cell-group/diaspora", async (req, res) => {
  const diaspora = await Member.aggregate([
    { $match: { cellGroup: "diaspora" } },
  ]);
  res.json(diaspora);
});

/////////////////
// Youth
// diaspora
router.get("/backend/Youth", async (req, res) => {
  const Youth = await Member.aggregate([{ $match: { fellowship: "Youth" } }]);
  res.json(Youth);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
// create fellowship
router.post("/backend/fellowships", async (req, res) => {
  const { id, title } = req.body;
  const newFellowship = new Fellowship({
    id,
    title,
  });

  const fellowship = await newFellowship.save();
  res.status(201).json(fellowship);
});

// get fellowship
router.get("/backend/fellowships", async (req, res) => {
  const fellowships = await Fellowship.find();
  res.status(200).json(fellowships);
});

// create marital status
router.post("/backend/marital-status", async (req, res) => {
  const { id, title } = req.body;

  const newStatus = new MaritalStatus({
    id,
    title,
  });

  const maritalStatus = await newStatus.save();
  res.status(201).json(maritalStatus);
});

// get marital status
router.get("/backend/marital-status", async (req, res) => {
  const maritalStatus = await MaritalStatus.find();
  res.status(200).json(maritalStatus);
});

// create ministry
router.post("/backend/ministry", async (req, res) => {
  const { id, title } = req.body;
  const newMinistry = new Ministry({
    id,
    title,
  });

  const ministry = await newMinistry.save();
  res.status(201).json(ministry);
});

// get ministry
router.get("/backend/ministry", async (req, res) => {
  const ministry = await Ministry.find();
  res.status(200).json(ministry);
});

// cell groups
router.post("/backend/cell-groups", async (req, res) => {
  const { id, title } = req.body;
  const newCellGroup = new ChurchCellGroup({
    id,
    title,
  });

  const cellGroup = await newCellGroup.save();
  res.status(201).json(cellGroup);
});

// get cell groups
router.get("/backend/cell-groups", async (req, res) => {
  const cellGroup = await ChurchCellGroup.find();
  res.status(200).json(cellGroup);
});

// create MarriageType
router.post("/backend/marriage-type", async (req, res) => {
  const { id, title } = req.body;
  const newMarriageType = new MarriageType({
    id,
    title,
  });

  const marriageType = await newMarriageType.save();
  res.status(201).json(marriageType);
});

// get MarriageType
router.get("/backend/marriage-type", async (req, res) => {
  const marriageType = await MarriageType.find();
  res.status(200).json(marriageType);
});

// create gender
router.post("/backend/gender", async (req, res) => {
  const { id, title } = req.body;
  const newGender = new Gender({
    id,
    title,
  });

  const gender = await newGender.save();
  res.status(201).json(gender);
});

// get gender
router.get("/backend/gender", async (req, res) => {
  const gender = await Gender.find();
  res.status(200).json(gender);
});

// create roles
router.post("/backend/roles", async (req, res) => {
  const { id, title } = req.body;
  const newRoles = new Roles({
    id,
    title,
  });

  const roles = await newRoles.save();
  res.status(201).json(roles);
});

// get roles
router.get("/backend/roles", async (req, res) => {
  const roles = await Roles.find();
  res.status(200).json(roles);
});

// create saved status
router.post("/backend/saved-status", async (req, res) => {
  const { id, title } = req.body;
  const newSavedStatus = new SavedStatus({
    id,
    title,
  });

  const savedStatus = await newSavedStatus.save();
  res.status(201).json(savedStatus);
});

// get saved status
router.get("/backend/saved-status", async (req, res) => {
  const savedStatus = await SavedStatus.find();
  res.status(200).json(savedStatus);
});

// create Other church membership
router.post("/backend/other-church-membership", async (req, res) => {
  const { id, title } = req.body;
  const newChurchMembeship = new OtherChurchMembership({
    id,
    title,
  });

  const churchMembeship = await newChurchMembeship.save();
  res.status(201).json(churchMembeship);
});

// get other-church-membership
router.get("/backend/other-church-membership", async (req, res) => {
  const churchMembeship = await OtherChurchMembership.find();
  res.status(200).json(churchMembeship);
});

// Baptised status
router.post("/backend/baptised-status", async (req, res) => {
  const { id, title } = req.body;
  const newBaptismStatus = new BaptisedStatus({
    id,
    title,
  });

  const BaptismStatus = await newBaptismStatus.save();
  res.status(201).json(BaptismStatus);
});

// get baptised status
router.get("/backend/baptised-status", async (req, res) => {
  const baptismStatus = await BaptisedStatus.find();
  res.status(200).json(baptismStatus);
});

// member type
router.post("/backend/member-type", async (req, res) => {
  const { id, title } = req.body;
  const newMemberType = new MemberType({
    id,
    title,
  });

  const memberType = await newMemberType.save();
  res.status(201).json(memberType);
});

// get baptised status
router.get("/backend/member-type", async (req, res) => {
  const memberType = await MemberType.find();
  res.status(200).json(memberType);
});
module.exports = router;
