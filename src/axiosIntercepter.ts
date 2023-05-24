import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {tokenAtom} from './atoms/atom';
import {EToken} from './app.constant';

const instance = axios.create({
    // baseURL: '',
    // timeout: 1000,
});

instance.interceptors.request.use(
    (config: any) => {
        // const token = useRecoilValue(tokenAtom);
        const accessToken = sessionStorage.getItem(EToken.ACCESS_TOKEN);

        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    (error: any) => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: any) => {
        if (response.status === 404) {
            console.log('404 페이지로 넘어가야 함!');
        }

        return response;
    },
    async (error: any) => {
        if (error.response?.status === 401) {
            // if (isTokenExpired()) await tokenRefresh();

            // const token = useRecoilValue(tokenAtom);
            // const accessToken = getToken();
            const accessToken = sessionStorage.getItem(EToken.ACCESS_TOKEN);

            error.config.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            };

            const response = await axios.request(error.config);
            return response;
        }
        return Promise.reject(error);
    }
);

export default instance;
