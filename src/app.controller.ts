import { ChangeRoomStatusService } from './tasks/ChangeRoomStatus.service';
import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import * as dayjs from 'dayjs';

@Controller()
export class AppController {
  private readonly mockTaskId = crypto.randomUUID();
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
        this.mockTaskId,
        milliseconds,
      );
    } catch (error) {
      Logger.error(`Error add task`, { error });
      throw new Error(`Error sample`);
    }

    return 'success';
  }

  @Get('edit-task')
  editTask(): string {
    try {
      const now = dayjs();
      const testNext = dayjs().add(30, 'second'); //Example set to 30 sec to do something
      const milliseconds = dayjs(testNext).diff(now);

      this.changeRoomStatusService.deleteTimeOutWithTaskId(this.mockTaskId);
      this.changeRoomStatusService.changeStatusWithTimeOut(
        this.mockTaskId,
        milliseconds,
      );
    } catch (error) {
      Logger.error(`Error update task`, { error });
      throw new Error(`Error sample`);
    }

    return 'success';
  }
}
