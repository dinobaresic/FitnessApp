const API_URL = 'http://localhost:8080'; // Correct base URL

export const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/user`);  // Correct endpoint here
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
};

 export const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to create user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };