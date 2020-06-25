// Get data from the server.
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

document.querySelector("#getDataBtn").addEventListener("click", function() {
    getServerData("http://localhost:3000/users").then(
        // data => console.log(data)
        data => fillDataTable(data, "userTable")
    );
});

// Fill table with server data.
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    let tBody = table.querySelector("tbody");
    for (let row of data) {
       // console.log(row);
       let tr = createAnyElement("tr");
       for (let k in row) {
           let td = createAnyElement("td");
           td.innerHTML = row[k];
           tr.appendChild(td);
       }
       let btnGroup = createBtnGroup();
       tr.appendChild(btnGroup);
       tBody.appendChild(tr);
    }
}

function createAnyElement(name, attributes) {
    let element = document.createAnyElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function createBtnGroup() {
    let group = createAnyElement("div", {class: "btn btn-group"});
    let infoBtn = createAnyElement("button", {class: "btn btn-info"});
    infoBtn.innerHTML = '<i class "fa fa-tr" aria-hidden="true"></i>';   
    let delBtn = createAnyElement("button", {class: "btn btn-danger"});
    delBtn.innerHTML = '<i class "fa fa-trash" aria-hidden="true"></i>'
    
    group.appendChild(infoBtn);
    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);

    return td;
}