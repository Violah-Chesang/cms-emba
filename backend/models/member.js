const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    memberId : {type: String, required : true},//, default : counter
    firstName : {type: String, required : true},
    lastName : {type: String, required : true},
    dob : {type: Date, required: true},
    email: {type: String, required : true, unique:true},
    phoneNumber: {type: String, required: false, unique: true},
    physicalAddress: {type: String, required : false},
    idNo : {type: Number, required : false, unique : true},
    fatherPhone: {type: String, required: false},
    motherPhone: {type: String, required: false},
    fatherName: {type: String, required: false},
    motherName: {type: String, required: false},
    maritalStatus : {type: String, required : false},
    marriageType :  {type: String, required : false},
    spouseId : {type : Number, required: false},
    spousePhone: {type: String, required : false},
    spouseName : {type : String, required: false},
    gender : {type: String, required : false},
    occupation : {type: String, required : false},
    savedStatus : {type: String, required : false},
    baptisedStatus : {type: String, required : false},
    otherChurchMembership : {type: String, required : false},
    memberType : {type: String, required : true},
    churchCellGroup :  {type: String, required : false},
    ministry : {type: String, required : false},
    age: {type: Number, required: false},
    deleted : {type : Boolean, default : false},
    isActive : {type : String, default: true},
    regDate : {type: Date, required : true, default: Date.now()},
    notes : {type: String, required : false}
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
