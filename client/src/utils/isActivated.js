export const isActivated = (user) => {
    if(user.isAuth && !user.user.is_activated)
        alert('please confirm your email!!!');

}