const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    title: String
});

const MaritalStatus = mongoose.model('MaritalStatus', optionsSchema);
const Fellowship = mongoose.model('Fellowship', optionsSchema);
const Ministry = mongoose.model('Ministry', optionsSchema);
const MarriageType = mongoose.model('MarriageType', optionsSchema);
const Gender = mongoose.model('Gender', optionsSchema);
const ChurchCellGroup = mongoose.model('ChurchCellGroup', optionsSchema);
const Roles = mongoose.model('Roles', optionsSchema);
const SavedStatus = mongoose.model('SavedStatus', optionsSchema);
const OtherChurchMembership = mongoose.model('OtherChurchMembership', optionsSchema);
const BaptisedStatus = mongoose.model('BaptisedStatus', optionsSchema);
const MemberType = mongoose.model('MemberType', optionsSchema);

module.exports = {
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
    MemberType
  };