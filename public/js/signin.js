
const signinForm = document.querySelector('#sigin-form');
const githubBtn = document.querySelector('.btn.github');

function handleSubmit(event) {
    event.preventDefault();
    // 表单提交数据
    const email = signinForm.querySelector('[name="email"]').value;
    const password = signinForm.querySelector('[name="password"]').value;
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            login_id: 'login_id_123123123',
            channel: 'email',
            login_info: {password, email}
        })
    };
    fetch('./api/signin', requestOptions)
    .then(response => response.json())
    .then(({msg, errno}) => {
        if (errno === 0) {
            alert('登录成功');
            window.location.href = './select';
        }
        else {
            alert('登录失败' + msg);
        }
    });
}

// github登入点击按钮跳转github登录授权页面
githubBtn.addEventListener('click', function(e) {
    // 需要在github新建github授权登入的app，才能获取到client_id https://github.com/settings/developers
    const client_id = 'f391bdfda18c5fdd0e8c';
    location.href = [
        `https://github.com/login/oauth/authorize?client_id=${client_id}`,
        'scope=user:email',
        // 上线后，回调地址需要同步更新
        'redirect_uri=' + encodeURIComponent('http://x.baidu.com:8800/github_signin'),
    ].join('&');
});
