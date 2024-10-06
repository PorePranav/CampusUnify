import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import EventDaysTab from "../features/events/EventDaysTab";
import EventInformationTab from "../features/events/EventInformationTab";
import EventRegistrationsTab from "../features/events/EventRegistrationsTab";
import { useEvent } from "../features/events/useEvent";
import PageLayout from "../styles/PageLayout";
import PageNotFound from "../ui/PageNotFound";
import Spinner from "../ui/Spinner";

export default function Event() {
	const { event, isLoading: isLoadingEvent } = useEvent();
	const { user, isLoading: isLoadingUser } = useUser();
	const [activeTab, setActiveTab] = useState("info");

	if (!isLoadingEvent && !event)
		return (
			<PageLayout>
				<PageNotFound />
			</PageLayout>
		);

	return (
		<PageLayout>
			<div className="w-[80%] mx-auto p-6 transition-colors duration-300 bg-gray-100 text-black dark:bg-gray-800 dark:text-white">
				{isLoadingEvent || isLoadingUser ? (
					<Spinner />
				) : (
					<>
						<div className="relative flex flex-col items-center px-4 sm:px-8">
							<img
								className="w-full sm:w-[75%] mx-auto rounded-lg shadow-md"
								src={event.coverImage}
								alt={event.name}
							/>
							<div className="absolute bottom-[10%] sm:bottom-[5%] left-[10%] sm:left-[15%] p-2 text-white">
								<p className="text-xl sm:text-6xl font-bold leading-tight">
									{event.name}
								</p>
								<p className="mt-2 text-sm sm:text-base">
									{`Hosted by ${event.clubId.name}`}
								</p>
							</div>
						</div>
						<h2 className="text-4xl mt-4 font-bold">{event.name}</h2>
						<div className="w-full mt-4 flex items-center gap-4 border-b-2 p-4 transition-colors duration-300 border-gray-300 dark:border-gray-600">
							<button
								type="button"
								className={`font-semibold pb-2 transition-colors duration-300 ${
									activeTab === "info"
										? "text-black dark:text-white border-b-2 border-primary-700"
										: "text-primary-900 dark:text-primary-400 hover:text-black dark:hover:text-white"
								}`}
								onClick={() => setActiveTab("info")}
							>
								Event Information
							</button>
							<button
								type="button"
								className={`font-semibold pb-2 transition-colors duration-300 ${
									activeTab === "daydetails"
										? "text-black dark:text-white border-b-2 border-primary-700"
										: "text-primary-900 dark:text-primary-400 hover:text-black dark:hover:text-white"
								}`}
								onClick={() => setActiveTab("daydetails")}
							>
								Daily Event Details
							</button>
							{user.role === "club" && (
								<button
									type="button"
									className={`font-semibold pb-2 transition-colors duration-300 ${
										activeTab === "registrations"
											? "text-black dark:text-white border-b-2 border-primary-700"
											: "text-primary-900 dark:text-primary-400 hover:text:black dark:hover:text-white"
									}`}
									onClick={() => setActiveTab("registrations")}
								>
									Registrations
								</button>
							)}
						</div>
						{activeTab === "info" && <EventInformationTab event={event} />}
						{activeTab === "daydetails" && <EventDaysTab event={event} />}
						{activeTab === "registrations" && (
							<EventRegistrationsTab event={event} />
						)}
					</>
				)}
			</div>
		</PageLayout>
	);
}
