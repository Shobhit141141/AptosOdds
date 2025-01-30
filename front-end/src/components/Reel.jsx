import { useState } from 'react';
import { FaHeart, FaChevronUp, FaShare } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ViralToggle from './ViralAction';
const Reel = ({
	media,
	title,
	description,
	likes,
	views,
	shares,
	likedOrNot,
	id,
	type,
}) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [viralStatus, setViralStatus] = useState(null);

	const [liked, setLiked] = useState(likedOrNot || false);
	const [likesCount, setLikesCount] = useState(likes);

	console.log('id', likedOrNot);
	const handleLike = async () => {
		if (liked) {
			toast.error('You have already liked this post');
			return;
		}

		try {
			await axios.post(
				import.meta.env.VITE_SERVER_URI + `/api/memes/like/${id}`,
				{
					email: localStorage.getItem('email'),
				}
			);
			setLikesCount((prev) => prev + 1);
			setLiked(true);
		} catch (error) {
			console.error('Error liking the post:', error);
			toast.error('Failed to like the post');
		}
	};

	// Toggle drawer visibility
	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	const handleViralClick = (status) => {
		setViralStatus(status);
	};

	return (
		<div className='relative rounded-none flex flex-col h-[89vh] w-[30vw] max-sm:w-[100vw] bg-red-800'>
			<div className='flex flex-col h-full w-full'>
				{type === 'video' ? (
					<video
						className='object-cover w-full h-full rounded-none'
						src={media}
						autoPlay
						loop
						muted
					/>
				) : (
					<img className='object-cover w-full h-full rounded-none' src={media} />
				)}
			</div>

			{/* Description Drawer Section */}
			<div
				className={`transition-all duration-300 ease-in-out ${
					drawerOpen ? 'h-[50%]' : 'h-[8%]'
				} bg-[#000000b5] text-white p-4 absolute bottom-0 left-0 w-full rounded-t-2xl`}
			>
				{/* Title */}
				<h1
					className={`text-xl font-semibold text-white mb-2 ${
						drawerOpen ? 'absolute top-2' : 'relative w-[70%] truncate'
					}`}
				>
					{title}
				</h1>

				{/* Description */}
				<p
					className={`text-base text-gray-300 transition-all duration-300 ease-in-out ${
						drawerOpen ? 'h-[80%] mt-7 overflow-auto' : 'h-0 overflow-hidden'
					}`}
				>
					{description}
				</p>

				{/* Arrow to toggle drawer */}
				<div className='absolute bottom-7 left-1/2 transform -translate-x-1/2'>
					<button
						onClick={toggleDrawer}
						className='bg-transparent text-white rounded-full'
					>
						<FaChevronUp
							size={20}
							className={`transform ${drawerOpen ? 'rotate-180' : ''}`}
						/>
					</button>
				</div>
			</div>

			{/* Viral/Not Viral Buttons */}
			<ViralToggle memeId={id} />

			{/* Icons (Like, Comment, Share) */}
			<div className='absolute bottom-16 right-4 flex flex-col items-center gap-4'>
				{/* Like Button with Likes Count */}
				<div className='flex flex-col items-center'>
					<button
						className='p-2 rounded-full text-yellow-500 bg-gray-800 hover:bg-gray-700'
						onClick={handleLike}
					>
						<FaHeart size={24} />
					</button>
					<span className='text-sm text-white mt-2'>{likesCount} Likes</span>
				</div>

				{/* Share Button with Shares Count */}
				<div className='flex flex-col items-center'>
					<button className='p-2 rounded-full text-white bg-gray-800 hover:bg-gray-700'>
						<FaShare size={24} />
					</button>
					<span className='text-sm text-white mt-2'>{shares} Shares</span>
				</div>
			</div>
		</div>
	);
};

export default Reel;
