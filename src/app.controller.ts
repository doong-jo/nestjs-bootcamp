import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  getHealthCheck() {
    return this.healthCheckService.check([
      // 데이터베이스
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () =>
        /**
         * 150MB 이상의 힙 메모리 사용량을 체크
         *
         * 150MB 한 이유: Node.js의 기본 힙 메모리 사용량은 512MB이다.
         * 이 중 150MB 이상을 사용하면 메모리 누수가 발생했다고 판단할 수 있다.
         */
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        /**
         * 150MB 이상의 RSS 메모리 사용량을 체크
         *
         * RSS(Resident Set Size)는 프로세스가 사용하는 메모리의 양을 나타낸다.
         * RSS는 힙 메모리 외에도 코드, 스택, 힙, 메모리 매핑 파일 등을 포함한다.
         *
         * RSS는 힙 메모리보다 더 큰 범위를 포함하므로, RSS를 체크하는 것이 더 정확하다.
         *
         * 150MB 한 이유: Node.js의 기본 힙 메모리 사용량은 512MB이다.
         * 이 중 150MB 이상을 사용하면 메모리 누수가 발생했다고 판단할 수 있다.
         */
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
