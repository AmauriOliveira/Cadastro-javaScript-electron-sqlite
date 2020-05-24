const { ipcRenderer } = require('electron');

const userForm = document.querySelector("#userForm");
const userId = document.querySelector("#id");
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userWhatsapp = document.querySelector("#whatsapp");
const userCity = document.querySelector("#city");
const userUf = document.querySelector("#uf");
const usersList = document.querySelector("#users");
const submitButton = document.querySelector("#submit");

let users = [];
let editingStatus = false;

const deleteUser = async (id) => {
    const response = confirm("Deseja apagar este user?");
    if (response) {
        ipcRenderer.send('delete', id);
        ipcRenderer.on('delete', (event, response) => {
            alert(response);
            getUsers();
        });
    }
};

const editUser = async (id) => {
    ipcRenderer.send('find', id);
    ipcRenderer.on('find', (event, response) => {
        response.forEach((r) => {
            const { id, name, email, whatsapp, city, uf } = r;
            userId.value = id;
            userName.value = name;
            userEmail.value = email;
            userWhatsapp.value = whatsapp;
            userCity.value = city;
            userUf.value = uf;
        });
    });
    editingStatus = true;
};

submitButton.onclick = addUser;

async function addUser() {
    try {
        const user = {
            id: userId.value,
            name: userName.value,
            email: userEmail.value,
            whatsapp: userWhatsapp.value,
            city: userCity.value,
            uf: userUf.value
        };

        if (!editingStatus) {
            ipcRenderer.send('create', user);
            ipcRenderer.on('create', (event, response) => {
                alert(response);
                getUsers();
            });
        }
        else {
            ipcRenderer.send('update', user);
            ipcRenderer.on('update', (event, response) => {
                alert(response);
                getUsers();
            });
            editingStatus = false;
        }

        userForm.reset();
        userName.focus();
        getUsers();
    } catch (error) {
        console.log(error);
    }
};

function renderUsers(tasks) {
    usersList.innerHTML = ``;
    tasks.forEach((t) => {
        usersList.innerHTML += `
        <tr>
            <td>${t.name}</td>
            <td>${t.email}</td>
            <td>${t.whatsapp}</td>
            <td>${t.city}</td>
            <td>${t.uf}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${t.id}')">
                    DELETE
                </button>
            </td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editUser('${t.id}')">
                    EDIT 
                </button>
            </td>
      </tr>  `;
    });
};

const getUsers = async () => {
    ipcRenderer.send('selectAll');
    ipcRenderer.on('selectAll', (event, response) => {
        renderUsers(response);
    });
};

async function init() {
    getUsers();
}
init();