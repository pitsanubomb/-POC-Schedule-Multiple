import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()

/**
 * Change room status service
 * @description
 *  Use to add delete and get change room status process
 */
export class ChangeRoomStatusService {
  private readonly log = new Logger(ChangeRoomStatusService.name); // Define log to call debug

  /**
   *
   * @param schedulerRegistry SchedulerRegistry => Use to manage task in cronjob (interval)
   */
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  /**
   * Change status with timeout
   * @param taskId taskId
   * @param milliseconds  add time to action
   */
  changeStatusWithTimeOut(taskId: string, milliseconds: number) {
    // Create callback for log to can find process
    const timOutCallback = () => {
      this.log.log(`Interval task ${taskId}`, { taskId, milliseconds });
    };

    //Set time to action
    const intervalStatus = setTimeout(timOutCallback, milliseconds); //Set task interval
    this.schedulerRegistry.addTimeout(taskId, intervalStatus);
  }

  /**
   * Delete task in status timeout
   * @param taskId taskId to delete
   */
  deleteTimeOutWithTaskId(taskId: string) {
    this.schedulerRegistry.deleteTimeout(taskId); //Delete task interval
    this.log.warn(`Delete task ${taskId}`, { taskId });
  }

  /**
   * Get all task interval
   */
  getStatusTask() {
    const tasks = this.schedulerRegistry.getTimeouts();
    tasks.forEach((taskId) => {
      this.log.log(`Do some task ${taskId}`, taskId);
      // Do logic update here
    });
  }
}
