import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GovernanceActionsService } from "./governance-actions.service";
import { GovernanceActionsController } from "./governance-actions.controller";

@Module({
  imports: [HttpModule],
  controllers: [GovernanceActionsController],
  providers: [GovernanceActionsService],
})
export class GovernanceActionsModule {}
