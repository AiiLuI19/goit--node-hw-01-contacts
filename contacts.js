const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");
// const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      console.table(
        JSON.parse(data).filter(
          (contact) => contact.id === contactId.toString()
        )
      );
    })
    .catch((error) => console.error(error));
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);

    const newData = JSON.stringify(
      JSON.parse(data).filter((contact) => contact.id !== contactId.toString())
    );
    await fs.writeFile(contactsPath, newData, "utf-8");
    data = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const newData = JSON.parse(data);
    const id = uuidv4();
    const newContact = [...newData, { id, name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(newContact), "utf-8");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
