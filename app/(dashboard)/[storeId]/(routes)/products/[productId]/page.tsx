import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";
import { ObjectId } from "mongodb";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {

  let validObjectId = null;

  // Check if params.billboardId is a valid ObjectId
  if (ObjectId.isValid(params.productId)) {
    validObjectId = params.productId;
  }

  const product = validObjectId
  ? await prismadb.product.findUnique({
      where: {
        id: validObjectId
      },
      include: {
        images: true,
      }
    })
  : null;

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories} 
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
