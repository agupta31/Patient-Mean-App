angular.module('contactApp',['ngRoute'])

    .config(function($routeProvider){
            $routeProvider.
                when('/',{
                     templateUrl:"form.html",
                      controller:"appCtrl"
                })
                .when('/meds/:id',{
                     templateUrl:"medications.html",
                     controller:'medCtrl'
                })
      })
      .service('patientService',function($http){
                this.getData=function(){
                  return $http({
                       method:'get',
                       url:'/patientList'
                  })
                }
                this.getMedsData=function(person_id){
                     return $http({
                         method:'get',
                         url:'/patientList/'+person_id
                     })
                }
                this.updateData=function(dataItem,temp){
                      return  $http({
                           method:"put",
                           url:"/patientList/"+dataItem._id,
                           data:temp
                        })
                }

      })
      .controller('appCtrl',function($scope,patientService){
                  function refresh(){
                      patientService.getData().then(function(response){
                          $scope.resultList=response.data;
                      });
                  }
                  refresh();

      })
      .controller('medCtrl',function($routeParams,$scope,patientService){
        console.log($routeParams.id);
        function refresh(){
          patientService.getMedsData($routeParams.id).then(function(response){
              $scope.meds=response.data;
              console.log($scope.meds);
          });
      }
          refresh();
        $scope.editData=function(medicalData){
              $scope.temperature=medicalData.temperature;
              $scope.pulse=medicalData.pulse;
              $scope.item=medicalData;

              //  patientService.getMedsData(medicalData._id).then(function(response){
              //       $scope.item=response.data;
              //       console.log($scope.item);
              //  });
        }
        $scope.updateItem=function(){
             $scope.tpData={};
              $scope.tpData.temperature=$scope.temperature;
              $scope.tpData.pulse=$scope.pulse;
             patientService.updateData($scope.item,$scope.tpData);
                     refresh();
                     $scope.message="data successfully added";
           }
        });
