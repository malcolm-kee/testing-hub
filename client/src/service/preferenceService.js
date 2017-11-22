// import idbKeyval from 'idb-keyval';
// dono why the library doesn't work

function addFavFeature(id) {
	return new Promise((resolve, reject) => {
		try {
			const favList = JSON.parse(window.localStorage.getItem('favFeatures'));
			const currentFavList = favList || [];
			const updatedFavList = currentFavList.concat(id);
			window.localStorage.setItem('favFeatures', JSON.stringify(updatedFavList));
			resolve(updatedFavList);
		} catch (err) {
			reject(err);
		}
	});
}

function removeFavFeature(id) {
	return new Promise((resolve, reject) => {
		try {
			const favList = JSON.parse(window.localStorage.getItem('favFeatures'));
			const currentFavList = favList || [];
			const updatedFavList = currentFavList.filter(fid => fid !== id);
			window.localStorage.setItem('favFeatures', JSON.stringify(updatedFavList));
			resolve(updatedFavList);
		} catch (err) {
			reject(err);
		}
	});
}

function getFavFeatures() {
	return new Promise((resolve, reject) => {
		try {
			const favList = JSON.parse(window.localStorage.getItem('favFeatures'));
			const currentFavList = favList || [];
			resolve(currentFavList);
		} catch (err) {
			reject(err);
		}
	});
}

export default { addFavFeature, removeFavFeature, getFavFeatures };
