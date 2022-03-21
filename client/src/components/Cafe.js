import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { getAllCafes } from '../actions/cafeAction';
import { Navigate } from 'react-router-dom';


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
            }
        ],
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

    render() {
        const { rowData, columnDefs } = this.state;
        return (
            <div>
                <div id="myGrid" className="ag-theme-alpine">
                    <div style={{ width: '100%', height: '100%' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            rowSelection="single"
                            onCellClicked={(e) => <Navigate to={`/employees?cafeName=${e.data.name}`} />}
                        >
                        </AgGridReact>
                    </div>
                </div>
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
