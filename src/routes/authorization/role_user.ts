import { Application } from "express";
import { RoleUserController } from "../../controllers/Authorization/role_user.controller";

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/roleUsers/public")
      .get(this.roleUserController.getAllRoleUsers)
      .post(this.roleUserController.createRoleUser);

    app.route("/api/roleUsers/public/:id")
      .get(this.roleUserController.getRoleUserById)
      .patch(this.roleUserController.updateRoleUser)
      .delete(this.roleUserController.deleteRoleUser);

    app.route("/api/roleUsers/public/:id/logic")
      .delete(this.roleUserController.deleteRoleUserAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
  }
}
