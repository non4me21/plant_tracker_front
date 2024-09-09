import { camelToSnake } from "./objectFormatters";

export const sendPatchRequest = async (url: string, data: any): Promise<any> => {
  const formattedData = camelToSnake(data);
  console.log(formattedData)
  const formData = new FormData();
  for (let key of Object.keys(formattedData)) {
    const newKey = camelToSnake(key)
    formData.append(newKey, data[key]);
  }
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData
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
  const formattedData = camelToSnake(data);
  const formData = new FormData();
  for (let key of Object.keys(formattedData)) {
    const newKey = camelToSnake(key)
    formData.append(newKey, data[key]);
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
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
