
module.exports = function(io ,User , _){

    io.on('connection',(socket)=> {  

        socket.on('refresh',data=> { 
            io.emit('refreshPage',{})
        });
       
        socket.on('online',(data)=> { 
            socket.join(data.room); 
         
        }); 


     });

     
}


