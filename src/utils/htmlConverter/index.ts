const htmlConverter = (state?: string[] | any) => {
  const todos: string[] = [];
  for (let i = 0; i < state?.length; i++) {
    todos.push(
      `<img alt="" class="lzy_img" src="https://svgshare.com/i/RGF.svg" data-src="${state[i]}" />`,
    );
  }
  return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Westmanga</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <style>
                        body {
                            padding-top: 60px;
                            padding-left: 5px;
                            padding-right: 5px;
                            padding-bottom: 60px;
                            margin:0;
                            background-color: transparent;
                        }

                        img {
                            height: 100%;
                            width: 100%;
                            image-rendering: high-quality;
                        }
                    </style>
                </head>
                <body>
                    ${todos.toString().replace(/(,)/gi, '')}
                <script>
                    document.addEventListener("DOMContentLoaded", function() {
                        const imageObserver = new IntersectionObserver((entries, imgObserver) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    const lazyImage = entry.target
                                    console.log("lazy loading ", lazyImage)
                                    lazyImage.src = lazyImage.dataset.src
                                    lazyImage.classList.remove("lzy_img");
                                    imgObserver.unobserve(lazyImage);
                                }
                            })
                        });
                        const arr = document.querySelectorAll('img')
                        arr.forEach((v) => {
                            imageObserver.observe(v);
                        })
                        document.body.addEventListener("click",() => {
                            window.ReactNativeWebView.postMessage("up")
                        })
                    })
                </script>
                </body>
            </html>
        `;
};

export default htmlConverter;
