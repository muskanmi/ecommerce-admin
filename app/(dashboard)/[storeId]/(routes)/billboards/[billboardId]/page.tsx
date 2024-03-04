import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
  params
}: {
  params: { billboardId: string }
}) => {
  let validObjectId = null;

  // Check if params.billboardId is a valid ObjectId
  if (ObjectId.isValid(params.billboardId)) {
    validObjectId = params.billboardId;
  }

  const billboard = validObjectId
    ? await prismadb.billboard.findUnique({
        where: {
          id: validObjectId
        }
      })
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
