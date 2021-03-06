export default (request, response) => {
    let bodyString = request.body;
    var entradaDialogFlow = JSON.parse(bodyString);
    console.log("Entrada DialogFlow: "+entradaDialogFlow);
    var menu=entradaDialogFlow['queryResult']['parameters'].menus;
    var centros=entradaDialogFlow['queryResult']['parameters'].centro;
    var lugar=entradaDialogFlow['queryResult']['parameters'].lugar_intent;
    var informacion=entradaDialogFlow['queryResult']['parameters'].informacion;
    var infogrado=entradaDialogFlow['queryResult']['parameters'].infogrados;
    var grado=entradaDialogFlow['queryResult']['parameters'].grados;
    var mensaje;
	
    if (lugar === "comedores_localizacion"){

        if (centros === "Facultad de Bellas Artes"){
            mensaje = "La Facultad de Bellas Artes no tiene comedor universitario pero puedes ir al comedor de la ETSIIT, que es el más cercano, mediante el siguiente link https://goo.gl/maps/LuukFQGWFVr4NsRr5"
        }
        else if (centros === "Facultad de Ciencias de la Educación"){
            mensaje = "Para ir al comedor universitario de Ciencias de la Educación usa el siguiente enlace: https://goo.gl/maps/ozjVfBUWjnxSv7HW8"
        }
        else if (centros === "Escuela Técnica Superior de Ingeniería de Caminos, Canales y Puertos"){
            mensaje = "El comedor universitario de la ETSICCP es el de Fuentenueva, aquí tiene el enlace para llegar: https://goo.gl/maps/HwMmwWBQYt2MMXM1A"
        }
        else if (centros === "Facultad de ciencias"){
            mensaje = "El comedor universitario de la Facultad de Ciencias es el de Fuentenueva, aquí tiene el enlace para llegar: https://goo.gl/maps/HwMmwWBQYt2MMXM1A"
        }
        else if (centros === "Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación"){
            mensaje = "Puede ir al comedor universitario de la ETSIIT mediante el siguiente link https://goo.gl/maps/LuukFQGWFVr4NsRr5"
        }

    }
    else if (lugar === "comedores_sin_centro"){
        mensaje = "Veo que no me has proporcionado el centro, te recomiendo que vayas a los comedores universitarios de Fuentenueva mediante el siguiente link: https://goo.gl/maps/HwMmwWBQYt2MMXM1A"
    }
    else if (lugar === "comedores_menu"){

        //Lo ideal seria hacer scraping, pero PubNub no ofrece la posibilidad
        //de usar los modulos que necesitamos

        //Obtenemos el dia de la semana en el que estamos
        var d = new Date();
        var n = d.getDay()

        var dia;

        if (n === 1){
            dia = "Lunes"
        }
        else if (n == 2){
            dia = "Martes"
        }
        else if (n == 3){
            dia = "Miércoles"
        }
        else if (n == 4){
            dia = "Jueves"
        }
        else if (n == 5){
            dia = "Viernes"
        }
        else if (n == 6){
            dia = "Sábado"
        }
        else{
            dia = "Domingo"
        }

        if (dia === "Sábado" || dia === "Domingo"){
            mensaje = "Lo siento pero hoy es " + dia + " y el servicio de comedores no está disponible. Si quiere puede consultar el horario. El menú " + menu + " del último día fue:" + "\n"
        }
        else{

            mensaje = "Hoy es " + dia + " y el menu correspondiente a " + menu + " es:" + "\n"
        }

        if ( menu === "Almuerzo") {
            mensaje = mensaje + "Primero: Espaguetis a la napolitana, Segundo: Aguja encebollada, Acompañamiento: Menestra, Postre: Melocotón\n"
        }
        else if ( menu === "Cena" ){
            mensaje = mensaje + "Primero: Ensalada de arroz con salmón ahumado, pepino y vinagreta de soja y sésamo, Segundo: Jamón en salsa cazadora, Acompañamiento: Judías, zanahorias y patatas, Postre: Natillas\n"
        }
        else if ( menu === "Ovolactovegetariano"){
            mensaje = mensaje + "Primero: Estofado de patatas y acelgas, Segundo: Rollitos de primavera, Acompañamiento: Ensalada, Postre: Naranja\n"

        }
        else if ( menu === "Vegano" ){
            mensaje = mensaje + "Primero: Arroz con variado de verduras, Segundo: Salteado de tofu, calabaza y guisantes, Acompañamiento: Ensalada Richelieu, Postre: Pera\n"

        }
        else if ( menu === "T-celiaco" ){
            mensaje = mensaje + "Primero: Arroz a la cubana, Segundo: Salteado de ternera, Acompañamiento: Patatas rellenas, Postre: Cóctel de frutas\n"
        }
    }
    else if (lugar === "centro_info"){
        if (centros === "Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación"){
            if (informacion === "Lugar"){
                mensaje = "La ETSIIT esta en Calle Periodista Daniel Saucedo Aranda, s/n, 18014 Granada (http://etsiit.ugr.es/)"
            } else if (informacion === "Contacto"){
                mensaje = "Tfno: +34-242802-240632-241000-240633-242885-242820 (http://etsiit.ugr.es/pages/escuela)"
            } else if (informacion === "Decano"){
                mensaje = "El director de la ETSIIT es D. Pedro García Teodoro (http://etsiit.ugr.es/pages/escuela/organos_gobierno)"
            } else if (informacion == "Delegacion"){
                mensaje = "La delegación de centro de la ETSIIT es la Delegación de Estudiantes de Ingenierías Informáticas y de Telecomunicación o DEIIT (https://deiit.ugr.es/)"
            }
        } else if (centros === "Facultad de Bellas Artes"){
            if (informacion === "Lugar"){
                mensaje = "La Facultad de Bellas Artes esta en Calle Periodista Eugenio Selles, s/n, 18014 Granada (https://bellasartes.ugr.es/)"
            } else if (informacion === "Contacto"){
                mensaje = "Telf. 958 243 819 (https://bellasartes.ugr.es/pages/localizacion-y-contacto)"
            } else if (informacion === "Decano"){
                mensaje = "El decano de la Faculta de Bellas Artes es D. Francisco José Sánchez Moltanbán (https://bellasartes.ugr.es/pages/directorio/decanato)"
            } else if (informacion == "Delegacion"){
                mensaje = "La delegación de centro de la Facultad de Bellas Artes es la Delegación de Estudiantes de la Facultad de Bellas Artes"
            }
        } else if (centros === "Facultad de ciencias"){
            if (informacion === "Lugar"){
                mensaje = "La Facultad de Ciencias esta en Avenida de Fuente Nueva, s/n, 18071 Granada (https://fciencias.ugr.es)"
            } else if (informacion === "Contacto"){
                mensaje = "Telf: 958 24 06 98/99 (https://fciencias.ugr.es/facultad#contacto)"
            } else if (informacion === "Decano"){
                mensaje = "La decana de la Facultad de Ciencias es D.a María del Carmen Carrión Pérez (https://fciencias.ugr.es/facultad/equipo-de-gobierno)"
            } else if (informacion == "Delegacion"){
                mensaje = "La delegación de centro de la Facultad de Ciencias es la Delegación de la Facultad de Ciencias o DEFC (https://defc.ugr.es/)"
            }
        } else if (centros === "Escuela Técnica Superior de Ingeniería de Caminos, Canales y Puertos"){
            if (informacion === "Lugar"){
                mensaje = "La ETSICCP esta en Calle Dr. Severo Ochoa, s/n, 18001 Granada (https://etsiccp.ugr.es/)"
            } else if (informacion === "Contacto"){
                mensaje = "Teléfono: 958 24 41 46 "
            } else if (informacion === "Decano"){
                mensaje = "La directora de la ETSICCP es D.a Montserrat Zamorano Toro (https://etsiccp.ugr.es/la-escuela/organizacion)"
            } else if (informacion == "Delegacion"){
                mensaje = "La delegación de centro de la ETSICCP es la Delegación de Estudiantes de la ETSICCP o DEICCP"
            }
        } else if (centros === "Facultad de Ciencias de la Educación"){
            if (informacion === "Lugar"){
                mensaje = "La Facultad de Ciencias de la Educación esta en Prof. Vicente Callao - Fte Ciencias Educación, 18011, 18011, Granada (https://educacion.ugr.es/)"
            } else if (informacion === "Contacto"){
                mensaje = "Teléfono: 958 24 39 98"
            } else if (informacion === "Decano"){
                mensaje = "EL decano de la Facultad de Ciencias de la Educación es D. Javier Villoria Prieto (https://educacion.ugr.es/pages/facultad/organos_unipersonales)"
            } else if (informacion == "Delegacion"){
                mensaje = "La delegación de centro de la Facultad de Ciencias de la Educación es la Delegación Estudiantes Facultad Educación"
            }
        }
    }
    // El siguiente trozo de código no hemos conseguid ejecutarlo en pubnub.
    /*else if (lugar === "ubicacion"){
        function getLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            mensaje = "Geolocation is not supported by this browser.";
          }
        }

        function showPosition(position) {
            mensaje = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
        }

        getLocation();

    }*/
	 else if ( lugar === "bibliotecas" ) {
        if (centros === "Facultad de Bellas Artes"){
            mensaje = "La biblioteca de la Facultad de Bellas Artes se encuentra en la planta -1 de la Facultad. Además de distintos libros sobre bellas artes encontrarás también una mediateca con gran contenido audiovisual."
        }
        else if (centros === "Facultad de Ciencias de la Educación"){
            mensaje = "La biblioteca de la Facultad de Ciencias de la Educación se encuentra en el Campus de Cartuja."
        }
        else if (centros === "Escuela Técnica Superior de Ingeniería de Caminos, Canales y Puertos"){
            mensaje = "La biblioteca de la ETSICCP se encuentra en la tercera planta de la Escuela."
        }
        else if (centros === "Facultad de ciencias"){
            mensaje = "La biblioteca de la Facultad de Ciencias se encuentra en la planta baja del edificio principal y cuenta con gran cantidad de libros de todas las materias, así como aulas de estudio que podrás reservar."
        }
        else if (centros === "Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación"){
            mensaje = "La biblioteca de la ETSIIT se encuentra en la primera planta del edificio A de la Escuela. Además de la biblioteca encontrarás una tecnoteca, con material informático disponible."
        }

	 }
	 else if ( lugar === "contacto_bibliotecas" ) {
        if (centros === "Facultad de Bellas Artes"){
			   mensaje = "Puedes ponerte en contacto con la biblioteca de la Facultad de Bellas Artes mandando un mail a la siguiente dirección: mbolivar@ugr.es o llamarles al número 958 242 968 "
        }
        else if (centros === "Facultad de Ciencias de la Educación"){
			   mensaje = "Puedes ponerte en contacto con la biblioteca de la Facultad de Ciencias de la Educación mandando un mail a la siguiente dirección: bibgeseducacion@ugr.es o llamarles al número 958 243 995 "
        }
        else if (centros === "Escuela Técnica Superior de Ingeniería de Caminos, Canales y Puertos"){
			   mensaje = "Puedes ponerte en contacto con la biblioteca de la ETSICCP mandando un mail a la siguiente dirección: antonioarias@ugr.es o llamarles al número 958 249 472 "
        }
        else if (centros === "Facultad de ciencias"){
			   mensaje = "Puedes ponerte en contacto con la biblioteca de la Facultad de Ciencias mandando un mail a la siguiente dirección: bibgesciencias@ugr.es o llamarles al número 958 249 064 "
        }
        else if (centros === "Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación"){
			   mensaje = "Puedes ponerte en contacto con la biblioteca de la ETSIIT mandando un mail a la siguiente dirección: bibcirinformatica@ugr.es o llamarles al número 958 242 806 "
        }

  }
  else if ( lugar === "grados_pregunta_compleja"){
    	if(infogrado === "Guia docente"){
	    	if(grado === "matematicas"){
		    	mensaje = "Estas son las guías docentes de matemáticas \n https://grados.ugr.es/matematicas/pages/infoacademica/estudios"
		    }
		    else if(grado === "informática"){
		    	mensaje = "Estas son las guías docentes de informática \n https://grados.ugr.es/informatica/pages/infoacademica/guias_docentes/guiasdocentes_curso_actual"
		    }
		    else if(grado === "BBAA"){
		    	mensaje = "Estas son las guías docentes de BBAA \n https://grados.ugr.es/bellasartes/pages/infoacademica/guias-docentes"
		    }
		     else if(grado === "magisterio"){
		    	mensaje = "Estas son las guías docentes de educación primaria \n https://grados.ugr.es/primaria/pages/infoacademica/estudios"
		    }
		     else if(grado === "Farmacia"){
		    	mensaje = "Estas son las guías docentes de farmacia \n https://farmacia.ugr.es/cont_nobanners.php?sec=0&pag=18"
		    }
		     else if(grado === "telecomunicaciones"){
		    	mensaje = "Estas son las guías docentes de telecomunicaciones \n https://grados.ugr.es/telecomunicacion/pages/infoacademica/guias_docentes/guiasdocentes"
		    }
		     else if(grado === "Arqueología"){
		    	mensaje = "Estas son las guías docentes de arqueología \n https://grados.ugr.es/arqueologia/pages/guias-docentes"
		    }
		    else if(grado === "física"){
		    	mensaje = "Estas son las guías docentes de física \n https://grados.ugr.es/fisica/pages/infoacademica/curso1920/asignaturas-y-guias-docentes-20192020"
		    }
		    else if(grado === "química"){
		    	mensaje = "Estas son las guías docentes de química \n https://grados.ugr.es/quimica/pages/infoacademica/guias-docentes/curso-2021"
		    }
		    else if(grado === "Derecho"){
		    	mensaje = "Estas son las guías docentes de derecho \n https://grados.ugr.es/derecho/static/GuiasDocentesManager"
		    }
		    else if(grado === "turismo"){
		    	mensaje = "Estas son las guías docentes de turismo \n https://grados.ugr.es/turismo/pages/infoacademica/estudios"
		    }
		    else if(grado === "edificación"){
		    	mensaje = "Estas son las guías docentes de edificación \n https://etsie.ugr.es/estudiantes/asignaturas-horarios-y-examenes "
		    }
	    }
	    else if(infogrado === "facultad"){
	    	if(grado === "matematicas"){
		    	mensaje = "La facultad de matemáticas es la de Ciencias, Avenida de Fuente Nueva, s/n, 18071 Granada"
		    }
		    else if(grado === "informática"){
		    	mensaje = "La facultad de informática es la ETSIIT. Calle Periodista Daniel Saucedo Aranda, s/n, 18014 Granada"
		    }
		    else if(grado === "BBAA"){
		    	mensaje = "La facultad de BBAA es la facultad de Bellas Artes, Calle Periodista Eugenio Selles, s/n, 18014 Granada "
		    }
		     else if(grado === "magisterio"){
		    	mensaje = "La facultad de magisterio es la facultad de ciencias de la educación, Prof. Vicente Callao - Fte Ciencias Educación, 18011, 18011, Granada"
		    }
		     else if(grado === "Farmacia"){
		    	mensaje = "La facultad de farmacia se encuentra en el campus de cartuja, Facultad de Farmacia, 18011 Granada"
		    }
		     else if(grado === "telecomunicaciones"){
		    	mensaje = "La facultad de telecomunicaciones es la ETSIIT, Calle Periodista Daniel Saucedo Aranda, s/n, 18014 Granada"
		    }
		     else if(grado === "Arqueología"){
		    	mensaje = "La facultad de arqueología es la de filosofía y letras, Campus de la Cartuja, Universidad de Granada, Calle del Prof. Clavera, s/n, 18011 Granada"
		    }
		    else if(grado === "física"){
		    	mensaje = "La facultad de física es la de ciencias, Avenida de Fuente Nueva, s/n, 18071 Granada"
		    }
		    else if(grado === "química"){
		    	mensaje = "La facultad de química es la de Ciencias, Avenida de Fuente Nueva, s/n, 18071 Granada"
		    }
		    else if(grado === "Derecho"){
		    	mensaje = "La facultad de Derecho está en: Plaza de la Universidad, 1, 18001 Granada"
		    }
		    else if(grado === "turismo"){
		    	mensaje = "La facultad de turismo en la de Ciencias, Avenida de Fuente Nueva, s/n, 18071 Granada"
		    }
		    else if(grado === "edificación"){
		    	mensaje = "La escuela de edificación es la ETSIE, Calle Dr. Severo Ochoa, s/n, 18001 Granada "
		    }
	    }
    }
    else{
        mensaje = "Lo siento, no te he entendido"
    }


    let respuesta = mensaje;

    // Set the status code - by default it would return 200
    response.status = 200;

    // Set the headers the way you like
    response.headers['X-Custom-Header'] = 'CustomHeaderValue';
    return request.json().then((body) => {
    return response.send({ fulfillmentText: respuesta });
    //return response.send({speech: "What's up cool developer :)"});

}).catch((err) => {
return response.send("Malformed JSON body.");
});
};


