import {Cookies} from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name, value, days) => { // 이름 값 보관기한

    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days)

    return cookies.set(name, value, {path: '/', expires: expires}) // path : 쿠키 사용 url

}

export const getCookie = (name) => {

    return cookies.get(name)

}

export const removeCookie = (name, path = "/") => {
    //어느 경로의 쿠키를 지울 것인지
    //없다면 '/'경로를 사용하겠다.
    cookies.remove(name, {path})
}
