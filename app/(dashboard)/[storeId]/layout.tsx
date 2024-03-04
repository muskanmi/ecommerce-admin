import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { ObjectId } from 'mongodb';
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Validate and convert storeId to a valid ObjectId
  const isValidObjectId = ObjectId.isValid(params.storeId);
  if (!isValidObjectId) {
    redirect("/");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId as string, // Cast ObjectId to string
      userId: {
        equals: userId,
      },
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
