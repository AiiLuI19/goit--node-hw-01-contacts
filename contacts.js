const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

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
    console.log(data);
    const newContact = `${data} ${name} ${email} ${phone}`;
    await fs.writeFile(contactsPath, newContact, "utf-8");
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
