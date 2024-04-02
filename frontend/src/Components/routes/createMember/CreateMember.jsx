import React from 'react';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import './createMember.css';

function CreateMember() {
    // Setting member ID
    const [memberId, setMemberId] = useState('');
    useEffect( () => {
        getMemberId()
    }, []);
    const getMemberId = async () => {
        const response = await axios.get('http://localhost:8000/member/memberId');
        const id = response.data;
  
        setMemberId(id)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Display DOB on its input field
    const [age, setAge] = useState(0);

    const handleDobChange = async(e) => {
        const dob = e.target.value;

        //convert the DOB to iso date
        const isoDOB = new Date(dob).toISOString();
        await getAge(isoDOB)
    }

    const getAge=async (isoDOB)=> {
        //get age
        try{
            const ageRes = await axios.post('http://localhost:8000/member/age',{dob : isoDOB})
            setAge(ageRes.data)
            console.log(ageRes.data);
        }catch(err){
            console.error(err);
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Father's name
    const [fatherName, setFatherName] = useState('');

    const handleFatherPhone =async (e) => {
        const fathersPhoneNo = e.target.value;
        await getFathersName(fathersPhoneNo)
    }
    const getFathersName =async (fathersPhoneNo)=> {
        const fatherDetails = await axios.post('http://localhost:8000/member/father-details', {fatherPhone : fathersPhoneNo});
        setFatherName(fatherDetails.data);
    }
    // const res = await axios.post('http://localhost:8000/member/mother-details')

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
// mother's name
const [motherName, setMotherName] = useState('');

const handleMotherPhone =async (e) => {
    const mothersPhoneNo = e.target.value;
    await getMotherName(mothersPhoneNo);
}
const getMotherName =async (mothersPhoneNo)=> {
    const mothersDetails = await axios.post('http://localhost:8000/member/mother-details', {motherPhone : mothersPhoneNo});
    setMotherName(mothersDetails.data);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [spouseName, setspouseName] = useState('');

const handleSpousePhone =async (e) => {
    const spousePhoneNo = e.target.value;
    await getSpouseName(spousePhoneNo)
}
const getSpouseName =async (spousePhoneNo)=> {
    const spouseDetails = await axios.post('http://localhost:8000/member/spouse', {spousePhone : spousePhoneNo});
    setspouseName(spouseDetails.data);
}
//spouse name

// const [spousePhone, setSpousePhone] = useState('');
// const [spouseName, setSpouseName] = useState('');
// const handleSpousePhone= async (e) => {
//     const spousePhoneNo = e.target.value;
//     setSpousePhone(spousePhoneNo);
// }

// useEffect(() => {
//     const getSpouseName =async (spousePhone)=> {
//         const spouseDetails = await axios.post('http://localhost:8000/member/spouse', {spousePhone : spousePhone});
//         setSpouseName(spouseDetails.data);
//     }
//     getSpouseName();
// }, [])


//////////////////////////////////////////////////
//Registration Date
const [regDate, setRegDate] = useState(null);

useEffect(() => {
    let currentDate = new Date().toLocaleDateString()
    const dateArray = currentDate.split('/');
    const year = dateArray[2];

    let month = dateArray[0];
    if(month.length < 2){
        month = month.padStart(2, '0');
        console.log(`Padded month is ${month}`);
    }

    let day = dateArray[1];
    if(day.length < 2){
        day = day.padStart(2, "0");
    }
    const newDate = `${year}-${month}-${day}`;

    setRegDate(newDate)
    console.log(`Registration date is ${newDate}`);
}, [regDate]);

///////////////////////////////////////////////////////////
// Test
// const [test, setTest] = useState('');
// let testRef = useRef('')

// const handleTest = (e) => {
//     const testValue = e.target.value;
//     testRef.current = testValue
//     setTest(testRef.current);
// }


//////////////////////////////////////////////////
    const handleForm = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const dob = e.target.dob.value;
        const email = e.target.email.value;
        const phoneNumber = e.target.phoneNumber.value;
        const physicalAddress = e.target.physicalAddress.value;
        const idNo = e.target.idNo.value;
        const occupation = e.target.occupation.value;
        const gender = e.target.gender.value;
        const motherPhone = e.target.motherPhone.value;
        const maritalStatus = e.target.maritalStatus.value;
        const marriageType = e.target.marriageType.value;
        const savedStatus = e.target.savedStatus.value;
        const baptisedStatus = e.target.baptisedStatus.value;
        const otherChurchMembership = e.target.otherChurchMembership.value;
        const memberType = e.target.memberType.value;
        const churchCellGroup = e.target.churchCellGroup.value;
        const ministry = e.target.ministry.value;
        const notes = e.target.notes.value;


        const memberData = {
            firstName : firstName,
            lastName : lastName,
            dob : dob,
            email : email,
            phoneNumber : phoneNumber,
            physicalAddress : physicalAddress,
            idNo : idNo,
            occupation : occupation,
            gender : gender,
            // fatherPhone : fatherPhone,
            motherPhone : motherPhone,
            maritalStatus : maritalStatus,
            marriageType : marriageType,
            savedStatus : savedStatus,
            baptisedStatus : baptisedStatus,
            otherChurchMembership : otherChurchMembership,
            memberType : memberType,
            churchCellGroup : churchCellGroup,
            ministry : ministry,
            notes : notes,
            // regDate : regDate
        }

        // create a user
        const res = await axios.post('http://localhost:8000/member/add', memberData);
        console.log(res.data);

    }
    return (
        <div className='create'>
            <div className='cover'>
                <form className='create-form' onSubmit={handleForm}>
                    <div className='row1'>
                    <div className='skew'>

                    </div>
                        <fieldset className='row1-col'>
                    {/* <input type='text' name='test' onClick={handleTest} />
                    <button>{test}</button> */}
                            <label className='fieldset-header'>Personal information</label>

                            <label htmlFor='memberId'> Member ID:  </label>
                            <input type="number" name="memberId" placeholder='20240001' readOnly value={memberId}/>

                            <label htmlFor='firstName'>First Name:</label>
                            <input type="text" name="firstName" required placeholder='Jon' />

                            <label>Last Name:</label>
                            <input type="text" name="lastName" required placeholder='Doe' />
                            
                            <label> Date of Birth: </label>
                            <input type="date" name="dob" required onChange={handleDobChange} />

                            <label htmlFor='email'> Email: </label>
                            <input type="email" name="email" required  placeholder='jondoe@gmail.com'/>

                            <label htmlFor='phoneNumber'> Phone Number: </label>
                            <input type="tel" name="phoneNumber" placeholder='0712345678' />
                            
                            <label htmlFor='physicalAddress'> Physical Address:</label>
                            <input type="text" name="physicalAddress" placeholder='Fedha'/>

                            <label htmlFor='idNo'> ID Number:</label>
                            <input ype="number" name="idNo" placeholder='01234567'/>

                            <label htmlFor='age'> Age: </label>
                            <input type="number" name="age" value={age}/>

                            <label> Occupation: </label>
                            <input type="text" name="occupation"  />

                            <label htmlFor='gender'> Gender:</label>
                            <select name='gender'>
                                <option>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>                   

                        </fieldset>

                        <fieldset className='row1-col'>
                            <fieldset className='row1-col2'>
                                <label className='fieldset-header'>Parents details</label>

                                <label htmlFor='fatherPhone'> Father's Phone:</label>
                                <input type="tel" name="fatherPhone" placeholder='0712345678' onChange={handleFatherPhone}/>

                                <label htmlFor='motherPhone'> Mother's Phone: </label>
                                <input type="tel" name="motherPhone" placeholder='0712345678' onChange={handleMotherPhone}/>
                                                
                                <label htmlFor='fatherName'> Father's Name:</label>
                                <input type="text" name="fatherName" value={fatherName} />

                                <label htmlFor='motherName'> Mother's Name:</label>
                                <input type="text" name="motherName" value={motherName}/>
                            </fieldset>

                            <fieldset className='row1-col2'> 
                                <label className='fieldset-header'>Marital Details</label>

                                <label htmlFor='maritalStatus'> Marital Status:</label>
                                <select name='maritalStatus'>
                                    <option>Select</option>
                                    <option value="married">Married</option>
                                    <option value="single">Single</option>
                                </select>

                                <label htmlFor='marriageType'> Marriage Type:</label>
                                <select name='marriageType'>
                                    <option>Select</option>
                                    <option value="monogamous">Monogamous</option>
                                    <option value="polygamous">Polygamous</option>
                                </select>


                                <label htmlFor='spousePhone'> Spouse Phone No. :</label>
                                <input type="text" name="spousePhone" onChange={handleSpousePhone} />                                

                                <label htmlFor='spouseName'> Spouse Name:</label>
                                <input type="text" name="spouseName" value={spouseName}/>                    
                            </fieldset>
                        </fieldset>

                    </div>

                    <div className='row1'>
                        <fieldset className='row1-col'>      
                            <label className='fieldset-header'>Christian Life: </label>

                            <label htmlFor='savedStatus'> Saved Status:</label>
                                <select name='savedStatus'>
                                    <option>Select</option>
                                    <option value="saved">Yes</option>
                                    <option value="notSaved">No</option>
                                </select>            

                            <label htmlFor='baptisedStatus'> Baptised Status:</label>
                            <select name='baptisedStatus'>
                                <option>Select</option>
                                <option value="baptised">Yes</option>
                                <option value="notBaptised">No</option>
                            </select>            

                            <label htmlFor='otherChurchMembership'> Other Church Membership: </label>
                            <select name='otherChurchMembership'>
                                <option>Select</option>
                                <option value="yesOtherMembership">Yes</option>
                                <option value="noOtherMembership">No</option>
                            </select>

                            <label htmlFor='memberType'> Member Type: </label>
                            <select name='memberType'>
                                <option>Select</option>
                                <option value="fullMember">Full</option>
                                <option value="partialMember">Associate</option>
                            </select>
                            

                            <label htmlFor='churchCellGroup'>Cell Group:</label>
                            <select name='churchCellGroup'>
                                <option>Select</option>
                                <option value="week2">Week 2</option>
                                <option value="week3">Week 3</option>
                                <option value="week4">Week 4</option>
                            </select>

                            <label htmlFor='ministry'> Ministry: </label>
                            <select name='ministry'>
                                <option>Select</option>
                                <option value="intercessory">Intercessory</option>
                                <option value="choir">Choir</option>
                                <option value="praise&Worship">Praise & Worship</option>
                                <option value="ushering">Ushering</option>
                                <option value="hospitality">Hospitality</option>
                                <option value="csr">CSR</option>
                                <option value="missions&Evangelism">Missions & Evangelism</option>
                            </select>
                        </fieldset>
                        <fieldset className='row1-col'>
                            <label className='fieldset-header'>For Official Use Only</label>
                            <label> Notes:</label>
                            <textarea name="notes"  cols={45} rows={10} /> <br/>

                            <label htmlFor='regDate'> Registration Date: </label>
                            <input type="date" name="regDate" value={regDate}/> 
                        </fieldset>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateMember;