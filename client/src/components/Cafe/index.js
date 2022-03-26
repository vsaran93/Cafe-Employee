import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { withStyles } from '@mui/styles';

import MainLayout from '../../Layouts/MainLayout';
import { getAllCafes, createCafe, deleteCafe } from '../../actions/cafeAction';
import { setLoading } from '../../actions/spinnerAction';
import ActionCellRenderer from '../ActionCellRender';
import ConfirmModal from '../Modals/ConfirmModal';
import CreateCafeModal from '../Modals/CreateCafeModal'; 


const styles = {
    topContainer: {
        display: 'flex',
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-between'
    }
};
class Cafe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            openCreateModal: false,
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
                      edit: function(params) {
                        props.navigate(`/cafe/edit/${params.data.id}`);
                      },
                      delete: (params) => {
                        this.openModal(params.data.id)
                      },
                    },
                }
            ],
            selectedCafeName: '',
            selectedCafeId: '',
            cafe: {},
        };
    }
    

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

    closeModal = () => {
        this.setState({ openModal: false, selectedCafeId: '' });
    };

    openModal = (cafeId) => {
        this.setState({ openModal: true, selectedCafeId: cafeId });
    };

    openCreateModal = () => {
        this.setState({ openCreateModal: true });
    };

    closeCreateModal = () => {
        this.setState({ openCreateModal: false });
    };


    handleInputChange = (e) => {
        const { cafe } = this.state;
        cafe[e.target.name] = e.target.value;
        this.setState({ cafe });
    };

    handleCreateCafe = (e) => {
        e.preventDefault();
        const { createCafe, setLoading, getAllCafes } = this.props;
        const { cafe } = this.state;
        setLoading(true);
        createCafe(cafe, () => {
            getAllCafes();
            this.closeCreateModal();
        });
    };

    handleDeleteCafe = (e) => {
        const { selectedCafeId } = this.state;
        const { deleteCafe, setLoading, getAllCafes } = this.props;
        e.preventDefault();
        setLoading(true);
        deleteCafe(selectedCafeId, () => {
            getAllCafes();
            this.closeModal();
        });
    };

    render() {
        const { rowData, columnDefs, selectedCafeName, openModal, openCreateModal } = this.state;
        const { classes, isLoading } = this.props;
        if (selectedCafeName) {
            return <Navigate to={`/employee?cafeName=${selectedCafeName}`} />
        }

        return (
            <MainLayout>
                <div className={classes.topContainer}>
                    <Typography variant="h5" gutterBottom component="div">
                        Cafes
                    </Typography>
                    <Button 
                        variant="contained"
                        onClick={this.openCreateModal}
                    >
                        Add Cafe
                    </Button>
                </div>
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
                <ConfirmModal 
                    open={openModal} 
                    closeModal={this.closeModal}
                    handleDelete={this.handleDeleteCafe} 
                    isLoading={isLoading}
                />
                <CreateCafeModal 
                    open={openCreateModal}
                    isLoading={isLoading}
                    closeModal={this.closeCreateModal}
                    handleInputChange={this.handleInputChange}
                    handleCreateCafe={this.handleCreateCafe}
                />
            </MainLayout>
        );
    };
}

const mapStateToProps = (state) => ({
    cafes: state.cafe.cafes,
    isLoading: state.spinner.isLoading
});

const mapDispatchToProps = {
    getAllCafes,
    createCafe,
    setLoading,
    deleteCafe
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cafe));
