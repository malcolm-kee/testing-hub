import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const PageNotFoundMessage = () => (
	<div>
		<Header />
		<div className="container">
			<div className="row">
				<div className="panel panel-danger">
					<div className="panel-heading">
						<h3 className="panel-title">Page Not Found</h3>
					</div>
					<div className="panel-body">
						<p className="text-xxlarge">Sorry, it seems like this page does not exists.</p>
						<Link to="/" className="btn btn-primary">
							Back to home page
						</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default PageNotFoundMessage;
