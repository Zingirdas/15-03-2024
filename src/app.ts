import { Registracija } from "./kids";

const vardasInput=<HTMLInputElement>document.getElementById("vardas");
const pavardeInput=<HTMLInputElement>document.getElementById("pavarde");
const metaiInput=<HTMLInputElement>document.getElementById("metai");
const pastasInput=<HTMLInputElement>document.getElementById("pastas");
const telefonasInput=<HTMLInputElement>document.getElementById("telefonas");
const irasytiInput=<HTMLButtonElement>document.getElementById("irasyti");
const vyrasInput=<HTMLInputElement>document.getElementById("vyras");
const moterisInput=<HTMLInputElement>document.getElementById("moteris");

const loadDataButton=<HTMLButtonElement>document.getElementById("load");
const dataTableBody=<HTMLElement>document.getElementById("dataTableBody");

const dataTable=<HTMLElement>document.getElementById("dataTable");
const editForm=<HTMLElement>document.getElementById("editForm");

let registrationData:Registracija[];

irasytiInput.onclick=()=>{
    let lytis = "";
    if (vyrasInput.checked) {
        lytis = vyrasInput.value;
    } else if (moterisInput.checked) {
        lytis = moterisInput.value;
    } 
    const reg:Registracija={
        vardas:vardasInput.value,
        pavarde:pavardeInput.value,
        metai:metaiInput.valueAsNumber,
        pastas:pastasInput.value,
        telefonas:telefonasInput.value,
        lytis:lytis
    }
    fetch("https://registracija-46c39-default-rtdb.europe-west1.firebasedatabase.app/registrations.json",{
    method:"POST",
    headers:{
        'Accept':'application/json',
            'Content-Type':'application/json'
    },
    body:JSON.stringify(reg)
    })
    .then((response)=>{
    return response.json();
    })
    .then((data)=>{
    console.log("Irasas pridetas");
    console.log(data);
    
        
    vardasInput.value = "";
    pavardeInput.value = "";
    metaiInput.value = "";
    pastasInput.value = "";
    telefonasInput.value = "";
    vyrasInput.checked = false;
    moterisInput.checked = false;
    })
};

const showData=()=>{
    dataTableBody.innerHTML="";
    registrationData.forEach((reg)=>{
        const tr = document.createElement("tr");
        
        const tdVardas = document.createElement("td");
        tdVardas.innerHTML = reg.vardas;
        
        const tdPavarde=document.createElement("td");
        tdPavarde.innerHTML=reg.pavarde;
        
        const tdTelefonas=document.createElement("td");
        tdTelefonas.innerHTML=reg.telefonas;
        
        const tdPastas=document.createElement("td");
        tdPastas.innerHTML=reg.pastas;

        tr.appendChild(tdVardas);
        tr.appendChild(tdPavarde);
        tr.appendChild(tdTelefonas);
        tr.appendChild(tdPastas);

        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            dataTable.style.display="none";
            editForm.style.display="block";
            (<HTMLInputElement>document.getElementById("vardasEdit")).value=reg.vardas;
            (<HTMLInputElement>document.getElementById("pavardeEdit")).value=reg.pavarde;
            (<HTMLInputElement>document.getElementById("metaiEdit")).value=reg.metai.toString();
            (<HTMLInputElement>document.getElementById("pastasEdit")).value=reg.pastas;
            (<HTMLInputElement>document.getElementById("telefonasEdit")).value=reg.telefonas;
            (<HTMLButtonElement>document.getElementById("irasytiEdit")).onclick=()=>{
                const updReg:Registracija={
                    vardas:(<HTMLInputElement>document.getElementById("vardasEdit")).value,
                    pavarde:(<HTMLInputElement>document.getElementById("pavardeEdit")).value,
                    metai:(<HTMLInputElement>document.getElementById("metaiEdit")).valueAsNumber,
                    pastas:(<HTMLInputElement>document.getElementById("pastasEdit")).value,
                    telefonas:(<HTMLInputElement>document.getElementById("telefonasEdit")).value,
                }
                    fetch(`https://registracija-46c39-default-rtdb.europe-west1.firebasedatabase.app/registrations/${reg.id}.json`,{
                        method:"PUT",
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(updReg)
                        })
                        .then((response)=>{
                        return response.json();
                        })
                        .then((data)=>{
                        console.log("Irasas atnaujintas");
                        // console.log(data);
                        dataTable.style.display="block";
                        editForm.style.display="none";
                        loadData();
                        })
            }
        }
})
}

const loadData=()=>{
    fetch ("https://registracija-46c39-default-rtdb.europe-west1.firebasedatabase.app/registrations.json",{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data:{[key:string]:Registracija})=>{
        registrationData=[];
        Object.keys(data).forEach((k)=>{
            // data[k].id=k;
            registrationData.push({id:k,...data[k]});
            
        })
        showData();
        console.log(registrationData);

    });
}
loadDataButton.onclick = loadData;
