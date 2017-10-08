function addFavFeature(id) {
	const currentFavList = JSON.parse(window.localStorage.getItem('favFeatures')) || [];
	const updatedFavList = currentFavList.concat(id);
	window.localStorage.setItem('favFeatures', JSON.stringify(updatedFavList));
	return updatedFavList;
}

function removeFavFeature(id) {
	const currentFavList = JSON.parse(window.localStorage.getItem('favFeatures')) || [];
	const updatedFavList = currentFavList.filter(fid => fid !== id);
	window.localStorage.setItem('favFeatures', JSON.stringify(updatedFavList));
	return updatedFavList;
}

function getFavFeatures() {
	return JSON.parse(window.localStorage.getItem('favFeatures')) || [];
}

export default { addFavFeature, removeFavFeature, getFavFeatures };
