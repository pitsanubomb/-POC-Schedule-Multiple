import { ChangeRoomStatusService } from './tasks/ChangeRoomStatus.service';
import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as dayjs from 'dayjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly changeRoomStatusService: ChangeRoomStatusService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set-task')
  setTaskTest(): string {
    try {
      const now = dayjs();
      const testNext = dayjs().add(30, 'second'); //Example set to 30 sec to do something
      const milliseconds = dayjs(testNext).diff(now);

      this.changeRoomStatusService.changeStatusWithTimeOut(
        new Date().toDateString(),
        milliseconds,
      );
    } catch (error) {
      Logger.error(`Error add task`, { error });
    }

    return 'success';
  }
}
