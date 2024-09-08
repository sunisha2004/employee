async function getEmployee() {
    const res =  fetch("http://localhost:3011/getemployee");
    const data = await (await res).json();
    str=``;
    data.map((dt)=>{
                        str+=`
                        <tr>
                        <td><input type="text" id="name-${dt._id}" name="name" value=${dt.name} disabled=true placeholder="Employee Name" class="input-box"></td>
                        <td><input type="text" id="desg-${dt._id}" name="desg" value=${dt.desig} disabled=true placeholder="Designation" class="input-box"></td>
                        <td><input type="text" id="salary-${dt._id}" name="salary" value=${dt.salary} disabled=true placeholder="Salary" class="input-box"></td>
                        <td><input type="text" id="exp-${dt._id}" name="exp"  value=${dt.exp} disabled=true placeholder="Experience" class="input-box"></td>
                         <td><div id="tsalary-${dt._id}"></div></td>
                        
                        <td>
                            <button class="action-btn edit-btn" onclick="handleEdit('${dt._id}')">Edit</button>
                            <button class="action-btn save-btn" onclick="handleSave('${dt._id}')">Save</button>
                            <button class="action-btn delete-btn" onclick="handleDelete('${dt._id}')">Delete</button>
                        </td>
                        </tr>
                        `
    })
    document.getElementById("main").innerHTML=str;
    let salary=0;
    data.map((dt)=>{
        if(dt.exp=="1"){
            salary=parseInt(dt.salary)+(parseInt(dt.salary)*0.1)
        }
        else if(dt.exp=="2"){
            salary=parseInt(dt.salary)+(parseInt(dt.salary)*0.15)
        }
        else{
            salary=parseInt(dt.salary)+(parseInt(dt.salary)*0.2)

        }
        console.log(dt.salary);
        console.log(salary);
        document.getElementById(`tsalary-${dt._id}`).textContent=`Rs.${salary}`;
    });

}
getEmployee();

    async function handleEdit(id){
        document.getElementById(`name-${id}`).disabled=false;
        document.getElementById(`desg-${id}`).disabled=false;
        document.getElementById(`salary-${id}`).disabled=false;
        document.getElementById(`exp-${id}`).disabled=false;
    }
    async function handleDelete(id) {
        const res = await fetch("http://localhost:3011/delete",{
            method:"DELETE",
            headers:{"Content-Type":"text/plain"},
            "body":id
        })
        const data=await res.text();
        if(data=="success"){
            alert("Deleted Successfully!!!");
            getEmployee();
        }
        else{
            alert("Deletion Failed")
        }
    } 

    async function handleSave(id) {
        let name= document.getElementById(`name-${id}`).value;
        let desg=document.getElementById(`desg-${id}`).value;
        let salary=document.getElementById(`salary-${id}`).value;
        let exp=document.getElementById(`exp-${id}`).value
        let data={id,name,desg,salary,exp};
        const jsonData=JSON.stringify(data);
        const res=await fetch("http://localhost:3011/update",{
            "method":"PUT",
            "Content-Type":"text/json",
            "body":jsonData
        });
        const result=await res.text();
        if(result=="success"){
            alert("Updated Successfully!!!");
            getEmployee();
        }
        else{
            alert("Updation Failed")
        }
    }
    
