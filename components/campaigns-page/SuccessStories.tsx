import { cn } from "@/lib";
import { storiesAboutUs, testimonialImage1 } from "@/public/assets/images/landing-page";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

const successStories = [
	{
		title: "Education",
		secondTitle: "Empowering Future Generations",
		text: "Meet Sarah, a young girl from a rural village who had big dreams but limited resources. With the support of generous donors like you, Sarah received a scholarship that enabled her to pursue her education. Today, she's not just a graduate; she's an inspiration to her community, proving that education can break barriers and change lives.",
		image: storiesAboutUs,
	},
	{
		title: "Health and wellness",
		secondTitle: "Transforming Lives Through Care",
		text: "Join us in celebrating the remarkable journey of James, a father of three who battled a life-threatening illness. Thanks to your contributions, James received the medical treatment he desperately needed. Now, he's healthy, happy, and grateful for a second chance at life. Your support has made a profound impact on James and his family, giving them hope for a brighter future.",
		image: testimonialImage1,
	},
	{
		title: "Others",
		secondTitle: "Building Stronger Communities Together",
		text: "Discover the story of Maria, a passionate advocate for community development. Through your support, Maria's organization was able to implement vital projects that uplifted her community. From building schools and clean water systems to providing vocational training, your donations have empowered individuals like Maria to create lasting change and improve countless lives.",
		image: storiesAboutUs,
	},
	{
		title: "Volunteer",
		secondTitle: "Preserving Our Planet for Future Generations",
		text: "Join us in celebrating the conservation efforts of David, a dedicated environmentalist committed to protecting our planet's natural resources. With your support, David's organization launched initiatives to restore endangered ecosystems, promote sustainable practices, and educate communities about the importance of environmental stewardship. Together, we're safeguarding our planet for generations to come.",
		image: storiesAboutUs,
	},
	{
		title: "Emergency",
		secondTitle: "Providing Hope in Times of Crisis",
		text: "Meet Maria, a survivor of a devastating natural disaster that left her homeless and vulnerable. Thanks to your swift response and generosity, Maria received emergency relief aid that provided her with shelter, food, and essential supplies. Your compassion and support during times of crisis offer hope and comfort to those facing unimaginable hardships.",
		image: testimonialImage1,
	},
	{
		title: "Others",
		secondTitle: "Nurturing Creativity and Expression",
		text: "Celebrate the artistic journey of John, a talented musician whose passion for music knows no bounds. With your support, John was able to pursue his dreams, attend music school, and share his gift with the world. Through his captivating performances, John inspires others to embrace their creativity and express themselves through the power of music.",
		image: storiesAboutUs,
	},
];
const SuccessStories = ({ className }: { className?: string }) => {
	const [currentItem, setCurrentItem] = useState(0);

	const next = () => {
		setCurrentItem((prevItem) => (prevItem === successStories.length - 1 ? 0 : prevItem + 1));
	};

	const prev = () => {
		setCurrentItem((prevItem) => (prevItem === 0 ? successStories.length - 1 : prevItem - 1));
	};

	return (
		<div className={cn("relative flex flex-col md:gap-12", className)}>
			<h1 className="px-4 text-center text-2xl  font-bold md:text-3xl">
				The Success stories of the benefactors speak for themselves
			</h1>

			<div className={"overflow-hidden md:flex"}>
				{successStories.map((story, id) => (
					<div
						key={id}
						style={{ transform: `translateX(-${currentItem * 100}%)` }}
						className="flex w-full shrink-0 grow-0 flex-col-reverse gap-5 space-y-10 transition-transform duration-500 md:flex-row md:items-center md:justify-between md:space-y-0"
					>
						<div className="space-y-5 md:w-1/2 md:space-y-10">
							<h1 className="text-base md:text-lg">{story.title}</h1>
							<h1 className="pr-16 text-2xl  font-bold md:pr-0 md:text-3xl">{story.secondTitle}</h1>
							<p className="text-base font-medium md:text-lg">{story.text}</p>
						</div>
						<div className="w-full md:w-1/2">
							<Image
								src={story.image}
								alt="Create campaign card image"
								width={350}
								height={350}
								className="w-full rounded-2xl object-cover"
							/>
							<button
								className="absolute right-0 top-[45%] z-50 hidden -translate-y-1/2 transform rounded-full border border-white p-2 backdrop-blur-md backdrop-filter transition-all duration-300 hover:backdrop-blur-lg md:block md:p-3"
								onClick={next}
							>
								<ArrowRightIcon className="size-20 text-white" />
							</button>
							<button
								className="absolute right-0 top-[70%] z-50 hidden  -translate-y-1/2 transform rounded-full border border-white p-2 backdrop-blur-md backdrop-filter transition-all duration-300 hover:backdrop-blur-lg md:block md:p-3"
								onClick={prev}
							>
								<ArrowLeftIcon className="size-20 text-white" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default SuccessStories;
