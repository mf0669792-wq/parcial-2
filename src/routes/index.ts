import { Application } from "express";
import { CarRoutes } from "./Car";
import { TuitionRoutes } from "./tuition";

export class Routes {
  public carRoutes: CarRoutes = new CarRoutes();
  public tuitionRoutes: TuitionRoutes = new TuitionRoutes();

  public routes(app: Application): void {
    this.carRoutes.routes(app);
    this.tuitionRoutes.routes(app);
  }
}
