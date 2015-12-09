module common.services {
	export class DataAccessService
		 { // implements interfaces.IDataAccessService

		static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) {

		}
		getItemResource(): ng.resource.IResourceClass<interfaces.IItemResource> {
			return this.$resource("/api/items/:id");
		}
	}
	// angular
	// .module("common.services")
	// .service("dataAccessService",
	// 		DataAccessService);
}
