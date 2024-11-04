import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ChangeRoomStatusService } from './ChangeRoomStatus.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ChangeRoomStatusService],
  exports: [ChangeRoomStatusService],
})
export class TaskModule {}
