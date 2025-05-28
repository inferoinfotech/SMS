import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { pollData } from "@/data/pollData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OwnPoll() {
	const [polls, setPolls] = useState(pollData);

	const handleVote = (pollId, optionLabel) => {
		setPolls((prevPolls) =>
			prevPolls.map((poll) =>
				poll.id === pollId
					? {
							...poll,
							options: poll.options.map((option) =>
								option.label === optionLabel
									? { ...option, votes: option.votes + 1 }
									: option
							),
							totalVotes: poll.totalVotes + 1,
					  }
					: poll
			)
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Polls</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{polls.map((poll) => (
						<Card key={poll.id} className="shadow">
							<CardHeader className="grid grid-cols-3">
								<div>
									<Avatar className="w-10 h-10 me-3">
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt={poll.author}
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<div className="">
									<h3 className="text-lg font-bold">
										{poll.author}
									</h3>
									<span className="text-sm text-gray-500">
										{poll.type}
									</span>
								</div>
								<div>
									<span>20</span>
								</div>
							</CardHeader>
							<Separator />
							<CardContent>
								<p className="text-sm mb-2">{poll.question}</p>
								<form className="space-y-4">
									{poll.options.map((option) => {
										const percentage = Math.round(
											(option.votes / poll.totalVotes) *
												100
										);
										return (
											<div
												key={option.label}
												className="space-y-1"
											>
												<label className="flex items-center space-x-2">
													<input
														type="radio"
														name={`poll-${poll.id}`}
														onClick={() =>
															handleVote(
																poll.id,
																option.label
															)
														}
														className="radio"
													/>
													<span className="text-sm">
														{option.label}
													</span>
												</label>
												<Progress
													value={percentage}
													color={
														percentage >= 50
															? "green"
															: "red"
													}
													className="w-full h-2"
												/>
												<div className="text-xs text-gray-600">
													{option.votes} votes (
													{percentage}%)
												</div>
											</div>
										);
									})}
								</form>
							</CardContent>
							<CardFooter>
								<div className="text-xs text-slate-400 ">
									{poll.date}
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	);
}