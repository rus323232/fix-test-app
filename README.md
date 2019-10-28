# fix-test-app

## Задание

Верстка:
- Сверстать список новостей, по возможности, придерживаясь методологии БЭМ.
- Для стилей использовать LESS или SASS.

JS:
- Сделать вывод новостей. Используя фреймворкиVue 2.* + NUXT (1 или 2)
- Для получения новостей использовать FAKE Api (Описать JSON) или реализовать метод получения заранее описанного JSON (В любом удобном формате. Должен содержать все поля для реализации страницы с макета)

Дополнительно:
- Адаптив для верстки.
- Фильтрация статей по типу (Новости, блог и тд.)
- Подгрузка новых постов по кнопке “Загрузить еще”
- Детальная страница новости, с полным текстом. Дизайн не прилагается.

## Описание

Задачу выполнил используя стек vue + nuxt
Для моков выбрал сервис https://www.mockapi.io/.
Дополнительно прикрутил auto-deploy на heroku, рабочую версию приложения можно 
увидеть тут https://young-meadow-37416.herokuapp.com/.
Так же прикрутил обработку ошибок сервера и вывод flush сообщений.
Макет пришлось перегнать в sketch, так как небыло возможности достать нормальную версию
Photoshop для mac, по этому могут быть небольшие несоответствия в отступах между блоками.

## Сборка

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

