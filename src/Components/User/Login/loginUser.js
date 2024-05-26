/* 
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
        const userName = data.data.name; // Extracting the user's name from the response
        
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userName', userName); // Storing the user's name in local storage
  
        console.log('Login successful. JWT token and user name stored.');
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  }
   */
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
        const userName = data.data.name; // Extracting the user's name from the response
        const imageUrl = data.data.avatar.url; // Extracting the image URL from the response
  
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userName', userName); // Storing the user's name in local storage
        localStorage.setItem('imageUrl', imageUrl); // Storing the image URL in local storage
  
        console.log('Login successful. JWT token, user name, and image URL stored.');
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  }
  