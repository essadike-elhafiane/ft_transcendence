import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";

@Injectable()
export class FriendsService {
  constructor(private prisma: prismaService) {}

  async searchUser(userName: string) {
    try {
      const user = await this.prisma.user.findMany({
        where: {
          userName: {
            contains: userName,
          },
        },
        select: {
          userName: true,
          image: true,
          id: true,
        },
      });
      return user;
    } catch (e) {
      return null;
    }
  }

  async sendFriendRequest(UserId: number, TargetId: number) {
    if (UserId === TargetId) {
      return null;
    }

    try {
      const check = await this.prisma.friendRequest.findMany({
        where: {
          OR: [
            {
              AND: {
                receiverId: UserId,
                senderId: TargetId,
              },
            },
            {
              AND: {
                receiverId: TargetId,
                senderId: UserId,
              },
            },
          ],
        },
      });
      if (check.length > 0) {
        return null;
      }
      const friend = await this.prisma.user.findUnique({
        where: {
          id: TargetId,
        },
      });
      if (!friend) {
        return null;
      }
      const friends = await this.prisma.friendRequest.create({
        data: {
          senderId: UserId,
          receiverId: TargetId,
        },
        select: {
          id: true,
          sender: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
          receiver: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
        },
      });

      return friends;
    } catch (e) {
      return null;
    }
  }

  async getfriendsRequest(UserId: number) {
    try {
      const friends = await this.prisma.friendRequest.findMany({
        where: {
          AND: {
            receiverId: UserId,
            blocked: false,
            accepted: false,
          },
        },
        select: {
          id: true,
          sender: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return friends;
    } catch (e) {
      return null;
    }
  }

  async Friends(UserId: number) {
    try {
      const friends = await this.prisma.friendRequest.findMany({
        where: {
          OR: [
            {
              receiverId: UserId,
              accepted: true,
              blocked: false,
            },
            {
              senderId: UserId,
              accepted: true,
              blocked: false,
            },
          ],
        },
        select: {
          id: true,
          senderId: true,
          sender: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
          receiver: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const Friends = friends.map((request) => {
        // Determine if the user is the sender or receiver
        const isSender = request.senderId === UserId;
        const friendData = isSender ? request.receiver : request.sender;
        return {
          id: friendData.id,
          userName: friendData.userName,
          image: friendData.image,
        };
      });
      return Friends;
    } catch (e) {
      return null;
    }
  }

  async acceptFriendRequest(UserId: number, TargetId: number): Promise<any> {
    try {
      const friends = await this.prisma.friendRequest.updateMany({
        where: {
          AND: {
            receiverId: UserId,
            senderId: TargetId,
          },
        },
        data: {
          accepted: true,
        },
      });
      if (friends.count > 0) {
        const friend = await this.prisma.user.findUnique({
          where: {
            id: TargetId,
          },
          select: {
            userName: true,
            image: true,
            id: true,
          },
        });

        const user = await this.prisma.user.findUnique({
          where: {
            id: UserId,
          },
          select: {
            userName: true,
            image: true,
            id: true,
          },
        });
        return { reciever: friend, sender: user };
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async blockedFriens(UserId: number) {
    try {
      const blockedfriends = await this.prisma.friendRequest.findMany({
        where: {
          OR: [
            {
              receiverId: UserId,
              blocked: true,
              blockedById: UserId,
            },
            {
              senderId: UserId,
              blocked: true,
              blockedById: UserId,
            },
          ],
        },
        select: {
          id: true,
          senderId: true,
          sender: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
          receiver: {
            select: {
              userName: true,
              image: true,
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const Blockedfriends = blockedfriends.map((request) => {
        const isSender = request.senderId === UserId;
        const friendData = isSender ? request.receiver : request.sender;
        return {
          id: friendData.id,
          userName: friendData.userName,
          image: friendData.image,
        };
      });
      return Blockedfriends;
    } catch (e) {
      return null;
    }
  }

  async blockFriendRequest(UserId: number, TargetId: number) {
    try {
      // check if the user is already blocked
      const friends = await this.prisma.friendRequest.updateMany({
        where: {
          OR: [
            {
              AND: {
                receiverId: UserId,
                senderId: TargetId,
              },
            },
            {
              AND: {
                receiverId: TargetId,
                senderId: UserId,
              },
            },
          ],
        },
        data: {
          accepted: false,
          blocked: true,
          blockedById: UserId,
        },
        
      });
      if (friends.count > 0) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: TargetId,
          },
          select: {
            userName: true,
            image: true,
            id: true,
          },
        });
        return user;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async deleteFriendRequest(UserId: number, TargetId: number) {
    try {
      const friends = await this.prisma.friendRequest.deleteMany({
        where: {
          OR: [
            {
              AND: {
                receiverId: UserId,
                senderId: TargetId,
              },
            },
            {
              AND: {
                receiverId: TargetId,
                senderId: UserId,
              },
            },
          ],
        },
      });
      return friends;
    } catch (e) {
      return null;
    }
  }

  async unblockFriendRequest(UserId: number, TargetId: number) {
    try {
      const friends = await this.prisma.friendRequest.updateMany({
        where: {
          OR: [
            {
              AND: {
                blockedById: UserId,
                receiverId: UserId,
                senderId: TargetId,
              },
            },
            {
              AND: {
                blockedById: UserId,
                receiverId: TargetId,
                senderId: UserId,
              },
            },
          ],
        },
        data: {
          blocked: false,
          accepted: false,
          blockedById: null,
        },
      });
      if (friends) await this.deleteFriendRequest(UserId, TargetId);
      else return null;
      return friends;
    } catch (e) {
      return null;
    }
  }
}
