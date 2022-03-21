import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { getAllCafes } from '../actions/cafeAction';


class Cafe extends Component {
    state = {
        rowData: [],
        columnDefs: [
            { field: "logo" },
            { field: "name" },
            { field: "description" },
            { field: "location" },
        ]
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
        console.log(rowData);
        return (
            <div>
                <div id="myGrid" className="ag-theme-alpine">
                    <div style={{ width: '100%', height: '100%' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}>
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
