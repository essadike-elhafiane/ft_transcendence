import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: prismaService){}

    async sendFriendRequest(UserId: number, TargetId: number)
    {
        const friends = await this.prisma.friendRequest.create({
            data:{
                senderId : UserId,
                receiverId: TargetId
            }
        })
        return friends;
    }
    
    async FriendRequest(UserId: number)
    {
        const reqFriend = await this.prisma.user.findUnique({
            where:{
                id: UserId,
            },
            select:{
                friendRequests: {
                    select: {
                      senderId: true
                    }
                  }
                
                // InvitSend: true
            }
        })
        const ids = reqFriend.friendRequests.map(request => request.senderId);
        console.log(ids)
        const users = await this.prisma.user.findMany({
            where: {
              id: { in: ids }
            },
            select:{
                userName: true,
                image: true,
            }
          });
        return users;
    }
}
