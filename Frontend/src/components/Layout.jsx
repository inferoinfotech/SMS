// import Sidebar from "@/components/Sidebar";
// import Header from "./Header";
import HeaderMain from "./header/HeaderMain";
import AsideBar from "../pages/navigationStructure/asideBar/AsideBar";

export default function Layout({ children }) {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-col">
				<AsideBar />
				<HeaderMain />
			</div>
			<div className="flex-1 p-6 bg-blue-50 overflow-auto">
				{children}
			</div>
		</div>
	);
}
