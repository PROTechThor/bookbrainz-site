/*
 * Copyright (C) 2015  Ohm Patel
 *               2016  Sean Burke
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as bootstrap from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';


const {Table} = bootstrap;

function SearchResults(props) {
	const noResults = !props.results || props.results.length === 0;
	if (noResults) {
		return (
			<div className="col-md-6 col-md-offset-3">
				{'No results found'}
			</div>
		);
	}

	const results = props.results.map((result) => {
		// No redirect link for Area entity results
		const name = result.defaultAlias ? result.defaultAlias.name :
			'(unnamed)';
		const link = result.type === 'Area' ?
			`//musicbrainz.org/area/${result.bbid}` :
			`/${result.type.toLowerCase()}/${result.bbid}`;

		return (
			<tr key={result.bbid}>
				<td>
					<a href={link}>
						{name}
					</a>
				</td>
				<td>
					{result.type}
				</td>
			</tr>
		);
	});

	return (
		<div>
			<div style={{color: '#754e37',
				fontSize: 16,
				fontWeight: 'Bold',
				paddingLeft: 8}}
			>
				Search Results
			</div>
			<Table
				responsive
				className="table table-striped"
			>
				<thead>
					<tr>
						<th>Alias</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{results}
				</tbody>
			</Table>
		</div>
	);
}

SearchResults.displayName = 'SearchResults';
SearchResults.propTypes = {
	results: PropTypes.array
};
SearchResults.defaultProps = {
	results: null
};

export default SearchResults;
