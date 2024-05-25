export async function loginUser(email, password) {
    const loginUrl = 'https://v2.api.noroff.dev/auth/login';

    try {
        const loginData = {
            email: email,
            password: password,
        };

        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.accessToken;

            localStorage.setItem('jwtToken', token);
            console.log('Login successful. JWT token stored.');
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login', error);
        throw new Error('Login failed. Please try again.');
    }
}
