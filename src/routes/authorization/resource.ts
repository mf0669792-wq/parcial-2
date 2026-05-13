import { Application } from "express";
import { ResourceController } from "../../controllers/Authorization/resource.controller";

export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resources/public")
      .get(this.resourceController.getAllResources)
      .post(this.resourceController.createResource);

    app.route("/api/resources/public/:id")
      .get(this.resourceController.getResourceById)
      .patch(this.resourceController.updateResource)
      .delete(this.resourceController.deleteResource);

    app.route("/api/resources/public/:id/logic")
      .delete(this.resourceController.deleteResourceAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
  }
}
