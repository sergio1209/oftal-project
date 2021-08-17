import { ApplicationModule } from "./application/application.module";
import { ControllersModule } from "./controller/controller.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    
    ApplicationModule,
    ControllersModule,
    InfrastructureModule
  ],
})
export class AppModule {}
