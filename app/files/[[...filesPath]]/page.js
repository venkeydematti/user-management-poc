export default async function FilesPathPage({ params }) {
    const { filesPath } = await params;
    return (
        <div>
            <h1>Files Path / :{filesPath?.join("/")}</h1>
        </div>
    )
}