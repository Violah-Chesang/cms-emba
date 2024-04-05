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
        const response = await axios.get('http://localhost:5000/member/memberId');
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
            const ageRes = await axios.post('http://localhost:5000/member/age',{dob : isoDOB})
            setAge(ageRes.data)
            console.log(ageRes.data);
        }catch(err){
            console.error(err);
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Father's name
    const [fatherPhone, setFatherPhone] = useState('');
    let [fatherName, setFatherName] = useState('');

    useEffect(() => {
        const getFathersName =async ()=> {
            const fatherDetails = await axios.post('http://localhost:5000/member/father-details', {fatherPhone : fatherPhone});
    
            if(fatherDetails.data === null){
                setFatherName(fatherName = '');
            }
            setFatherName(fatherDetails.data);
        }
        getFathersName()
    }, [fatherPhone]); 
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
// mother's name
const [motherPhone, setMotherPhone] = useState('');
let [motherName, setMotherName] = useState('');

useEffect(() => {
    const getMotherName =async ()=> {
        const mothersDetails = await axios.post('http://localhost:5000/member/mother-details', {motherPhone : motherPhone});
    
        if(mothersDetails.data === null){
            setMotherName(motherName = '');
        }
    
        setMotherName(mothersDetails.data);    
    }
    getMotherName();
}, [motherPhone])

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [phone, setPhone] = useState('');
const [spouseName, setspouseName] = useState('');

useEffect(() => {
    const getSpouseName = async() => {
        try{
            const res = await axios.post('http://localhost:5000/member/spouse', {spousePhone : phone});
            setspouseName(res.data)
        }catch(err){
            console.error("Error getting spouse name", err)
        }
    }
    getSpouseName()
}, [phone]);

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
    }

    let day = dateArray[1];
    if(day.length < 2){
        day = day.padStart(2, "0");
    }
    const newDate = `${year}-${month}-${day}`;

    setRegDate(newDate);
}, [regDate]);

//////////////////////////////////////////////////
    const handleForm = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const middleName = e.target.middleName.value;
        const surName = e.target.surName.value;
        const dob = e.target.dob.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const physicalAddress = e.target.physicalAddress.value;
        const nationalId = e.target.nationalId.value;
        const occupation = e.target.occupation.value;
        const gender = e.target.gender.value;
        const motherPhone = e.target.motherPhone.value;
        const maritalStatus = e.target.maritalStatus.value;
        const marriageType = e.target.marriageType.value;
        const savedStatus = e.target.savedStatus.value;
        const baptisedStatus = e.target.baptisedStatus.value;
        const otherChurchMembership = e.target.otherChurchMembership.value;
        const memberType = e.target.memberType.value;
        const cellGroup = e.target.cellGroup.value;
        const ministry = e.target.ministry.value;
        const fellowship = e.target.fellowship.value;
        const notes = e.target.notes.value;


        const memberData = {
            memberId :memberId,
            firstName : firstName,
            middleName:middleName,
            surName : surName,
            dob : dob,
            age:age,
            email : email,
            phone : phone,
            physicalAddress : physicalAddress,
            nationalId : nationalId,
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
            cellGroup : cellGroup,
            ministry : ministry,
            fellowship : fellowship,
            notes : notes
        }

        // create a user
        const res = await axios.post('http://localhost:5000/member/add', memberData);
        console.log(res.data);
        if(res.status === 202){
            alert(`${res.data.firstName}, your records have been successfully saved!`)
        }

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

                            <label htmlFor='middleName'>Middle Name:</label>
                            <input type="text" name="middleName" required placeholder='Doe' />

                            <label>Last Name:</label>
                            <input type="text" name="surName" placeholder='Doe' />
                            
                            <label> Date of Birth: </label>
                            <input type="date" name="dob" required onChange={handleDobChange} />

                            <label htmlFor='email'> Email: </label>
                            <input type="email" name="email"  placeholder='jondoe@gmail.com'/>

                            <label htmlFor='phone'> Phone Number: </label>
                            <input type="tel" name="phone" placeholder='0712345678' />
                            
                            <label htmlFor='physicalAddress'> Physical Address:</label>
                            <input type="text" name="physicalAddress" placeholder='Fedha'/>

                            <label htmlFor='nationalId'> ID Number:</label>
                            <input type="text" name="nationalId" placeholder='01234567'/>

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
                                <input type="tel" name="fatherPhone" placeholder='0712345678' onChange={(e) => setFatherPhone(e.target.value)}/>

                                <label htmlFor='motherPhone'> Mother's Phone: </label>
                                <input type="tel" name="motherPhone" placeholder='0712345678' onChange={(e) => setMotherPhone(e.target.value)}/>
                                                
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
                                <input type="text" name="spousePhone" onChange={(e) => setPhone(e.target.value)}  />                                

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
                            

                            <label htmlFor='cellGroup'>Cell Group:</label>
                            <select name='cellGroup'>
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

                            <label htmlFor='fellowship'> Fellowship: </label>
                            <select name='fellowship'>
                                <option>Select</option>
                                <option value="mmf">MMF</option>
                                <option value="mwf">Women Fellowship</option>
                                <option value="jss">JSS</option>
                                <option value="youth">Youth</option>
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