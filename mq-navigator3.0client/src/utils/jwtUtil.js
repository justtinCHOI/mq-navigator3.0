import axios from "axios";
import {getCookie, setCookie} from "./cookieUtil";
import {API_SERVER_HOST} from "../api/todoApi";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {
    //해더에 accessToken 파라미터에 refreshToken 을 넣어서 요청한다..

    const host = API_SERVER_HOST

    const header = {headers: {"Authorization": `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    return res.data
}

//요청을 보낼시 동작
const beforeReq = (config) => {
    const memberInfo = getCookie("member")

    if (!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject({
            response: {
                data: {error: "REQUIRE_LOGIN"}
            }
        })
    }
    const {accessToken} = memberInfo

    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

//요청에 실패 했을 시에 동작
const requestFail = (err) => {
    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    //'ERROR_ACCESS_TOKEN'
    const data = res.data

    if (data && data.error === 'ERROR_ACCESS_TOKEN') { //에러가 발생한다면? (token 문제)

        //쿠키에서 refreshToken 을 가져와서 새로운 token 을 생성
        // 사용자가 axios 요청을 하고 에러가 발생할 떄마다 갱신된 값을 다시 저장
        const memberCookieValue = getCookie("member")

        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member", JSON.stringify(memberCookieValue), 1)

        //원래의 호출 을 accessToken 을 header 에 넣어서 다시 요청
        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)

    }

    return res
}

//fail response
const responseFail = (err) => {
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)

jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios
