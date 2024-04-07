let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let mood = "create";
let tmp;
let searchmood = 'title';

function GetTotal() {
    if ((price.value) != '' ){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#ff0000'
    }
}
let datapro;

if((localStorage.product) != null ){
    datapro =  JSON.parse(localStorage.product);
}else{
    datapro = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (mood === "create") {
            if(newpro.count > 1){
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[tmp] = (newpro)
            submit.innerHTML= "create";
            count.style.display = 'block';
            mood = "create";        
        }
        clear()
    
    }else{
        alert('please enter values and make sure max count is 100')
    }

    localStorage.setItem('product',    JSON.stringify(datapro));
    console.log(datapro);
    showdata()
}

function clear() {
    title.value = '',
    price.value = '',
    ads.value = '',
    taxes.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '', 
    category.value = ''
}

function showdata() {
    GetTotal()
    let table = '' ;
    for (let i = 0; i < datapro.length; i++) {
      table += `     
      <tr>
      <td>${i+1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
  </tr> `
        
    }
let buttondel = document.getElementById('deleteall');
if(datapro.length > 0){
    buttondel.innerHTML =
`    <button onclick="deleteall()">delete all</button>`;
}else{
    buttondel.innerHTML = '';
}
document.getElementById('table').innerHTML = table;
}

showdata();

function deletedata(i) {
     datapro.splice(i,1);
     localStorage.product = JSON.stringify(datapro);
     showdata();
}

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    GetTotal();
    count.style.display= "none";
    submit.innerHTML = "update";
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

function getsearchmood(id) {
    if (id == 'searchbytitle') {
        searchmood = 'title';
    }else{
        searchmood = 'category';
    }
    search.placeholder = 'search by '+ searchmood;
search.focus();
search.value = '';
showdata()

}

function searchdata(value){
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
       if (searchmood == 'title') {
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `     
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr> `;
            }

        
       }else{
            if(datapro[i].category.includes(value.toLowerCase())){
                table += `     
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedata(${i})" id="update">update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
            </tr> `;
            }

        
        
       }}
    document.getElementById('table').innerHTML = table;
}