export async function registerUser(formData) {
  const registerUrl = 'https://v2.api.noroff.dev/auth/register';

  try {
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: {
        url: formData.avatarUrl
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
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
}