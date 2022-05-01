<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >
    <meta
        http-equiv="X-UA-Compatible"
        content="ie=edge"
    >
    <title>Document</title>
    <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
        defer
    ></script>
</head>

<body>
    <div
        class="posts"
        x-data="{posts:[],loading:false}"
        x-init="
            loading=true;
            fetch('/posts')
            .then((res)=>res.json())
            .then((res)=>{
                posts = res
                loading = false;
            })
            "
    >
        <div
            class="loading"
            x-show="loading"
        >loading...</div>
        <template
            x-for="(post) in posts"
            x-show="!loading"
        >
            <h1 x-text="post.title"></h1>
        </template>
    </div>
</body>

</html>