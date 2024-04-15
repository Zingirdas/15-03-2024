const vardasInput = document.getElementById("vardas");
const pavardeInput = document.getElementById("pavarde");
const metaiInput = document.getElementById("metai");
const pastasInput = document.getElementById("pastas");
const telefonasInput = document.getElementById("telefonas");
const irasytiInput = document.getElementById("irasyti");
const vyrasInput = document.getElementById("vyras");
const moterisInput = document.getElementById("moteris");
irasytiInput.onclick = () => {
    let lytis = "";
    if (vyrasInput.checked) {
        lytis = vyrasInput.value;
    }
    else if (moterisInput.checked) {
        lytis = moterisInput.value;
    }
    const reg = {
        vardas: vardasInput.value,
        pavarde: pavardeInput.value,
        metai: metaiInput.valueAsNumber,
        pastas: pastasInput.value,
        telefonas: telefonasInput.value,
        lytis: lytis
    };
    fetch("https://registracija-46c39-default-rtdb.europe-west1.firebasedatabase.app/registrations.json", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reg)
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Irasas pridetas");
            console.log(data);
            vardasInput.value = "";
            pavardeInput.value = "";
            metaiInput.value = "";
            pastasInput.value = "";
            telefonasInput.value = "";
            vyrasInput.checked = false;
            moterisInput.checked = false;
        });
};

