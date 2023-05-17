/** Modules */
import React, { useState } from 'react';
/** Components */
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

/** Images */
const slides = [
	{
		url: 'https://fastly.picsum.photos/id/155/400/200.jpg?hmac=bWTh279I2oZny4YP2zqLpHOu9OUwzJ3dqG-5NjGKYvI'
	},
	{
		url: 'https://fastly.picsum.photos/id/448/400/200.jpg?hmac=4_4WKBJFdkXLpiTG5vjvHq-jHTdf9YFzDh23B_xEZ-g'
	},
	{
		url: 'https://fastly.picsum.photos/id/378/400/200.jpg?hmac=0-H0MoX15_uvYf1QuPx4z77kk41865Pf3-A6a4Yj6jU'
	},
	{
		url: 'https://fastly.picsum.photos/id/464/400/200.jpg?hmac=4QqO1YKFEzGHVQHrqt90RUE5hXuHw-P6U9L9q_MEEtg'
	},
	{
		url: 'https://fastly.picsum.photos/id/997/400/200.jpg?hmac=5z97CBpBiNfwk53aui-4bwlMg55nPo3XG-nZ-7Yj-GA'
	},
	{
		url: 'https://fastly.picsum.photos/id/807/400/200.jpg?hmac=RlM-KxTQHjkEk8PgYhcOTJ6aspyDS6lW-rlJfccbVdk'
	}
];

/** React functional component */
const ImageSlider = () => {
	/** State management */
	const [currentIndex, setCurrentIndex] = useState(0);

	/** Functions */
	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};
	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};
	const goToSlide = (slideIndex) => {
		setCurrentIndex(slideIndex);
	};

	/** DOM */
	return (
		<div className='h-full max-w-full m-auto pt-2 pb-5 px-1 relative group'>
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className='w-full h-full rounded-md bg-center bg-cover duration-500'
			></div>
			{/* Left Arrow */}
			<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>
			<div className='flex top-4 justify-center py-2'>
				{slides.map((slide, slideIndex) => (
					<div
						key={slideIndex}
						onClick={() => goToSlide(slideIndex)}
						className='text-2xl cursor-pointer'
					>
						<RxDotFilled />
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;