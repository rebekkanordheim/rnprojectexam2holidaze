export async function registerUser(name, email, password, avatarUrl) {
  const registerUrl = 'https://v2.api.noroff.dev/auth/register';

  try {
    const userData = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: avatarUrl
      }
    };

    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(registerUrl, postData);

    if (response.ok) {
      const data = await response.json();
      // Assuming you want to log the user in after registration
      await loginUser(email, password);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
}

export async function loginUser(email, password) {
  const loginUrl = 'https://v2.api.noroff.dev/auth/login';

  try {
    const loginData = {
      email: email,
      password: password,
    };

    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    };

    const response = await fetch(loginUrl, postData);

    if (response.ok) {
      const data = await response.json();
      const token = data.data.accessToken;

      // Store the token in local storage
      localStorage.setItem('jwtToken', token);

      console.log('Login successful. JWT token stored.');
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    throw new Error('Login failed. Please try again.');
  }
}