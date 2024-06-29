const url = 'https://api.github.com/users';
const inputEl = document.getElementById('searchInput');
const searchEl = document.getElementById('search_btn');
const profileContainerEl = document.getElementById('profile_container');
const loadingEl = document.getElementById('loading'); 




const generateProfile = (profile) => {
        return ` 
        <div class="profile_box">
            <div class="top_section">
                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="My avatar">
                    </div>
                    <div class="self">
                        <h1>${profile.name}</h1>
                        <h1>${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary_btn">
                        Check Profile
                    </button>
                </a>
            </div>
            <div class="about">
                <h1>About</h1>
                <p>${profile.bio}</p>
            </div>
            <div class="status">
                <div class="status_item">
                    <h1>Followers</h1>
                    <h3>${profile.followers}</h3>
                </div>
                <div class="status_item">
                    <h1>Following</h1>
                    <h3>${profile.following}</h3>
                </div>
                <div class="status_item">
                    <h1>Repositories</h1>
                    <h3>${profile.public_repos}</h3>
                </div>
            </div>
        </div>
    `;

};
const fetchProfile = async () => {
        const username = inputEl.value;
        loadingEl.innerText = 'loading....';
        loadingEl.style.color = 'black';
        try {
                const res = await fetch(`${url}/${username}`);
                const data = await res.json();
                if (data.login) {
                        loadingEl.innerText = "";
                        profileContainerEl.innerHTML = generateProfile(data);
                } else {
                        loadingEl.innerHTML = data.message;
                        loadingEl.style.color = "red";
                        profileContainerEl.innerText = "";
                }
                console.log('data', data)
        } catch (error) {
                console.log({
                        error
                })
                loadingEl.innerText = "";
        }
};
searchEl.addEventListener("click", fetchProfile);