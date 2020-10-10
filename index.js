const xhr = new XMLHttpRequest;

let con = document.getElementById("confirm");
let recover = document.getElementById("recover");
let nav_scroll = document.getElementById("nav_scroll");
let deaths = document.getElementById("deaths");
let tbody = document.getElementById("tbody");
let updatedtime = document.querySelector(".updated-time");
let scroll = document.querySelector(".scroll");

xhr.open("GET", "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true", true);


xhr.onload = function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    time = data["lastUpdatedAtApify"];
    time = time.slice(0, 10);

    updatedtime.innerText = time;
    con.innerText = data["totalCases"]
    recover.innerText = data["recovered"];
    deaths.innerText = data["deaths"];
    let regionData = data["regionData"];

    regionData.forEach(element => {
        let node = document.createElement("tr");
        node.className = "table";

        let t = document.createTextNode(`${element.region}`);
        let td1 = document.createElement("td");
        td1.className="state";
        td1.appendChild(t);
        node.append(td1);

        let t1 = document.createTextNode(`${element.totalInfected}`);
        let td2 = document.createElement("td");
        td2.className="primary";
        td2.appendChild(t1);
        node.append(td2);

        t1 = document.createTextNode(`${element.deceased}`);
        td2 = document.createElement("td");
        td2.className="danger";
        td2.appendChild(t1);
        node.append(td2);

        t1 = document.createTextNode(`${element.recovered}`);
        td2 = document.createElement("td");
        td2.className="success";
        td2.appendChild(t1);
        node.append(td2);

        tbody.appendChild(node);
    });

}

xhr.send();
window.onload=()=>{
    scroll.style.height="0rem";
}
nav_scroll.addEventListener("click",()=>{
    if(scroll.style.height==="0rem"){
        scroll.style.height="10rem"
    }    
    else scroll.style.height="0rem";
})

function updateMap(){
    fetch("https://www.trackcorona.live/api/countries")
    .then(response=>response.json())
    .then(rsp=>{
        // console.log(rsp.data);
        rsp.data.forEach(element=>{
            latitude=element.latitude;
            longitude=element.longitude;
            let colour;
            let cases=element.confirmed;
            if(cases>=20000&&cases<50000){
                colour="rgb(132, 142, 233)";
            }
            else   if(cases>=50000){
                colour="rgb(238, 12, 57)";
            }
            else colour="rgb(0, 0, 0)";
            marker = new mapboxgl.Marker({
                draggable: false,
                color:colour,
                })
                .setLngLat([longitude, latitude])
                .addTo(map);
        })
    })

}
updateMap();