const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder jika belom ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file .json jika belom ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, no) => {
  const contact = { nama, email, no };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplicate
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("contact sudah terdaftar, gunakan nama lain")
    );
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("email tidak valid!"));
      return false;
    }
  }

  // cek nomor hp

  if (!validator.isMobilePhone(no, "id-ID")) {
    console.log(chalk.red.inverse.bold("nomor tidak valid"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(
    chalk.green.inverse.bold(
      `data sudah berhasil di input nama:${nama}, email:${email}, nomor:${no}`
    )
  );
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("List contact user : "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.no}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak di temukan`));
    return false;
  }
  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.no);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  const newContact = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContact.length) {
    console.log(
      chalk.red.inverse.bold(`${nama} tidak di temukan mohon di cek ulang!`)
    );
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));

  console.log(
    chalk.green.inverse.bold(`data sudah berhasil di hapus nama:${nama}, `)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };

// !== tidak sama dengan
