import card1_hero from '../../assets/protected/iphone.jpg';
import card2_hero from '../../assets/protected/ipad.jpg';
import card3_hero from '../../assets/protected/android.jpg';
import app_store_btn from '../../assets/protected/appstore-btn.png';
import google_play_btn from '../../assets/protected/android-btn.png';
import app_store_btn_dark from '../../assets/protected/appstore-btn-dark.png';
import google_play_btn_dark from '../../assets/protected/android-btn-dark.png';

export const protectedData = {
    title: 'DOWNLOAD THE ARAZON APP',
    descr: 'Get more than 850 brands straight to your pocket with the ARAZON app, available on iOS and Android. Perks include exclusive app-only discounts (!), back-in-stock notifications and easier, speedier ways to pay. Plus, you can create shareable Boards and send your wishlists to your friends, or use Style Match to search for outfits via photos. Download now and turn on your push notifications for all the latest ARAZON intel! Best (free) investment ever? We think so.'
}

export const cards = [
    {title: 'iPhone / iPod Touch', hero: card1_hero, pathname: 'https://www.apple.com/store', app_button: app_store_btn, app_button_dark: app_store_btn_dark},
    {title: 'iPad / iPad Mini', hero: card2_hero, pathname: 'https://www.apple.com/store', app_button: app_store_btn, app_button_dark: app_store_btn_dark},
    {title: 'Android Phone / tablet', hero: card3_hero, pathname: 'https://play.google.com/', app_button: google_play_btn, app_button_dark: google_play_btn_dark},
]