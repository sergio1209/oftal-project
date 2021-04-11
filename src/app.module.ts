import { ApplicationModule } from "./application/application.module";
import { ControllersModule } from "./controller/controller.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ApplicationModule,
    ControllersModule,
    InfrastructureModule
  ],
})
export class AppModule {}
