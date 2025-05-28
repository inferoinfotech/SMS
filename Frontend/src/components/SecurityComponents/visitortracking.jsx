import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import AddVisitorDetails from "./AddVisitorDetails"; // Corrected typo in import
import { getVisitorSecurityPannel } from "../../api/visitorLogApi"; // Import the API function

export default function VisitorTracking() {
    const [visitors, setVisitors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter] = useState("All");

    const fetchVisitors = async () => {
        try {
            setIsLoading(true);
            const response = await getVisitorSecurityPannel();
            setVisitors(response);
        } catch (error) {
            console.error("Error fetching Visitors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, []);

    const filteredVisitors = visitors.filter((visitor) => {
        if (filter === "All") return true;
        return visitor.status === filter;
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddVisitors = () => {
        setIsDialogOpen(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close the dialog
    };

    // Callback to add a visitor
    const handleAddVisitor = (visitor) => {
        setVisitors((prevVisitors) => [...prevVisitors, visitor]);
    };

    return (
        <Card className="flex-1 p-6 bg-white h-full overflow-auto rounded-2xl">
            <CardHeader className="flex flex-row justify-between items-center p-0 font-poppins mb-3">
                <CardTitle>Visitor Tracking</CardTitle>
                <Button
                    className="flex items-center space-x-2"
                    onClick={handleAddVisitors}
                >
                    <img src="./src/assets/add-square.svg" alt="" />
                    <span>Add Visitor details</span>
                </Button>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[730px] rounded-t-lg">
                    <div>
                        <table className="w-full text-left">
                            <thead className="text-center text-gray-600">
                                <tr className="bg-blue-50">
                                    <th className="p-3 text-left">
                                        Visitor Name
                                    </th>
                                    <th className="p-3">Phone Number</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Unit Number</th>
                                    <th className="p-3">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="p-4">
                                            <Skeleton />
                                        </td>
                                    </tr>
                                ) : filteredVisitors.length > 0 ? (
                                    filteredVisitors.map((visitor) => (
                                        <tr
                                            key={visitor._id}
                                            className="border-b"
                                        >
                                            <td className="p-3 flex items-center space-x-3">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage
                                                        src="https://github.com/shadcn.png"
                                                        alt={
                                                            visitor.name
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold font-poppins">
                                                    {visitor.name}
                                                </span>
                                            </td>
                                            <td className="p-3 text-gray-700 font-semibold font-poppins">
                                                {visitor.number}
                                            </td>
                                            <td className="p-3 text-gray-500">
                                                {new Date(visitor.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-3 text-gray-500">
                                                <span className="mr-3 bg-blue-50 p-2 rounded-full">
                                                    <span className="font-semibold font-poppins text-blue-500">
                                                        {visitor.wing}
                                                    </span>
                                                </span>
                                                {visitor.unitNumber}
                                            </td>
                                            <td className="p-3 text-gray-500">
                                                {visitor.time}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-4 text-gray-500 text-center font-semibold font-poppins"
                                        >
                                            No Visitor Tracking data found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </ScrollArea>
            </CardContent>

            {/* AddVisitorDetails component */}
            <AddVisitorDetails
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onAddVisitor={handleAddVisitor}
            />
        </Card>
    );
}