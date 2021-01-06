import { ImagesComponent } from './../../components/images/images.component';
import { MessageService } from './../../services/message.service';
import { MessageComponent } from './../../components/message/message.component';
import { ChatComponent } from './../../components/chat/chat.component';
import { TopStreamsComponent } from './../../components/top-streams/top-streams.component';
import { UsersService } from './../../services/users.service';
import { PeopleComponent } from './../../components/people/people.component';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './../../components/comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PostService } from './../../services/post.service';
import { PostFromComponent } from './../../components/post-from/post-from.component';
import { SideComponent } from './../../components/side/side.component';
import { TollbarComponent } from './../../components/tollbar/tollbar.component';
import { TokenService } from './../../services/token.service';
import { StreamsComponent } from './../../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxAutoScrollModule} from "ngx-auto-scroll";

import { FileUploadModule } from "ng2-file-upload";
import { ListCommentComponent } from 'src/app/components/list-comment/list-comment.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
@NgModule({
  declarations: [StreamsComponent, TollbarComponent, SideComponent,PostFromComponent,PostsComponent ,CommentsComponent,PeopleComponent ,TopStreamsComponent,ChatComponent,MessageComponent,ImagesComponent, ListCommentComponent,ChangePasswordComponent, FollowingComponent ,FollowersComponent, NotificationsComponent],
  imports: [
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule
  ], 
  exports:[StreamsComponent,TollbarComponent],
  providers:[TokenService , PostService ,UsersService, MessageService]
})
export class StreamsModule { }
