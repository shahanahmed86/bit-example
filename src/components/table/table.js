/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { tableHeaderStyles } from './tableStyles';
// import { getPagination } from 'Helpers/Shared/Functions';
// import {
// 	EditIcon,
// 	ActivationToggleSwitch,
// 	SwitchToggleHeader,
// 	DeleteActionButton,
// 	CheckBoxHeader,
// 	TargetMediaHeader
// } from 'styles/TabActionIcons';
// import { reactAppGridPageSize } from 'Constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'react-table/react-table.css';

export default function ReactTableComponent({
	componentName,
	data,
	filters,
	setFilters,
	count,
	setCurrentPage,
	isActiveColumn,
	isActiveToggler,
	isActiveToggleAction,
	editButton,
	deleteButton,
	deleteButtonAction,
	columns,
	ActionChild,
	currentRoute,
	hasHeaderFilter,
	headerFilter,
	actionColumn,
	getTableRowProps,
	checkBoxColumn,
	checkBoxAttributes,
	mediaBoxColumn,
	mediaBoxAttributes
}) {
	const [current_page, set_current_page] = useState(0),
		[total_pages, set_total_pages] = useState(1),
		[table_columns, set_table_columns] = useState(columns),
		[page_count] = useState(1);

	// useEffect(() => {
	// 	set_total_pages(getPagination(count, page_count));
	// }, [data, page_count, count]);

	useEffect(() => {
		const _columns = [...columns];
		// if (isActiveColumn) _columns.push({ ...SwitchToggleHeader({ id: 'is_active' }) });
		// if (checkBoxColumn) _columns.push({ ...CheckBoxHeader({ ...checkBoxAttributes }) });
		// if (mediaBoxColumn) _columns.push({ ...TargetMediaHeader({ ...mediaBoxAttributes }) });
		if (actionColumn) _columns.push({ ...getActionColumns });
		set_table_columns(_columns);
	}, [columns]);

	useEffect(() => {
		setCurrentPage(current_page);
	}, [current_page]);

	// TODO width needs to called from the same dimentions file so its not inline.
	const getActionColumns = {
		Header: <p style={tableHeaderStyles()}>Action</p>,
		id: 'actions',
		width: 150,
		accessor: (d) => (
			<div className='react-table-action-column-body'>
				{/* {isActiveToggler && (
					<ActivationToggleSwitch
						componentName={componentName}
						is_active={d.is_active}
						performAction={() => isActiveToggleAction(d)}
					/>
				)}
				{editButton && <EditIcon route={`${currentRoute}/edit/${d.id}`} />}
				{deleteButton && (
					<DeleteActionButton componentName={componentName} performAction={() => deleteButtonAction(d.id)} />
				)} */}
				{ActionChild ? ActionChild(d) : null}
			</div>
		),
		filterable: false
	};

	return (
		<Fragment>
			{hasHeaderFilter && headerFilter}
			<ReactTable
				data={data}
				filterable
				pageSize={page_count}
				showPageSizeOptions={false}
				manual
				page={current_page}
				pages={total_pages}
				filtered={filters}
				getTrProps={
					getTableRowProps
						? getTableRowProps
						: () => {
								return {};
						  }
				}
				onPageChange={(pageIndex) => set_current_page(pageIndex)}
				onFilteredChange={(filters) => {
					set_current_page(0);
					setFilters(filters);
				}}
				defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
				columns={table_columns}
				defaultPageSize={page_count}
				className='-striped -highlight'
			/>
		</Fragment>
	);
}

ReactTableComponent.propTypes = {
	componentName: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	filters: PropTypes.arrayOf(PropTypes.string.isRequired),
	setFilters: PropTypes.func.isRequired,
	count: PropTypes.number,
	setCurrentPage: PropTypes.func.isRequired,
	isActiveColumn: PropTypes.bool,
	isActiveToggler: PropTypes.bool,
	isActiveToggleAction: PropTypes.func.isRequired,
	editButton: PropTypes.bool,
	deleteButton: PropTypes.bool,
	deleteButtonAction: PropTypes.func.isRequired,
	columns: PropTypes.arrayOf(PropTypes.object),
	ActionChild: PropTypes.func,
	currentRoute: PropTypes.string.isRequired,
	hasHeaderFilter: PropTypes.bool,
	headerFilter: PropTypes.element,
	actionColumn: PropTypes.bool,
	getTableRowProps: PropTypes.arrayOf(PropTypes.object),
	checkBoxColumn: PropTypes.bool,
	checkBoxAttributes: PropTypes.arrayOf(PropTypes.object),
	mediaBoxColumn: PropTypes.bool,
	mediaBoxAttributes: PropTypes.arrayOf(PropTypes.object)
};

ReactTableComponent.defaultProps = {
	data: [],
	filters: [],
	count: 0,
	isActiveColumn: true,
	isActiveToggler: true,
	editButton: true,
	deleteButton: true,
	columns: [],
	hasHeaderFilter: false,
	headerFilter: null,
	actionColumn: true,
	getTableRowProps: undefined,
	checkBoxColumn: false,
	checkBoxAttributes: {},
	mediaBoxColumn: false,
	mediaBoxAttributes: {},

	// should delete it afterwards
	setFilters: () => {},
	setCurrentPage: () => {},
	ActionChild: () => {}
};
