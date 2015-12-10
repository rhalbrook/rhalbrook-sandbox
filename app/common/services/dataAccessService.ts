module common.services {
	export class DataAccessService
		 {

		static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) {

		}
		getItemResource(): ng.resource.IResourceClass<interfaces.IItemResource> {
			return this.$resource("/api/epics/:id");
		}
	}
}
