import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";
import { SizeForm } from "./components/size-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  let validObjectId = null;

  // Check if params.billboardId is a valid ObjectId
  if (ObjectId.isValid(params.sizeId)) {
    validObjectId = params.sizeId;
  }

  const size = validObjectId
    ? await prismadb.size.findUnique({
        where: {
          id: validObjectId
        }
      })
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
