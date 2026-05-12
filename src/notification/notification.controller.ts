import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, MessageEvent, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/users/auth/auth.guard';
import type { UserTokenLogin } from 'src/users/auth/auth.userlogin';
import { UserParam } from 'src/users/user/user.decorator';
import { AdminGuard } from 'src/users/auth/admin.guard';
import { NotificationRouteIdValidGuard } from './guard/notification.guard';
import { NotificationParam } from './decorator/notification.param';
@ApiTags("Notification")
@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
  ) { }

  // reference : https://iliabedian.com/blog/server-side-events-on-nestjs-emitting-events-to-clients
  // reference2 : https://docs.nestjs.com/techniques/events

  @ApiOperation({ summary: "Watches for changes in the user's notification" })
  @Sse('sse')
  sse(@UserParam() user: UserTokenLogin): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, `sse.notification.${user.sub}`).pipe(
      map((payload) => ({
        data: JSON.stringify(payload),
      })),
    );

  }
  @ApiOperation({ summary: "creates an new notification" })
  @Post("/create-notification")
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(createNotificationDto);
  }


  @ApiOperation({ summary: "Gets all the notifications of the user" })
  @Get('/my-notifications')
  async findAllUser(@UserParam() user: UserTokenLogin) {
    return this.notificationService.findAllUser(user.sub);
  }

  @ApiOperation({ summary: "Gets all the notifications, used by admin" })
  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return this.notificationService.findAll();
  }
  @ApiOperation({ summary: "Gets the notification by id, only used by admin" })
  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @ApiOperation({ summary: "Gets all the user's notifications" })
  @UseGuards(NotificationRouteIdValidGuard)
  @Get('/my-notification/:id')
  async findOneUser(@NotificationParam() notification) {
    return notification;
  }
  @ApiOperation({ summary: "Updates a notification with the corresponding id from the user's account" })
  @UseGuards(NotificationRouteIdValidGuard)
  @Patch('/update-notification/:id')
  async update(@Param('id') id: string, @Body() updateNotificationDto: Partial<UpdateNotificationDto>) {
    return this.notificationService.updateNotification(+id, updateNotificationDto);
  }
  @ApiOperation({ summary: "Deletes a notification with the corresponding id from the user's account" })
  @UseGuards(NotificationRouteIdValidGuard)
  @Delete('/delete-notification/:id')
  async remove(@Param('id') id: string, @UserParam() user: UserTokenLogin) {
    return this.notificationService.removeNotification(user.sub, +id);
  }


}
