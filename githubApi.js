import {GithubAPI} from './private_token.js';

async function fetchData(obj){
    return fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': ('bearer '+GithubAPI),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query 
                {
                viewer {
                    login
                    name
                    #Repositories created by the viewer
                    repositories(first:100,privacy:PUBLIC,ownerAffiliations:OWNER) {
                        totalDiskUsage
                        edges{
                            node{
                                name
                                url
                                owner {
                                    login
                                    avatarUrl
                                }
                                description
                                updatedAt
                                languages(first:100){
                                    totalCount
                                    totalSize
                                    edges{
                                        size
                                        node{
                                            name
                                            color
                                        }
                                    }
                                }
                            }
                        }
                    }

                    #Repositories contributed to by the viewer
                    repositoriesContributedTo(
                    first: 100, 
                    contributionTypes: [COMMIT, PULL_REQUEST]) 
                    {
                    totalCount,
                    nodes {
                        name
                        owner {
                            login
                            avatarUrl
                        }
                        url,
                        description,
                        updatedAt
                        languages(first: 100){
                            totalCount,
                            totalSize,
                            edges{
                                size,
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                    }
                }
            }
            `
        }) 
    })
    .then(res => res.json())
    .then(data => {return data;})
}

async function fillTheList(data){
    var response = await fetchData(); 
    console.log(response);

    console.log("response.data.viewer.repositories.edges : ", response.data.viewer.repositories.edges);
    console.log("response.data.viewer.repositoriesContributedTo.nodes : ", response.data.viewer.repositoriesContributedTo.nodes);


    //fill and sort the owned repos
    for(var i in response.data.viewer.repositories.edges){
        data.owner.push(response.data.viewer.repositories.edges[i].node);
    }
    data.owner.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    })

    //Fill and sort the other repos
    for (var i in response.data.viewer.repositoriesContributedTo.nodes){
        data.other.push(response.data.viewer.repositoriesContributedTo.nodes[i]);
    }
    data.other.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
}


async function fillUserRepo(repo,nbrRepo){

    let Name = document.getElementsByClassName("username")[nbrRepo];
    let RepoName = document.getElementsByClassName("repository")[nbrRepo];
    let RepoDesc = document.getElementsByClassName("p")[nbrRepo];
    let Pdp = document.getElementsByClassName("pic")[nbrRepo];
    let repoUrl = document.getElementsByClassName("repoUrl")[nbrRepo];
    let topics = document.getElementsByClassName("topics")[nbrRepo];


    Name.innerHTML = repo.owner.login;
    RepoDesc.innerHTML = repo.description;
    RepoName.innerHTML = "/"+repo.name;
    Pdp.src = repo.owner.avatarUrl;
    repoUrl.href = repo.url;

    for(var i in data[nbrRepo].topics){
        const span = document.createElement('span');
        span.innerHTML = data[nbrRepo].topics[i];
        topics.appendChild(span);
    }
}


/* Start */ 
async function start(){
    //fetch the Data and fill the list
    var data = {
        owner : [],
        other : []
    };
    await fillTheList(data);
    
    //create html with the data
    for(var i = 0; i < 3; i++){
        fillUserRepo(data.owner[i], i);
        fillUserRepo(data.other[i], i+3);
    }
    
}

start();