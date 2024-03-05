import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {
  let validObjectId = null;

  // Check if params.billboardId is a valid ObjectId
  if (ObjectId.isValid(params.categoryId)) {
    validObjectId = params.categoryId;
  }

  const category = validObjectId
    ? await prismadb.category.findUnique({
        where: {
          id: validObjectId
        }
      })
    : null;

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        }
    })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
