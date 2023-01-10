const customers = [
  {
    name: "John Doe",
    age: 32,
    gender: "MALE",
    company: { name: "Hilton", city: "New York" },
  },
  {
    name: "Jane Doe",
    age: 30,
    gender: "FEMALE",
    company: { name: "Ferrari", city: "Rome" },
  },
  {
    name: "Billy White",
    age: 42,
    gender: "MALE",
    company: { name: "Kempinski", city: "Budapest" },
  },
  {
    name: "Imre Kovacs",
    age: 46,
    gender: "MALE",
    company: { name: "Hilton", city: "New York" },
  },
  {
    name: "Kate Smith",
    age: 27,
    gender: "FEMALE",
    company: { name: "Notre Dame", city: "Paris" },
  },
];

function getCompanyNames(customers, city) {
  const results = customers
    .filter((customer) => customer.company.city === city)
    .map((customer) => customer.company.name);
  return results;
}

function countSmallWords() {
  const div = document.getElementById("text");
  const divArray = div.textContent
    .replaceAll("!", "")
    .replaceAll(".", "")
    .split(" ");

  let smallWords = [];

  divArray.forEach((word) => {
    if (word.length <= 3) {
      smallWords.push(word);
    }
  });

  return smallWords.length;
}

const userList = [
  { name: "Gizi", gender: "FEMALE" },
  { name: "Vili", gender: "MALE" },
  { name: "Andor", gender: "MALE" },
  { name: "Kati", gender: "FEMALE" },
  { name: "Vali", gender: "FEMALE" },
];

function makeUserList(userList) {
  const listHolder = document.getElementById("list-holder");

  userList.forEach((user) => {
    listHolder.innerHTML +=
      user.gender === "MALE"
        ? `<li>${user.name}</li>`
        : `<li><strong>${user.name}</strong></li>`;
  });

  return listHolder;
}
//makeUserList(userList);

export { makeUserList, getCompanyNames, countSmallWords, customers, userList };
