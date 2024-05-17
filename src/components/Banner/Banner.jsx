import React from "react";
import "@styles/banner.scss";

import image1 from "@assets/images/image1.jpg";
import image2 from "@assets/images/image2.jpg";
import image3 from "@assets/images/image3.jpg";
import image4 from "@assets/images/image4.jpg";

function Banner() {
	const images = [image1, image2, image3, image4];
	const [currentImage, setCurrentImage] = React.useState(images[0]);
	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImage(images[Math.floor(Math.random() * images.length)]);
		}, 10000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="banner-container">
			<img
				loading="lazy"
				src={currentImage}
			/>
		</div>
	);
}

export default React.memo(Banner);
