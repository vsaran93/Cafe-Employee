export const API_URL = process.env.REACT_APP_API_URL;

export const header = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const displayOptions = (cafes) => {
    if (cafes && cafes.length > 0) {
        return cafes.map((cafe) => (
            <option key={cafe.id} value={cafe.id}>{cafe.name}</option>
        ))
    }
};

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validateCreateEmployee = (employee) => {
    let isValid = true;
    let errors = {};
    if (!employee.name) {
        isValid = false;
        errors.name = "Please enter the name";
    }
    if (!employee.emailAddress || !validateEmail(employee.emailAddress)) {
        isValid = false;
        errors.emailAddress = "Please enter a valid email";
    }
    if (!employee.phoneNumber || employee.phoneNumber.length !== 8) {
        isValid = false;
        errors.phoneNumber = "Please enter a valid phone number";
    }
    if (!employee.gender) {
        isValid = false;
        errors.gender = "Please select the gender";
    }
    if (!employee.cafeId) {
        isValid = false;
        errors.cafeId = "Please select the assigned cafe";
    }
    return {
        isValid,
        errors
    }
}