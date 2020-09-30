const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Metallica') );
bands.addBand( new Band('Korn') );
bands.addBand( new Band('Limp Bizkit') );

//Messages socket
io.on('connection', client =>{
    console.log('Cliente conectado');

    client.emit( 'active-bands', bands.getBands() );
    client.on('add-band', (payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('message', (data)=>{
        console.log(data.name);
        io.emit('message', {admin: 'new message'});
    });

    client.on('new-message', (data)=>{
        client.broadcast.emit('new-message', data);
    });

    client.on('disconnect', ()=>{
        console.log('Cliente desconectado');
    });
});