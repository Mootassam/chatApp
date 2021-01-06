import { ImagesComponent } from './../../components/images/images.component';
import { ChatComponent } from './../../components/chat/chat.component';
import { PeopleComponent } from './../../components/people/people.component';
import { CommentsComponent } from './../../components/comments/comments.component';
import { StreamsComponent } from './../../components/streams/streams.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
const routes: Routes = [
  
  {
    path:'streams', 
    component:StreamsComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'post/:id', 
    component:CommentsComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'people', 
    component:PeopleComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'chat/:name', 
    component:ChatComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'images/:name', 
    component:ImagesComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'account/password', 
    component:ChangePasswordComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'people/following', 
    component:FollowingComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'people/followers', 
    component:FollowersComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path:'notifications', 
    component:NotificationsComponent ,
    canActivate : [AuthGuard] ,
  },
  {
    path :'**',
    redirectTo :'streams',
  }
  
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class StreamsRoutingModule { }
