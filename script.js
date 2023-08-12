//create local storage
let generateMemberId=()=>{
    return (Math.random()*100000).toString().split('.')[0]
}
const bindGridEventListners=()=>{
    document.querySelectorAll(".deleteMember").forEach(function(ele){
        ele.addEventListener("click",handleDeleteMember)
    })
    document.querySelector("#selectAll").addEventListener("click",handleSelectAll)
    document.querySelectorAll(".checkbox2").forEach(function(ele){
        ele.addEventListener("click",handleCheckUncheck)
    })
}
const bindfilterEventListners=()=>{
    document.querySelector(".ckkBoxAll").addEventListener("click",handleSelectAllCompany)
    document.querySelectorAll(".ckkBox").forEach(function(ele){
        ele.addEventListener("click",handleCheckUncheckCompany)
    })
}
let handleCheckUncheck =(event)=>{
    if(event.target.checked){   
        let isAllSelected=true;      
        document.querySelectorAll(".checkbox2").forEach(function(ele){
            if(!ele.checked){
               isAllSelected=false; 
               return;
            }
        })
        if(isAllSelected){
            document.querySelector("#selectAll").checked=true;
        }
            
    }
    else{
        if(document.querySelector("#selectAll").checked==true){
            document.querySelector("#selectAll").checked=false;
        }
    }
}
let handleSelectAll =(event)=>{
    if(event.target.checked){
        document.querySelectorAll(".checkbox2").forEach(function(ele){
            ele.checked=true;
        })
    }
    else{
        document.querySelectorAll(".checkbox2").forEach(function(ele){
            ele.checked=false;
        })
    }
}
let handleSelectAllCompany =(event)=>{
    if(event.target.checked){
        document.querySelectorAll(".ckkBox").forEach(function(ele){
            ele.checked=true;
        })
        createGrid();
    }
    else{
        document.querySelectorAll(".ckkBox").forEach(function(ele){
            ele.checked=false;
        })
        document.getElementById("members-table").innerHTML="";
    }
}
let handleCheckUncheckCompany =(event)=>{
    debugger;
    if(event.target.checked){           
        let isAllSelected=true;      
        document.querySelectorAll(".ckkBox").forEach(function(ele){
            if(!ele.checked){
               isAllSelected=false; 
               return;
            }
        })
        if(isAllSelected){
            document.querySelector(".ckkBoxAll").checked=true;
        }
            
    }
    else{
        if(document.querySelector(".ckkBoxAll").checked==true){
            document.querySelector(".ckkBoxAll").checked=false;
        }
    }

    document.querySelectorAll(".gridRow").forEach(function(ele){
        if(ele.getAttribute("data-company")==event.target.value){
           if(event.target.checked){
            ele.classList.remove("displayNone")
           }
           else{
            ele.classList.add("displayNone")
           }
        }
    })
}
let handleDeleteMember=(event)=>{
    showDeleteConfirmation();
    let checkBoxEle=event.target.closest("tr").querySelector(".checkbox2");
    let deleteId=checkBoxEle.getAttribute("data-id");
    if(checkBoxEle.checked){
        let l_StorageData=JSON.parse(localStorage.getItem("membersData"));
        let remainingItems=l_StorageData.filter(item=>item.Id!=deleteId);
        localStorage.removeItem("membersData");
        localStorage.setItem("membersData",JSON.stringify(remainingItems));      
        createGrid();
        createCompanyList();
    }
}
let createCompanyList=()=>{
    debugger;
    const uniqueCompanies = [...new Set( JSON.parse(localStorage.getItem("membersData")).map(obj => obj.Company)) ];
    document.querySelector(".form-control").innerHTML=`Company (${uniqueCompanies.length})`
    let tempSelect=document.getElementById("companyList")
    tempSelect.innerHTML="";
    let tempTemplate=`<label><input type="checkbox" value="all_lorems" class="ckkBoxAll" checked /><span class="companyListLbl">Select all</span></label><br>`
            uniqueCompanies.map(element => {
                tempTemplate +=`<label><input type="checkbox" value="${element}" class="ckkBox" checked /><span class="companyListLbl">${element}</span></label><br>`            
        })
    tempSelect.innerHTML=tempTemplate;
    bindfilterEventListners();
}
let createGrid=()=>{
    var memberTableElement=document.getElementById("members-table");
    memberTableElement.innerHTML="";//clearing table header and body
    var tempElement=`<tr><th><input id="selectAll" type="checkbox" class="checkbox1" name="checkbox1" value="member-name"></th>`
        tempElement+=`<th>Name</th><th>Company</th><th>Status</th><th>Last Updated</th><th>Notes</th></tr>`
    let memberData=JSON.parse(localStorage.getItem("membersData"));

    let addCls="";
    let addShadowBoxCls=""
    memberData.map((element,index)=> {
        if(index%2==0){
            addCls="row-style";
            addShadowBoxCls="shadow-box"
        }
        else{
            addCls="";
            addShadowBoxCls="";
        }
        tempElement+=`<tr data-company= "${element.Company}" class="${addCls} gridRow"><td><input data-id=${element.Id} type="checkbox" class="checkbox2" name="checkbox1" value="member-name">`
        tempElement+=`</td><td>${element.Name}</td><td>${element.Company}</td><td>${element.Status}</td>`
        tempElement+=`<td>${element.LastUpdated}</td><td>${element.Notes}</td>`
        tempElement+=`<td class="deleteMember"><i class="fa-sharp fa-solid fa-trash"></i></td><td class="${addShadowBoxCls}"></td></tr>`             
    });
    memberTableElement.innerHTML=tempElement;
    bindGridEventListners();    
}
if(localStorage.getItem("membersData")==null){
    var members=[
    {"Id":`${generateMemberId()}`,"Name":"Wyane Rooney","Company":"DC United","Status":"Active","LastUpdated":"07/07/2023","Notes":"Menu Highest Scorer"},
    {"Id":`${generateMemberId()}`,"Name":"CR7","Company":"DC United","Status":"Active","LastUpdated":"07/07/2023","Notes":"Menu Highest Scorer"},
    {"Id":`${generateMemberId()}`,"Name":"Messi","Company":"DC United","Status":"Active","LastUpdated":"07/07/2023","Notes":"Menu Highest Scorer"},
    {"Id":`${generateMemberId()}`,"Name":"Pele","Company":"DC United","Status":"Active","LastUpdated":"07/07/2023","Notes":"Menu Highest Scorer"},
    {"Id":`${generateMemberId()}`,"Name":"Neymar","Company":"DC United","Status":"Active","LastUpdated":"07/07/2023","Notes":"Menu Highest Scorer"}]
    localStorage.setItem("membersData",JSON.stringify(members));    
    createGrid();
    createCompanyList();
}
else{
    createGrid();
    createCompanyList();
}

