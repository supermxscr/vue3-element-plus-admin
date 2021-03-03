import Mock from "mockjs"
const Random = Mock.Random;
const listData = function () {
    let articles = [];
    for (let i = 0; i < 40; i++) {
        let newArticleObject = {
            id: i + 1,
            title: Random.title(3, 5),
            name: Random.cname(),
            date: Random.date() + ' ' + Random.time()
        }
        articles.push(newArticleObject)
    }
    return {
        data: articles,
        total: articles.length
    }
}
Mock.mock('list', 'get', listData)
const selectData = function () {
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            id: i + 1,
            label: Random.title(3, 5),
            value: Random.cname()
        }
        articles.push(newArticleObject)
    }
    return articles
}
Mock.mock('select', 'get', selectData)

const pagelistData = function () {
    let articles = [];
    for (let i = 0; i < 20; i++) {
        let newArticleObject = {
            id: i + 1,
            authority: Random.title(3, 5),
            pageName: Random.cname(),
            create_time: Random.date() + ' ' + Random.time(),
            update_time: Random.date() + ' ' + Random.time()
        }
        articles.push(newArticleObject)
    }
    return {
        data: articles,
        total: articles.length
    }
}
Mock.mock('/api/system/pages', 'get', pagelistData)

const pagesData = function () {

    let arr = '[["about"]]'
    return {
        data: arr
    }
}
Mock.mock('/api/access', 'get', pagesData)

const userlistData = function () {
    let articles = [];
    for (let i = 0; i < 5; i++) {
        let newArticleObject = {
            id: i + 1,
            username: Random.cname(),
            account: Random.title(3, 5),
            password: '123456',
            create_time: Random.date() + ' ' + Random.time(),
            update_time: Random.date() + ' ' + Random.time()
        }
        articles.push(newArticleObject)
    }
    return {
        data: articles,
        total: articles.length
    }
}
Mock.mock('/api/system/user', 'get', userlistData)

Mock.setup({
    timeout: 400
})