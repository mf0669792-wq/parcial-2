import { Application } from "express";
import { ResourceRoleController } from "../../controllers/Authorization/resourceRole.controller";

export class ResourceRoleRoutes {
  public resourceRoleController: ResourceRoleController = new ResourceRoleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resourceRoles/public")
      .get(this.resourceRoleController.getAllResourceRoles)
      .post(this.resourceRoleController.createResourceRole);

    app.route("/api/resourceRoles/public/:id")
      .get(this.resourceRoleController.getResourceRoleById)
      .patch(this.resourceRoleController.updateResourceRole)
      .delete(this.resourceRoleController.deleteResourceRole);

    app.route("/api/resourceRoles/public/:id/logic")
      .delete(this.resourceRoleController.deleteResourceRoleAdv);
  }
}
