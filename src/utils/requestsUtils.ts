import { camelToSnake } from "./objectFormatters";

export const sendPatchRequest = async (url: string, data: any): Promise<any> => {
  const formattedData = camelToSnake(data);
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  };

export const sendPostRequest = async (url: string, data: any): Promise<any> => {
  const formattedData = camelToSnake(data)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const sendDeleteRequest = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
