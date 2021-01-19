const search_btn = document.querySelector('.search'),
    search_input = document.querySelector('.form-control'),
    user = document.querySelector('#user'),
    repos = document.querySelector('#repos')

search_btn.addEventListener('click', () => {
    window.location.hash = '';
    let inp = search_input.value;
    repos.innerHTML = '';
    (async () => {
        let githubResponseUser = await fetch(`https://api.github.com/users/${inp}`);
        let githubUser = await githubResponseUser.json();
        user.innerHTML = render('user', githubUser);
    })();
});

// событие изменения хеша для отображения определенного пользователя или репозитория
window.addEventListener('hashchange', () => {
    (async () => {
        repos.innerHTML = '';
        if (location.hash.slice(1).split('/').length > 1) {
            let githubResponseCommit = await fetch(`https://api.github.com/repos/${location.hash.slice(1)}/commits`);
            let githubCommit = await githubResponseCommit.json();

            let githubResponseContr = await fetch(`https://api.github.com/repos/${location.hash.slice(1)}/contributors`);
            let githubContr = await githubResponseContr.json();
            console.log(githubContr);
            user.innerHTML = render('commit', githubCommit);
            repos.innerHTML = render('contr', githubContr);
            console.log(githubCommit);
            document.querySelectorAll('.contributers').forEach((contributer, i = 0) => {
                if (i > 2) {
                    contributer.style.cssText = 'display: none';
                }
                i++;
            });
            document.querySelector('.all_contr').addEventListener('click', () => {
                document.querySelectorAll('.contributers').forEach((contributer) => {
                    contributer.style.cssText = 'display: block';
                });
            });
        } else {
            let githubResponseRepos = await fetch(`https://api.github.com/users/${location.hash.slice(1)}/repos`);
            let githubRepos = await githubResponseRepos.json();
            repos.innerHTML = render('repos', githubRepos);
        }

    })();
});

// Функция рендера данных, выводящая данные с помощью библеотеки Handlebars
function render(templateName, data) {
    templateName = templateName + 'Template';

    const templateElement = document.getElementById(templateName);
    const templateSource = templateElement.innerHTML;
    const renderFn = Handlebars.compile(templateSource);

    return renderFn(data);
}