// ambil argumen dari command line
const yargs = require("yargs");
const contacts = require("./components/contact");

yargs
  .command({
    command: "add",
    describe: "menambahkan contact baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      no: {
        describe: "nomor",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.no);
    },
  })
  .demandCommand();

// command list 'menampilkan daftar contact'
yargs.command({
  command: "list",
  describe: "menampilkan list contact",
  handler() {
    contacts.listContact();
  },
});

//  menampilkan detail sebuah value contact
yargs.command({
  command: "detail",
  describe: "menampilkan detail sebuah nama contact",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandCommand: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

//mengahapus contact berdasarkan value nama
yargs.command({
  command: "del",
  describe: "menghapus berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandCommand: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
