type ProfilePageProps = {
    searchParams: Promise<{
        login?: string;
        name?: string;
        primary_email?: string;
        avatar_url?: string;
    }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
    const sp = await searchParams;

    const login = sp.login ?? "";
    const name = sp.name ?? "";
    const email = sp.primary_email ?? "";
    const avatar = sp.avatar_url ?? "";

    return (
        <main style={{ padding: "2rem" }}>
            <h1>User Profile</h1>

            {avatar && (
                <img
                    src={avatar}
                    alt="avatar"
                    width={120}
                    height={120}
                    style={{
                        borderRadius: "50%",
                        marginBottom: "1rem",
                    }}
                />
            )}

            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>Login:</strong> {login}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
        </main>
    );
}
