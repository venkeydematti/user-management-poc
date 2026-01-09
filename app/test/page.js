export default async function TestPage() {

    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await data.json();
    return (
        <div>
            <h1>Test Page</h1>
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="text-gray-500">{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}   