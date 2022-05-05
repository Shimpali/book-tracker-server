import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomeRoute(): string {
    return 'Hello. Go to /api to access the API.';
  }
}
