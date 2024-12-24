import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getUser() {
  try {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email ?? undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        userRole: true,
        subscription: {
          select: {
            plan: true,
            period: true,
            startDate: true,
            endDate: true,
            userId: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
