import React, { Component, Fragment } from 'react';
import Button from '@mui/material/Button';

class ActionCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.editClickedHandler = this.editClickedHandler.bind(this);
      this.deleteClickHandler = this.deleteClickHandler.bind(this);
    }
    editClickedHandler(e) {
     this.props.edit(this.props);
    }
    deleteClickHandler() {
      this.props.delete(this.props);
    }
    render() {
      return (
          <Fragment>
              <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "space-between" }}>
                <Button variant="outlined" onClick={this.editClickedHandler}>Edit</Button>
                <Button  variant="outlined" color="error" onClick={this.deleteClickHandler}>Delete</Button>
              </div>
          </Fragment>
      )
    }
}

export default ActionCellRenderer;