let deleteMember=(ele)=>{
console.log(ele);
}



// Get the modal 
let modalSec=document.getElementById("modal-sec");
let modalDeleteConfirmation=document.getElementById("modal-deleConfirmation");
// Get the addmembers div
let addMembers=document.querySelector(".add-member");
// Get cross from modal
let cross=document.querySelector(".cross");//submitCancel
let crossDeleteModal=document.querySelector(".crossDeleteModal");
let modalDeleteBtn=document.querySelector("#modal-deleteBtn");
let modalCancelBtn=document.querySelector("#modal-cancelBtn");
//modal-cancelBtn
//modal-deleteBtn

// Get ovelay 
let submitCancel=document.querySelector("#submitCancel");
let ovelay=document.querySelector(".overlay");
let statusSort=document.querySelector("#statusContainer")
statusSort.addEventListener("click",handleSortStatus)


addMembers.addEventListener("click",show)
function handleSortStatus(event){
    let l_StorageData=JSON.parse(localStorage.getItem("membersData"));
    if(event.target.getAttribute("data-order")=="asc"){
        l_StorageData.sort(function(a, b) { 
            return a.Status - b.Status  ||  a.Status.localeCompare(b.Status);
          });
          event.target.setAttribute("data-order","desc");
    }
    else{
        l_StorageData.sort(function(a, b) { 
            return b.Status - a.Status  ||  b.Status.localeCompare(a.Status);
          });
          event.target.setAttribute("data-order","asc");
    }
      console.log(JSON.stringify(l_StorageData))
      localStorage.removeItem("membersData")
      localStorage.setItem("membersData",JSON.stringify(l_StorageData))
      createGrid();
      createCompanyList();
}
function show(){
    // modalSec.classList.remove("modal")
    modalSec.style.display="block"
    ovelay.style.display="block"
}
function showDeleteConfirmation(){
    modalDeleteConfirmation.style.display="block"
    ovelay.style.display="block"
}
// for cross the modal 
cross.addEventListener("click",cancelFunc)
crossDeleteModal.addEventListener("click",crossDeleteModalHandler)
modalDeleteBtn.addEventListener("click",deleteConfirmHandler)
modalCancelBtn.addEventListener("click",modalCancelBtnHandler)
//modalCancelBtn
function modalCancelBtnHandler(){
    ovelay.style.display="none"
    modalDeleteConfirmation.style.display="none"
    preventDefault();
}
function deleteConfirmHandler(){
    ovelay.style.display="none"
    modalDeleteConfirmation.style.display="none"
}
//modalDeleteBtn
submitCancel.addEventListener("click",cancelFunc)
function cancelFunc(){
    ovelay.style.display="none"
    modalSec.style.display="none"
}
function crossDeleteModalHandler(){
    ovelay.style.display="none"
    modalDeleteConfirmation.style.display="none"
    preventDefault();
}
// Get all modal inputs 
const name=document.getElementById("Name")
const comapny=document.getElementById("Company")
const status=document.getElementById("Status")
const notes=document.getElementById("Notes")

