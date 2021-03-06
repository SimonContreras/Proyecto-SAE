﻿angular.module('app')
    .controller('ho', ['$scope', '$http', function($scope,$http){
        $scope.input  = "";
        $scope.AgregarTitulo =  function(id) {
            $http.post('http://localhost:8081/NuevoTitulo',{tipo:4,subunidad_id_subunidad:id,texto: "",pos_top:200}).then(
                function() {
                    $http.get('http://localhost:8081/loadTitulosAsimilador').success(function (data) {
                        $scope.titulos = data;
                    });

                }
            );

        }
        $scope.nombre;
        $scope.AgregarInformacion =  function(id) {
            $http.post('http://localhost:8081/NuevaInformacion',{tipo:4,subunidad_id_subunidad:id,texto: "",pos_top:200}).then(
                function() {
                    $http.get('http://localhost:8081/loadInformacionesAsimilador').success(function (data) {
                        $scope.informaciones = data;
                    });

                }
            );

        }
        $scope.AgregarReferencia =  function(id,link) {
            $http.post('http://localhost:8081/NuevaReferencia',{tipo:4,subunidad_id_subunidad:id,link:link,pos_top:200,nombre:$scope.nombre}).then(
                function() {
                    $http.get('http://localhost:8081/loadReferenciasAsimilador').success(function (data) {
                        var scope = angular.element(document.getElementById("outer")).scope();
                        scope.referencias = data;
                        angular.element(document.getElementById("outer")).$apply();
                    });

                }
            );

        }
        $scope.AgregarImagen =  function(id,link) {
            $http.post('http://localhost:8081/NuevaImagen',{tipo:4,subunidad_id_subunidad:id,link:link,pos_top:200}).then(
                function() {
                    $http.get('http://localhost:8081/loadImagenesAsimilador').success(function (data) {
                        var scope = angular.element(document.getElementById("outer")).scope();
                        scope.imagenes = data;
                        angular.element(document.getElementById("outer")).$apply();
                    });

                }
            )
        }

        $scope.AgregarVideo =  function(id,link) {
            $http.post('http://localhost:8081/NuevoVideo',{tipo:4,subunidad_id_subunidad:id,link:link,pos_top:200}).then(
                function() {
                    $http.get('http://localhost:8081/loadVideosAsimilador').success(function (data) {
                        var scope = angular.element(document.getElementById("outer")).scope();
                        scope.videos = data;
                        angular.element(document.getElementById("outer")).$apply();
                    });

                }
            )
        }
        $scope.AgregarEjercicio=  function(id) {
            $http.post('http://localhost:8081/NuevoEjercicio',{tipo:4,subunidad_id_subunidad:id,enunciado: "",respuesta: "",pos_top:200}).then(
                function() {
                    $http.get('http://localhost:8081/loadEjerciciosAsimilador').success(function (data) {
                        $scope.ejercicios = data;
                    });

                }
            );

        }
        $scope.guardar =  function() {
            for(var i = 0;i< $scope.titulos.length;i++){
                $scope.titulos[i].pos_top =  angular.element(document.querySelector('#titulo' + $scope.titulos[i].id_titulo)).offset().top;
                $scope.titulos[i].texto =  angular.element(document.querySelector('#titulo' + $scope.titulos[i].id_titulo)).val();
                $http.post('http://localhost:8081/GuardarTitulos', $scope.titulos[i]);
            }
            for(var l = 0;l< $scope.informaciones.length;l++){
                $scope.informaciones[l].pos_top =  angular.element(document.querySelector('#informacion' + $scope.informaciones[l].id_info)).offset().top;
                $scope.informaciones[l].texto =  angular.element(document.querySelector('#informacion' + $scope.informaciones[l].id_info)).val();
                $http.post('http://localhost:8081/GuardarInformaciones', $scope.informaciones[l]);
            }
            for(var s = 0;s< $scope.ejercicios.length;s++){
                $scope.ejercicios[s].pos_top =  angular.element(document.querySelector('#ejercicio' + $scope.ejercicios[s].id_ejercicio)).offset().top;
                $scope.ejercicios[s].enunciado =  angular.element(document.querySelector('#ejercicio_enunciado' + $scope.ejercicios[s].id_ejercicio)).val();
                $scope.ejercicios[s].respuesta =  angular.element(document.querySelector('#ejercicio_respuesta' + $scope.ejercicios[s].id_ejercicio)).val();
                $http.post('http://localhost:8081/GuardarEjercicios', $scope.ejercicios[s]);
            }
            for(var k = 0;k< $scope.videos.length;k++){
                $scope.videos[k].pos_top =  angular.element(document.querySelector('#video' + $scope.videos[k].id_video)).offset().top;
                $http.post('http://localhost:8081/GuardarVideos', $scope.videos[k]);
            }
            for(var j = 0;j< $scope.imagenes.length;j++){
                $scope.imagenes[j].pos_top =  angular.element(document.querySelector('#imagen' + $scope.imagenes[j].id_imagen)).offset().top;
                $http.post('http://localhost:8081/GuardarImagenes', $scope.imagenes[j]);
            }
            for(var q = 0;q< $scope.referencias.length;q++){
                $scope.referencias[q].pos_top =  angular.element(document.querySelector('#referencia' + $scope.referencias[q].id_referencia)).offset().top;
                $http.post('http://localhost:8081/GuardarReferencias', $scope.referencias[q]);
            }

        };

        load_pictures();
        function load_pictures() {
            $http.get('http://localhost:8081/loadTitulosAsimilador').success(function (data) {
                $scope.titulos = data;
            });
            $http.get('http://localhost:8081/loadVideosAsimilador').success(function (data) {
                $scope.videos = data;
            });
            $http.get('http://localhost:8081/loadInformacionesAsimilador').success(function (data) {
                $scope.informaciones = data;
            });
            $http.get('http://localhost:8081/loadImagenesAsimilador').success(function (data) {
                $scope.imagenes = data;
            });
            $http.get('http://localhost:8081/loadEjerciciosAsimilador').success(function (data) {
                $scope.ejercicios= data;
            });
            $http.get('http://localhost:8081/loadReferenciasAsimilador').success(function (data) {
                $scope.referencias= data;
            });


            };
    }]);
