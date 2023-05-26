import axios from 'axios';

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    // Post請求
    const { data } = await axios.post(`${authUrl}/login`, {
      // API 請求的資料
      username,
      password,
    });
    // axios({
    //   method: 'post',
    //   url: `${authUrl}/login`,
    //   data: {
    //     uername: "",
    //     password: ""
    //   }
    // });
    // console.log(data);

    const { authToken } = data;
    // Login Success
    if (authToken) {
      return { success: true, ...data };
    }
    // Login Failed
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    // Post請求
    const { data } = await axios.post(`${authUrl}/register`, {
      username,
      email,
      password,
    });
    // axios({
    //   method: 'post',
    //   url: `${authUrl}/login`,
    //   data: {
    //     uername: "",
    //     email: "",
    //     password: ""
    //   }
    // });
    // console.log(data);

    const { authToken } = data;
    // Login Success
    if (authToken) {
      return { success: true, ...data };
    }
    // Login Failed
    return data;
  } catch (error) {
    console.error('[Register Failed]:', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    // 用success屬性告知true/false
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
