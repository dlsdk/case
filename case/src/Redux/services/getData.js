import axios from "axios";
export const httpGetRequest = (url, params) => {
    return axios.get(url, { params})
        .then(response => response.data.articles)
        .catch(error => {
            throw error;
        });
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register/', formData);
        if (response.status === 200) {
            return response;
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
