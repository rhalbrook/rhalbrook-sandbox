module services {
    
    export class WayWayMockService implements interfaces.IDataAccessService {
        //public $httpService: ng.IHttpService;

        
        
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        	// do nothing for now
        }



        getTasks(): ng.IPromise<interfaces.ITask[]> {
            var deferred = this.$q.defer();
            var fakeResults = [
				{
					id: 1,
                    itemName: "foo",
                    description: "some description"
				}
			]
            setTimeout(function() {
                deferred.resolve(fakeResults);    
            }, 1000);
            
            return deferred.promise;
        }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method POST
        addTask(obj:interfaces.ITask): ng.IPromise<interfaces.ITask> {
            var deferred = this.$q.defer();
           return deferred.promise; 
       }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method DESTROY or DELETE
		deleteTask(obj:interfaces.ITask): ng.IPromise<any> {
            var deferred = this.$q.defer();
            return deferred.promise;
        }
        
        // FIXME: method needs implementation (use getTasks as example)  hint: requires http method PUT
		updateTask(obj:interfaces.ITask): ng.IPromise<interfaces.ITask> {
            var deferred = this.$q.defer();
            return deferred.promise;
        }
        
    }
}