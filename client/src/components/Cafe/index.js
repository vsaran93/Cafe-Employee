import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Header from '../Header';
import { getAllCafes } from '../../actions/cafeAction';
import ActionCellRenderer from '../ActionCellRender';


class Cafe extends Component {
    state = {
        rowData: [],
        columnDefs: [
            { field: "logo" },
            { field: "name" },
            { field: "description" },
            { field: "location", filter: 'agTextColumnFilter' },
            {
                headerName: 'Employees',
                valueGetter: function (params) {
                    const names = params.data.Employees.map(employee => employee.name).join(", ")
                    return names
                }
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
        selectedCafeName: ''
    };

    componentDidMount() {
        const { getAllCafes } = this.props;
        getAllCafes();
    }

    componentDidUpdate(preProps) {
        const { cafes } = this.props;
        if (preProps.cafes !== cafes) {
            this.setState({
                rowData: cafes
            })
        }
    }

    setSelectedCafeName = (params) => {
        if (params.colDef.headerName && params.colDef.headerName === 'Action') {
            return;
        }
        this.setState({ selectedCafeName: params.data.name });
    }

    render() {
        const { rowData, columnDefs, selectedCafeName } = this.state;

        if (selectedCafeName) {
            return <Navigate to={`/employee?cafeName=${selectedCafeName}`} />
        }

        return (
            <div>
                <Header />
                <Container maxWidth="false">
                    <Typography variant="h5" gutterBottom component="div">
                        Cafes
                    </Typography>
                    <div id="myGrid" className="ag-theme-alpine">
                        <div style={{ width: '100%', height: '100%' }}>
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                rowSelection="single"
                                onCellClicked={(e) => this.setSelectedCafeName(e)}
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
    cafes: state.cafe.cafes
});

const mapDispatchToProps = {
    getAllCafes
}

export default connect(mapStateToProps, mapDispatchToProps)(Cafe);
