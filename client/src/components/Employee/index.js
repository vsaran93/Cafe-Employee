import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Header from '../Header';
import { getAllEmployees } from '../../actions/employeeAction';
import ActionCellRenderer from '../ActionCellRender';

class Employee extends Component {
    state = {
        rowData: [],
        columnDefs: [
            { field: "name" },
            { field: "emailAddress" },
            { field: "phoneNumber" },
            {
                field: 'Cafe',
                headerName: 'Cafe name',
                valueGetter: function (params) {
                    if (params.data.Cafe) {
                        return params.data.Cafe.name;
                    }
                },
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Action',
                cellRenderer: 'actionCellRenderer',
                cellRendererParams: {
                    edit: function() {
                        alert(`edit clicked`);
                    },
                    delete: function() {
                        alert(`delete clicked`);
                    },
                },
            }
        ],
    };

    componentDidMount() {
        const { getAllEmployees } = this.props;
        getAllEmployees();
    }

    componentDidUpdate(preProps) {
        const { employees } = this.props;
        if (preProps.employees !== employees) {
            this.setState({
                rowData: employees
            })
        }
    }

    onGridReady = (params) => {
        this.gridApi = params.api;
    }


    render() {
        const { rowData, columnDefs } = this.state;
        // const queryParams = new URLSearchParams(window.location.search);
        // const cafeName = queryParams.get('cafeName');

        return (
            <div>
                <Header />
                <Container maxWidth="false">
                    <Typography variant="h5" gutterBottom component="div">
                        Employees
                    </Typography>
                    <div id="myGrid" className="ag-theme-alpine">
                        <div style={{ width: '100%', height: '100%' }}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                rowSelection="single"
                                onGridReady={(params) => this.onGridReady(params)}
                                components={{
                                    actionCellRenderer: ActionCellRenderer
                                }}
                            >
                            </AgGridReact>
                        </div>
                    </div>
                </Container>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    employees: state.employee.employees
});

const mapDispatchToProps = {
    getAllEmployees
}


export default connect(mapStateToProps, mapDispatchToProps)(Employee);
