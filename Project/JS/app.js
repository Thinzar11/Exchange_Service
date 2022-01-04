let result = document.getElementById("result");
let form = document.getElementById("from");
let to = document.getElementById("to");
let input = document.getElementById("input");
let list = document.getElementById("history_list");

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.appendChild(t);
    o.setAttribute("value",Number(toNum(z)))
    x.appendChild(o);
}


for(x in data.rates ){
    createOption(form,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
    // console.log(x,data.rates[x]);
}

function toNum(a){
    return a.replace(",","");
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();
    let x = input.value;
    let y = form.value;
    let z = to.value;
    // console.log(x,y,z);
    let fromText = x+" "+from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    let date = new Date();
    let d = date.toDateString();
    let first = x*y;
    let second = (first/z).toFixed(2);
    result.innerHTML = second;
    input.value = "";
    input.focus();
    form.value = "";
    to.value = "1";
    let arr = [d,fromText,toText,second];
    createTr(arr);
    save();
})
// function save(){
//     console.log(from.options[from.selectedIndex].innerHTML);
// }

function createTr(x){
    let rowspan = document.getElementById("rowSpaner");
    if(rowspan){
        rowspan.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
       
    })
    console.log(list);
    list.appendChild(tr);
}

function save(){
    localStorage.setItem("record",list.innerHTML);
};

(function(){
    if(localStorage.getItem("record")){
        list.innerHTML = localStorage.getItem("record");
    }else{
        list.innerHTML = `<tr> <td colspan = "4" id = "rowSpaner">Threr is no user</td>`;
    }
})();
document.addEventListener("click",function(e){
    // e.preventDefault();
    localStorage.clear();
})
function darkMode(){
    document.body.classList.toggle("night_mode");
    document.getElementById("modeChange").classList.toggle("fa-sun");
}
