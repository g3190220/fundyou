import cookie from 'react-cookies'



// 用户登录，保存cookie
export const onLogin = (user) => {
  cookie.save('member_id', user.member_id, { path: '/' })
  cookie.save('member_name', user.member_name, { path: '/' })
  cookie.save('member_email', user.member_email, { path: '/' })//@編碼有問題
  cookie.save('member_login_status', user.member_login_status, { path: '/' })
  cookie.save('member_session',user.member_session, { path: '/' })
}

export const load_cookies = (value) =>{
  return cookie.load(value)
}

//比較基金用的
export const compare_fund_id = (value) =>{
  cookie.save('fund_id_1',value[0])
  cookie.save('fund_id_2',value[1])
  cookie.save('fund_id_3',value[2])
}

// 用户登出，删除cookie
export const logout_deletecookie = () => {
    cookie.remove('member_id')
    cookie.remove('member_name')
    cookie.remove('member_email')
    cookie.remove('member_login_status')
    cookie.remove('member_session')
    cookie.remove('fund_id_1')
    cookie.remove('fund_id_2')
    cookie.remove('fund_id_3')
    //window.location.href = '/index'
}
