import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import i18nPlugin from './plugins/i18n';

interface LocaleJSON {
	[key: string]: string;
}

(() => {
    const userLang = navigator.language;
    const userMainLang = userLang.split('-')[0].toLocaleLowerCase();
    import(`./locales/${userMainLang}.json`).then(rs => {
        const options = rs.default as LocaleJSON;
        createApp(App).use(i18nPlugin, options).use(store).mount('#app')
    }); 
})()


