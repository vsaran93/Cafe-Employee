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