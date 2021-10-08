var univList = []

async function pushUniversitiesList()
{
    let list = document.getElementById("universities-list");
    
    await getUniversities().then(data => {
        for (const key in data) {
            univList.push([data[key].name, data[key].web_pages[0]])
        }
    })

    univList.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = item[0] + "<br>" + "Website: <a target='_blank' href='" + item[1] + "'>" + item[0] + "</a>"
        li.classList.add("list-group-item");
        list.appendChild(li);
    });

}

function getUniversities()
{
    let data = fetch("http://universities.hipolabs.com/search?country=Indonesia")
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.error(err);
    });

    return data;
}

function searchUniversities()
{   
    let searchList = []
    input = document.getElementsByTagName("input")[0].value;

    searchList = univList.filter((item) => {
       return item[0].toLowerCase().includes(input.toLowerCase())
    })  

    // console.log(searchList)
    return updateUniversitiesList(searchList);
}

function updateUniversitiesList(searchList)
{
    let list = document.getElementById("universities-list");

    let child = list.lastElementChild;

    while (child) {
        list.removeChild(child);
        child = list.lastElementChild;
    }

    searchList.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = item[0] + "<br>" + "Website: <a target='_blank' href='" + item[1] + "'>" + item[0] + "</a>"
        li.classList.add("list-group-item");
        list.appendChild(li);
    });
}