// Get modal form
let form=document.querySelector(".modal-form")
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let Name=event.target.name.value;
    let Company=event.target.company.value;
    let Status=event.target.status.value;
    let Notes=event.target.notes.value;
    const d = new Date()
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let todayDate=`${day}/${month}/${year}`
    console.log(todayDate);
    let tempLocalStorageData=JSON.parse(localStorage.getItem("membersData"));
    let tempMemberObj={"Id":`${generateMemberId()}`,"Name":Name,"Company":Company,"Status":Status,"LastUpdated":`${todayDate}`,"Notes":Notes}
    tempLocalStorageData.push(tempMemberObj);
    localStorage.removeItem("membersData");
    localStorage.setItem("membersData",JSON.stringify(tempLocalStorageData));
    createGrid();
    createCompanyList();
})
  function setCheckboxSelectLabels(elem) {
    var wrappers = document.querySelectorAll('.wrapper');
    wrappers.forEach(function(wrapper) {
      var checkboxes = wrapper.querySelectorAll('.ckkBox');
      var label = wrapper.querySelector('.checkboxes').id;
      var prevText = '';
      checkboxes.forEach(function(checkbox) {
        var button = wrapper.querySelector('button');
        if (checkbox.checked) {
          var text = checkbox.nextElementSibling.innerHTML;
          var btnText = prevText + text;
          var numberOfChecked = wrapper.querySelectorAll('input.val:checked').length;
          if (numberOfChecked >= 4) {
            btnText = numberOfChecked + ' ' + label + ' selected';
          }
          button.textContent = btnText;
          prevText = btnText + ', ';
        }
      });
    });
  }
  
  function toggleCheckedAll(checkbox) {
    var wrapper = checkbox.closest('.wrapper');
    var apply = wrapper.querySelector('.apply-selection');
    apply.style.display = 'block';
    
    var val = wrapper.querySelectorAll('.val');
    var all = wrapper.querySelectorAll('.all');
    var ckkBoxes = wrapper.querySelectorAll('.ckkBox');
  
    if (!checkbox.checked) {
      all.forEach(function(checkAll) {
        checkAll.checked = true;
      });
      return;
    }
  
    if (checkbox.classList.contains('all')) {
      val.forEach(function(checkVal) {
        checkVal.checked = false;
      });
    } else {
      all.forEach(function(checkAll) {
        checkAll.checked = false;
      });
    }
  }


//   Get multiple dropdown 
let ellipse=document.querySelector(".ellipsis");
  function handleCompanyFilter(event){
    if(event.target.getAttribute("data-flag")=="hide"){
        event.target.setAttribute("data-flag","show")
        event.target.parentElement.querySelector(".checkboxes").classList.remove('displayNone')
        event.target.parentElement.querySelector(".checkboxes").classList.add('displayBlock')

    }
    else{
        event.target.setAttribute("data-flag","hide")
        event.target.parentElement.querySelector(".checkboxes").classList.remove('displayBlock')
        event.target.parentElement.querySelector(".checkboxes").classList.add('displayNone')
        
    }
    
  }
  document.querySelector('.toggle-next').addEventListener("click",handleCompanyFilter);



  

  






   
    
    





























