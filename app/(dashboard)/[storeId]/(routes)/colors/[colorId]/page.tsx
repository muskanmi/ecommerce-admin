import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";
import { ColorForm } from "./components/color-form";

const ColorPage = async ({
  params
}: {
  params: { colorId: string }
}) => {
  let validObjectId = null;

  // Check if params.billboardId is a valid ObjectId
  if (ObjectId.isValid(params.colorId)) {
    validObjectId = params.colorId;
  }

  const color = validObjectId
    ? await prismadb.color.findUnique({
        where: {
          id: validObjectId
        }
      })
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
