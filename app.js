const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("p")

for (select of dropdown) {
    for (currCode in countryList) {
        let newdrop = document.createElement("option");
        newdrop.innerText = currCode;
        newdrop.value = currCode;
        select.append(newdrop)
    }
    select.addEventListener("change", (evt) => {
        flagChange(evt.target);
    });
}

const flagChange = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    let input = document.querySelector("input");
    inputVal = input.value;
    console.log(inputVal);

    const url = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let responce = await fetch(url);
    let data = await responce.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = inputVal * rate

    msg.innerText = finalAmount
});
