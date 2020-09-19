const {io} = require('../index');

//Messages socket
io.on('connection', client =>{
    console.log('Cliente conectado');

    client.on('message', (data)=>{
        console.log(data.name);
        io.emit('message', {admin: 'new message'});
    });

    client.on('disconnect', ()=>{
        console.log('Cliente desconectado');
    });
});