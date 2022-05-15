export const isActivated = (user) => {
    if(user.isAuth && !user.user.isActivated)
        alert('please confirm your email!!!');

}