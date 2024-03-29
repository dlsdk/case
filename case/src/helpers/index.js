
export const profileItems = [
    { name: 'fullName', label: 'Full Name', key: 'fullName' },
    { name: 'username', label: 'Username', key: 'username' },
    { name: 'email', label: 'Email', key: 'email' },
    { name: 'location', label: 'Location', key: 'location' },
    { name: 'mobile',label: 'Mobile', key: 'mobile' },
];

export const formData = [
    { name: 'fullName', key: 'fullName', label: 'Full Name' },
    { name: 'username', key: 'username', label: 'Username' },
    { name: 'email', key: 'email', label: 'Email', rules: [{ type: 'email', message: 'Please enter a valid email' }] },
    { name: 'location', key: 'location', label: 'Location'},
    { name: 'mobile', key: 'mobile', label: 'Mobile', rules: [{ pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' }] },
];

export const passwordChangeFormFields = [
    {
        label: 'New Password',
        name: 'newPassword',
        type: 'password',
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        dependencies: ['newPassword'],
        rules: [
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ],
    },
];

export const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}


