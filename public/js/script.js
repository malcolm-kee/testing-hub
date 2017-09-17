(function() {
	'use strict';

	$(function() {
		$('.create-feature-form').on('submit', invokeCreateFeature);
		$('.js-edit-feature-btn').on('click', invokeEditFeature);
		$('.edit-feature-form').on('submit', invokeSaveEditFeature);
		$('.js-add-link-btn').on('click', invokeAddLink);
	});

	function invokeCreateFeature(ev) {
		ev.preventDefault();

		var feature_name = $('.create-feature-form [name="desc"]').val(),
			feature_categories = [],
			feature_links = [];

		$('.create-feature-form [name="category"]')
			.filter(':checked')
			.each(function(index, elem) {
				var category = $(elem).val();
				feature_categories.push(category);
			});

		$('.create-feature-form .feature-link').each(function(index, elem) {
			var env = $(elem)
					.find('input[name="env"]')
					.val(),
				url = $(elem)
					.find('input[name="url"]')
					.val();

			if (env.length > 0 && url.length > 0) {
				feature_links.push({
					env: env,
					url: url
				});
			}
		});

		createFeature({
			name: feature_name,
			categories: feature_categories,
			links: feature_links
		});

		return false;
	}

	function invokeEditFeature(ev) {
		ev.preventDefault();

		var $this_btn = $(this),
			feature_id = $(this).data('id');

		editFeature(feature_id, $this_btn);

		return false;
	}

	function invokeSaveEditFeature(ev) {
		ev.preventDefault();

		var feature_id = $('.edit-feature-form [name="id"]').val(),
			feature_name = $('.edit-feature-form [name="desc"]').val(),
			feature_categories = [],
			feature_links = [];

		$('.edit-feature-form [name="category"]')
			.filter(':checked')
			.each(function(index, elem) {
				var category = $(elem).val();
				feature_categories.push(category);
			});

		$('.edit-feature-form .feature-link').each(function(index, elem) {
			var env = $(elem)
					.find('input[name="env"]')
					.val(),
				url = $(elem)
					.find('input[name="url"]')
					.val();

			if (env.length > 0 && url.length > 0) {
				feature_links.push({
					env: env,
					url: url
				});
			}
		});

		saveEditFeature(feature_id, {
			name: feature_name,
			categories: feature_categories,
			links: feature_links
		});

		return false;
	}

	function invokeAddLink(ev) {
		ev.preventDefault();

		var $this_modal = $(this).closest('.modal');

		addLink($this_modal);

		return false;
	}

	function createFeature(feature_details) {
		$('#create-feature-btn').addClass('loading');
		postFeatureData(feature_details)
			.done(function(data) {
				console.log('Feature created', data);
				$('#create-feature-modal').modal('hide');
				window.location.reload();
			})
			.fail(function(error) {
				console.log('Error for feature creation', error);
				$('#create-feature-modal').modal('hide');
				showServiceUnavailableError();
			})
			.always(function() {
				$('#create-feature-btn').removeClass('loading');
			});
	}

	function editFeature(id, $btn) {
		$btn.addClass('loading');
		retrieveFeatureData(id)
			.done(function(data) {
				console.log('data retrieved for ' + id);
				console.log(data);
				showEditFeatureModal(data);
			})
			.fail(function(error) {
				console.log('ajax fail for ' + id);
				console.log(error);
				showServiceUnavailableError();
			})
			.always(function() {
				$btn.removeClass('loading');
			});
	}

	function saveEditFeature(id, feature_data) {
		$('#edit-feature-btn').addClass('loading');
		updateFeatureData(id, feature_data)
			.done(function(data) {
				console.log('done updating with data', data);
				hideEditFeatureModal();
				window.location.reload();
			})
			.fail(function(error) {
				console.log('fail to save edit link with error', error);
				hideEditFeatureModal();
				showServiceUnavailableError();
			})
			.always(function() {
				$('#edit-feature-btn').removeClass('loading');
			});
	}

	function addLink($modal) {
		var links_markup =
			'<tr class="feature-link">' +
			'<td><div class="form-group"><input type="text" class="form-control" name="env" value="" required /></div></td>' +
			'<td><div class="form-group"><input type="url" class="form-control" name="url" value="" required /></div></td>' +
			'</tr>';

		$modal.find('.links-placeholder').append(links_markup);
	}

	function showServiceUnavailableError() {
		$('#service-unavailable-modal').modal('show');
	}

	function showEditFeatureModal(data) {
		var $edit_link_modal = $('#edit-feature-modal'),
			feature_data = data.features[0];

		populateEditLinkForm(feature_data);

		$edit_link_modal.modal('show');
	}

	function hideEditFeatureModal() {
		$('#edit-feature-modal').modal('hide');
	}

	function populateEditLinkForm(feature_data) {
		var categories = feature_data.categories,
			links = feature_data.links,
			links_markup = '';

		$('.edit-feature-form [name="id"]').val(feature_data._id);
		$('.edit-feature-form [name="desc"]').val(feature_data.name);

		$('.edit-feature-form [name="category"]').prop('checked', false);
		$.each(categories, function(index, category) {
			$('.edit-feature-form [name="category"]#category-' + category).prop('checked', true);
		});

		$('.edit-feature-form .links-placeholder .feature-link').remove();
		$.each(links, function(index, link) {
			links_markup +=
				'<tr class="feature-link">' +
				'<td><div class="form-group"><input type="text" class="form-control" name="env" value="' +
				link.env +
				'" required /></div></td>' +
				'<td><div class="form-group"><input type="url" class="form-control" name="url" value="' +
				link.url +
				'" required /></div></td>' +
				'</tr>';
		});
		$('.edit-feature-form .links-placeholder').append(links_markup);
	}

	/*
	* @Integration
	*/
	function postFeatureData(feature_details) {
		var defer = $.Deferred();

		$.ajax({
			method: 'POST',
			url: '/api/feature',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(feature_details),
			cache: false,
			dataType: 'json',
			success: function(data) {
				defer.resolve(data);
			},
			error: function(error) {
				defer.reject(error);
			}
		});

		return defer.promise();
	}

	function retrieveFeatureData(feature_id) {
		var defer = $.Deferred();

		$.getJSON('/api/feature/id/' + feature_id)
			.done(function(data) {
				defer.resolve(data);
			})
			.fail(function(error) {
				defer.reject(error);
			});

		return defer.promise();
	}

	function updateFeatureData(feature_id, feature_details) {
		var defer = $.Deferred();

		$.ajax({
			method: 'PUT',
			url: '/api/feature/id/' + feature_id,
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(feature_details),
			cache: false,
			dataType: 'json',
			success: function(data) {
				defer.resolve(data);
			},
			error: function(error) {
				defer.reject(error);
			}
		});

		return defer.promise();
	}
})();
