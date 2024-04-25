export const sendPatchRequest = async (url: string, data: any): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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