
let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category")
let submit = document.getElementById("submit");
let mode = "create"
let tmp;

//get total
function gettotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    }else{
        total.innerHTML = "";
         total.style.background ="rgb(107, 2, 2)" 
    }
};

//creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro =[];

}


submit.onclick =function(){
    let newpro = {
           title:title.value.trim(),
           price:price.value,
           taxes:taxes.value,
           discount:discount.value,
           ads:ads.value,
           total:total.innerHTML,
           count:count.value,
           category:category.value,
    };
    if (newpro.title === "") {
        alert("Please enter a valid title");
        return;
    }


    if(title.value != "" && newpro.count<100){
        
        if(mode === "create"){

            if(newpro.count > 1){
                for(let i = 0  ; i < newpro.count ; i ++ ){
                   datapro.push(newpro);
                }
                
                }else{
                
        }
       }else{
        datapro[tmp] = newpro;
            mode = "create";
            submit.innerHTML ="Create";
            count.style.display = "block";
    
       }
    };

     cleardata();
   
    datapro.push(newpro)
    localStorage.setItem("product" ,JSON.stringify(datapro) )
    cleardata();
    showdata();
    
}




//save localstorage
//clear inputs
function cleardata(){
title.value = "";
price.value = "";
taxes.value = "";
discount.value = "";
ads.value = "";
total.innerHTML = "";
count.value = "";
category.value = "";
}
//read
function showdata(){
    gettotal();
let table ="";
for(let i =0;  i<datapro.length; i ++){
         table += `<tr>
                    <td>${i +1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price} </td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td> <button onclick ="updateData(${i})" id="update">update</button></td>
                    <td> <button onclick ="deletedata(${i})" id="delete">delete</button></td>

                </tr> `
        


document.getElementById("tbody").innerHTML = table;

let btnDelete = document.getElementById("deleteAll");
if(datapro.length > 0){
btnDelete.innerHTML = `<button onclick ="deleteAllData()">delete All(${datapro.length})</button>
`
 

}
else{
    btnDelete.innerHTML ="";
}
}
};
showdata();
//delete
function deletedata(i){

    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro)
    showdata();
}
function deleteAllData() {
    localStorage.clear(); // حذف البيانات من localStorage
    datapro.splice(0); // تفريغ المصفوفة datapro
    document.getElementById("tbody").innerHTML = ""; // مسح محتوى الجدول يدويًا
    document.getElementById("deleteAll").innerHTML = ""; // إخفاء زر "Delete All"
}




//count

//update
function updateData(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
category.value = datapro[i].category;
count.style.display ="none";
submit.innerHTML = "Update"
mode  = "update"
tmp = i;
gettotal();
scroll({
    top: 0,
    behavior: "smooth",

})
}



//search
let searchMood = "title";
function getsearchMood(id){
let search = document.getElementById("search");
if(id == "searchTitle"){
    searchMood = "title";
    search.placeholder = "search by title";
}else{
    searchMood = "category";
    search.placeholder = "search by category";
}
search.focus();
search.value = "";
showdata();
}

function searchData(value){
let table = "";
if(searchMood == "title"){

for( let i = 0; i < datapro.length ; i ++){

   if( datapro[i].title.includes(value)){
    table += `<tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price} </td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td> <button onclick ="updateData(${i})" id="update">update</button></td>
    <td> <button onclick ="deletedata(${i})" id="delete">delete</button></td>

</tr> `
    };
};




}
else{

    for( let i = 0; i < datapro.length ; i ++){

        if( datapro[i].category.includes(value)){
         table += `<tr>
         <td>${i}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price} </td>
         <td>${datapro[i].taxes}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
         <td> <button onclick ="updateData(${i})" id="update">update</button></td>
         <td> <button onclick ="deletedata(${i})" id="delete">delete</button></td>
     
     </tr> `
         }
     };
}
document.getElementById("tbody").innerHTML = table;
};

//clean data






