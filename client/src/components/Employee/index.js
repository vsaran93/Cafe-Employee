import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';

import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';


import MainLayout from '../../Layouts/MainLayout';
import CafeFilter from '../Filter/CafeFilter';
import { availableCafes } from '../../actions/cafeAction';
import { getAllEmployees, createEmployee, deleteEmployee } from '../../actions/employeeAction';
import { setLoading } from '../../actions/spinnerAction';
import ActionCellRenderer from '../ActionCellRender';
import CreateEmployeeModal from '../Modals/CreateEmployeeModal';
import ConfirmModal from '../Modals/ConfirmModal';
import { validateCreateEmployee } from '../../utils/helper';


const styles = {
    topContainer: {
        display: 'flex',
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    filterContainer: {
        marginTop: 15,
        marginBottom: 15,
    }
};

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            openConfirmModal: false,
            columnDefs: [
                { field: "id", headerName: "Employee Id"},
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
                { field: "daysWorked", headerName: "Days worked in the cafe" },
                {
                    headerName: 'Action',
                    cellRenderer: 'actionCellRenderer',
                    cellRendererParams: {
                        edit: (params) => {
                            props.navigate(`/employee/edit/${params.data.id}`);
                        },
                        delete: (params) => {
                            this.handleOpenConfirmModal(params.data.id);
                        },
                    },
                }
            ],
            openCreateModal: false,
            employee: { gender: 'male' },
            selectedEmployeeId: '',
            formErrors: {},
            selectedCafe: '',
        };
        this.loadFilteredList = false;
    }
    

    componentDidMount() {
        const { getAllEmployees, availableCafes } = this.props;
        const queryParams = new URLSearchParams(window.location.search);
        const cafeName = queryParams.get('cafeName') || '';
        this.setState({ selectedCafe: cafeName });
        getAllEmployees();
        availableCafes()

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

    handleInputChange = (e) => {
        const { employee, formErrors } = this.state;
        employee[e.target.name] = e.target.value;
        formErrors[e.target.name] = '';
        this.setState({ employee, formErrors })
    };

    closeCreateModal = () => {
        this.setState({ openCreateModal: false })
    };

    openCreateModal = () => {
        this.setState({ openCreateModal: true });
    };

    handleAddEmployee = (e) => {
        const { employee } = this.state;
        const { createEmployee, setLoading, getAllEmployees } = this.props;
        e.preventDefault();
        const { isValid, errors } = validateCreateEmployee(employee);
        if (!isValid) {
            this.setState({ formErrors: errors });
            return;
        }
        setLoading();
        createEmployee(employee, () => {
            getAllEmployees();
            this.closeCreateModal();
        })
    };

    handleDeleteEmployee = (e) => {
        const { selectedEmployeeId } = this.state;
        const { deleteEmployee, getAllEmployees, setLoading } = this.props;
        e.preventDefault();
        setLoading();
        deleteEmployee(selectedEmployeeId, () => {
            getAllEmployees();
            this.handleOpenConfirmModal();
        });
    };

    handleOpenConfirmModal = (employeeId = null) => {
        const { openConfirmModal } = this.state;
        this.setState({ openConfirmModal: !openConfirmModal, selectedEmployeeId: employeeId });
    };

    onFilterTextChange = (e) => {
        this.setState({ selectedCafe: e.target.value });
        this.gridApi.setQuickFilter(e.target.value);
    };

    clearFilter = () => {
        this.setState({ selectedCafe: '' });
        this.gridApi.setQuickFilter('');
    }

    render() {
        const { rowData, columnDefs, openCreateModal, 
            openConfirmModal, formErrors, selectedCafe } = this.state;
        const { classes, isLoading, availableCafesList } = this.props;
       
        if(!this.loadFilteredList && this.gridApi && selectedCafe) {
            this.gridApi.setQuickFilter(selectedCafe);
            this.loadFilteredList = true;
        }

        return (
            <MainLayout>
                <div className={classes.topContainer}>
                    <Typography variant="h5" gutterBottom component="div">
                        Employees
                    </Typography>
                    <Button 
                        variant="contained"
                        onClick={this.openCreateModal}
                    >
                        Add Employee
                    </Button>
                </div>
                <div className={classes.filterContainer}>
                    <CafeFilter
                        cafes={availableCafesList}
                        selectedCafe={selectedCafe}
                        onFilterTextChange={this.onFilterTextChange}
                        clearFilter={this.clearFilter}
                    />
                </div>
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
                <ConfirmModal 
                    open={openConfirmModal}
                    closeModal={this.handleOpenConfirmModal}
                    handleDelete={this.handleDeleteEmployee} 
                    isLoading={isLoading}
                />
                <CreateEmployeeModal 
                    open={openCreateModal}
                    isLoading={isLoading}
                    closeModal={this.closeCreateModal}
                    handleInputChange={this.handleInputChange}
                    handleCreateEmployee={this.handleAddEmployee}
                    formErrors={formErrors}
                />
            </MainLayout>
        );
    };
}

const mapStateToProps = (state) => ({
    employees: state.employee.employees,
    isLoading: state.spinner.isLoading,
    availableCafesList: state.cafe.availableCafesList
});

const mapDispatchToProps = {
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    setLoading,
    availableCafes
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Employee));
