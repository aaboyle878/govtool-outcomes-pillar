import { HttpException, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { getGovernanceAction } from "src/queries/governanceAction";
import { getGovernanceActions } from "src/queries/governanceActions";
import { DataSource } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GovernanceActionsService {
  constructor(
    @InjectDataSource("db-sync")
    private readonly cexplorerService: DataSource,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}
  findAll(
    search: string,
    filters: string[],
    sort: string,
    page: number = 1,
    limit: number = 12
  ) {
    const searchTerm = search ? search.trim() : "";
    const filterArray = filters?.length > 0 ? filters : null;
    const sortOption = sort || "newestFirst";
    const offset = (page - 1) * limit;

    return this.cexplorerService.manager.query(getGovernanceActions, [
      searchTerm,
      filterArray,
      sortOption,
      offset,
      limit,
    ]);
  }

  private convertIpfsToHttpUrl(url: string): string {
    if (url.startsWith("ipfs://")) {
      const ipfsHash = url.replace("ipfs://", "");
      const gateway = this.configService.get<string>("IPFS_GATEWAY");
      return `${gateway}/${ipfsHash}`;
    }
    return url;
  }

  async findMetadata(url: string) {
    try {
      const httpUrl = this.convertIpfsToHttpUrl(url);

      const response$ = this.httpService.get(httpUrl).pipe(
        map((response) => {
          if (!response.data) {
            throw new Error("No data found in the response");
          }
          const metadata = response.data;
          return {
            authors: metadata.authors || [],
            hashAlgorithm: metadata.hashAlgorithm || "",
            body: {
              abstract: metadata.body?.abstract || "",
              motivation: metadata.body?.motivation || "",
              rationale: metadata.body?.rationale || "",
              references: metadata.body?.references || [],
              title: metadata.body?.title || "",
              comment: metadata.body?.comment || "",
              externalUpdates: metadata.body?.externalUpdates || [],
            },
          };
        }),
        catchError((error) => {
          throw new Error(`Error: ${error.message}`);
        })
      );

      return await lastValueFrom(response$);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    return this.cexplorerService.manager.query(getGovernanceAction, [id]);
  }
}
