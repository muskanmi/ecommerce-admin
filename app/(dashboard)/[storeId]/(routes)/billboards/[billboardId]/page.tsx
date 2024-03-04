import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";
import { ObjectId } from 'mongodb';

const BillboardPage = async ({
    params
}: {
    params: { billboardId: string }
}) => {
    try {
        // Log the incoming billboardId for debugging
        console.log('Incoming billboardId:', params.billboardId);

        // Validate and convert billboardId to a valid ObjectId
        const isValidObjectId = ObjectId.isValid(params.billboardId);
        if (!isValidObjectId) {
            throw new Error('Invalid billboardId');
        }

        const objectId = new ObjectId(params.billboardId);

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: objectId.toString() // Convert ObjectId to string
            }
        });

        return (
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <BillboardForm initialData={billboard} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching billboard:', error);
        // Handle the error, e.g., redirect to an error page or show an error message
        return <div>Error loading billboard</div>;
    }
}

export default BillboardPage;
