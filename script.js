const main = document.querySelector(".main");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const selRegion = document.querySelector(".sel-region");
const selText = document.querySelector(".sel-text");

let all = null;

function getCountries(data) {
  main.innerHTML = "";
  data.map((el) => {
    main.innerHTML += `<div class="list">
        <img src=${el.flags.png} alt="" />
        <h1>${el.name.common}</h1>
        <h2> Регион: ${el.continents}</h2>
        <h3> Площадь: ${el.area}</h3>
        <h3> Население: ${el.population}</h3>
        </div>`;
  });
}
axios("https://restcountries.com/v3.1/all").then((res) => {
  res.data.map((el) => {
    getCountries(el);
  });
});

function task(API) {
  axios(`https://restcountries.com/v3.1/${API}`).then((res) => {
    all = res.data;
    getCountries(res.data);
  });
}
task(`all`);
input.addEventListener("input", () => {
  axios(`https://restcountries.com/v3.1/name/${input.value}`).then((res) => {
    task(`name/${input.value}`);
  });
});

selRegion.addEventListener("change", (e) => {
  let val = e.target.value;
  if (val === "europe") {
    let res = all.filter((el) => el.region === "Europe");
    getCountries(res);
  } else if (val === "asia") {
    let res = all.filter((el) => el.region === "Asia");
    getCountries(res);
  } else if (val === "oceania") {
    let res = all.filter((el) => el.region === "Oceania");
    getCountries(res);
  } else if (val === "africa") {
    let res = all.filter((el) => el.region === "Africa");
    getCountries(res);
  }
});

selText.addEventListener("change", (e) => {
  let val = e.target.value;
  if (val === "popularity") {
    let resp = all.sort((a, b) => b.population - a.population);
    getCountries(resp);
  } else if (val === "area") {
    let resp = all.sort((a, b) => b.area - a.area);
    getCountries(resp);
  } else if (val === "a-z") {
    let resp = all.sort((a, b) => {
      if (a.name.common > b.name.common) {
        return 1;
      } else {
        return -1;
      }
    });
    getCountries(resp);
  } else if (val === "z-a") {
    let resp = all.sort((a, b) => {
      if (b.name.common > a.name.common) {
        return 1;
      } else {
        return -1;
      }
    });
    getCountries(resp);
  }
});
