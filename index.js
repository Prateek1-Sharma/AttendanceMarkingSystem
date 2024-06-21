async function handleformSubmit(event){
    event.preventDefault();
    // Window.location.reload()
    const date1=event.target.attndDay.value
    let dateData=await axios.post("http://localhost:4000/getAttendanceDate",{date:date1})
    console.log("DAte AVAilable",dateData);
    if(dateData.data.availableDate.length===0){
    const studentForm=document.getElementById("studentForm");
    studentForm.innerHTML='';
    const detailsOfStudents=await studentdetails();
    detailsOfStudents.forEach(element => {
    const students=`<div>
    <label>${element.name}
        <input type="radio" id="${element.name}-yes" name="${element.name}" value="present">
        <label for="${element.name}-no">present</label>
        <input type="radio" id="${element.name}-no" name="${element.name}" value="absent">
        <label for="${element.name}-no">absent</label>
    </label> 
    <br>
    </div>
    `
    studentForm.innerHTML+=students;
  

});
studentForm.innerHTML+=` <button type="submit">Mark Attendance</button>`;
console.log("Student Data ",studentForm);
    }

    if(dateData.data.availableDate.length>0){
        const showStudents=document.getElementById("divId")
        showStudents.innerHTML="";
        dateData.data.availableDate.forEach((element)=>{
            const listStudents=`<div>
    <label>${element.name}
        <label for="${element.attendance}-no">${element.attendance}</label>
    </label> 
    <br>
    </div>
    `
    showStudents.innerHTML+=listStudents;
        })

    }

    
}


async function studentAttendanceMarked(event){
event.preventDefault();
const date=document.getElementById("attendanceDay").value;
console.log(date);
console.log("attendance Marked");
const detailsOfStudents=await studentdetails();
let studentData=detailsOfStudents.map((item)=>{
    let attend=event.target[item.name].value
    return {name:item.name,attendance:attend}
  
})
let all_details={
    date,
    studentData
}
await axios.post("http://localhost:4000/addAttendance",all_details)
alert("Data Saved Successfully");
}


async function studentdetails() {
    try {
        const res = await axios.get("http://localhost:4000/getStudentList");
        console.log(res.data.studentList);
        return res.data.studentList;
    } catch (error) {
        console.error("Error fetching student details:", error);
        return [];
    }
}

async function studentReport(event){
    event.preventDefault()
    const res=await axios.get("http://localhost:4000/report")
    console.log(res);
    let studentReport=res.data.fetchData
    const formReport=document.getElementById("student-report");
    formReport.innerHTML='';
    studentReport.forEach(element => {
    const studentrepo=`<div>
    <label>${element.name}
        <label for="${element.name}-no">class Attended:-${element.attend}</label>
        <label for="${element.name}-no">percentage:-${element.percentage}</label>
    </label> 
    <br>
    </div>
    `
    formReport.innerHTML+=studentrepo;
  

});
}

// Window.location.reload()