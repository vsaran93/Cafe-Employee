import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';

import Typography from '@mui/material/Typography';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';

import MainLayout from '../../Layouts/MainLayout';
import { getAllEmployees, createEmployee, deleteEmployee } from '../../actions/employeeAction';
import { setLoading } from '../../actions/spinnerAction';
import ActionCellRenderer from '../ActionCellRender';
import CreateEmployeeModal from '../Modals/CreateEmployeeModal';
import ConfirmModal from '../Modals/ConfirmModal';


const styles = {
    topContainer: {
        display: 'flex',
        marginTop: 15,
        marginBottom: 15,
        justifyContent: 'space-between'
    }
};

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            openConfirmModal: false,
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
            employee: {},
            selectedEmployeeId: ''
        };
    }
    

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

    handleInputChange = (e) => {
        const { employee } = this.state;
        employee[e.target.name] = e.target.value;
        this.setState(employee)
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

    render() {
        const { rowData, columnDefs, openCreateModal, openConfirmModal } = this.state;
        const { classes, isLoading } = this.props;
        // const queryParams = new URLSearchParams(window.location.search);
        // const cafeName = queryParams.get('cafeName');

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
                />
            </MainLayout>
        );
    };
}

const mapStateToProps = (state) => ({
    employees: state.employee.employees,
    isLoading: state.spinner.isLoading
});

const mapDispatchToProps = {
    getAllEmployees,
    createEmployee,
    deleteEmployee,
    setLoading
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Employee));
