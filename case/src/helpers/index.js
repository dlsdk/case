export const profileItems = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Email', key: 'email' },
    { label: 'Location', key: 'location' },
    { label: 'Username', key: 'username' },
];

export const formData = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'username', label: 'Username' }
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
        rules: [
            ({ getFieldValue }) => ({
                validator(_, value) {
                    const newPassword = getFieldValue('newPassword');
                    if (newPassword && value && newPassword !== value) {
                        return Promise.reject(new Error('The two passwords do not match!'));
                    }
                    return Promise.resolve();
                },
            }),
        ],
        type: 'password',
    },
];

