import { Controller, Get, Param, Query } from "@nestjs/common";
import { GovernanceActionsService } from "./governance-actions.service";

@Controller("governance-actions")
export class GovernanceActionsController {
  constructor(
    private readonly governanceActionsService: GovernanceActionsService
  ) {}

  @Get()
  findAll(
    @Query("search") search: string,
    @Query("filters") filters: string[],
    @Query("sort") sort: string
  ) {
    return this.governanceActionsService.findAll(search, filters, sort);
  }

  @Get("/metadata")
  findMetadata(@Query("url") url: string) {
    return this.governanceActionsService.findMetadata(url);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("index") index: number) {
    const govActionId = `${id}#${index}`;
    return this.governanceActionsService.findOne(govActionId);
  }
}
