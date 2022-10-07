function requestUserRepos(username, nbrRepo){
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;
    xhr.open('GET', url, true);
    xhr.onload = function () {
        const data = JSON.parse(this.response);
        const ul = document.getElementsByClassName('lang')[nbrRepo];
        console.log(data);

        var urlLang = `https://api.github.com/repos/${data[nbrRepo].owner.login}/${data[nbrRepo].name}/languages`;
        var xhrLang = new XMLHttpRequest();
        var small = false;
        xhrLang.open('GET', urlLang, true);
        xhrLang.onload = function () {
            const dataLang = JSON.parse(this.response);
            const percent = {}
            for(var i in dataLang){
                percent[i] = (dataLang[i]/Object.values(dataLang).reduce((a,b)=>a+b))*100;
                
            }
            for(var i in percent){
                if(percent[i] < 5){
                    percent[i] = 5;      
                    small = true
                }
                const li = document.createElement('li');
                if(i == "HTML"){
                    li.style.backgroundColor = "#e34c26";
                }
                if(i == "CSS"){
                    li.style.backgroundColor = "#563d7c";
                }
                if(i == "JavaScript"){
                    li.style.backgroundColor = "#f1e05a";
                }
                if(i == "PHP"){
                    li.style.backgroundColor = "#4F5D95";
                }
                if(i == "C#"){
                    li.style.backgroundColor = "#178600";
                }
                if(i == "C++"){
                    li.style.backgroundColor = "#f34b7d";
                }
                if(i == "C"){
                    li.style.backgroundColor = "#555555";
                }
                if(i == "Python"){
                    li.style.backgroundColor = "#3572A5";
                }
                if(i == "Java"){
                    li.style.backgroundColor = "#b07219";
                }
                if(i == "Shell"){
                    li.style.backgroundColor = "#89e051";
                }
                if(i == "TypeScript"){
                    li.style.backgroundColor = "#2b7489";
                }
                if(i == "Ruby"){
                    li.style.backgroundColor = "#701516";
                }
                if(i == "Go"){
                    li.style.backgroundColor = "#00ADD8";
                }
                if(i == "Rust"){
                    li.style.backgroundColor = "#dea584";
                }
                if(i == "Swift"){
                    li.style.backgroundColor = "#ffac45";
                }
                if(i == "Makefile"){
                    li.style.backgroundColor = "#427819";
                }

                li.style.height = `${percent[i]}%`;
                if(small){
                    li.setAttribute('data-before', `${i} <5%`);
                }else{
                    li.setAttribute('data-before', `${i} ${percent[i].toFixed(1)}%`);
                }
                ul.appendChild(li);
            }
        }
        xhrLang.send();


        let Name = document.getElementsByClassName("username")[nbrRepo];
        let RepoName = document.getElementsByClassName("repository")[nbrRepo];
        let RepoDesc = document.getElementsByClassName("p")[nbrRepo];
        let Pdp = document.getElementsByClassName("pic")[nbrRepo];
        let repoUrl = document.getElementsByClassName("repoUrl")[nbrRepo];
        let topics = document.getElementsByClassName("topics")[nbrRepo];


        Name.innerHTML = data[nbrRepo].owner.login;
        RepoDesc.innerHTML = data[nbrRepo].description;
        RepoName.innerHTML = "/"+data[nbrRepo].name;
        Pdp.src = data[nbrRepo].owner.avatar_url;
        repoUrl.href = data[nbrRepo].html_url;

        for(var i in data[nbrRepo].topics){
            const span = document.createElement('span');
            span.innerHTML = data[nbrRepo].topics[i];
            topics.appendChild(span);
        }
    }
    xhr.send();
}

for(var i = 0; i < 3; i++){
    requestUserRepos("LouvAndTech", i);
}