import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getUser() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email ?? undefined
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      userRole: true
    }
  });

  if (!user) {
    return null;
  }


  return user;
}
