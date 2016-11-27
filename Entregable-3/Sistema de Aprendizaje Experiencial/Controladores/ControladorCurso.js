
angular.module('app')
    .controller('ho', ['$scope', '$http', function($scope,$http){
        $scope.estrella_uno = "gold";
        $scope.estrella_dos = "gray";
        $scope.estrella_tres = "gray";
        $scope.estrella_cuatro = "gray";
        $scope.estrella_cinco = "gray";
        $scope.valoracion = 1;
        $scope.CrearNoticia =  function(titulo,id_asignatura,contenido,nombre_profesor) {
            $http.post('http://localhost:8081/NuevaNoticia',{titulo:titulo,asignatura_id_asignatura:id_asignatura,contenido:contenido,nombre_profesor:nombre_profesor});
        }

        $scope.CrearFeedback =  function(comentario,alumno_id_alumno,alumno_correo,asignatura_id_asignatura) {
            $http.post('http://localhost:8081/NuevoFeedback',{valor:$scope.valoracion,comentario:comentario,asignatura_id_asignatura:asignatura_id_asignatura,alumno_id_alumno:alumno_id_alumno,alumno_correo:alumno_correo});
        }

        $scope.estrella_uno_f =  function() {
            $scope.valoracion = 1;
            $scope.estrella_uno = "gold";
            $scope.estrella_dos = "gray";
            $scope.estrella_tres = "gray";
            $scope.estrella_cuatro = "gray";
            $scope.estrella_cinco = "gray";
        }

        $scope.estrella_dos_f =  function() {
            $scope.valoracion = 2;
            $scope.estrella_uno = "gold";
            $scope.estrella_dos = "gold";
            $scope.estrella_tres = "gray";
            $scope.estrella_cuatro = "gray";
            $scope.estrella_cinco = "gray";
        }

        $scope.estrella_tres_f =  function() {
            $scope.valoracion = 3;
            $scope.estrella_uno = "gold";
            $scope.estrella_dos = "gold";
            $scope.estrella_tres = "gold";
            $scope.estrella_cuatro = "gray";
            $scope.estrella_cinco = "gray";
        }
        $scope.estrella_cuatro_f =  function() {
            $scope.valoracion = 4;
            $scope.estrella_uno = "gold";
            $scope.estrella_dos = "gold";
            $scope.estrella_tres = "gold";
            $scope.estrella_cuatro = "gold";
            $scope.estrella_cinco = "gray";
        }
        $scope.estrella_cinco_f =  function() {
            $scope.valoracion = 5;
            $scope.estrella_uno = "gold";
            $scope.estrella_dos = "gold";
            $scope.estrella_tres = "gold";
            $scope.estrella_cuatro = "gold";
            $scope.estrella_cinco = "gold";
        }

        load_pictures();
        function load_pictures() {
            $http.get('http://localhost:8081/loadNoticias').success(function (data) {
                $scope.noticias = data;
            });

            };
    }]);



