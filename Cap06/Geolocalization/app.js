window.onload = function(){
    
    var miLatitud;
    var miLongitud;

    function miPosicion(callback) {
        if (!navigator.geolocation){    
            return false;
        }
        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            document.getElementById("iniLat").innerHTML = latitude;
            document.getElementById("iniLon").innerHTML = longitude;
            callback(latitude,longitude);   
        }
        function error(error) {
            if(error.code == 0){
                alert('Error desconocido');
            }
            if(error.code == 1){
                alert('Permiso denegado');
            }
            if(error.code == 2){
                alert('La posicion no se pudo determinar');
            }
            if(error.code == 3){
                alert('Timed out');
            }                        
            // 0 => error desconocido
            // 1 => permiso denegado
            // 2 => posicion es inhabilitada
            // 3 => timed out
        }   
        navigator.geolocation.getCurrentPosition(success, error);   
    }

    miPosicion(function(latitude,longitude){    
        miLatitud = latitude;
        miLongitud = longitude;

        navigator.geolocation.watchPosition(function(position){
            document.getElementById("actualLat").innerHTML = position.coords.latitude;
            document.getElementById("actualLon").innerHTML = position.coords.longitude;
            document.getElementById("distancia").innerHTML = 
            calculateDistance(miLatitud, miLongitud,
                          position.coords.latitude, position.coords.longitude);
        });

    });

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = (lat2-lat1).toRad();
        var dLon = (lon2-lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    }
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
}
