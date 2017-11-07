import idbKeyval from 'idb-keyval';

function addFavFeature(id) {
	return new Promise((resolve, reject) => {
		idbKeyval
			.get('favFeatures')
			.then(favList => {
				const currentFavList = favList || [];
				const updatedFavList = currentFavList.concat(id);
				idbKeyval
					.set('favFeatures', updatedFavList)
					.then(() => {
						resolve(updatedFavList);
					})
					.catch(err => {
						reject(err);
					});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function removeFavFeature(id) {
	return new Promise((resolve, reject) => {
		idbKeyval
			.get('favFeatures')
			.then(favList => {
				const currentFavList = favList || [];
				const updatedFavList = currentFavList.filter(fid => fid !== id);
				idbKeyval
					.set('favFeatures', updatedFavList)
					.then(() => {
						resolve(updatedFavList);
					})
					.catch(err => {
						reject(err);
					});
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getFavFeatures() {
	return new Promise((resolve, reject) => {
		idbKeyval
			.get('favFeatures')
			.then(favList => {
				const currentFavList = favList || [];
				resolve(currentFavList);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default { addFavFeature, removeFavFeature, getFavFeatures };
