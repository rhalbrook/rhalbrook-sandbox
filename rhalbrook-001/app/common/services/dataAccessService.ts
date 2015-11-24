module app.common {
	interface IDataAccessService {
		getItemResource(): ng.resource.IResourceClass<IItemResource>;
	}
	
	interface IItemResource 
		extends ng.resource.IResource<app.domain.IItem> {
		
	}
	export class DataAccessService 
		implements IDataAccessService {
		
		static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) {
			
		}
		getItemResource(): ng.resource.IResourceClass<IItemResource> {
			return this.$resource("/api/items/:itemId");
		}
	}
	angular
	.module("common.services")
	.service("dataAccessService",
			DataAccessService);
}