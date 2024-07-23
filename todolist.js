const userNameTextField = document.getElementById("username")
const addUserBtn = document.getElementById("adduser")
const recordsDisplay = document.getElementById("records")

//get data
let userArray =[]
let edit_id =null

// get data localstore
let objstr = localStorage.getItem('user')
//console.log(objstr)
if(objstr !=null)
    {
        userArray=JSON.parse(objstr) //string to object
        // console.log(userArray)
    }
    displayData()

addUserBtn.onclick=()=>{
    const name=userNameTextField.value 
    // alert(name)
    if(edit_id !=null)
        {
            userArray.splice(edit_id,1,{
                'name':name
            })
            edit_id=null
             addUserBtn.innerHTML = 'Add user'
        }else{
            userArray.push({'name':name})  //key--value
            //console.log(useArray)
        }

       saveData(userArray)
       userNameTextField.value=''
}
function saveData(userArray){
    // console.log(userArray)
    let str=JSON.stringify(userArray) //string
    //console.log(str)
    localStorage.setItem('user',str)  //string formate
    displayData()
    userNameTextField.value=''
}
function displayData(){
    let data =''
    userArray.forEach((item,i)=>{
        data += `<tr>
        <th>${i+1}</th>
        <td>${item.name}</td>
        <td>
        <i class="btn text-white fa fa-edit btn-info mx-2"
        onclick='EditInfo(${i})'></i>
        <i class="btn btn-danger text-white fa fa-trash"
        onclick='DeleteInfo(${i})'></i>
        </td>

        </tr>`;
        //console.log(data)
    })
    recordsDisplay.innerHTML = data;
}

function DeleteInfo(id)
{
    userArray.splice(id,1);
    saveData(userArray);
}

function EditInfo(id)
{
    edit_id=id
    userNameTextField.value = userArray[id].name;
     addUserBtn.innerHTML = 'Update User';
}
