let data = [];
const fetchData = () => {
    //verinin çekildiği yer
    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            //json'dan okunan verinin data array'ine atanması
            data = responseData;

            //veri geldikten sonra filtreleme butonu görünür olsun
            let filterButton = document.querySelector("#filterButton");
            filterButton.setAttribute("style", "");

            //verinin html içerisinde listelendiği fonksiyon
            listData(responseData);
        })
        .catch(err => {
            //hata yönetimi
            alert("bir hata olustu !")
            console.log(err)
        })
}

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let list = document.querySelector(".list");
    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>age:</span> ${element.age}
            <span class='bold'>isactive:</span> ${element.isActive}
            <span class='bold'>email:</span> ${element.email}
        </li>
        `;
    })
}

var input = document.getElementsByTagName("input");
input[2].onblur = getvalue;

function getvalue() {
    var isim = input[2].value;
    var ilkharf = isim.toUpperCase().charAt(0);
    return ilkharf;
}

function check() {
    //console.log(ilkharf);
    if (input[0].checked && input[1].checked && getvalue() != "") {
        return "resit active harf";
    }
    if (input[0].checked && input[1].checked) {
        return "resit active";
    } else if (input[0].checked && getvalue() != "") {
        return "resit harf";
    } else if (input[1].checked && getvalue() != "") {
        return "active harf";
    } else if (input[0].checked) {
        return "resit";
    } else if (input[1].checked) {
        return "active";
    } else if (getvalue() != "") {
        return "harf";
    } else {
        return;
    }
}
//verinin filtrelenmesini sağlayan fonksiyon
//TODO
const filterData = (filter) => {
    var filter = check();

    switch (filter) {
        case "resit active harf":
            var filteredData = data.filter(element => element.age >= 18 && element.isActive === true && element.name.charAt(0) == getvalue());
            listData(filteredData);
            break;
        case "resit":
            var filteredData = data.filter(element => element.age >= 18);
            listData(filteredData);
            break;
        case "active":
            var filteredData = data.filter(element => element.isActive === true);
            listData(filteredData);
            break;
        case "resit active":
            var filteredData = data.filter(element => element.age >= 18 && element.isActive === true);
            listData(filteredData);
            break;
        case "resit harf":
            var filteredData = data.filter(element => element.age >= 18 && element.name.charAt(0) == getvalue());
            listData(filteredData);
            break;
        case "active harf":
            var filteredData = data.filter(element => element.isActive === true && element.name.charAt(0) == getvalue());
            listData(filteredData);
            break;
        case "harf":
            var filteredData = data.filter(element => element.name.charAt(0) == getvalue());
            listData(filteredData);
            break;
            //resit active harf
        default:
            break;
    }
}