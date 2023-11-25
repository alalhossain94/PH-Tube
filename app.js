const apiHandle = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const suggestionContainer = document.getElementById("suggestion-container");
  
    const suggestData = data.data;
    suggestData.forEach((element) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="nav border-0  nav-tabs">
      <button onclick="handleApiContent('${element.category_id}')" class="nav-link text-dark custom-hover fw-bold text-info-emphasis rounded-pill ">${element.category}</button>
      </div>
      `;
      suggestionContainer.appendChild(div);
    });
  };
  
  const handleApiContent = async (elementID) => {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${elementID}`
    );
    const data = await res.json();
    const videoContent = data.data;
    main = videoContent;
  
    contentDisplay(videoContent);
  };
  
  const contentDisplay = (videoContent) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const noContent = document.getElementById("no-content");
    noContent.innerHTML = "";

    if (videoContent.length !== 0) {
        videoContent.forEach((video) => {
            const second = video.others.posted_date;
            const hours = Math.floor(second / 3600);
            const minutes = Math.floor((second - hours * 3600) / 60);

            const div = document.createElement("div");
            div.className = "col-lg-3 col-md-6 mb-4";

            div.innerHTML = `

            <div class="container">
                <div class="row justify-content-center">
                    <figure>
                        <div class = "card position-relative">
                            <img class="img-fluid rounded-md" style="width: 250px; height:160px;"  src=${ video.thumbnail ? video.thumbnail : "image not found"} class="card-img-top rounded-md" alt="Loading...." />
          
                        <div class="position-absolute end-0 bottom-0 text-white me-2 mb-1 p-1">       
                           <p class="bg-dark px-2 rounded-md text-light">${video.others.posted_date? hours + "hrs " + minutes + "mins ago": ""} </p>
                            </div>
                        </div>      
                    </figure>

                    <div class="d-flex align-items-center">
                        <img src="${video.authors[0].profile_picture}" alt="Loading...." class="custom-size mb-5 rounded-circle">
                        <div class="ms-2 align-items-center">
                            <h2 class="fs-6 fw-bold">${video.title}</h2>
                            <h2 class="fs-6 fw-normal">${video.authors[0].profile_name}<span></span></h2>
                            <div class="d-flex align-items-center gap-2">
                                <h2 class="fs-6 fw-normal">${video.others.views} views</h2>
                                <p>${video.authors[0].verified ? '<img src="verified.png" alt="verified-image">' : ''}</p>
                            </div>
                        </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(div);
        });
    } else {
        const div = document.createElement("div");
        div.className = "mt-10";
        div.innerHTML = `
            <div class="text-center">
                <img src="icon.png" />
            </div>
            <h3 class="fw-bold text-center display-6">Oops!! Sorry, There is no<br> content here</h3>
        `;
        noContent.appendChild(div);
    }
};
  
  const sortView = () => {
    const sortedData = main.sort((a, b) => {
      const num1 = parseInt(a.others.views);
      const num2 = parseInt(b.others.views);
      return num2 - num1;
    });
    contentDisplay(sortedData);
  };
  
  handleApiContent("1000");
  apiHandle();
  