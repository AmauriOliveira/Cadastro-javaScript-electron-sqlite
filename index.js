const { app, BrowserWindow, ipcMain } = require('electron');

const knex = require('knex');

const { title } = require('./package.json');

const connection = knex({
    client: "sqlite3",
    connection: {
        filename: './database/database.sqlite'
    },
    migrations: {
        directory: './database/migrations'
    },
    useNullAsDefault: true,
});

ipcMain.on('selectAll', async (event, args) => {
    const user = await getUsers();
    event.reply('selectAll', user);
});

const getUsers = async () => {

    const results = await connection('users')
        .limit(5)
        .select(['users.*']);
    return results;
};

ipcMain.on('delete', async (event, args) => {
    const user = await deleteUser(args);
    event.reply('delete', user);
});
const deleteUser = async (id) => {
    try {
        await connection('users')
            .where('id', id)
            .first()
            .delete();
        return 'Usuario deletado';
    } catch (error) {
        console.log(error);
    }
};

ipcMain.on('create', async (event, args) => {
    const user = await createUser(args);
    event.reply('create', user);
});
const createUser = async (user) => {
    const { id, name, email, whatsapp, city, uf } = user;
    await connection('users').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });
    return `${name} registrado com sucesso.`;
};

ipcMain.on('find', async (event, args) => {
    const user = await find(args);
    event.reply('find', user);

});
const find = async (id) => {
    const results = await connection('users')
        .where('id', id)
        .limit(1)//limite de registro a vir pro ver
        .select(['users.*']);
    return results;
};

ipcMain.on('update', async (event, args) => {
    const user = await updateUser(args);
    event.reply('update', user);
});
const updateUser = async (user) => {
    const { id, name, email, whatsapp, city, uf } = user;
    const result = await connection('users')
        .where({ id })
        .update({ name, email, whatsapp, city, uf }, ['id', 'title'])
    return `${name} alterado com sucesso.`;
};

function createWindow() {
    // Cria uma janela de navegação.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //fullscreen: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            scrollBounce: true,
            nodeIntegration: true
        }
    });
    win.setMenuBarVisibility(false);
    // e carregar o main.html do aplicativo.
    win.loadFile('./main.html');
    win.webContents.on('did-finish-load', () => {
        win.maximize();
        win.setTitle(`${title}`);
       // win.webContents.openDevTools();
    });
};

app.whenReady().then(createWindow);//.then(getusers)